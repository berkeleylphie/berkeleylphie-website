// Fetches the member directory from Supabase once and shares it with every
// page that needs it, so Brothers/Alumni/Executive Board all read the same
// data instead of each querying independently.

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchMemberDirectory, type MemberDirectory } from './members';

const EMPTY_DIRECTORY: MemberDirectory = { brothers: [], alumni: [], cabinet: [], chairs: [] };

type MembersContextType = MemberDirectory & {
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function useMembers() {
  const context = useContext(MembersContext);
  if (!context) {
    throw new Error('useMembers must be used within MembersProvider');
  }
  return context;
}

export function MembersProvider({ children }: { children: ReactNode }) {
  const [directory, setDirectory] = useState<MemberDirectory>(EMPTY_DIRECTORY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetchMemberDirectory()
      .then((result) => {
        if (!cancelled) {
          setDirectory(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to load member directory', err);
          setError('Unable to load member data right now.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [refreshToken]);

  const refresh = () => setRefreshToken((token) => token + 1);

  return (
    <MembersContext.Provider value={{ ...directory, loading, error, refresh }}>
      {children}
    </MembersContext.Provider>
  );
}
