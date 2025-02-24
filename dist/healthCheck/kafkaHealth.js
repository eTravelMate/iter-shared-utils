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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKafkaHealth = checkKafkaHealth;
const kafkajs_1 = require("kafkajs");
function checkKafkaHealth(clientId, brokers) {
    return __awaiter(this, void 0, void 0, function* () {
        const kafka = new kafkajs_1.Kafka({ clientId, brokers });
        const admin = kafka.admin();
        try {
            yield admin.connect();
            console.log("Kafka connected");
            yield admin.disconnect();
            return { status: "SUCCESS",
                message: "Kafka is up and running..",
            };
        }
        catch (error) {
            return { status: "Failure",
                env: `${clientId},${brokers}`,
                message: `Kafka is down, error: ${error}`,
            };
        }
    });
}
