//const fixtures = Meteor.settings.public;

//export const Departments = Object.assign({}, fixtures.department);


export const UserRoles = {
    admin: {
        value: "admin",
        label: "Administrator"
    },
    doctor: {
        value: "doctor",
        label: "Doctor"
    },
    staff: {
        value: "staff",
        label: "Staff"
    },
    patient: {
        value: "patient",
        label: "Patient"
    },
    contact: {
        value: "contact",
        label: "Patient Contact"
    }
}

export const Urgencies = {
    low: {value: "low", label: "Low"},
    medium: {value: "medium", label: "Medium"},
    high: {value: "high", label: "High"},
}
