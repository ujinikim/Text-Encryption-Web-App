"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = void 0;
const debug = (request, response) => {
    console.log("Hello World");
    response.status(200).json({
        message: "Hello World",
    });
};
exports.debug = debug;
