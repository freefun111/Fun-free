'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export class ChunkLoadErrorHandler extends React.Component<
  { children: React.ReactNode },
  { isChunkLoadError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { isChunkLoadError: false };
  }

  static getDerivedStateFromError(error: Error) {
    const isChunkLoadError = error.name === 'ChunkLoadError' || /Loading chunk .* failed/i.test(error.message);
    if (isChunkLoadError) {
      return { isChunkLoadError: true };
    }
    // For other errors, let them be handled by Next.js's default error boundaries
    throw error;
  }

  componentDidUpdate() {
    if (this.state.isChunkLoadError) {
      // Once we've rendered the fallback, perform the reload.
      window.location.reload();
    }
  }

  render() {
    if (this.state.isChunkLoadError) {
      // Render a fallback UI while we reload. This prevents the app from crashing
      // and provides a visual cue that something is happening.
      return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="animate-spin size-8 text-primary" />
            <p className="text-muted-foreground">Updating application...</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
