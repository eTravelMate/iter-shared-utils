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
exports.checkMongodbHealth = checkMongodbHealth;
const mongoose_1 = __importDefault(require("mongoose"));
function checkMongodbHealth(MONGO_URL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (mongoose_1.default.connection.readyState !== 1) {
                yield mongoose_1.default.connect(MONGO_URL);
            }
            if (mongoose_1.default.connection.readyState == 1) {
                return {
                    status: "SUCCESS",
                    message: "MongoDB is connected and healthy....",
                };
            }
            else {
                return {
                    status: "FAILURE",
                    env: `URL: ${MONGO_URL}`,
                    message: "MongoDB is not connected",
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
