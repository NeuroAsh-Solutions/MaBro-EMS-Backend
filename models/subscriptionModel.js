class SubscriptionModel {
    constructor(
        studentId,
        studentFirstName,
        studentLastName,
        studentEmail,
        studentPhoneNumber,
        studentParentPhoneNumber,
        studentSubscriptionPlan,
    )
    {
        this.studentId = studentId;
        this.studentFirstName = studentFirstName;
        this.studentLastName = studentLastName;
        this.studentEmail = studentEmail;
        this.studentPhoneNumber = studentPhoneNumber;
        this.studentParentPhoneNumber = studentParentPhoneNumber;
        this.studentSubscriptionPlan = studentSubscriptionPlan;
        this.createdAt = new Date();
    }
}

module.exports = SubscriptionModel;