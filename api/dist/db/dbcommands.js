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
exports.close_db = exports.checkUserPassCombo = exports.checkUserAlreadyExists = exports.insertUserRecord = exports.init_db = void 0;
//Starts up database connection
function init_db() {
    return __awaiter(this, void 0, void 0, function* () {
        globalThis.url = "mongodb://localhost:27017/";
        globalThis.MongoClient = require('mongodb').MongoClient;
        var mongoConnection;
        try {
            mongoConnection = yield globalThis.MongoClient.connect(globalThis.url);
        }
        catch (error) {
            return error;
        }
        globalThis.dbobj = mongoConnection.db("test_database");
        yield create_user_col();
        //console.log("init finished");
    });
}
exports.init_db = init_db;
//Creates the users collection if it doesn't already exist
function create_user_col() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("starting user creation");
        try {
            var createResult = yield globalThis.dbobj.createCollection("users");
        }
        catch (error) {
            console.log(error.codeName); //Should be NamespaceExists, means users collection already exists
        }
    });
}
//Tries to insert a username/password pair record into the database
function insertUserRecord(usernamePassed, passwordPassed) {
    return __awaiter(this, void 0, void 0, function* () {
        var userRecord = { "username": usernamePassed, "password": passwordPassed };
        var doesUserExist = yield checkUserAlreadyExists(usernamePassed);
        if (doesUserExist) {
            return false;
        }
        try {
            globalThis.dbobj.collection("users").insertOne(userRecord);
        }
        catch (error) {
            return false;
        }
        return true;
    });
}
exports.insertUserRecord = insertUserRecord;
//Checks if a username already exists in the database
function checkUserAlreadyExists(usernamePassed) {
    return __awaiter(this, void 0, void 0, function* () {
        var userRecord = { "username": usernamePassed };
        var userDataArr = yield globalThis.dbobj.collection("users").find(userRecord).toArray();
        return userDataArr.length > 0; //True if username/combo exists, false otherwise
    });
}
exports.checkUserAlreadyExists = checkUserAlreadyExists;
//Checks if a username/password combo exists (later will be used for authentication)
function checkUserPassCombo(usernamePassed, passwordPassed) {
    return __awaiter(this, void 0, void 0, function* () {
        var userRecord = { "username": usernamePassed, "password": passwordPassed };
        var userDataArr = yield globalThis.dbobj.collection("users").find(userRecord).toArray();
        return userDataArr.length > 0; //True if username/combo exists, false otherwise
    });
}
exports.checkUserPassCombo = checkUserPassCombo;
//Close db connection
function close_db() {
    return __awaiter(this, void 0, void 0, function* () {
        globalThis.MongoClient.close();
        console.log("Closing MongoClient");
    });
}
exports.close_db = close_db;
