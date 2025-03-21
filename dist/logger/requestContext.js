"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContext = void 0;
// request-context.ts
const async_hooks_1 = require("async_hooks");
const asyncLocalStorage = new async_hooks_1.AsyncLocalStorage();
exports.requestContext = {
    run: (requestId, serviceEndpoint, callback) => {
        asyncLocalStorage.run({ requestId, serviceEndpoint }, callback);
    },
    getRequestId: () => {
        const store = asyncLocalStorage.getStore();
        return store === null || store === void 0 ? void 0 : store.requestId;
    },
    getServiceEndpoint: () => {
        const store = asyncLocalStorage.getStore();
        return store === null || store === void 0 ? void 0 : store.serviceEndpoint;
    },
    setServiceEndpoint: (endpoint) => {
        const store = asyncLocalStorage.getStore();
        if (store) {
            store.serviceEndpoint = endpoint;
        }
    },
};
