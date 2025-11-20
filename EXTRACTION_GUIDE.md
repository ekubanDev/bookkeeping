# JavaScript Extraction Guide

## Overview
The JavaScript has been saved to `js/_full_script.js`. 
Follow these steps to properly extract modules:

## Step 1: Extract Configuration
**File:** `js/config/firebase.js`
- Lines containing Firebase imports
- CONFIG object
- Firebase initialization code
- Add `export` keywords

## Step 2: Extract State
**File:** `js/utils/state.js`
- AppState class definition
- State instance creation
- Add `export` keywords

## Step 3: Extract Utilities
**File:** `js/utils/utils.js`
- Utils object with all utility functions
- Add `import { state }` at top
- Add `export` keyword

## Step 4: Extract Services
### FirebaseService
**File:** `js/services/firebase-service.js`
- FirebaseService class
- Instance creation
- Exports

### DataLoader
**File:** `js/services/data-loader.js`
- DataLoader class
- Instance creation
- Exports

### ActivityLogger
**File:** `js/services/activity-logger.js`
- ActivityLogger class
- Exports

## Step 5: Extract Main Controller
**File:** `js/controllers/app-controller.js`
- AppController class (the large one)
- All its methods
- Exports

## Step 6: Create Main App File
**File:** `js/app.js`
```javascript
// Import all modules
import { auth, onAuthStateChanged } from './config/firebase.js';
import { state } from './utils/state.js';
import { Utils } from './utils/utils.js';
import { FirebaseService } from './services/firebase-service.js';
import { DataLoader } from './services/data-loader.js';
import { AppController } from './controllers/app-controller.js';

// Initialize EmailJS
emailjs.init("2JkO3-Ju6GCVuteLC");

// Global error handlers
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    Utils.showToast('An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    Utils.showToast('An unexpected error occurred', 'error');
});

// Initialize application
const app = new AppController();
window.appController = app;

console.log('✅ Application initialized');
```

## Import/Export Patterns

### Exporting
```javascript
// Named exports
export class MyClass { }
export const myFunction = () => { };
export const myVariable = value;

// Default export
export default class MyClass { }
```

### Importing
```javascript
// Named imports
import { MyClass, myFunction } from './module.js';

// Default import
import MyClass from './module.js';

// Import everything
import * as MyModule from './module.js';
```

## Dependencies Chart

```
firebase.js (no dependencies)
    ↓
state.js (depends on: firebase.js)
    ↓
utils.js (depends on: state.js)
    ↓
firebase-service.js (depends on: firebase.js, state.js)
    ↓
data-loader.js (depends on: firebase-service.js, utils.js, state.js)
activity-logger.js (depends on: firebase-service.js)
    ↓
app-controller.js (depends on: ALL above)
    ↓
app.js (depends on: ALL above, initializes everything)
```

## Testing Each Module
After creating each file, test it:
1. Check for syntax errors in browser console
2. Verify imports resolve correctly
3. Test functionality
4. Move to next module

## Common Issues
1. **Circular dependencies**: Ensure proper import order
2. **Missing exports**: Add `export` keyword to classes/functions
3. **Wrong paths**: Use relative paths with `.js` extension
4. **Global variables**: Convert to imports/exports
