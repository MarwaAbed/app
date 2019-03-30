import {Mongo} from 'meteor/mongo';

/*
UserID: Numerical
UserName: String
UserRole: (Nurse, Manager, Wound Care Specialist, Physician, Administrator )
UserDepartment: String
 */

export const ContactDef = {
    name: "contact",
    icon: "users",
    title:"Contact",
    methods:{},
    publications:{},
    schema: {
        name: String,
        username:String,
        email: String,
        relation:String,
        phone:String,
        address:String
    },
    publicFields: {
        name:"Name",
        username:"Username",
        email:"Email",
        relation:"Relation",
        phone:"Phone",
        address:"Address"
    },
    actions:[],
};


class ContactCollection extends Mongo.Collection {};

export const Contact = new ContactCollection(ContactDef.name);

Contact.def = ContactDef;
// Staff.resolveFields = function(key, value) {
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
