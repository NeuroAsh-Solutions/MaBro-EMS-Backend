const db = require("../config/firebaseAdmin");
// Remove this line since we're not using the Student class anymore
// const Student = require("../models/studentModel");

exports.createStudent = async (studentData) => {
    try {

        const studentPOJO = {
            studentId: studentData.studentId,
            studentFirstName: studentData.studentFirstName,
            studentLastName: studentData.studentLastName,
            studentEmail: studentData.studentEmail,
            studentAge: studentData.studentAge,
            studentGender: studentData.studentGender,
            studentDOB: studentData.studentDOB,
            studentGrade: studentData.studentGrade,
            studentInstitute: studentData.studentInstitute,
            studentPassword: studentData.studentPassword,
            studentPhoneNumber: studentData.studentPhoneNumber,
            studentSecondaryPhoneNumber: studentData.studentSecondaryPhoneNumber,
            studentAddress: studentData.studentAddress,
            studentCity: studentData.studentCity,
            studentProvince: studentData.studentProvince,
            studentParentName: studentData.studentParentName,
            studentParentName2: studentData.studentParentName2,
            studentParentPhoneNumber: studentData.studentParentPhoneNumber,
            studentParentPhoneNumber2: studentData.studentParentPhoneNumber2,
        };

        await db.collection("students").doc(studentData.studentId).set(studentPOJO);
        return studentPOJO;
    } catch (error) {
        console.error('Error in createStudent:', error);
        throw error;
    }
};

exports.updateStudent = async (studentId, studentData) => {
    try {
        const studentDoc = await db.collection("students").doc(studentId).get();
        if (!studentDoc.exists) {
            throw new Error("Student for the specific id " + studentId + " given does not exist!");
        }

        const studentPOJO = {
            studentId: studentData.studentId,
            studentFirstName: studentData.studentFirstName,
            studentLastName: studentData.studentLastName,
            studentEmail: studentData.studentEmail,
            studentAge: studentData.studentAge,
            studentGender: studentData.studentGender,
            studentDOB: studentData.studentDOB,
            studentGrade: studentData.studentGrade,
            studentInstitute: studentData.studentInstitute,
            studentPassword: studentData.studentPassword,
            studentPhoneNumber: studentData.studentPhoneNumber,
            studentSecondaryPhoneNumber: studentData.studentSecondaryPhoneNumber,
            studentAddress: studentData.studentAddress,
            studentCity: studentData.studentCity,
            studentProvince: studentData.studentProvince,
            studentParentName: studentData.studentParentName,
            studentParentName2: studentData.studentParentName2,
            studentParentPhoneNumber: studentData.studentParentPhoneNumber,
            studentParentPhoneNumber2: studentData.studentParentPhoneNumber2,
        };

        await db.collection("students").doc(studentId).update(studentPOJO);
        return studentPOJO;
    } catch (error) {
        console.error('Error in updateStudent:', error);
        throw error;
    }
};

exports.getAllStudents = async() => {
    const studentSnapshot = await db.collection("students").get();
    return studentSnapshot.docs.map((doc) => doc.data());
}

exports.getStudentById = async (studentId) => {
    const studentDoc = await db.collection("students").doc(studentId).get();
    return studentDoc.exists ? studentDoc.data() : null;
}

exports.deleteStudent = async (studentId) => {
    await db.collection("students").doc(studentId).delete();
    return { message: "Student deleted successfully!" };
}