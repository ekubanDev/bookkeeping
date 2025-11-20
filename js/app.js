// ==================== MAIN APPLICATION ENTRY POINT ====================

/**
 * Firebase Bookkeeping Application
 * Main initialization file - imports and connects all modules
 */

// Import Firebase configuration and services
import { auth, onAuthStateChanged, CONFIG } from './config/firebase.js';
import { state } from './utils/state.js';
import { Utils } from './utils/utils.js';

// Initialize EmailJS
emailjs.init(CONFIG.emailJS.publicKey);

// Import services
import { firebaseService } from './services/firebase-service.js';
import { dataLoader } from './services/data-loader.js';
import ActivityLogger from './services/activity-logger.js';
import { AppController } from './controllers/app-controller.js';

// ==================== GLOBAL ERROR HANDLERS ====================
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    Utils.showToast('An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    Utils.showToast('An unexpected error occurred', 'error');
});

// ==================== APPLICATION INITIALIZATION ====================
console.log('🚀 Initializing Firebase Bookkeeping Application...');

// Initialize AppController
const app = new AppController();
window.appController = app;

console.log('✅ Application initialized successfully!');
