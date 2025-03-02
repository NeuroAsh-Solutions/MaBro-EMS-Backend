const { admin, auth, db } = require("../firebase-auth-config");
const jwt = require("jsonwebtoken");
const config = require("../config/dotenv");
const axios = require('axios');

// Define allowed roles
const ALLOWED_ROLES = ["student", "admin", "teacher", "parent"];

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
    studentParentPhoneNumber2,
    role = "student" // Default to student if no role is provided
  } = req.body;

  try {
    // Validate required fields
    if (!studentEmail || !studentPassword) {
      return res.status(400).json({ 
        error: "Email and password are required" 
      });
    }
    
    // Validate role
    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        error: `Invalid role. Allowed roles are: ${ALLOWED_ROLES.join(', ')}`
      });
    }

    // 1️⃣ Create user in Firebase Auth (only email & password)
    const userRecord = await auth.createUser({
      email: studentEmail,
      password: studentPassword,
      displayName: `${studentFirstName} ${studentLastName}`
    });

    // 2️⃣ Store full user details in appropriate collection based on role
    const userCollection = role === "student" ? "students" : `${role}s`;
    await db.collection(userCollection).doc(userRecord.uid).set({
      userId: studentId,
      firstName: studentFirstName,
      lastName: studentLastName,
      email: studentEmail,
      age: studentAge,
      gender: studentGender,
      // Add other fields as appropriate for this role
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 3️⃣ Generate JWT Token with the appropriate role
    const authToken = jwt.sign(
      { uid: userRecord.uid, email: studentEmail, role },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: authToken, // Return token
      uid: userRecord.uid,
      role // Return the assigned role
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
    
    // Try to find the user in different collections
    const collections = ["students", "admins", "teachers", "parents"];
    let userData = null;
    let role = "student"; // Default role
    
    // Look for the user in each collection until found
    for (const collection of collections) {
      const userDoc = await db.collection(collection).doc(uid).get();
      if (userDoc.exists) {
        userData = userDoc.data();
        role = userData.role || collection.slice(0, -1); // Remove trailing 's'
        break;
      }
    }
    
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate our own JWT token
    const authToken = jwt.sign(
      { uid, email, role },
      config.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: authToken,
      role
    });
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    res.status(401).json({ error: "Invalid credentials" });
  }
};
  
