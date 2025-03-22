const studentService = require("../services/studentService");
const { db } = require('../firebase-auth-config');

exports.createStudent = async (req, res) => {
    try {
        const student = await studentService.createStudent(req.body);
        res.status(201).json
        ({
            message: "Student created successfully!", student
        });
    } catch (error) {
        res.status(500).json
        ({
            message: "Failed to create student",
            error: error.message
        })
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const studentsSnapshot = await db.collection('students').get();
        
        if (studentsSnapshot.empty) {
            return res.status(200).json({ students: [] });
        }
        
        const students = [];
        studentsSnapshot.forEach(doc => {
            students.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        res.status(200).json({ students });
    } catch (error) {
        console.error('Error getting students:', error);
        res.status(500).json({ 
            message: 'Failed to fetch students!', 
            error: error.message 
        });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        res.status(200).json({
            message: "Student fetched successfully!",
            student
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch the specific student!",
            error: error.message
        })
    }
};

exports.getStudentByUId = async (req, res) => {
    const uId = req.user.uid;
    try {
        const student = await studentService.getStudentById(uId);
        res.status(200).json({
            message: "Student fetched successfully!",
            student
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch the specific student!",
            error: error.message
        })
    }
};

exports.getStudentByEmail = async (req, res) => {
    try {
        const student = await studentService.getStudentByEmail(req.params.email);
        res.status(200).json({
            message: "Student fetched successfully!",
            student
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch the student by email!",
            error: error.message
        });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const result = await studentService.deleteStudent(req.params.id);
        res.status(200).json({
            message: "Student deleted successfully!",
        })
    } catch (error) {
        req.status(500).json({
            message: "Failed to delete the student!",
            error: error.message
        })
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        res.status(200).json({
            message: "Student updated successfully!",
        })
    } catch (error) {
        req.status(500).json({
            message: "Failed to update the student for the given id: " + req.params.id,
            error: error.message
        })
    }
};