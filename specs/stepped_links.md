# Technical Specification - Stepped Links Extension

## Project Objective

**Stepped Links** is a Raycast extension designed to manage and quickly access links organized hierarchically through a "steps" system. The extension allows:

- Saving links in a nested JSON structure stored locally
- Searching and navigating links using a syntax of space-separated steps
- Opening links with support for dynamic searches via wildcards
- Importing and exporting link configurations
- Organizing links in a tree structure with names, URLs, and custom searches

The extension is optimized for users who need quick access to multiple web resources organized by categories or logical routes.

---

## Data Architecture

### Main JSON Schema

The configuration file is stored in Raycast's `LocalStorage` under the key `steppedRoutes` and follows this structure:

```typescript
type StepJson = {
  [key: string]: StepJsonInterface | StepJson;
};

interface StepJsonInterface {
  _url?: string; // Base URL of the step
  _name?: string; // Descriptive name of the step
  _search?: string; // Search URL with wildcard (e.g., "{{q}}")
}
```

### Detailed Data Structure

#### Special Properties (Prefix `_`)

- **`_url`**: Direct URL that opens when the step is selected
- **`_name`**: Descriptive name displayed in the interface
- **`_search`**: Search URL that replaces the wildcard with the user's query

#### Value Types in a Step

A step can contain three types of values:

1. **String**: Direct URL

   ```json
   "scripts": "https://github.com/raycast/script-commands"
   ```

2. **String Array**: Combination of multiple URLs (combo)

   ```json
   "combo": ["url1", "url2", "url3"]
   ```

3. **Nested Object**: Sub-steps that create a hierarchy
   ```json
   "gh": {
     "_name": "GitHub",
     "_url": "https://github.com",
     "ry": {
       "_name": "Raycast",
       "_url": "https://github.com/raycast"
     }
   }
   ```

### Complete Structure Example

```json
{
  "gh": {
    "_name": "GitHub",
    "_url": "https://github.com",
    "_search": "https://duckduckgo.com/?q=%s&t=%s",
    "ry": {
      "_name": "Raycast",
      "_url": "https://github.com/raycast",
      "scripts": "https://github.com/raycast/script-commands"
    }
  },
  "ry": {
    "_name": "Raycast",
    "_url": "https://raycast.io/"
  },
  "gg": {
    "_url": "https://google.com",
    "_search": "https://google.com/search?q={{q}}",
    "img": "https://google.com/search?q={{q}}&tbm=isch"
  }
}
```

### In-Memory Data Model (Step)

When the JSON is parsed, an instance of the `Step` class is created with the following properties:

```typescript
interface StepTypes {
  title: string; // Title displayed in the list
  subtitle: string; // Descriptive subtitle
  url: string; // Final URL to open
  combo: string[]; // Array of URLs if it's a combo
  hasSearch: boolean; // Indicates if search is configured
  icon: string; // Raycast icon to display
  step: string; // Name of the current step
  insideSteps: number; // Number of nested sub-steps
  path?: string; // Complete path of the step
  query?: string; // Current search query
  search?: string; // Configured search URL
}
```

### Key Constants

Special keys are defined in `src/types/Keys.ts`:

```typescript
export const URL = '_url';
export const COMBO = '_combo';
export const NAME = '_name';
export const SEARCH = '_search';
```

---

## Technology Stack

### Main Dependencies

#### Raycast API

- **`@raycast/api`**: `^1.96.0`
  - UI Components: `List`, `Form`, `ActionPanel`, `Action`
  - Utilities: `LocalStorage`, `open`, `showToast`, `showHUD`
  - Types: `Application`, `Toast`, `Icon`

#### Utilities

- **`@raycast/utils`**: `^1.17.0` - Additional Raycast utilities
- **`lodash`**: `^4.17.21` - Utility functions (mainly `merge`)
- **`raycast-toolkit`**: `^1.0.6` - Additional toolkit for Raycast
- **`run-applescript`**: `^6.0.0` - AppleScript execution for system dialogs

### Development Dependencies

