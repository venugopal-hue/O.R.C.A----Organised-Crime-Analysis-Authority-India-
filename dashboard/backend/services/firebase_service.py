import os
import json
import logging
import time

logger = logging.getLogger("orca_firebase")

# Create local data directory for offline sandbox persistence
LOCAL_DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
os.makedirs(LOCAL_DB_DIR, exist_ok=True)

firebase_available = False

try:
    import firebase_admin
    from firebase_admin import credentials, firestore, storage
    
    # Initialize Firebase if not already initialized
    if not firebase_admin._apps:
        # Check if a custom service account JSON is set or resides locally
        cred_path = os.environ.get("FIREBASE_SERVICE_ACCOUNT") or "firebase-key.json"
        bucket_name = os.environ.get("FIREBASE_STORAGE_BUCKET")
        
        if os.path.exists(cred_path):
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred, {
                'storageBucket': bucket_name
            })
            firebase_available = True
            logger.info("Firebase Admin SDK successfully initialized via service account JSON.")
        else:
            # Try initializing implicitly using default environment variables or parameters
            try:
                # This works if the developer ran gcloud authentication or if standard defaults exist
                firebase_admin.initialize_app(options={
                    'storageBucket': bucket_name
                })
                firebase_available = True
                logger.info("Firebase Admin SDK successfully initialized via Application Default Credentials.")
            except Exception as default_err:
                logger.warning(
                    f"Implicit Firebase Admin initialization bypassed: {str(default_err)}. "
                    "Operating in high-fidelity local sandbox mode."
                )
except ImportError:
    logger.warning("firebase_admin Python package missing. Operating in high-fidelity local sandbox mode.")


def save_fir_metadata(case_id: str, formatted_case: dict, file_bytes: bytes, filename: str, ocr_result: dict):
    """
    Saves extracted FIR metadata, AI intelligence summaries, and OCR logs to Firestore.
    Uploads the uploaded file to Firebase Storage if online.
    Otherwise, saves all files and records locally on the disk sandbox to ensure a flawless demo.
    """
    # 1. Local Persistence (Sandbox Backup Database)
    safe_id = case_id.replace("/", "_")
    local_binary_name = f"doc_{safe_id}_{filename}"
    try:
        local_case_file = os.path.join(LOCAL_DB_DIR, f"case_{safe_id}.json")
        local_logs_file = os.path.join(LOCAL_DB_DIR, f"logs_{safe_id}.json")
        local_binary_file = os.path.join(LOCAL_DB_DIR, local_binary_name)
        
        # Save case metadata
        with open(local_case_file, "w", encoding="utf-8") as f:
            json.dump(formatted_case, f, indent=2, ensure_ascii=False)
            
        # Save ocr logs
        with open(local_logs_file, "w", encoding="utf-8") as f:
            json.dump(ocr_result, f, indent=2, ensure_ascii=False)
            
        # Save raw binary uploaded file
        with open(local_binary_file, "wb") as f:
            f.write(file_bytes)
            
        logger.info(f"Local sandbox sync complete: saved {local_binary_name} & raw file.")
    except Exception as e:
        logger.error(f"Local sandbox write failure: {str(e)}")

    # 2. Firebase Database Sync (Firestore & Cloud Storage)
    if firebase_available:
        db = None
        try:
            db = firestore.client()
        except Exception as dberr:
            logger.error(f"Failed to get Firestore client: {str(dberr)}")

        if db:
            file_url = None
            try:
                bucket = storage.bucket()
                if bucket:
                    blob_path = f"firs/{safe_id}_{filename}"
                    blob = bucket.blob(blob_path)
                    blob.upload_from_string(file_bytes, content_type="application/octet-stream")
                    
                    # Create download / access link
                    try:
                        file_url = blob.generate_signed_url(expiration=3600 * 24 * 7) # 7 Days Validity
                    except Exception:
                        file_url = f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{blob_path.replace('/', '%2F')}?alt=media"
            except Exception as se:
                logger.warning(f"Firebase Storage upload failed/not-supported: {str(se)}. Utilizing local HTTP download link fallback.")

            if not file_url:
                # Fallback to local FastAPI static file download route
                file_url = f"http://localhost:8000/api/v1/data/{local_binary_name}"

            try:
                # Embed evidence file url in standard case schema
                formatted_case["evidenceFileUrl"] = file_url
                
                # Push details to /cases in Firestore
                db.collection("cases").document(case_id).set(formatted_case)
                
                # Push OCR raw scans to /ocr_logs
                ocr_log_data = {
                    "caseId": case_id,
                    "filename": filename,
                    "sha256": ocr_result["sha256"],
                    "confidence": ocr_result["confidence"],
                    "logs": ocr_result["logs"],
                    "extractedText": ocr_result["text"],
                    "timestamp": firestore.SERVER_TIMESTAMP
                }
                db.collection("ocr_logs").document(case_id).set(ocr_log_data)
                
                # Log operational officer event in /audit_logs
                audit_log_data = {
                    "timestamp": firestore.SERVER_TIMESTAMP,
                    "caseId": case_id,
                    "action": "FIR INGESTION & FORENSIC EXTRACTION PIPELINE",
                    "operator": "DSP R. K. Shastry, IPS",
                    "ocrConfidence": f"{ocr_result['confidence']}%",
                    "details": f"Ingested secure digital dossier '{filename}' verified & mapped."
                }
                db.collection("audit_logs").add(audit_log_data)
                
                logger.info("Successfully pushed all forensic metadata to Live Google Cloud Firestore.")
            except Exception as fe:
                logger.error(f"Live Firestore push failed: {str(fe)}.")
