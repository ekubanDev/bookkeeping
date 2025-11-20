// ==================== FIREBASE SERVICE ====================

/**
 * Firebase Service
 * Handles Firebase database operations and collection references
 */

import { db, collection, doc, getDoc, onSnapshot, setDoc, CONFIG } from '../config/firebase.js';
import { state } from '../utils/state.js';

export class FirebaseService {
    getUserCollection(name) {
        if (!state.authInitialized || !state.currentUser) {
            throw new Error('Authentication required');
        }
        return collection(db, name);
    }

    settingsRef() {
        return doc(db, 'settings', 'business');
    }

    async ensureUserData() {
        if (!state.currentUser) return;
        
        const userDocRef = doc(db, 'users', state.currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (!userDocSnap.exists()) {
            await setDoc(userDocRef, {
                email: state.currentUser.email,
                createdAt: new Date().toISOString(),
                initialized: true
            });
            
            await setDoc(this.settingsRef(), {
                name: 'My Business',
                tax: 0,
                currency: CONFIG.defaults.currency
            });
        }
    }

    async getUserRole() {
        if (!state.currentUser) return { role: 'admin', assignedOutlet: null };
        
        try {
            const userDoc = await getDoc(doc(db, 'users', state.currentUser.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                
                state.userRole = userData.role;
                console.log('UserDataRole:', state.userRole);
                return {
                    role: userData.role || 'admin',
                    assignedOutlet: userData.assignedOutlet || null
                };
            }
            // Default to admin if no user document
            return { role: 'admin', assignedOutlet: null };
        } catch (error) {
            console.error('Error getting user role:', error);
            // Default to admin on error
            return { role: 'admin', assignedOutlet: null };
        }
    }
    
    getOutletsCollection() {
        return collection(db, 'outlets');
    }
    
    getOutletCollection(outletId) {
        return collection(db, 'outlets', outletId);
    }
    
    getConsignmentsCollection(outletId) {
        return collection(db, 'outlets', outletId, 'consignments');
    }
    
    getSettlementsCollection(outletId) {
        return collection(db, 'outlets', outletId, 'settlements');
    }
}

// Create and export singleton instance
export const firebaseService = new FirebaseService();
