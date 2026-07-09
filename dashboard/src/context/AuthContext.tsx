"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getIdToken
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface OfficerProfile {
  uid: string;
  email: string;
  name: string;
  rank: string;
  role: string; // Generic string to support dynamic roles
  district: string;
  clearanceLevel: string;
  lastLogin: string;
  active: boolean;
  station?: string;
  division?: string;
  stateUnit?: string;
  department?: string;
  supervisor?: string;
  reportingOfficer?: string;
  departmentHead?: string;
  commandingOfficer?: string;
  permissions?: Record<string, string>;
  permissionsHistory?: {
    timestamp: string;
    changedBy: string;
    oldRole?: string;
    newRole?: string;
    oldPermissions?: Record<string, string>;
    newPermissions?: Record<string, string>;
    reason?: string;
  }[];
  stationHistory?: {
    timestamp: string;
    changedBy: string;
    oldStation?: string;
    newStation?: string;
    oldDistrict?: string;
    newDistrict?: string;
    reason?: string;
  }[];
  mobile?: string;
  phone?: string;
  photoUrl?: string;
}

interface AuthContextType {
  user: User | null;
  officerProfile: OfficerProfile | null;
  loading: boolean;
  login: (badgeId: string, pin: string) => Promise<void>;
  logout: () => Promise<void>;
  hasAccess: (allowedRoles: string[]) => boolean;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to query Firestore asynchronously with timeout safeguard
const getDocWithTimeout = (docRef: any, timeoutMs = 1500) => {
  return Promise.race([
    getDoc(docRef),
    new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore Query Timeout")), timeoutMs))
  ]) as Promise<any>;
};

export const mapBadgeToEmail = (badgeId: string) => {
  const trimmed = badgeId.trim();
  if (trimmed.includes("@")) {
    return trimmed.toLowerCase();
  }
  const cleanBadge = trimmed.toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `${cleanBadge}@karnatakapolice.gov.in`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [officerProfile, setOfficerProfile] = useState<OfficerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Synchronize authentication cookie for Next.js Middleware route checks
  const syncCookie = async (currentUser: User | null) => {
    if (currentUser) {
      try {
        const token = await getIdToken(currentUser);
        const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
        document.cookie = `authToken=${token}; path=/; max-age=86400; SameSite=Strict${isLocal ? "" : "; Secure"}`;
      } catch (e) {
        document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    } else {
      document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      await syncCookie(currentUser);

      if (currentUser) {
        const docRef = doc(db, "officers", currentUser.uid);

        const attemptFetch = async (attempt: number): Promise<void> => {
          try {
            // Direct Firestore fetch — no artificial timeout
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const profile = docSnap.data() as OfficerProfile;
              setOfficerProfile(profile);
            } else {
              // No Firestore doc exists for this UID — use safe minimal fallback
              // Only the legacy hardcoded admin email gets elevated access
              const isLegacyAdmin =
                currentUser.email === "dsp_rks_ips_2026@orca.gov" ||
                currentUser.email === "dsp_rks_ips_2026@karnatakapolice.gov.in" ||
                currentUser.email?.startsWith("dsp_rks_ips_2026");

              const fallbackProfile: OfficerProfile = {
                uid: currentUser.uid,
                email: currentUser.email || "",
                name: isLegacyAdmin
                  ? "DSP R. K. Shastry, IPS"
                  : (currentUser.email?.split("@")[0].toUpperCase().replace(/_/g, " ") || "Officer"),
                rank: isLegacyAdmin ? "Superintendent of Police" : "Investigating Officer",
                // IMPORTANT: fallback role must be a valid Sidebar role string
                // "Investigation Dashboard" = safest minimum privilege
                role: isLegacyAdmin ? "Administrative Dashboard - Level 2" : "Investigation Dashboard",
                district: "Bengaluru Urban",
                clearanceLevel: isLegacyAdmin ? "ISD-LEVEL-I" : "ISD-LEVEL-IV",
                lastLogin: new Date().toISOString(),
                active: true,
              };
              setOfficerProfile(fallbackProfile);
            }
          } catch (error) {
            if (attempt < 2) {
              // Retry once after 1 second if first attempt fails (e.g., cold start)
              console.warn(`[AuthContext] Firestore fetch attempt ${attempt} failed, retrying...`, error);
              await new Promise(r => setTimeout(r, 1000));
              return attemptFetch(attempt + 1);
            }
            // After 2 failed attempts, fall back to safe minimum profile
            console.error("[AuthContext] Firestore fetch failed after retries:", error);
            const isLegacyAdmin =
              currentUser.email === "dsp_rks_ips_2026@orca.gov" ||
              currentUser.email === "dsp_rks_ips_2026@karnatakapolice.gov.in" ||
              currentUser.email?.startsWith("dsp_rks_ips_2026");

            setOfficerProfile({
              uid: currentUser.uid,
              email: currentUser.email || "",
              name: currentUser.email?.split("@")[0].toUpperCase().replace(/_/g, " ") || "Officer",
              rank: "Investigating Officer",
              role: isLegacyAdmin ? "Administrative Dashboard - Level 2" : "Investigation Dashboard",
              district: "Bengaluru Urban",
              clearanceLevel: "ISD-LEVEL-IV",
              lastLogin: new Date().toISOString(),
              active: true,
            });
          }
        };

        await attemptFetch(1);
      } else {
        setOfficerProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

const login = async (badgeId: string, pin: string) => {
  setLoading(true);
  const trimmedBadge = badgeId.trim();
  const trimmedPin = pin.trim();

  if (!trimmedBadge || !trimmedPin) {
    setLoading(false);
    throw new Error("Please enter your Officer Badge ID/Email and Password.");
  }

  const email = mapBadgeToEmail(trimmedBadge);

  try {
    // Direct Firebase Authentication strictly enforcing registered credentials
    const userCredential = await signInWithEmailAndPassword(auth, email, trimmedPin);
    
    // Fetch Firestore profile to verify active status
    const docRef = doc(db, "officers", userCredential.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const profile = docSnap.data();
      if (profile && profile.active === false) {
        await signOut(auth);
        throw new Error("Your registration application is pending review by the Command Administration Center.");
      }
    }
  } catch (error: any) {
      setLoading(false);
      console.error("[Firebase Auth Error]:", error.code, error.message);
      
      let friendlyMessage = "Authentication failed. Invalid Officer credentials.";
      if (
        error.code === "auth/user-not-found" || 
        error.code === "auth/wrong-password" || 
        error.code === "auth/invalid-credential"
      ) {
        friendlyMessage = "Access Denied: Invalid Officer Badge ID/Email or Password.";
      } else if (error.code === "auth/invalid-email") {
        friendlyMessage = "Invalid format: Please enter a valid Officer Badge ID or Email.";
      } else if (error.code === "auth/too-many-requests") {
        friendlyMessage = "Access temporarily blocked due to multiple failed login attempts. Please try again later.";
      } else if (error.message) {
        friendlyMessage = error.message;
      }
      
      throw new Error(friendlyMessage);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await syncCookie(null);
      setUser(null);
      setOfficerProfile(null);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Sign-out failure: ", error);
    } finally {
      setLoading(false);
    }
  };

  const hasAccess = (allowedRoles: string[]) => {
    if (!officerProfile) return false;
    return allowedRoles.includes(officerProfile.role);
  };

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, officerProfile, loading, login, logout, hasAccess, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
