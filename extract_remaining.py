#!/usr/bin/env python3
"""
Automated Module Extractor
Extracts remaining classes from _full_script.js
"""

import re
from pathlib import Path

def extract_class(content, class_name, start_pattern=None):
    """Extract a complete class from JavaScript content"""
    if start_pattern is None:
        start_pattern = f"class {class_name}"
    
    # Find class start
    class_match = re.search(f'{start_pattern}.*?{{', content, re.DOTALL)
    if not class_match:
        print(f"❌ Could not find class: {class_name}")
        return None
    
    start_pos = class_match.start()
    
    # Find matching closing brace
    brace_count = 0
    in_class = False
    end_pos = start_pos
    
    for i in range(start_pos, len(content)):
        char = content[i]
        if char == '{':
            brace_count += 1
            in_class = True
        elif char == '}':
            brace_count -= 1
            if in_class and brace_count == 0:
                end_pos = i + 1
                break
    
    if end_pos > start_pos:
        class_code = content[start_pos:end_pos]
        return class_code
    
    return None

def main():
    print("🚀 Automated Module Extractor\n")
    
    base_dir = Path('/mnt/user-data/outputs/bookkeeping-app')
    full_script = base_dir / 'js' / '_full_script.js'
    
    with open(full_script, 'r') as f:
        content = f.read()
    
    # Extract DataLoaderService
    print("📦 Extracting DataLoaderService...")
    dataloader = extract_class(content, "DataLoaderService")
    if dataloader:
        with open(base_dir / 'js' / 'services' / 'data-loader.js', 'w') as f:
            f.write("""// ==================== DATA LOADER SERVICE ====================

/**
 * Data Loader Service
 * Handles loading data from Firebase for products, sales, expenses, customers
 */

import { db, collection, getDocs, onSnapshot, query, orderBy } from '../config/firebase.js';
import { state } from '../utils/state.js';
import { Utils } from '../utils/utils.js';

""")
            f.write(dataloader)
            f.write("""

// Create and export singleton instance
export const dataLoader = new DataLoaderService();
""")
        print(f"  ✓ Created data-loader.js ({len(dataloader)} chars)")
    
    # Extract ActivityLogger
    print("📝 Extracting ActivityLogger...")
    activity = extract_class(content, "ActivityLogger")
    if activity:
        with open(base_dir / 'js' / 'services' / 'activity-logger.js', 'w') as f:
            f.write("""// ==================== ACTIVITY LOGGER SERVICE ====================

/**
 * Activity Logger
 * Logs user activities and provides audit trail
 */

import { addDoc, getDocs, query, orderBy, limit } from '../config/firebase.js';
import { firebaseService } from './firebase-service.js';
import { state } from '../utils/state.js';

""")
            f.write(activity)
            f.write("\n\nexport default ActivityLogger;\n")
        print(f"  ✓ Created activity-logger.js ({len(activity)} chars)")
    
    # Extract AppController
    print("🎮 Extracting AppController...")
    controller = extract_class(content, "AppController")
    if controller:
        with open(base_dir / 'js' / 'controllers' / 'app-controller.js', 'w') as f:
            f.write("""// ==================== APP CONTROLLER ====================

/**
 * Main Application Controller
 * Manages all application logic, UI updates, and user interactions
 * 
 * WARNING: This is a large file (~8000 lines)
 * Consider splitting into smaller controllers:
 * - auth-controller.js
 * - inventory-controller.js  
 * - sales-controller.js
 * - expense-controller.js
 * - customer-controller.js
 * - invoice-controller.js
 * - outlet-controller.js
 * - report-controller.js
 */

import { auth, db, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '../config/firebase.js';
import { state } from '../utils/state.js';
import { Utils } from '../utils/utils.js';
import { firebaseService } from '../services/firebase-service.js';
import { dataLoader } from '../services/data-loader.js';
import ActivityLogger from '../services/activity-logger.js';

""")
            f.write(controller)
            f.write("\n\nexport { AppController };\n")
        print(f"  ✓ Created app-controller.js ({len(controller)} chars)")
        print("  ⚠️  This is a LARGE file - consider splitting it further!")
    
    print("\n✅ Extraction Complete!")
    print("\n📋 Next Steps:")
    print("1. Review the extracted files")
    print("2. Update js/app.js to import AppController")
    print("3. Test the application")
    print("4. Consider splitting app-controller.js into smaller modules")

if __name__ == '__main__':
    main()
