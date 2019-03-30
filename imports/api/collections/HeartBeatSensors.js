import {Mongo} from 'meteor/mongo';

/*
UserID: Numerical
UserName: String
UserRole: (Nurse, Manager, Wound Care Specialist, Physician, Administrator )
UserDepartment: String
 */

export const HeartbeatSensorDef = {
    name: "heartbeatSensor",
    icon: "users",
    title:"HeartbeatSensor",
    methods:{},
    publications:{},
    schema: {
        id: String,
        status:String,
        Reserved: Boolean,
    },
    publicFields: {
        id:"Sensor ID",
        status:"Status",
        reserved:"Reserved"
    },
    actions:[],
};


class HeartbeatSensorCollection extends Mongo.Collection {};

export const HeartbeatSensor = new HeartbeatSensorCollection(HeartbeatSensorDef.name);

HeartbeatSensor.def = HeartbeatSensorDef;
// HeartbeatSensor.resolveFields = function(key, value) {
//
//     if (key === "department") {
//         const HeartbeatSensor  =Departments[value];
//         return  HeartbeatSensor ?  HeartbeatSensor.label : value;
//     }
//     if (key === "role") {
//         const role  =HeartbeatSensorRoles[value];
//         return  role ?  role.label : value;
//     }
//     return value;
// };
