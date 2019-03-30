import {Mongo} from 'meteor/mongo';

/*
UserID: Numerical
UserName: String
UserRole: (Nurse, Manager, Wound Care Specialist, Physician, Administrator )
UserDepartment: String
 */

export const DoctorDef = {
    name: "doctor",
    icon: "users",
    title:"Doctor",
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


class DoctorCollection extends Mongo.Collection {};

export const Doctor = new DoctorCollection(DoctorDef.name);

Doctor.def = DoctorDef;
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
