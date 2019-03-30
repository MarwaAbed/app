import {Mongo} from 'meteor/mongo';
import {Tracker} from 'meteor/tracker';
// import SimpleSchema from 'simpl-schema';

/*
UserID: Numerical
UserName: String
UserRole: (Nurse, Manager, Wound Care Specialist, Physician, Administrator )
UserDepartment: String
 */

export const MessageDef = {
    name: "message",
    icon: "users",
    title:"Message",
    methods:{},
    publications:{},
    schema: {
        text: String,
        from:String,
        to: String,
        dateTime: String
    },
    publicFields: {
        text:"Message Text",
        from:"From",
        to:"To",
        datet:"Message ",
    },
    actions:[],
};


class MessageCollection extends Mongo.Collection {};

export const Message = new MessageCollection(MessageDef.name);

//
// Message.schema = new SimpleSchema(MessageDef.schema, {tracker: Tracker});
// Message.attachSchema(MessageDef.schema);
// Message.def = MessageDef;
// Message.resolveFields = function(key, value) {
//
//     if (key === "department") {
//         const staff  =Departments[value];
//         return  staff ?  staff.label : value;
//     }
//     if (key === "role") {
//         const role  =StaffRoles[value];
//         return  role ?  role.label : value;
//     }
//     return value;
// };
