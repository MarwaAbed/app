import {Mongo} from 'meteor/mongo';

/*
UserID: Numerical
UserName: String
UserRole: (Nurse, Manager, Wound Care Specialist, Physician, Administrator )
UserDepartment: String
 */

export const PatientDef = {
    name: "patient",
    icon: "users",
    title:"patient",
    methods:{},
    publications:{},
    schema: {
        name: String,
        username:String,
        email: String,
        phone:String,
        address:String,
        primaryDoctor:{
          id:String,
          name:String
        },
        secondaryStaff:{
          id:String,
          name:String
        },
        contact:{
          id:String,
          name:String
        },
        sensor:{
          id:String,
          _id:String
        }
    },
    publicFields: {
        name:"Name",
        username:"Username",
        email:"Email",
        phone:"Phone",
        address:"Address",
        primaryDoctor:"Primary Doctor",
        secondaryStaff:"Secondary Staff",
        contact:"Contact Person",
        sensor:"Hearbeat Sensor"
    },
    actions:[],
};


class PatientCollection extends Mongo.Collection {};

export const Patient = new PatientCollection(PatientDef.name);

Patient.def = PatientDef;
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
