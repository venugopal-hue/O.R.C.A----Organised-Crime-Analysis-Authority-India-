# O.R.C.A — Organized Crime Analysis & Response Authority

<p align="center">
  <img src="logo.png" alt="O.R.C.A. Banner" width="220" />
</p>

<p align="center">
  <strong>One-line project description:</strong> Secure, high-integrity conversational AI intelligence and analytical command console for modern law enforcement.
</p>

<p align="center">
  <strong>Professional tagline:</strong> Transforming unstructured police records into actionable intelligence, mapped connections, and predictive indicators for the Karnataka State Police.
</p>

<p align="center">
  <a href="https://github.com/venugopal-hue/O.R.C.A----Organised-Crime-Analysis-Authority-India-/actions"><img src="https://img.shields.io/github/actions/workflow/status/venugopal-hue/O.R.C.A----Organised-Crime-Analysis-Authority-India-/node.js.yml?branch=main&style=flat-square&logo=github" alt="Build Status" /></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
  <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/FastAPI-0.110.0-009688?style=flat-square&logo=fastapi" alt="FastAPI" /></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-Admin_SDK-FFCA28?style=flat-square&logo=firebase" alt="Firebase" /></a>
  <a href="https://github.com/venugopal-hue/O.R.C.A----Organised-Crime-Analysis-Authority-India-/blob/main/LICENSE"><img src="https://img.shields.io/github/license/venugopal-hue/O.R.C.A----Organised-Crime-Analysis-Authority-India-?style=flat-square" alt="License" /></a>
  <a href="https://github.com/venugopal-hue/O.R.C.A----Organised-Crime-Analysis-Authority-India-/releases"><img src="https://img.shields.io/github/v/release/venugopal-hue/O.R.C.A----Organised-Crime-Analysis-Authority-India-?style=flat-square" alt="Version" /></a>
  <img src="https://img.shields.io/badge/Status-Deployment_Ready-green?style=flat-square" alt="Deployment Ready Badge" />
