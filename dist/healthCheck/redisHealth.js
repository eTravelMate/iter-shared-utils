"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRedisHealth = checkRedisHealth;
const ioredis_1 = __importDefault(require("ioredis"));
function checkRedisHealth(REDIS_HOST, REDIS_PORT, REDIS_PASSWORD) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new ioredis_1.default(Object.assign({ host: REDIS_HOST, port: Number(REDIS_PORT) }, (REDIS_PASSWORD && { password: REDIS_PASSWORD })));
        try {
            if (client.status == "close") {
                yield client.connect();
            }
            yield client.ping();
            return { status: 'SUCCESS',
                message: 'Redis is up and running'
            };
        }
        catch (error) {
            return { status: "FAILURE",
                env: `${REDIS_HOST},${REDIS_PORT}`,
                message: `Redis is down.. error: ${error}`
            };
        }
    });
}
