const studentService = require("../services/studentService");

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
        const students = await studentService.getAllStudents();
        res.status(200).json({
            message: "Students fetched successfully!",
            students
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch students!",
            error: error.message
        })
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