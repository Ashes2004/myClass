import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import StudentLayout from '../Student/studentLayout';

const StudentGradeCard = ({id}) => {
  const [studentData, setStudentData] = useState({
    name: '',
    class: '',
    rollNumber: '',
    subjects: [],
    totalMarks: 0,  
    grade: ''      
  });

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/result/${id}`); 
        const result = response.data;
     console.log(result);
     
        
        const formattedData = {
          name: result.student.studentName, 
          class: result.class.name, 
          rollNumber: result.student.studentRoll, 
          subjects: result.marks.map((mark) => ({
            name: mark.subject,
            marks: mark.obtainMarks
          }))
        };

      
        setStudentData((prevData) => ({
          ...prevData,
          ...formattedData
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const totalMarks = studentData.subjects.reduce((acc, subject) => acc + subject.marks, 0);
    const averageMarks = totalMarks / studentData.subjects.length;


    let grade = '';
    if (averageMarks >= 90) {
      grade = 'A';
    } else if (averageMarks >= 80) {
      grade = 'B';
    } else if (averageMarks >= 70) {
      grade = 'C';
    } else if (averageMarks >= 60) {
      grade = 'D';
    } else {
      grade = 'F';
    }

   
    setStudentData((prevData) => ({
      ...prevData,
      totalMarks,
      grade
    }));
  }, [studentData.subjects]);

  const generatePdf = () => {
    const input = document.getElementById('reportCard');
    
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.7);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; 
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, '', 'FAST'); 
      } else {
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }
      }
  
      pdf.save(`${studentData.name}_Roll-${studentData.rollNumber}_reportCard.pdf`);
    });
  };

  return (
    <StudentLayout>
    <div className="min-h-screen  flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div id="reportCard" className="w-[190mm] h-[266mm] mt-10 p-10 bg-white shadow-xl rounded ">
       
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-600">Springfield High School</h1>
          <p className="text-xl text-gray-700 font-semibold mt-2">Student Grade Report</p>
        </div>

       
        <div className="mt-8">
          <p className="text-lg"><strong>Name:</strong> <span className="text-gray-700">{studentData.name}</span></p>
          <p className="text-lg mt-2"><strong>Class:</strong> <span className="text-gray-700">{studentData.class}</span></p>
          <p className="text-lg mt-2"><strong>Roll Number:</strong> <span className="text-gray-700">{studentData.rollNumber}</span></p>
        </div>

       
        <h2 className="text-2xl font-semibold text-blue-500 mt-8">Subjects and Marks</h2>
        <table className="w-full mt-4 border-collapse border border-gray-300">
          <thead className="bg-blue-200">
            <tr>
              <th className="border border-gray-300 p-2 text-left text-lg">Subject</th>
              <th className="border border-gray-300 p-2 text-left text-lg">Marks</th>
            </tr>
          </thead>
          <tbody>
            {studentData.subjects.map((subject, index) => (
              <tr key={index} className="even:bg-blue-50">
                <td className="border border-gray-300 p-2 text-lg">{subject.name}</td>
                <td className="border border-gray-300 p-2 text-lg">{subject.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>

       
        <div className="mt-8 ">
          <p className="text-xl font-semibold">Total Marks: {studentData.totalMarks}</p>
          <p className="text-xl font-semibold">Grade: {studentData.grade}</p>
        </div>

       
        <div className="mt-10 text-right">
          <p className="font-semibold text-lg">______________________</p>
          <p className="font-medium text-gray-700">Admin Signature</p>
        </div>

       
        <div className="mt-10 text-center">
          <p className="text-gray-600 italic">Generated on {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <button onClick={generatePdf} className="mt-8 mb-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow-md hover:bg-blue-600 transition duration-300">
        Download Report Card
      </button>
    </div>
    </StudentLayout>
  );
};

export default StudentGradeCard;
