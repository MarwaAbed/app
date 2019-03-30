import {Message} from '../../api/collections/Messages.js'

import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
//Message.remove({})

Meteor.startup(()=> {
	const users = Meteor.users.find();
	
	if(Meteor.users.find().count()===0)
	{

    const userObj = {
        username: "admin",
        password: "admin",
        profile: {
            name: "admin",
            role: "admin",
        }
    };
    
    const userId = Accounts.createUser(userObj);
    if (!userId)
    console("{error:\"error can't create this user \"}");
    //throw new Error();
    console.log("create user:", userId);
	}
 });
