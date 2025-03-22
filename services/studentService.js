const { db } = require('../firebase-auth-config');

// Create a new student
exports.createStudent = async (studentData) => {
    try {
        const docRef = await db.collection('students').add(studentData);
        return {
            id: docRef.id,
            ...studentData
        };
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
};

// Get all students
exports.getAllStudents = async () => {
    try {
        const studentsSnapshot = await db.collection('students').get();
        
        if (studentsSnapshot.empty) {
            return [];
        }
        
        const students = [];
        studentsSnapshot.forEach(doc => {
            students.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return students;
    } catch (error) {
        console.error('Error getting students:', error);
        throw error;
    }
};

// Get student by ID
exports.getStudentById = async (id) => {
    try {
        const studentDoc = await db.collection('students').doc(id).get();
        
        if (!studentDoc.exists) {
            throw new Error(`Student with ID ${id} not found`);
        }
        
        return {
            id: studentDoc.id,
            ...studentDoc.data()
        };
    } catch (error) {
        console.error(`Error getting student with ID ${id}:`, error);
        throw error;
    }
};

exports.getStudentByEmail = async (email) => {
    try {
        const studentQuery = await db.collection('students')
            .where('studentEmail', '==', email)
            .get();

        if (studentQuery.empty) {
            throw new Error(`Student with email ${email} not found`);
        }

        const studentDoc = studentQuery.docs[0];

        return {
            id: studentDoc.id,
            ...studentDoc.data()
        };
    } catch (error) {
        console.error(`Error getting student with email ${email}:`, error);
        throw error;
    }
};

// Update a student
exports.updateStudent = async (id, studentData) => {
    try {
        await db.collection('students').doc(id).update(studentData);
        
        // Get the updated document
        const updatedDoc = await db.collection('students').doc(id).get();
        
        return {
            id: updatedDoc.id,
            ...updatedDoc.data()
        };
    } catch (error) {
        console.error(`Error updating student with ID ${id}:`, error);
        throw error;
    }
};

// Delete a student
exports.deleteStudent = async (id) => {
    try {
        await db.collection('students').doc(id).delete();
        return { success: true };
    } catch (error) {
        console.error(`Error deleting student with ID ${id}:`, error);
        throw error;
    }
};