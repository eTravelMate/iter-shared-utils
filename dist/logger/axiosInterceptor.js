"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachRequestIdInterceptor = void 0;
// axiosInterceptor.ts
const axios_1 = __importDefault(require("axios"));
const requestContext_1 = require("./requestContext");
// Global Axios interceptor
const attachRequestIdInterceptor = () => {
    axios_1.default.interceptors.request.use((config) => {
        var _a;
        const requestId = requestContext_1.requestContext.getRequestId();
        const outboundUrl = `${(_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ${config.url}`;
        if (requestId && config.headers) {
            config.headers.set("x-request-id", requestId);
        }
        // Temporarily override the context with outbound service call info
        requestContext_1.requestContext.setServiceEndpoint(outboundUrl);
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};
exports.attachRequestIdInterceptor = attachRequestIdInterceptor;