- **TypeScript**: `^5.8.2` - Base language of the project
- **React**: `@types/react@19.0.10` - UI framework (included in Raycast)
- **ESLint**: `^9.22.0` - Linter with `@raycast/eslint-config` configuration
- **Prettier**: `^3.5.3` - Code formatter

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "lib": ["es2021", "dom"],
    "module": "commonjs",
    "target": "es2021",
    "strict": true,
    "jsx": "react-jsx",
    "resolveJsonModule": true
  }
}
```

### Folder Structure

```
src/
├── components/          # Reusable React components
├── controller/          # Controllers for system operations
├── helpers/             # Utility functions and business logic
├── hooks/               # Custom React hooks
├── models/              # Data model classes
├── services/            # Services (Storage, Finder, Feedback)
└── types/               # TypeScript type definitions
```

---

## Business Rules

### 1. Storage and Persistence

#### JSON Initialization

- **Rule**: If the JSON doesn't exist in `LocalStorage`, it's initialized with an empty object `{}`
- **Implementation**: `Storage.getItem('steppedRoutes', {})` returns `{}` if it doesn't exist
- **Location**: `src/services/storage.ts`

#### Data Writing

- **Rule**: Data is serialized to JSON with 2-space indentation
- **Implementation**: `objToJson(data, 2)` before saving to `LocalStorage`
- **Location**: `src/helpers/parser.ts`

#### Data Reading

- **Rule**: If the JSON is corrupted or `null`, the default value is returned
- **Implementation**: `jsonToObj((await LocalStorage.getItem(key)) ?? 'null') ?? defaultValue`
- **Location**: `src/services/storage.ts`

### 2. URL Validation

#### Structure Validation

- **Rule**: There's no strict URL format validation. Any string is accepted as a URL
- **Implementation**: Validation is performed implicitly when attempting to open the URL
- **Location**: No explicit validation in the code

#### Empty URL Handling

- **Rule**: If `url` is empty, an empty string `''` is returned
- **Implementation**: `mergeUrl('', query, wildcard)` returns `''`
- **Location**: `src/helpers/url.ts`

### 3. Step Path Construction

#### Path Format

- **Rule**: The path is constructed by splitting by spaces and reversing the order
- **Example**: `"ry docs"` → `["docs", "ry"]` → nested object `{ docs: { ry: {...} } }`
- **Implementation**: `path.split(' ').filter(Boolean).reverse()`
- **Location**: `src/helpers/steps.ts` → `buildStepPath()`

#### Step Merging

- **Rule**: When adding a new step, it's merged with the existing structure using `lodash.merge`
- **Behavior**: If a step with the same path exists, it's partially overwritten (deep merge)
- **Implementation**: `merge(stepsInfo, stepPath)`
- **Location**: `src/helpers/steps.ts` → `addStepToStorage()`

### 4. Search and Navigation

#### Query Separator

- **Rule**: The separator between route and query is configurable (default: `-`)
- **Example**: `"ry docs-api"` → route: `["ry", "docs"]`, query: `"api"`
- **Implementation**: `ev.split(preferences.querySeparators)`
- **Location**: `src/openSteppedLink.tsx`

#### Step Navigation

- **Rule**: Steps are navigated sequentially, extracting the next level in each iteration
- **Implementation**: `getFinalStep(routes, steps)` iterates over each step and navigates to the next level
- **Location**: `src/helpers/steps.ts`

#### Name Collection

- **Rule**: During navigation, names (`_name`) of each visited step are collected
- **Purpose**: Display breadcrumbs in the interface (`"GitHub › Raycast"`)
- **Implementation**: If a step has `_name`, it's added to `namesFound[]`
- **Location**: `src/helpers/steps.ts` → `getFinalStep()`

### 5. Wildcard Replacement in URLs

#### Configurable Wildcard

- **Rule**: The wildcard is configurable (default: `{{q}}`)
- **Implementation**: Replacement via global regex: `url.replace(new RegExp(queryWildcard, 'g'), query)`
- **Example**: `"https://google.com/search?q={{q}}"` + query `"test"` → `"https://google.com/search?q=test"`
- **Location**: `src/helpers/url.ts` → `mergeUrl()`

#### URL vs Search Priority

- **Rule**: If there's a `query` and `search` is configured, `search` is used. Otherwise, `url` is used
- **Implementation**: `mergeUrl((query && search) ?? url, query, wildcard)`
- **Location**: `src/components/StepActions.tsx`

### 6. Duplicate Handling

#### Duplicates in Merge

- **Rule**: There's no explicit duplicate validation. `lodash.merge` performs a deep merge
- **Behavior**: If a step with the same path is added, it merges with the existing one
- **Risk**: May overwrite properties if the exact same path is used
- **Location**: `src/helpers/steps.ts` → `addStepToStorage()`

### 7. Step Parsing

#### Sorting

- **Rule**: Steps are sorted alphabetically when parsing
- **Implementation**: `Object.entries(restSteps).sort().map(...)`
- **Location**: `src/helpers/steps.ts` → `parseSteps()`

#### Root Step Construction

- **Rule**: If an object has `_url`, `_search`, or `_name`, an additional "root step" is created
- **Purpose**: Allow direct access to the current step in addition to its sub-steps
- **Implementation**: `buildRootStep(_url, _search, _name)`
- **Location**: `src/helpers/steps.ts` → `parseSteps()`

### 8. Dynamic Icons

Icon logic follows this priority:

1. **String**: `Icon.Link`
2. **Array**: `Icon.Layers` (combo)
3. **Has sub-steps**: `Icon.Folder`
4. **Has `_search`**: `Icon.MagnifyingGlass`
5. **Has `_url`**: `Icon.Link`
6. **Default**: `Icon.Hashtag`

**Location**: `src/models/Step.ts` → `buildIcon()`

### 9. Export and Import

#### Export

- **Rule**: File is saved with format `stepped-links.YYYY-MM-DDTHH-mm-ss.config.json`
- **Implementation**: `currentDateISO()` generates timestamp in ISO format without colons
- **Location**: `src/exportStepsConfig.tsx`, `src/helpers/date.ts`

#### Import

- **Rule**: Completely replaces the content of `steppedRoutes` in `LocalStorage`
- **Validation**: If the file is empty or invalid, an error is shown
- **Location**: `src/importStepsConfig.tsx`

### 10. Error Handling

#### Toast Feedback

- **Rule**: All operations show feedback to the user via `Toast` or `HUD`
- **States**: `Animated` (processing), `Success` (success), `Failure` (error)
- **Location**: `src/services/feedback.ts`

#### File Handling

- **Rule**: If file reading/writing fails, an error toast is shown
- **Implementation**: Try-catch in `controller/finder.ts`
- **Location**: `src/controller/finder.ts`

---

## User Flows

### 1. Command: "Search stepped link" (`openSteppedLink`)

**Mode**: `view` (interactive interface)

**Flow**:

1. User opens the command from Raycast
2. JSON is loaded from `LocalStorage` and parsed into a list of steps
3. User types in the search bar with format: `"step1 step2-query"`
4. System separates route (`step1 step2`) and query (`query`) using the configured separator
5. Navigation through the JSON structure following the steps
6. List of available sub-steps at the current level is displayed
7. If there's a query, it's shown in context to replace wildcards
8. User selects a step and presses Enter
9. URL opens in the default browser (or the specified one)

**Components involved**:

- `openSteppedLink.tsx` (entry point)
- `useSteppedLinksSearch.ts` (search hook)
- `StepsList.tsx` (step list)
- `StepItem.tsx` (individual item)
- `StepActions.tsx` (actions on selection)

**Keyboard shortcuts**:

- `Cmd+C`: Copy URL to clipboard
- `Cmd+E`: Edit step
- `Opt+P`: Open preferences
- `Cmd+→`: Alternative browsers submenu

### 2. Command: "Create New Step" (`createStepForm`)

**Mode**: `view` (form)

**Flow**:

1. User opens the command
2. Form is displayed with fields:
   - **Path**: Step route (e.g., `"ry docs"`)
   - **Name**: Descriptive name (optional)
   - **Url**: Base URL (optional)
   - **Add search**: Checkbox to enable search
   - **Search**: URL with wildcard (if enabled)
3. User completes the form and presses `Cmd+Enter`
4. Nested route is constructed from the path
5. Merge is performed with the existing structure
6. Saved to `LocalStorage`
7. Confirmation toast is shown

**Validations**:

- Path is required (autoFocus)
- At least one of: Name, Url, or Search must be present

**Location**: `src/createStepForm.tsx`

### 3. Command: "Import Steps Config" (`importStepsConfig`)

**Mode**: `no-view` (script without UI)

**Flow**:

1. User executes the command
2. File selection dialog is shown (AppleScript)
3. User selects JSON file
4. File is read and parsed
5. `steppedRoutes` in `LocalStorage` is completely replaced
6. Confirmation HUD is shown

**Expected format**: Valid JSON with `StepJson` structure

**Location**: `src/importStepsConfig.tsx`

### 4. Command: "Export Steps Config" (`exportStepsConfig`)

**Mode**: `no-view` (script without UI)

**Flow**:

1. User executes the command
2. Folder selection dialog is shown (AppleScript)
3. User selects destination folder
4. `steppedRoutes` is read from `LocalStorage`
5. Filename with timestamp is generated
6. JSON file is saved in the selected folder
7. Confirmation HUD is shown

**File format**: `stepped-links.YYYY-MM-DDTHH-mm-ss.config.json`

**Location**: `src/exportStepsConfig.tsx`

### 5. Browser Bookmarks and Quick Links Import/Export Commands

**Status**: **Not implemented** (show error message)

- `importStepsConfigBrowserBookmarks`: ❌ Not implemented
- `exportStepsConfigBrowserBookmarks`: ❌ Not implemented
- `importStepsConfigQuickLinks`: ❌ Not implemented
- `exportStepsConfigQuickLinks`: ❌ Not implemented

**Location**: `src/importStepsConfigBrowserBookmarks.tsx`, etc.

### 6. Step Editing Flow

**Access**: From `StepActions` → `Cmd+E` or "Edit step" button

**Flow**:

1. User selects a step in the list
2. Presses `Cmd+E` or clicks "Edit step"
3. `CreateStepForm` opens with pre-filled data from the current step
4. User modifies the fields
5. On save, the route is reconstructed and merged

**Note**: Currently uses the same `CreateStepForm` component (no `EditStepForm` implemented)

---

## Code Conventions

### TypeScript

#### Configuration

- **Strict Mode**: Enabled
- **Target**: ES2021
- **Module**: CommonJS
- **JSX**: `react-jsx` (doesn't require importing React)

#### Naming Conventions

- **Files**: camelCase for components (`createStepForm.tsx`), kebab-case for types
- **Classes**: PascalCase (`Step`, `Storage`, `Finder`)
- **Functions**: camelCase (`getFinalStep`, `parseSteps`)
- **Constants**: UPPER_SNAKE_CASE (`URL`, `NAME`, `SEARCH`)
- **Interfaces/Types**: PascalCase with descriptive suffix (`StepTypes`, `StepInterface`)

#### Types and Interfaces

- **Location**: `src/types/` (files separated by domain)
- **Export**: Default export for main types, named exports for constants
- **Example**:

  ```typescript
  // types/Step.ts
  export interface StepTypes { ... }

  // types/Keys.ts
  export const URL = '_url';
  ```

### React Component Structure

#### Component Pattern

- **Functional Components**: All components are functions
- **Hooks**: Custom hooks in `src/hooks/` (e.g., `useSteppedLinksSearch`)
- **Props**: Typed with TypeScript interfaces

#### Typical Component Structure

```typescript
import type { StepTypes } from '../types/Step';
import { List } from '@raycast/api';

