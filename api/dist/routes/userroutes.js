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
exports.create_user = exports.check_user = void 0;
const dbcommands_1 = require("../db/dbcommands");
//Removes potentially problematic characters from user input
function sanitize(textpassed) {
    textpassed = textpassed.trim();
    textpassed = textpassed.replace(/[<>\/\\'"#;]/g, "");
    return textpassed;
}
//Check if a string has problematic characters (used for passwords)
function str_is_sanitized(strpassed) {
    var invalid_chars = ["<", ">", "/", "\\", "'", '"', "#", ";"];
    for (var i = 0; i < invalid_chars.length; i++) {
        if (strpassed.indexOf(invalid_chars[i]) > -1) {
            return false;
        }
    }
    return true;
}
//Gets a username and password in a POST request and checks the database to see if the entry exits
function check_user(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var username_passed = request.body.username;
        username_passed = sanitize(username_passed);
        var password_passed = request.body.password;
        if (!str_is_sanitized(password_passed)) {
            response.status(200).json({
                error: "password contains illegal characters"
            });
            return 0;
        }
        if (username_passed.length < 8 || password_passed.trim().length < 8) {
            response.status(200).json({
                error: "username or password is too short"
            });
            return 0;
        }
        yield (0, dbcommands_1.init_db)();
        var userCheck = yield (0, dbcommands_1.checkUserPassCombo)(username_passed, password_passed);
        response.status(200).json({
            correct_combination: userCheck
        });
    });
}
exports.check_user = check_user;
//Gets a username and password in a POST request and tries to create an entry with this data (if the username doesn't already exist)
function create_user(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        var username_passed = request.body.username;
        username_passed = sanitize(username_passed);
        var password_passed = request.body.password;
        if (!str_is_sanitized(password_passed)) {
            response.status(200).json({
                error: "password contains illegal characters"
            });
            return 0;
        }
        if (username_passed.length < 8 || password_passed.trim().length < 8) {
            response.status(200).json({
                error: "username or password is too short"
            });
            return 0;
        }
        yield (0, dbcommands_1.init_db)();
        var userInsertCheck = yield (0, dbcommands_1.insertUserRecord)(username_passed, password_passed);
        if (!userInsertCheck) {
            response.status(200).json({
                error: "unable to add user"
            });
            return 0;
        }
        response.status(200).json({
            success: "added user",
            username: username_passed
        });
    });
}
exports.create_user = create_user;
