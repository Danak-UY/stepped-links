# Stepped Links

A powerful Raycast extension for managing and quickly accessing links organized in a hierarchical structure using a "steps" system. Navigate through your bookmarks and links with a simple, space-separated syntax.

## Features

- 🗂️ **Hierarchical Organization**: Organize links in nested tree structures
- 🔍 **Quick Search**: Navigate through steps using space-separated paths
- 🔎 **Dynamic Search URLs**: Configure search URLs with wildcards for dynamic queries
- 💾 **Local Storage**: All data stored locally in Raycast's LocalStorage
- 📤 **Import/Export**: Backup and restore your link configurations as JSON
- ⚡ **Fast Access**: Open links directly from Raycast with keyboard shortcuts
- 🎨 **Smart Icons**: Automatic icon selection based on step type

## Installation

1. Open Raycast
2. Go to Extensions → Create Extension
3. Or install from the Raycast Store (if published)
4. Configure your default browser in extension preferences

## Quick Start

### Creating Your First Step

1. Open Raycast and run **"Create New Step"**
2. Fill in the form:
   - **Path**: `gh` (the step identifier)
   - **Name**: `GitHub` (display name)
   - **Url**: `https://github.com`
3. Press `Cmd+Enter` to save

### Searching and Opening Links

1. Open Raycast and run **"Search stepped link"**
2. Type your step path: `gh`
3. Press Enter to open the link

### Nested Steps Example

Create a nested structure:

- **Path**: `gh raycast`
- **Name**: `Raycast on GitHub`
- **Url**: `https://github.com/raycast`

Then search with: `gh raycast`

### Using Search Queries

1. Configure a step with a search URL:
   - **Path**: `gg`
   - **Url**: `https://google.com`
   - **Search**: `https://google.com/search?q={{q}}`
2. Search with: `gg-typescript` (where `-` is the separator and `typescript` is the query)
3. The wildcard `{{q}}` will be replaced with `typescript`

## Commands

### Search stepped link

Main command to search and open links. Type step paths separated by spaces, optionally followed by a query.

**Usage**: `step1 step2-query`

### Create New Step

Form to create new steps with path, name, URL, and optional search configuration.

### Import Steps Config

Import a JSON file to replace your current link configuration.

### Export Steps Config

Export your current link configuration to a JSON file with timestamp.

### Import/Export Browser Bookmarks

⚠️ **Not yet implemented** - Coming soon

### Import/Export Quick Links

⚠️ **Not yet implemented** - Coming soon

## Configuration

Access preferences via `Cmd+,` or `Opt+P` in any command:

- **Separators**: Character to separate route from query (default: `-`)
- **Query wildcard**: Placeholder in search URLs (default: `{{q}}`)
- **Default browser**: Required - Browser to open links
- **Default config app**: Optional - App to edit config files

## Data Structure

Your links are stored as a nested JSON structure. Here's an example:

```json
{
  "gh": {
    "_name": "GitHub",
    "_url": "https://github.com",
    "_search": "https://github.com/search?q={{q}}",
    "raycast": {
      "_name": "Raycast",
      "_url": "https://github.com/raycast"
    }
  },
  "ry": {
    "_name": "Raycast",
    "_url": "https://raycast.io/"
  }
}
```

### Special Properties

- **`_url`**: Direct URL to open when step is selected
- **`_name`**: Display name shown in the interface
- **`_search`**: Search URL with wildcard support

### Step Types

1. **String**: Direct URL

   ```json
   "docs": "https://example.com/docs"
   ```

2. **Array**: Multiple URLs (combo - not fully implemented)

   ```json
   "combo": ["url1", "url2"]
   ```

3. **Object**: Nested sub-steps
   ```json
   "parent": {
     "_name": "Parent",
     "child": {
       "_name": "Child",
       "_url": "https://example.com"
     }
   }
   ```

## Usage Examples

### Example 1: Simple Link

```
Path: docs
Name: Documentation
Url: https://docs.example.com
```

Search: `docs`

### Example 2: Nested Structure

```
Path: work projects
Name: Work Projects
Url: https://work.example.com/projects
```

Search: `work projects`

### Example 3: With Search

```
Path: google
Name: Google
Url: https://google.com
Search: https://google.com/search?q={{q}}
```

Search: `google-typescript` → Opens `https://google.com/search?q=typescript`

### Example 4: Deep Nesting

```
Path: dev tools editor
Name: Code Editor
Url: https://code.example.com
```

Search: `dev tools editor`

## Keyboard Shortcuts

When viewing a step in the search results:

- `Enter`: Open link in default browser
- `Cmd+C`: Copy URL to clipboard
- `Cmd+E`: Edit step
- `Opt+P`: Open preferences
- `Cmd+→`: Open in alternative browser (submenu)

## Development

### Prerequisites

- Node.js
- Raycast CLI
- TypeScript

### Setup

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build for production
pnpm build

# Lint code
pnpm lint

# Fix linting issues
pnpm fix-lint
```

### Project Structure

```
src/
├── components/     # React components
├── controller/     # System operations
├── helpers/        # Utility functions
├── hooks/          # Custom React hooks
├── models/         # Data models
├── services/       # Services (Storage, Finder, Feedback)
└── types/          # TypeScript definitions
```

### Tech Stack

- **Raycast API**: v1.96.0
- **React**: UI framework
- **TypeScript**: Type safety
- **Lodash**: Utility functions

## Troubleshooting

### Links not opening

- Check that your default browser is configured in preferences
- Verify the URL format is correct

### Steps not appearing

- Ensure the step path matches exactly (case-sensitive)
- Check that the step was saved successfully

### Import/Export not working

- Ensure you have file system permissions
- Verify the JSON file is valid

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) file for details

## Author

**Danak-MeLi**

---

For detailed technical documentation, see [spec_extension_links.md](./spec_extension_links.md)