interface ComponentProps {
  steps: StepTypes[];
  // ...
}

export default function Component({ steps, ... }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

#### Separation of Concerns

- **Components**: Only presentation and UI events
- **Helpers**: Pure business logic (no Raycast dependencies)
- **Services**: Access to external APIs (LocalStorage, Finder, etc.)
- **Models**: Classes that encapsulate data and transformation logic

### Styling

- **No CSS**: Raycast uses default styled components
- **Icons**: Raycast system icons are used (`Icon.Link`, `Icon.Folder`, etc.)
- **Themes**: Automatically respects system theme (light/dark)

### State Management

#### Local State

- **React Hooks**: `useState`, `useEffect`, `useMemo`
- **Pattern**: Local state in components, implicit global state in `LocalStorage`

#### Persistence

- **Raycast LocalStorage**: Single source of truth for persistent data
- **Loading**: Loaded when components mount via hooks
- **Synchronization**: No real-time synchronization between Raycast instances

### Error Handling

#### Strategy

- **Try-Catch**: In critical async operations (file reading/writing)
- **Visual Feedback**: Always show toast or HUD to the user
- **Default Values**: Use default values instead of throwing errors

#### Example

```typescript
try {
  const fileInfo = await readFile(filePath);
  await Storage.setItem('steppedRoutes', fileInfo);
  showHUD('✅ Success');
} catch {
  showHUD('❌ Error');
}
```

### Imports and Organization

#### Import Order

1. TypeScript types (`import type ...`)
2. External dependencies (Raycast, lodash, etc.)
3. Relative imports (helpers, services, components)

#### Example

```typescript
import type { StepTypes } from '../types/Step';
import { List, Icon } from '@raycast/api';
import { merge } from 'lodash';
import Step from '../models/Step';
import Storage from '../services/storage';
```

### Comments and Documentation

- **Minimal comments**: Code is self-explanatory
- **Console.log**: Used for debugging (should be removed in production)
- **README**: Minimal, only project title

### User Preferences

#### Configuration

- **Location**: `package.json` → `preferences`
- **Access**: `getPreferenceValues<Preferences>()` from `@raycast/api`
- **Typing**: `Preferences` interface in `src/helpers/preferences.ts`

#### Available Preferences

1. **querySeparators**: Separator between route and query (default: `"-"`)
2. **queryWildcard**: Wildcard to replace in URLs (default: `"{{q}}"`)
3. **defaultBrowser**: Default browser (required, `appPicker`)
4. **defaultConfigApp**: App to edit config (optional, `appPicker`)

---

## Implementation Notes

### Pending Features

1. **Browser Bookmarks Import**: Not implemented
2. **Browser Bookmarks Export**: Not implemented
3. **Quick Links Import**: Not implemented
4. **Quick Links Export**: Not implemented
5. **Step Editing**: Uses the same creation form (no edit validation)

### Known Limitations

1. **URL Validation**: No URL format validation
2. **Duplicates**: No duplicate path prevention
3. **Full-Text Search**: Search only works by step names, not by content
4. **Synchronization**: No synchronization between multiple Raycast instances

### Suggested Future Improvements

1. Implement URL validation with regex or specialized library
2. Add duplicate detection and handling
3. Implement full-text search in names and URLs
4. Add step deletion functionality
5. Implement pending import/export commands

---

## Glossary of Terms

- **Step**: A node in the hierarchical link structure. Can be a URL, a combo, or a container of sub-steps.
- **Path**: Sequence of space-separated steps that defines the location in the hierarchy (e.g., `"gh ry"`).
- **Query**: Search text that replaces the wildcard in search URLs.
- **Wildcard**: Placeholder in search URLs (default: `{{q}}`) that gets replaced with the query.
- **Combo**: Array of URLs that open simultaneously (functionality not fully implemented).
- **Root Step**: Special step that represents the current level when it has `_url`, `_name`, or `_search` properties.
- **Stepped Route**: Complete route of steps from root to the current step.

---

**Last updated**: Automatically generated from source code analysis  
**Extension version**: Based on `package.json` v1.0.0  
**Raycast API**: v1.96.0
