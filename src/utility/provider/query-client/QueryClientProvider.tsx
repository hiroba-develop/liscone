import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactNode } from 'react';

interface QueryClientProviderProps {
  children: ReactNode;
}

const localStoragePersister = createSyncStoragePersister({ storage: localStorage });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      // 24 hours
      // cacheTime: 1000 * 60 * 60 * 24, 
      // TODO 배포 할때 변경 true로..
      // enabled: false,
    },
  },
    
});

const QueryClientProvider = (props: QueryClientProviderProps) => {
  const { children } = props;
  return (
    <PersistQueryClientProvider 
      client={queryClient} 
      persistOptions={{
        persister: localStoragePersister,
      }}>
      {children}
    </PersistQueryClientProvider>
  );
};

export { queryClient, QueryClientProvider };
