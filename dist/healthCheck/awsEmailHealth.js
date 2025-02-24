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
exports.checkSESHealth = checkSESHealth;
const client_ses_1 = require("@aws-sdk/client-ses");
function checkSESHealth(EMAIL_PROVIDER_BUCKET_REGION, EMAIL_PROVIDER_ACCESS_KEY_ID, EMAIL_PROVIDER_SECRET_ACCESS_KEY) {
    return __awaiter(this, void 0, void 0, function* () {
        const sesClient = new client_ses_1.SESClient({
            region: EMAIL_PROVIDER_BUCKET_REGION,
            credentials: {
                accessKeyId: EMAIL_PROVIDER_ACCESS_KEY_ID || "",
                secretAccessKey: EMAIL_PROVIDER_SECRET_ACCESS_KEY || "",
            },
        });
        try {
            const sesCommand = new client_ses_1.GetSendQuotaCommand({});
            const res = yield sesClient.send(sesCommand);
            if (res) {
                return { status: "SUCCESS",
                    message: "SES is healthy" };
            }
        }
        catch (error) {
            return {
                status: "Failure",
                env: `Region:${EMAIL_PROVIDER_BUCKET_REGION},ACCESS_KEY:${EMAIL_PROVIDER_ACCESS_KEY_ID}, SECRET_KEY:${EMAIL_PROVIDER_SECRET_ACCESS_KEY}`,
                message: `SES is unhealthy ,error:${error}`,
            };
        }
    });
}
