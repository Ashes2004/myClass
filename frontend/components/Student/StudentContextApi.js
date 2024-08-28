"use client"
import React, { createContext, useContext, useState } from 'react';


const StudentContext = createContext({});


export const StudentProvider = ({ children }) => {
    // Initialize studentDetails as an empty object
    const [studentDetails, setStudentDetails] = useState({});

 

    return (
        <StudentContext.Provider value={{ studentDetails, setStudentDetails }}>
            {children}
        </StudentContext.Provider>
    );
};

// Custom hook to use the student context
export const useStudent = () => {
    return useContext(StudentContext);
};
