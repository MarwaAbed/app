import {Mongo} from 'meteor/mongo';

/*
UserID: Numerical
UserName: String
UserRole: (Nurse, Manager, Wound Care Specialist, Physician, Administrator )
UserDepartment: String
 */

export const EmergencyListDef = {
    name: "emergencyList",
    icon: "users",
    title:"Emergency List",
    methods:{},
    publications:{},
    schema: {
        name: String,
        list:[]
    },
    publicFields: {
        name:"Category Name",
        list:"Emergency List"
    },
    actions:[],
};


class EmergencyListCollection extends Mongo.Collection {};

export const EmergencyList = new EmergencyListCollection(EmergencyListDef.name);

EmergencyList.def = EmergencyListDef;
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
