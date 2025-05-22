# Loaders

This directory contains reusable loader components.

## TerminalLoader

A terminal-style loader component that displays a loading animation with customizable status text.

### Usage

```tsx
import { TerminalLoader } from '@/components/loaders';

// Basic usage
<TerminalLoader />

// With custom status
<TerminalLoader status="Processing..." />
```

### Props

| Prop   | Type   | Default  | Description                                |
| ------ | ------ | -------- | ------------------------------------------ |
| status | string | 'status' | The text to display in the terminal header |

### Example

```tsx
import { TerminalLoader } from '@/components/loaders';

function LoadingPage() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <TerminalLoader status='Loading data...' />
    </div>
  );
}
```