</p>

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Tech Stack](#-tech-stack)
4. [System Architecture](#-system-architecture)
5. [Project Structure](#-project-structure)
6. [Installation](#-installation)
7. [Environment Variables](#-environment-variables)
8. [Firebase Setup](#-firebase-setup)
9. [AI Features](#-ai-features)
10. [Security & Access Control](#-security--access-control)
11. [Workflows](#-workflows)
12. [API Endpoints](#-api-endpoints)
13. [Screenshots](#-screenshots)
14. [Roadmap](#-roadmap)
15. [Contributing](#-contributing)
16. [License](#-license)
17. [Acknowledgements](#-acknowledgements)
18. [Footer](#-footer)

---

## 🔍 Project Overview

### What is O.R.C.A?
O.R.C.A (Organized Crime Analysis & Response Authority) is a next-generation analytical platform developed for the **Internal Security Division (ISD)** and **State Crime Records Bureau (SCRB)** of the Karnataka State Police. It translates raw, unstructured police dossiers (such as First Information Reports) into high-fidelity structured case entities.

### Why it was built
Law enforcement agencies handle vast repositories of paper records across 1100+ police stations. Manual auditing restricts rapid correlation discovery. O.R.C.A was built to enable:
*   **Natural Language Inquiries**: Querying complex database entries using simple English, Hindi, or Kannada.
*   **Automatic Relational Discovery**: Uncovering syndicate networks, hidden associates, and threat indices instantly.
*   **Tamper-Proof Ingress Audit**: Ensuring forensic integrity through automatic document checksum validation and cryptographic timestamps.

### Target Audience
*   **Field Investigators & Cyber Cell Officers**: For active criminal network auditing and case summary extraction.
*   **Oversight Reviewers**: For administrative applications review and document verification.
*   **Command Administrators / SPs**: For high-level statewide threat analysis, model parameter calibrations, and secure role oversight.

---

## ✨ Key Features

<details>
<summary>🛡️ Authentication & Security</summary>

*   **Firebase User Identity**: Secure login using administrative credentials linked directly to Google Cloud.
*   **Liveness Biometric face-onboarding**: Webcam-based anti-deepfake face registration requiring interactive user blinking validation.
*   **Officer Review Workflow**: Applications are queued in a pending state until approved by a verified Level 2 Administrator.
</details>

<details>
<summary>📊 Intelligence & Analytics</summary>

*   **Forensic Ingestion Pipeline**: Ingestion of scanned PDF/images of FIRs with automatic Tesseract OCR text extraction.
*   **Named Entity Recognition (NER)**: Automatic extraction of suspects, districts, weapons, vehicle license plates, and monetary values via spaCy.
*   **BNS Legal Mapping**: Automatic analysis of extracted case files to map legal offenses under the **Bharatiya Nyaya Sanhita (BNS)**.
</details>

<details>
<summary>🤖 Conversational AI Assistant</summary>

*   **Multilingual Support**: Interactive query execution in English, Kannada, and Hindi.
*   **Context-Aware Dialogues**: Session-based prompt history retaining active case states.
*   **Narration System**: Speech synthesis (TTS) for voice reading of analytical briefs.
*   **Mini Floating AI Assistant**: Access chat capabilities from any module via a globally available popup.
</details>

<details>
<summary>📍 Crime Mapping & Networks</summary>

*   **Statewide Geospatial Heatmap**: Interactive Leaflet maps pinpointing district threat indexes and crime cluster centers.
*   **D3-Powered Syndicate Graphs**: Dynamic relational network rendering of suspect nodes, associate links, and strength weights.
</details>

<details>
<summary>⚙️ Administration Center</summary>

*   **Oversight Director**: Real-time permission controls and rank-level overrides.
*   **Audit Ledgers**: Cryptographically signed audit trail logs tracing command console activity.
*   **Security Center**: Diagnostic telemetry grids showing server response times and API integrity values.
</details>

---

## 💻 Tech Stack

| Service Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 15 (App Router, Turbopack) | Main application engine |
| **Client Logic** | TypeScript, React 19 | Static type-safe UI logic |
| **Styling** | Tailwind CSS 4, Vanilla CSS | Premium dark/light themes |
| **Maps Layer** | Leaflet.js | Geospatial heatmaps |
| **Graph Visualization** | D3.js / SVG rendering | Syndicate connection mapping |
| **Backend API** | FastAPI (Python 3.12) | High-speed analytical backend |
| **Database** | Google Cloud Firestore | Document and officer ledger |
| **Identity / Auth** | Firebase Authentication | Cryptographic identity check |
| **Storage Ingress** | Native Static Directory (`/backend/data`) | Free-tier file download sandbox |
| **LLM Orchestration** | Groq SDK, NVIDIA NIM API Gateway | AI summaries and BNS mapping |
| **NLP & OCR** | Tesseract OCR, spaCy | Forensic record text extraction |

---

## 🏛️ System Architecture

The platform uses a split decoupled design to achieve sub-second query execution times and strict data boundaries:

```mermaid
graph TD
    Client[Next.js 15 Portal] -->|Bearer JWT ID Token| Backend[FastAPI Backend Server]
    Client -->|Direct Firestore Read| Firestore[(Google Cloud Firestore)]
    Backend -->|Firebase Admin SDK| Firestore
    Backend -->|NVIDIA NIM & Groq AI| LLM[LLM Engines]
    Backend -->|Local Sandbox Fallback| LocalDisk[(Local Static Storage Node)]
```

### Flow description:
1.  **Frontend**: Built with Next.js, hosting dashboard widgets and Leaflet maps. Interacts directly with Firestore for low-latency read operations.
2.  **API Layer**: Powered by FastAPI, secured by JWT verification middleware.
3.  **Authentication**: Firebase handles user login; client app retrieves ID Token and attaches it as `Authorization: Bearer <token>` to FastAPI requests.
4.  **AI Engine**: FastAPI communicates with Groq and NVIDIA NIM using API keys configured on the server.
5.  **Storage**: Uploaded FIR PDFs/images are persisted locally under the static path `backend/data/` as a storage node, making it fully operational on basic cloud tiers.

---

## 📁 Project Structure

```text
E:\O.R.C.A
├── index.html                   # Static landing page
├── logo.png                     # Official platform seal
├── .gitignore                   # Root-level ignore rules
├── README.md                    # Platform documentation (this file)
└── dashboard                    # Core nextjs workspace
    ├── package.json             # Node package declarations
    ├── .env.local               # Environment credentials (gitignored)
    ├── .gitignore               # Workspace level ignore rules
    ├── public/                  # Static assets (emblems, photos)
    ├── src/                     # React / TypeScript client source
    │   ├── app/                 # Next.js page routing
    │   │   ├── dashboard/       # Main command console dashboard
    │   │   ├── login/           # Authentication portal
    │   │   └── verification/    # Public validation checkpoint
    │   ├── components/          # Reusable layouts, topbars & modules
    │   ├── context/             # Auth & Intelligence Global Contexts
    │   └── lib/                 # Firebase Init and database configurations
    └── backend                  # Python FastAPI service
        ├── main.py              # FastAPI endpoints and JWT check middleware
        ├── data/                # Ingested dossier sandbox directory (gitignored)
        ├── requirements.txt     # Python requirements
        └── services/            # Ingestion, OCR, and AI connection modules
```

---

## 🚀 Installation

### Prerequisites
*   Node.js (v18.0 or higher)
*   Python (v3.10 or higher)
*   Tesseract OCR engine installed locally and added to the PATH

### 1. Clone the repository
```bash
git clone https://github.com/venugopal-hue/O.R.C.A----Organised-Crime-Analysis-Authority-India-.git
cd O.R.C.A----Organised-Crime-Analysis-Authority-India-
```

### 2. Configure Environment Profile
Create a `dashboard/.env.local` file with the templates documented in the [Environment Variables](#-environment-variables) section.

### 3. Setup Next.js Frontend
```bash
cd dashboard
npm install
npm run dev
```
The client portal will start on `http://localhost:3000`.

### 4. Setup Python Backend
In a new terminal window:
```bash
cd dashboard/backend
python -m venv .venv

# On Windows
.venv\Scripts\Activate.ps1
# On Linux/macOS
source .venv/bin/activate

pip install -r requirements.txt
python main.py
```
The FastAPI server will boot at `http://localhost:8000`.

---

## 🔑 Environment Variables

Create the following file at `dashboard/.env.local`. Do not commit this file to Git.

```env
# Next.js Firebase Client SDK Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-app
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=348618...
NEXT_PUBLIC_FIREBASE_APP_ID=1:3486...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-...

# AI Inference Gateway API Keys
GROQ_API_KEY=gsk_...
NVIDIA_API_KEY=nvapi-...

# Firebase Admin SDK Credentials (JSON payload)
FIREBASE_SERVICE_ACCOUNT_KEY='{"type": "service_account", "project_id": "your-app", "private_key_id": "...", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgI...\n-----END PRIVATE KEY-----\n", "client_email": "..."}'
```

---

## 🔥 Firebase Setup

```text
Google Cloud Firebase
├── Authentication (Enabled, Email/Password sign-in)
├── Cloud Firestore (Document Database)
│   ├── /officers/{uid}                   # Active approved profiles
│   ├── /officer_applications/{uid}       # Pending onboarding requests
│   ├── /cases/{caseId}                   # Ingested FIR details
│   └── /audit_logs/{logId}               # Interactive audit log trail
└── Cloud Storage (Optional, Fallback utilizes local storage node)
```

### Security Rules (Firestore)
Secure direct client-side database access using strict server-side rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Restrict direct write permissions to backend service endpoints
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // All write operations transit server-side admin SDK
    }
  }
}
```

---

## 🧠 AI Features

*   **Ingestion NLP**: Analyzes uploaded FIR reports to identify primary entities (Suspects, Districts, Weapons).
*   **BNS Prompt Router**: Uses customized system instructions to map textual modus operandi to standard BNS legal sections.
*   **Dynamic Chatbot Context**: Contextual memory tracking utilizing a state variables list inside [IntelligenceContext.tsx](file:///E:/O.R.C.A/dashboard/src/context/IntelligenceContext.tsx).
*   **Mini Assistant popup**: Provides tab-context awareness so that the AI automatically shifts prompts (e.g. shifts to "explain graph trend" when user is viewing Analytics tab).

---

## 🔒 Security & Access Control

*   **No Dev Bypasses**: Bypasses for `localhost` have been completely removed. All administrative actions require signed cookies.
*   **FastAPI Bearer Check**: FastAPI routes enforce security checks:
    ```python
    decoded_token = auth.verify_id_token(token)
    ```
*   **Role-Based Access Control (RBAC)**: Checks user roles before mounting tabs in [Sidebar.tsx](file:///E:/O.R.C.A/dashboard/src/components/layout/Sidebar.tsx).

---

## 🔄 Workflows

### Onboarding & Authentication Workflow
```mermaid
sequenceDiagram
    participant Officer as Onboarding Officer
    participant Admin as Command Center Admin
    participant DB as Live Firestore Database

    Officer->>Officer: Run Webcam biometric Anti-Deepfake scan
    Officer->>DB: Write details to /officer_applications (Pending)
    Admin->>Admin: Open review drawer & confirm credentials
    Admin->>DB: Move profile to /officers (Active)
    Officer->>Officer: Login to active profile
```

### Evidence Ingestion Workflow
```mermaid
sequenceDiagram
    participant Officer as Active Officer
    participant Backend as FastAPI Server
    participant OCR as Tesseract Ingestion
    participant AI as AI Engine (Groq/NIM)
    participant DB as Live Firestore Database

    Officer->>Backend: Post FIR document PDF/Image
    Backend->>OCR: Extract raw layout text
    Backend->>AI: Calibrate MO and map BNS legal clauses
    Backend->>DB: Push structured data & save file locally
    Backend-->>Officer: Render case overview & timeline
```

---

## ⚡ API Endpoints

| Route | Method | Purpose | Authentication |
| :--- | :--- | :--- | :--- |
| `/api/v1/fir/upload` | `POST` | Ingests FIR document, runs Tesseract OCR/spaCy, maps BNS, saves case. | `Bearer Firebase JWT` |
| `/api/v1/intelligence/query` | `POST` | Handles custom text queries directed to LLM inference engines. | `Bearer Firebase JWT` |
| `/api/v1/correlation/analyze` | `POST` | Calculates cross-case relational similarities. | `Bearer Firebase JWT` |
| `/api/v1/correlation/network` | `GET` | Pulls link/node mappings for relational syndicate graphs. | `Bearer Firebase JWT` |
| `/api/v1/correlation/alerts` | `GET` | Pulls warnings and alert indications from DB. | `Bearer Firebase JWT` |
| `/api/v1/correlation/clusters` | `GET` | Computes Louvain-based community criminal clustering. | `Bearer Firebase JWT` |
| `/api/v1/correlation/districts` | `GET` | Computes statewide threat indexes for geospatial mapping. | `Bearer Firebase JWT` |

---

## 🖼️ Screenshots

<p align="center">
  <strong>1. Command Overview Dashboard</strong><br />
  <img src="dashboard/public/harsad_portrait.png" alt="Command Overview Placeholder" width="600" />
</p>

---

## 🗺️ Roadmap

### Current Features
*   Webcam biometrics face capture scan.
*   Louvain network clustering.
*   Statewide district heatmaps.
*   BNS legal mapping algorithms.
*   Dynamic context popup assistant.

### Upcoming Features
*   Kannada and Hindi Speech-to-Text integration.
*   Automatic suspect face matching from statewide databases.
*   Offline local LLM fallback parsing options.

---

## 🤝 Contributing

We welcome contributions to O.R.C.A. Please follow these guidelines:
1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements
*   [FastAPI](https://fastapi.tiangolo.com/)
*   [Next.js](https://nextjs.org/)
*   [Leaflet.js](https://leafletjs.com/)
*   [Lucide Icons](https://lucide.dev/)
*   [Tailwind CSS](https://tailwindcss.com/)

---

<p align="center">
  Made with ❤️ for law enforcement safety by O.R.C.A.<br />
  <strong>Karnataka State Police | SCRB</strong>
</p>
