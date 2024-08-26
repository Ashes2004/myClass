'use client'
import React,{useState,useContext,createContext,useEffect} from 'react'
import AttendanceLayout from './attendanceLayout';
import next from 'next';

const AttendanceBody = () => {
  useEffect(()=>{
    window.addEventListener('keypress',handleKeypress);
    return ()=>{
      window.removeEventListener('keypress',handleKeypress);
    }
  })
  const handleKeypress = (e) => {
    console.log(e);
    if(e.code==="Numpad1") handlePresent();
    else if(e.code==="Numpad0") handleAbsent();
    else if(e.code==='Enter' && currStudent.isLast===true) handleSubmit();
  }
  const [isOpen, setIsOpen] = useState(false);
  const [students,setStudents] = useState([
    {
      _id:1,
      roll:15,
      name:"Manmohan Khandelwal",
      attendanceStatus:"",
      isFirst:true,
      isLast:false
    },
    {
      _id:4,
      roll:52,
      name:"Ashesh Das",
      attendanceStatus:"",
      isFirst:false,
      isLast:false
    },
    {
      _id:2,
      roll:81,
      name:"Supratim Das",
      attendanceStatus:"",
      isFirst:false,
      isLast:false
    },
    {
      _id:3,
      roll:95,
      name:"Tanish Mitra",
      attendanceStatus:"",
      isFirst:false,
      isLast:false
    },
    {
      _id:5,
      roll:110,
      name:"Nilanjan Saha",
      attendanceStatus:"",
      isFirst:false,
      isLast:false
    },
    {
      _id:6,
      roll:113,
      name:"Meholi Jha",
      attendanceStatus:"",
      isFirst:false,
      isLast:true
    }
  ]);
  const [rollNumber,setRollNumber] = useState(students[0].roll);
  const [currStudent,setCurrStudent] = useState(students[0]);
  const [prevStudent,setPrevStudent] = useState(null);
  const [nextStudent,setNextStudent] = useState(students[1]);
  const handleLeft = ()=>{
    if(prevStudent===null) alert('No previous student record found!');
    else {
      let tempRoll = rollNumber;
      setRollNumber(prevStudent.roll);
      setNextStudent(currStudent);
      let temp = prevStudent;
      if(prevStudent.isFirst===true) setPrevStudent(null);
      else {
        let index = students.findIndex(student => student.roll===prevStudent.roll);
        setPrevStudent(students[index-1])
      }
      setCurrStudent(temp);
    }
  };
  const handleRight = ()=>{
    if(nextStudent===null) return;
    else {
      let tempRoll = rollNumber;
      setRollNumber(nextStudent.roll);
      setPrevStudent(currStudent);
      setCurrStudent(nextStudent);
      if(nextStudent.isLast===true) setNextStudent(null);
      else {
        let index = students.findIndex(student => student.roll===nextStudent.roll);
        setNextStudent(students[index+1]);
      }
    }
  };
  const handlePresent = ()=>{
    setStudents(students.map(student=>{
      if(student.roll===currStudent.roll) {
        let newStudent = {...student,attendanceStatus:"Present"};
        setCurrStudent(newStudent);
        return newStudent;
      }
      else return student;
    }))
    handleRight();
  };
 const  handleAbsent = ()=>{
    setStudents(students.map(student=>{
      if(student.roll===currStudent.roll) {
        let newStudent = {...student,attendanceStatus:"Absent"};
        setCurrStudent(newStudent);
        return newStudent;
      }
      else return student;
    }))
    handleRight();
  };
  const handleHoliday = ()=>{
    console.log('Holiday')
    setStudents(students.map(student=>{
        let newStudent = {...student,attendanceStatus:"Holiday"};
        return newStudent;
    }))
    setRollNumber(students[students.length-1].roll);
    setCurrStudent(students[students.length-1]);
  };
  const handleSubmit = ()=>{
    console.log(students);
  };
  const getStudent = (student,currStudent,prevStudent,nextStudent) => {
    let temp = currStudent;
    setCurrStudent(student);
    setRollNumber(student.roll);
    setNextStudent(temp);
    setIsOpen(false);
  }
  const openBodyInSide = () => {
    console.log('yoo');
    if(isOpen) setIsOpen(false);
    else setIsOpen(true);
  }
  return (
    <attendanceContext.Provider value={{isOpen,rollNumber,students,currStudent,prevStudent,nextStudent,handleLeft,handleRight,handlePresent,handleAbsent,handleHoliday,handleSubmit,setRollNumber,setPrevStudent,setNextStudent,setCurrStudent,openBodyInSide}} >
      <AttendanceLayout>
        <div className={`bg-white h-full rounded-lg shadow-md shadow-slate-500 ${isOpen?'fixed right-0 top-0 z-10':'hidden md:block'}`} >
        <p className='md:mt-1 text-center p-3 md:text-xl font-bold tracking-wider bg-slate-400 text-white rounded-tl-lg md:rounded-tr-lg text-sm'>Live Attendance Tracking System</p>
        <div className={` ${isOpen?'grid-cols-4':''} grid md:m-3 mt-1 xl:grid-cols-12 lg:grid-cols-8 md:grid-cols-6 gap-3 md:p-3 px-4 py-3`}>
          {students.map(student =>(
            <button onClick={() => getStudent(student,currStudent,prevStudent,nextStudent)} key={student._id} className={`p-3 shadow-md shadow-slate-500 ${student.attendanceStatus==='Present'?'bg-green-500':''} ${student.attendanceStatus===''?'bg-yellow-500':''} ${student.attendanceStatus==='Absent'?'bg-red-500':''} ${student.attendanceStatus==='Holiday'?'bg-slate-500':''} text-white text-center rounded-md font-medium`}>{student.roll}</button>
          ))}
        </div>
        </div>
      </AttendanceLayout>
      </attendanceContext.Provider>
  )
}

export default AttendanceBody;

export const attendanceContext = createContext([
  
]);
export const useAttendanceContext = () =>{
  return useContext(attendanceContext); 
}
