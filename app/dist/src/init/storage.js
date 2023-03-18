"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDishImage = exports.initStorage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const multer_1 = __importDefault(require("multer"));
const initStorage = () => {
    return new client_s3_1.S3Client({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        },
        region: process.env.AWS_BUCKET_REGION,
    });
};
exports.initStorage = initStorage;
const uploadDishImage = () => {
    const storage = multer_1.default.memoryStorage();
    return (0, multer_1.default)({ storage: storage }).single("image");
};
exports.uploadDishImage = uploadDishImage;
