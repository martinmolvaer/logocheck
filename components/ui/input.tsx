import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  if (type === 'file') {
    return (
      <label
        className={cn(
          'relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-input bg-transparent px-4 py-6 text-center text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 focus-within:border-primary focus-within:bg-primary/5',
          className
        )}
      >
        <input
          type="file"
          data-slot="input"
          className="absolute inset-0 h-full w-full opacity-0"
          {...props}
        />
        <span>📁</span>
        <span>Click or drag and drop to upload file</span>
      </label>
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input };
