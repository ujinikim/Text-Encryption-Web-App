"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const aes_1 = require("./aes");
const admin = __importStar(require("firebase-admin"));
const serviceAccount = __importStar(require("./key_id.json"));
const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const storageRef = firebaseAdmin.storage().bucket(`gs://cs4389-security.appspot.com`);
function uploadFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads');
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });
        const upload = (0, multer_1.default)({ storage }).single('toBeEncryptedFile');
        upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
            else {
                // File is saved in uploads folder
                if (!((_a = req.file) === null || _a === void 0 ? void 0 : _a.path)) {
                    console.log('No file was uploaded');
                    res.status(500).send('No file was uploaded');
                    return;
                }
                if (!req.body.userId) {
                    console.log('No user id was provided');
                    res.status(500).send('No user id was provided');
                    return;
                }
                if ((0, aes_1.encryptFile)(req.file.path, req.body.key) === true) {
                    if ((yield uploadToFirebase(req.file.path, req.body.userId)) === true) {
                        console.log('Successfully uploaded to Firebase');
                        res.status(200).send('File encrypted and uploaded successfully');
                        // remove file from uploads folder
                        fs_1.default.unlink(req.file.path, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        return;
                    }
                    else {
                        console.log('Failed to upload to Firebase');
                        res.status(500).send("Error uploading to Firebase");
                        return;
                    }
                }
                else {
                    console.log('Failed to encrypt file');
                    res.status(500).send("Error encrypting file");
                    return;
                }
            }
        }));
    });
}
exports.uploadFile = uploadFile;
// Return true or false if the file was uploaded successfully
function uploadToFirebase(filePath, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Upload the File
        let uploaded;
        const path = `${userId}/${filePath.replace(/uploads[\/\\]/i, "")}`;
        const storage = yield storageRef.upload(filePath, {
            public: true,
            metadata: {
                contentType: 'application/octet-stream'
            },
            destination: path
        }).then((result) => {
            uploaded = true;
        })
            .catch((err) => {
            console.log(err);
            uploaded = false;
        });
        return uploaded;
    });
}
