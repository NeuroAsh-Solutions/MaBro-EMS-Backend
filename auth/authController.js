const { admin, auth, db } = require("../firebase-auth-config");
const jwt = require("jsonwebtoken");
const config = require("../config/dotenv");
const axios = require('axios');


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
    // Validate required fields
    if (!studentEmail || !studentPassword) {
      return res.status(400).json({ 
        error: "Email and password are required" 
      });
    }

    // 1️⃣ Create student in Firebase Auth (only email & password)
    const userRecord = await auth.createUser({
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
      { uid: userRecord.uid, email: studentEmail, role: "student" },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: authToken, // Return token
      uid: userRecord.uid
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ 
      error: error.message || "Error creating user",
      details: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use Firebase REST API to verify credentials
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );

    // If we get here, authentication was successful
    const uid = response.data.localId;
    
    // Get student's role from Firestore
    const studentDoc = await db.collection("students").doc(uid).get();
    if (!studentDoc.exists) {
      return res.status(404).json({ error: "Student not found" });
    }

    const studentData = studentDoc.data();
    const role = studentData.role || "student";

    // Generate our own JWT token
    const authToken = jwt.sign(
      { uid, email, role },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: authToken
    });
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    res.status(401).json({ error: "Invalid credentials" });
  }
};
  
