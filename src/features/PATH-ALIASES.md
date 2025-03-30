# Path Aliases in the Project

This project uses path aliases to make imports cleaner and more maintainable. The following aliases are configured in `tsconfig.json`:

## Available Aliases

- `~/` - Points to the `src` directory
  ```typescript
  // Instead of
  import { Component } from '../~/components/ui/component';
  
  // Use
  import { Component } from '~/components/ui/component';
  ```

- `~/convex/` - Points to the `convex` directory
  ```typescript
  // Instead of
  import { api } from '../../../convex/_generated/api';
  
  // Use
  import { api } from '~/convex/_generated/api';
  ```

- `~/data/` - Points to the `data` directory
  ```typescript
  // Instead of
  import data from '../../../data/sample.json';
  
  // Use
  import data from '~/data/sample.json';
  ```

## Benefits

1. **Cleaner imports** - No more counting `../../../` to get to the root
2. **Maintainability** - Moving files doesn't break imports as often
3. **Readability** - Path aliases clearly indicate which part of the codebase you're importing from
4. **Consistency** - Standardized import patterns across the codebase

## Usage Guidelines

- Always use path aliases for imports that go beyond one or two parent directories
- For imports within the same feature, use relative imports:
  ```typescript
  // Within the same feature, use relative imports
  import { useFeatureHook } from './hooks';
  import { FeatureComponent } from './components';
  ```
- For imports from other features or shared modules, use path aliases:
  ```typescript
  // Importing from another feature or shared module
  import { SharedUtil } from '~/utils/shared';
  import { GuideComponent } from '~/features/guides';
  ```

## Configuration

The aliases are configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"],
      "~/convex/*": ["./convex/*"],
      "~/data/*": ["./data/*"]
    }
  }
}
``` 