const admin = require("../config/firebaseAdmin");
const jwt = require("jsonwebtoken");
const db = admin.firestore(); // Firestore instance

exports.signUp = async (req, res) => {
  const {
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
    studentParentPhoneNumber2
  } = req.body;

  try {
    // 1️⃣ Create student in Firebase Auth (only email & password)
    const userRecord = await admin.auth().createUser({
      email: studentEmail,
      password: studentPassword,
      displayName: `${studentFirstName} ${studentLastName}`
    });

    // 2️⃣ Store full student details in Firestore
    await db.collection("students").doc(userRecord.uid).set({
      studentId,
      studentFirstName,
      studentLastName,
      studentEmail,
      studentAge,
      studentGender,
      studentDOB,
      studentGrade,
      studentInstitute,
      studentPhoneNumber,
      studentSecondaryPhoneNumber,
      studentAddress,
      studentCity,
      studentProvince,
      studentParentName,
      studentParentName2,
      studentParentPhoneNumber,
      studentParentPhoneNumber2,
      role: "student", // Assign role as 'student'
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 3️⃣ Generate JWT Token
    const authToken = jwt.sign(
      { uid: userRecord.uid, email: studentEmail, role: "student" }, // Embed role
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: authToken, // Return token
      uid: userRecord.uid
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Firebase Auth doesn't support direct email/password authentication
      const userRecord = await admin.auth().getUserByEmail(email);
  
      // Get student's role from Firestore
      const studentDoc = await db.collection("students").doc(userRecord.uid).get();
      if (!studentDoc.exists) {
        return res.status(404).json({ error: "Student not found" });
      }
  
      const studentData = studentDoc.data();
      const role = studentData.role || "student";
  
      // Generate JWT token
      const authToken = jwt.sign(
        { uid: userRecord.uid, email, role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
  
      res.status(200).json({
        message: "Login successful",
        token: authToken
      });
    } catch (error) {
      res.status(401).json({ error: "Invalid credentials" });
    }
  };
  
