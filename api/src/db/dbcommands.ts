



declare global {
	export var dbobj: any;
	var MongoClient: any;
	var url: string;
}


//Starts up database connection
export async function init_db(){
	
	globalThis.url = "mongodb://localhost:27017/";
	globalThis.MongoClient= require('mongodb').MongoClient;
	
	var mongoConnection: any;
	try{
		mongoConnection = await globalThis.MongoClient.connect(globalThis.url);
	}
	catch(error: any){
		return error;
	}
	globalThis.dbobj = mongoConnection.db("test_database");
	
	await create_user_col();
	//console.log("init finished");
}

//Creates the users collection if it doesn't already exist
async function create_user_col(){
	console.log("starting user creation");
	try{
		var createResult = await globalThis.dbobj.createCollection("users");
	}
	catch(error:any){
		console.log(error.codeName); //Should be NamespaceExists, means users collection already exists
	}
	
}


//Tries to insert a username/password pair record into the database
export async function insertUserRecord(usernamePassed: string, passwordPassed: string){
	var userRecord = {"username": usernamePassed, "password": passwordPassed};
	var doesUserExist = await checkUserAlreadyExists(usernamePassed);
	if(doesUserExist){
		return false;
	}
	try{
		globalThis.dbobj.collection("users").insertOne(userRecord);
	}
	catch(error: any){
		return false;
	}
	
	return true;

	
}

//Checks if a username already exists in the database
export async function checkUserAlreadyExists(usernamePassed: string){
	var userRecord = {"username": usernamePassed};
	var userDataArr = await globalThis.dbobj.collection("users").find(userRecord).toArray();

	return userDataArr.length > 0; //True if username/combo exists, false otherwise
	
}

//Checks if a username/password combo exists (later will be used for authentication)
export async function checkUserPassCombo(usernamePassed: string, passwordPassed: string){
	var userRecord = {"username": usernamePassed, "password": passwordPassed};
	
	var userDataArr = await globalThis.dbobj.collection("users").find(userRecord).toArray();

	return userDataArr.length > 0; //True if username/combo exists, false otherwise
	
}

//Close db connection
export async function close_db(){
	
	globalThis.MongoClient.close();
	console.log("Closing MongoClient");
}