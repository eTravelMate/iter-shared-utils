"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = void 0;
const requestContext_1 = require("./requestContext");
const uuid_1 = require("uuid");
const requestIdMiddleware = (req, res, next) => {
    const requestId = req.headers["x-request-id"] || (0, uuid_1.v4)();
    const endpoint = `${req.method} ${req.originalUrl}`;
    //pass both requestId + endpoint + callback
    requestContext_1.requestContext.run(requestId, endpoint, () => {
        res.setHeader("x-request-id", requestId);
        next();
    });
};
exports.requestIdMiddleware = requestIdMiddleware;
