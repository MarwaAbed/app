import {Mongo} from 'meteor/mongo';

/*
UserID: Numerical
UserName: String
UserRole: (Nurse, Manager, Wound Care Specialist, Physician, Administrator )
UserDepartment: String
 */

export const StaffDef = {
    name: "staff",
    icon: "users",
    title:"Staff",
    methods:{},
    publications:{},
    schema: {
        name: String,
        username:String,
        email: String
    },
    publicFields: {
        name:"Name",
        username:"Username",
        email:"Email"
    },
    actions:[],
};


class StaffCollection extends Mongo.Collection {};

export const Staff = new StaffCollection(StaffDef.name);

Staff.def = StaffDef;
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
