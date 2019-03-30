import {Mongo} from 'meteor/mongo';
import {Tracker} from 'meteor/tracker';
import SimpleSchema from 'simpl-schema';


/*
UserID: Numerical
UserName: String
UserRole: (Nurse, Manager, Wound Care Specialist, Physician, Administrator )
UserDepartment: String
 */

export const dumydataDef = {
    name: "dumydata",
    icon: "users",
    title:"dumydata",

    schema: {
        name: {
            type: String,
            autoform: {}
        },

    },
    publicFields: {
        name:"Name",
    },
    actions:[],
};


class DumyDataCollection extends Mongo.Collection {};

export const dumydata = new DumyDataCollection(dumydataDef.name);

dumydata.schema = new SimpleSchema(dumydataDef.schema, {tracker: Tracker});
dumydata.attachSchema(dumydataDef.schema);
dumydata.def = dumydataDef;
