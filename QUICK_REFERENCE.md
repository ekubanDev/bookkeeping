# 🚀 Quick Reference Card

## Module Extraction Checklist

### ✅ Already Done
- [x] Project structure created
- [x] CSS extracted → `css/styles.css`
- [x] Firebase config → `js/config/firebase.js`
- [x] State management → `js/utils/state.js`
- [x] Utilities → `js/utils/utils.js`
- [x] Main app → `js/app.js`
- [x] Documentation complete

### 📝 To Do
- [ ] Extract FirebaseService → `js/services/firebase-service.js`
- [ ] Extract DataLoader → `js/services/data-loader.js`
- [ ] Extract ActivityLogger → `js/services/activity-logger.js`
- [ ] Extract AppController → `js/controllers/app-controller.js`
- [ ] Split AppController into smaller controllers
- [ ] Test all functionality
- [ ] Remove `_full_script.js` after successful extraction

## Common Code Patterns

### Export Pattern
```javascript
// Named export
export class MyClass { }
export const myFunc = () => { };

// Default export  
export default class MyClass { }
```

### Import Pattern
```javascript
// Named imports
import { MyClass, myFunc } from './module.js';

// Default import
import MyClass from './module.js';

// Import all
import * as Module from './module.js';
```

### Service Pattern
```javascript
// services/my-service.js
import { db } from '../config/firebase.js';
import { state } from '../utils/state.js';

export class MyService {
    async getData() {
        // implementation
    }
}

export const myService = new MyService();
```

### Controller Pattern
```javascript
// controllers/my-controller.js
import { myService } from '../services/my-service.js';
import { Utils } from '../utils/utils.js';

export class MyController {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // bind events
    }
}
```

## File Size Guidelines

| File Type | Max Lines | When to Split |
|-----------|-----------|---------------|
| Config | 100 | > 150 lines |
| Utility | 300 | > 400 lines |
| Service | 400 | > 500 lines |
| Controller | 500 | > 600 lines |

## Testing Commands

```bash
# Start server
python3 -m http.server 8080

# Or with Node.js
npx http-server -p 8080

# Open browser
http://localhost:8080
```

## Debug Checklist

When something breaks:
1. ✅ Check browser console for errors
2. ✅ Verify all imports have `.js` extension
3. ✅ Check for circular dependencies
4. ✅ Ensure all exports are present
5. ✅ Verify file paths are correct
6. ✅ Check for typos in variable names
7. ✅ Confirm dependencies are loaded first

## Import Dependency Order

```
1. firebase.js (no deps)
2. state.js (needs firebase.js)
3. utils.js (needs state.js)
4. firebase-service.js (needs firebase.js, state.js)
5. data-loader.js (needs firebase-service.js, utils.js)
6. Other services
7. Controllers (need all services)
8. app.js (needs everything)
```

## Common Errors & Fixes

### Error: "Failed to resolve module specifier"
```javascript
// ❌ Wrong
import { Utils } from './utils';

// ✅ Correct
import { Utils } from './utils.js';
```

### Error: "X is not defined"
```javascript
// ❌ Forgot to export
class MyClass { }

// ✅ Remember to export
export class MyClass { }
```

### Error: "Circular dependency detected"
```javascript
// ❌ Bad
// file-a.js imports file-b.js
// file-b.js imports file-a.js

// ✅ Good - extract shared code
// file-a.js imports shared.js
// file-b.js imports shared.js
```

## Git Workflow

```bash
# Initialize repo
git init
git add .
git commit -m "Initial modular structure"

# After each module extraction
git add js/services/my-service.js
git commit -m "Extract MyService module"

# If something breaks
git diff                    # See what changed
git checkout -- file.js    # Revert file
```

## Performance Tips

### Before Deployment
1. Minify CSS and JS
2. Enable gzip compression
3. Add cache headers
4. Consider using a bundler (Vite/Webpack)

### Lazy Loading Example
```javascript
// Load module only when needed
async function loadFeature() {
    const { MyController } = await import('./controllers/my-controller.js');
    return new MyController();
}
```

## Useful VS Code Extensions

- ESLint - Code linting
- Prettier - Code formatting
- Path Intellisense - File path autocomplete
- ES6 Code Snippets - Quick code templates
- Live Server - Development server

## Next Actions

1. Read `EXTRACTION_GUIDE.md`
2. Start with `FirebaseService` extraction
3. Test after each extraction
4. Continue until `_full_script.js` is empty
5. Delete `_full_script.js`
6. Celebrate! 🎉

---

**Remember:** Take it one module at a time. Test frequently. Don't rush!
