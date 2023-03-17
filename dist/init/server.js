"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initExpressServer = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const initExpressServer = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "*",
    }), 
    // necessary to handle incoming data
    express_1.default.urlencoded({ extended: true }), express_1.default.json());
    app.set("view engine", "ejs");
    app.set("views", path_1.default.join(__dirname, "../views"));
    // init routing
    app.use("/", routes_1.routes);
    // serve static images
    app.use(express_1.default.static("public"));
    // launch server
    let server = null;
    try {
        server = app.listen(process.env.SERVER_PORT, () => {
            console.log("Server is running on port " + process.env.SERVER_PORT);
        });
    }
    catch (error) {
        console.log("Unexpected Error while initializing server : " + error);
    }
    return server;
};
exports.initExpressServer = initExpressServer;
