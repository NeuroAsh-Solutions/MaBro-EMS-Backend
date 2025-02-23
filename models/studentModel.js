class Student {
    constructor(
        studentId, 
        studentFirstName, 
        studentLastName, 
        studentEmail,
        studentAge, 
        studentGender,
        studentDOB,
        studentGrade, 
        studentInstitute, 
        studentPassword, 
        studentPhoneNumber, 
        studentSecondaryPhoneNumber,
        studentAddress, 
        studentCity, 
        studentProvince, 
        studentParentName,
        studentParentName2,
        studentParentPhoneNumber,
        studentParentPhoneNumber2,
    )
    {
        this.studentId = studentId;
        this.studentFirstName = studentFirstName;
        this.studentLastName = studentLastName;
        this.studentEmail = studentEmail;
        this.studentAge = studentAge;
        this.studentGender = studentGender;
        this.studentDOB = studentDOB;
        this.studentGrade = studentGrade;
        this.studentInstitute = studentInstitute;
        this.studentPassword = studentPassword;
        this.studentPhoneNumber = studentPhoneNumber;
        this.studentSecondaryPhoneNumber = studentSecondaryPhoneNumber;
        this.studentAddress = studentAddress;
        this.studentCity = studentCity;
        this.studentProvince = studentProvince;
        this.studentParentName = studentParentName;
        this.studentParentName2 = studentParentName2;
        this.studentParentPhoneNumber = studentParentPhoneNumber;
        this.studentParentPhoneNumber2 = studentParentPhoneNumber2;
    }

    toPlainObject() {
        return {
            studentId: this.studentId,
        studentFirstName: this.studentFirstName,
        studentLastName: this.studentLastName,
        studentEmail: this.studentEmail,
        studentAge: this.studentAge,
        studentGender: this.studentGender,
        studentDOB: this.studentDOB,
        studentGrade: this.studentGrade,
        studentInstitute: this.studentInstitute,
        studentPassword: this.studentPassword,
        studentPhoneNumber: this.studentPhoneNumber,
        studentSecondaryPhoneNumber: this.studentSecondaryPhoneNumber,
        studentAddress: this.studentAddress,
        studentCity: this.studentCity,
        studentProvince: this.studentProvince,
        studentParentName: this.studentParentName,
        studentParentName2: this.studentParentName2,
        studentParentPhoneNumber: this.studentParentPhoneNumber,
        studentParentPhoneNumber2: this.studentParentPhoneNumber2
        };
    }
}

module.exports = Student;