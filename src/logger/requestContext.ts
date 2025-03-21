// request-context.ts
import { AsyncLocalStorage } from 'async_hooks';

interface RequestContextType {
  requestId: string;
  serviceEndpoint?: string;
}

const asyncLocalStorage = new AsyncLocalStorage<RequestContextType>();

export const requestContext = {
  run: (requestId: string, serviceEndpoint: string, callback: () => void) => {
    asyncLocalStorage.run({ requestId, serviceEndpoint }, callback);
  },
  getRequestId: (): string | undefined => {
    const store = asyncLocalStorage.getStore();
    return store?.requestId;
  },
  getServiceEndpoint: (): string | undefined => {
    const store = asyncLocalStorage.getStore();
    return store?.serviceEndpoint;
  },
  setServiceEndpoint: (endpoint: string) => {
    const store = asyncLocalStorage.getStore();
    if (store) {
      store.serviceEndpoint = endpoint;
    }
  },
};
