// ==================== FIREBASE CONFIGURATION ====================

/**
 * Firebase Configuration
 * Contains all Firebase initialization and setup
 */

// Firebase SDK imports
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { 
    getFirestore, collection, doc, getDoc, setDoc, addDoc, 
    updateDoc, deleteDoc, getDocs, onSnapshot, query, 
    orderBy, limit, where, writeBatch, enableIndexedDbPersistence 
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { 
    getAuth, onAuthStateChanged, signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, signOut 
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// Application Configuration
export const CONFIG = {
    firebase: {
        apiKey: "AIzaSyDY7rPoNA6MzVKHE6obBj-tr4HMUpIdOPI",
        authDomain: "bookkeeping-211e6.firebaseapp.com",
        projectId: "bookkeeping-211e6",
        storageBucket: "bookkeeping-211e6.firebasestorage.app",
        messagingSenderId: "572507957762",
        appId: "1:572507957762:web:1537249285d8af025d151b"
    },
    defaults: {
        currency: 'GHS (₵)',
        currencySymbol: '₵'
    },
    emailJS: {
        publicKey: "2JkO3-Ju6GCVuteLC"
    }
};

// Firebase Initialization
const DATABASE_NAME = localStorage.getItem('selectedFirebaseProject') || 'tempbd2';
export const firebaseApp = initializeApp(CONFIG.firebase);
export const db = getFirestore(firebaseApp, DATABASE_NAME);
export const auth = getAuth(firebaseApp);

// Initialize Secondary App (for creating users without logging them in)
export const secondaryApp = initializeApp(CONFIG.firebase, 'Secondary');
export const secondaryAuth = getAuth(secondaryApp);

// Enable offline persistence
enableIndexedDbPersistence(db, { synchronizeTabs: true })
    .catch(err => console.warn('Persistence:', err.code));

// Export Firebase functions for use in other modules
export {
    getFirestore, collection, doc, getDoc, setDoc, addDoc,
    updateDoc, deleteDoc, getDocs, onSnapshot, query,
    orderBy, limit, where, writeBatch,
    onAuthStateChanged, signInWithEmailAndPassword,
    createUserWithEmailAndPassword, signOut
};
