// Shared loading/error placeholder for pages that render data from
// useMembers() (Brothers, Alumni, Executive Board). Renders nothing once
// data has loaded successfully — callers render their own grid in that case.

import { Loader2 } from 'lucide-react';

export function DirectoryStatus({ loading, error }: { loading: boolean; error: string | null }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-off-white animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-muted">{error}</p>
      </div>
    );
  }

  return null;
}
