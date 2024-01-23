"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const { DB_URI } = process.env;
if (typeof DB_URI === "string") {
    mongoose_1.default
        .connect(DB_URI)
        .then(() => {
        app_1.default.listen(3000);
        console.log("Database connection successful");
    })
        .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
}
//# sourceMappingURL=server.js.map