"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sample_1 = require("./routes/sample");
const userroutes_1 = require("./routes/userroutes");
const uploadFile_1 = require("./routes/uploadFile");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//To handle POST data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', sample_1.debug);
app.post('/createUser', userroutes_1.create_user);
app.post('/checkUser', userroutes_1.check_user);
app.post('/uploadFile', uploadFile_1.uploadFile);
app.listen(3001);
