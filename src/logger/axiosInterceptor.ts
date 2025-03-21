// axiosInterceptor.ts
import axios, { InternalAxiosRequestConfig } from "axios";
import { requestContext } from "./requestContext";

// Global Axios interceptor
export const attachRequestIdInterceptor = () => {
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const requestId = requestContext.getRequestId();
      const outboundUrl = `${config.method?.toUpperCase()} ${config.url}`;

      if (requestId && config.headers) {
        config.headers.set("x-request-id", requestId);
      }

      // Temporarily override the context with outbound service call info
      requestContext.setServiceEndpoint(outboundUrl);

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
