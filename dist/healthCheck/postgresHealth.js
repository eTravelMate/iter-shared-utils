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
exports.checkPostgresHealth = checkPostgresHealth;
const sequelize_1 = require("sequelize");
function checkPostgresHealth(DB_HOST, DB_USER, DB_NAME, DB_PASSWORD) {
    return __awaiter(this, void 0, void 0, function* () {
        const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
            host: DB_HOST,
            dialect: "postgres",
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });
        try {
            yield sequelize.query("select 1");
            return { status: 'SUCCESS',
                message: 'Postgres DB is UP and healthy ',
            };
        }
        catch (error) {
            return { status: "FAILURE",
                env: `${DB_HOST},${DB_USER}`,
                message: `Postgres DB is Down, error: ${error}`
            };
        }
    });
}
