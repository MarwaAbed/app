import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import {Staff}  from '../../collections/Staff.js'
import {Patient}  from '../../collections/Patient.js'
import {Contact}  from '../../collections/Contact.js'
import {Doctor}  from '../../collections/Doctor.js'

const methods = {};

const createStaff = function (staffMember) {
    const userObj = {
        username: staffMember.username,
        password: staffMember.password,
        profile: {
            name: staffMember.name,
            role: "staff",
        }
    };
    console.log("in create staff")
    const userId = Accounts.createUser(userObj);
    if (!userId)
    return {error:"error can't create this user "}
    //throw new Error();
    console.log("create user:", userId);
    delete staffMember.password;
    const staffId = Staff.insert(staffMember);
    if (!staffId)
    return {error: "error, user created but creat staff crashed "}
    //throw new Error();
    console.log("create staff:", staffId);

    const user = Meteor.users.findOne(userId);
    const updatedProfile = user.profile;
    updatedProfile.id = staffId;
    Meteor.users.update(userId, {$set: {profile:updatedProfile}});
    return {error:null,success:true}

};
methods["createStaff"] =(userObj) => { return createStaff(userObj) };

const createDoctor = function (doctor) {
    const userObj = {
        username: doctor.username,
        password: doctor.password,
        profile: {
            name: doctor.name,
            role: "doctor",
        }
    };
    const userId = Accounts.createUser(userObj);
    if (!userId)
    return {error:"error can't create this user "}
    //throw new Error();
    console.log("create user:", userId);
    const doctorId = Doctor.insert(doctor);
    if (!doctorId)
    return {error: "error, user created but creat doctor crashed "}
    //throw new Error();
    console.log("create Doctor:", doctorId);

    const user = Meteor.users.findOne(userId);
    const updatedProfile = user.profile;
    updatedProfile.id = doctorId;
    Meteor.users.update(userId, {$set: {profile:updatedProfile}});
    return {error:null,success:true}

};
methods["createDoctor"] =(userObj) => { return createDoctor(userObj) };

const createPatient = function (patient) {
    const userObj = {
        username: patient.username,
        password: patient.password,
        profile: {
            name: patient.name,
            role: "patient",
        }
    };
    const userId = Accounts.createUser(userObj);
    if (!userId)
    return {error:"error can't create this user "}
    //throw new Error();
    console.log("create user:", userId);
    const patientId = Patient.insert(patient);
    if (!patientId)
    return {error: "error, user created but creat patient crashed "}
    //throw new Error();
    console.log("create patient:", patientId);

    const user = Meteor.users.findOne(userId);
    const updatedProfile = user.profile;
    updatedProfile.id = patientId;
    Meteor.users.update(userId, {$set: {profile:updatedProfile}});
    return {error:null,success:true}

};
methods["createPatient"] =(userObj) => { return createPatient(userObj) };

const createContact = function (contact) {
    const userObj = {
        username: contact.username,
        password: contact.password,
        profile: {
            name: contact.name,
            role: "contact",
        }
    };
    const userId = Accounts.createUser(userObj);
    if (!userId)
    return {error:"error can't create this user "}
    //throw new Error();
    console.log("create user:", userId);
    const contactId = Contact.insert(contact);
    if (!contactId)
    return {error: "error, user created but creat contact crashed "}
    //throw new Error();
    console.log("create contact:", contactId);

    const user = Meteor.users.findOne(userId);
    const updatedProfile = user.profile;
    updatedProfile.id = contactId;
    Meteor.users.update(userId, {$set: {profile:updatedProfile}});
    return {error:null,success:true}

};
methods["createContact"] =(userObj) => { return createContact(userObj) };
Meteor.methods(methods);
