export declare const requestContext: {
    run: (requestId: string, serviceEndpoint: string, callback: () => void) => void;
    getRequestId: () => string | undefined;
    getServiceEndpoint: () => string | undefined;
    setServiceEndpoint: (endpoint: string) => void;
};
