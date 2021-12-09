import { Request, Response } from 'express';

import {init_db, checkUserPassCombo, insertUserRecord,  close_db} from '../db/dbcommands';


//Removes potentially problematic characters from user input
function sanitize(textpassed: string){
	textpassed = textpassed.trim();
	textpassed = textpassed.replace(/[<>\/\\'"#;]/g, "");
	
	return textpassed;
}

//Check if a string has problematic characters (used for passwords)
function str_is_sanitized(strpassed : string){
	var invalid_chars = ["<", ">", "/", "\\", "'", '"', "#", ";"];
	
	for(var i = 0; i < invalid_chars.length; i++){
		if(strpassed.indexOf(invalid_chars[i]) > - 1){
			return false;
		}
	}
	
	return true;
}

//Gets a username and password in a POST request and checks the database to see if the entry exits
export async function check_user(request: Request, response: Response){
    var username_passed = request.body.username;
	username_passed = sanitize(username_passed);
	var password_passed = request.body.password;
	
	
	if(!str_is_sanitized(password_passed)){
		response.status(200).json({
			error: "password contains illegal characters"
		});
		return 0;
	}
	
	if(username_passed.length < 8 || password_passed.trim().length < 8){
		response.status(200).json({
			error: "username or password is too short"
		});
		return 0;
	}
	
	
	await init_db();
	var userCheck = await checkUserPassCombo(username_passed, password_passed);
	
    response.status(200).json({
        correct_combination: userCheck
    });
	
}

//Gets a username and password in a POST request and tries to create an entry with this data (if the username doesn't already exist)
export async function create_user(request: Request, response: Response){
    var username_passed = request.body.username;
	username_passed = sanitize(username_passed);
	var password_passed = request.body.password;
	if(!str_is_sanitized(password_passed)){
		response.status(200).json({
			error: "password contains illegal characters"
		});
		return 0;
	}
	
	if(username_passed.length < 8 || password_passed.trim().length < 8){
		response.status(200).json({
			error: "username or password is too short"
		});
		return 0;
	}
	
	await init_db();
	var userInsertCheck = await insertUserRecord(username_passed, password_passed);
	
	if(!userInsertCheck){
		response.status(200).json({
			error: "unable to add user"
		});
		return 0;
	}
	
    response.status(200).json({
        success: "added user",
		username: username_passed
    });
	
}
