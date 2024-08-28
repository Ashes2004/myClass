import React, {useState} from 'react'
import TeacherQuizLayout from './TeacherQuizLayout';
import Image from 'next/image';
import { question_mark, write } from '@/public/Icons';
const TeacherQuizBody = () => {
    const [isCreateActive, setIsCreateActive] = useState(true);
    const [isShowAnswerActive, setIsShowAnswerActive] = useState(false);
    const [isShowResultActive, setIshowResultActive] = useState(false);
    const [totalNoOfQuestions, setTotalNoOfQuestions] = useState();
    const [isImageChecked,setImageChecked] = useState(false)
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [options, setOptions] = useState([]);
    const [file,setFile] = useState(null);
    const [quiz,setQuiz] = useState([{}]);
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [questionNo, setQuestionNumber] = useState(1);
    const activateCreateQuiz = () => {
        if(isCreateActive) return;
        setIsCreateActive(true);
        setIsShowAnswerActive(false);
        setIshowResultActive(false);
    }
    const activateSeeAnswers = () => {
        if(isShowAnswerActive) return;
        setIsCreateActive(false);
        setIsShowAnswerActive(true);
        setIshowResultActive(false);    
    }
    const activateShowResults = () => {
        if(isShowResultActive) return;
        setIsCreateActive(false);
        setIsShowAnswerActive(false);
        setIshowResultActive(true);
    }
    const checked = (e) => {
        console.log(e.target.checked)
        if(e.target.checked) setImageChecked(true);
        else setImageChecked(false);
    }
    const uploadImage = (e) => {
        setFile(e.target.files[0]);
    }
    const handleQuestion = () => {
        options.push(option1);
        options.push(option2);
        options.push(option3);
        options.push(option4);
        setOptions(options);
        quiz[questionNo-1] = {
            question:question,
            description:description,
            options:options,
            correctAnswer:correctAnswer,
            image:file
        }
        setQuiz(quiz);
        setQuestionNumber(questionNo => questionNo+1);
        setOptions([]);
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectAnswer('');
        setQuestion('');
        setDescription('');
        setFile(null);
        setImageChecked(false);
        setCorrectAnswer(0);
        console.log(quiz);
    } 
  return (
    <TeacherQuizLayout>
        <ul className='list-none flex justify-evenly gap-3 md:gap-9 p-2 text-white md:justify-center items-center'>
            <li><button onClick={()=>activateCreateQuiz()} className={`${isCreateActive?'border-b-2 border-b-violet-500 text-violet-600':'text-gray-500'}`}>Create Quiz</button></li>
            <li><button onClick={()=>activateSeeAnswers()} className={`${isShowAnswerActive?'border-b-2 border-b-violet-500 text-violet-600':'text-gray-500'}`}>See Answers</button></li>
            <li><button onClick={()=>activateShowResults()} className={`${isShowResultActive?'border-b-2 border-b-violet-500 text-violet-600':'text-gray-500'}`}>Show Result</button></li>
        </ul>
        <div className={`${isCreateActive?'visible':'hidden'} bg-slate-100 md:mx-60 mx-2 md:mt-6 mt-2 rounded-md shadow-xl border-violet-500 border pb-3 md:pb-6`}>
            <div className='text-xl lg:text-2xl font-semibold md:flex justify-between p-2 md:p-6 border-b-2 border-violet-400 text-gray-700'>
                <div className='text-lg flex md:gap-2 gap-1 justify-items-start md:pl-4 items-center'>
                    <p>Write Your Question Here</p>
                    <Image src={write} width={20} height={20} alt='pen'/>
                </div>
                <div className='text-[14px] font-medium flex items-center gap-1 mt-2 md:mt-0'>
                    <p>No of Questions</p>
                    <input type="text" onChange={(e) => setTotalNoOfQuestions(Number(e.target.value))} className='w-10 h-8 text-center font-medium text-sm rounded-md border border-violet-500 '/>
                </div>
            </div>
            <div className='p-2 md:px-6 pt-6'>
               <div className='flex bg-violet-500 text-white md:py-2 py-1 rounded-t-md px-1 items-center justify-start gap-2'><Image src={question_mark} height={24} width={24} alt='question-mark' className='invert'/><p>Question No. {questionNo<=totalNoOfQuestions?questionNo:totalNoOfQuestions}</p> </div>
            </div>
            <div className='px-4 md:px-10'>
                <p>Question</p>
                <input onChange={(e) => setQuestion(e.target.value)} value={question} placeholder='type here' className='py-1 my-2 rounded-md border border-violet-400 w-full px-1'></input>
                <p>Description (optional)</p>
                <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder='type here' className='py-1 my-2 rounded-md border border-violet-400 w-full px-1'></input>
                <label htmlFor="imageUpload" className='flex gap-3 items-center justify-start'><input type='checkbox' className='accent-violet-600' onChange={checked} id='imageUpload'></input>Add Image</label>
                <div className='border-b-2 border-violet-400 pb-2 mb-2'>
                    {isImageChecked?<input type='file' className='mt-2' onChange={uploadImage}></input>:''}
                </div>
                <div className=''>
                    <p>Options</p>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-2 mt-2'>
                        <input type="text" onChange={(e) => setOption1(e.target.value)} value={option1} className='p-1 border border-violet-500 rounded-md'></input>
                        <input type="text" onChange={(e) => setOption2(e.target.value)} value={option2} className='p-1 border border-violet-500 rounded-md'></input>
                        <input type="text" onChange={(e) => setOption3(e.target.value)} value={option3} className='p-1 border border-violet-500 rounded-md'></input>
                        <input type="text" onChange={(e) => setOption4(e.target.value)} value={option4} className='p-1 border border-violet-500 rounded-md'></input>
                    </div>
                </div>
                <div className='mt-2'>
                    <p className='mb-1'>Correct Option</p>
                    <input type="text" onChange={(e) => setCorrectAnswer(Number(e.target.value))} value={correctAnswer} className='p-1 border border-violet-500 rounded-md w-1/4'/>
                </div>
                <div className='mt-4 flex justify-center'>
                    <button onClick={handleQuestion} className={`p-2 bg-violet-500 w-20 text-white rounded-md ${questionNo>totalNoOfQuestions?'hidden':''}`}>{totalNoOfQuestions===questionNo?'Submit':'Set'}</button>
                </div>
            </div>
        </div>
        <div className={`${isShowAnswerActive?'visible':'hidden'}`}>
            Show Answers
        </div>
        <div className={`${isShowResultActive?'visible':'hidden'}`}>
            Show Result
        </div>
    </TeacherQuizLayout>
  )
}

export default TeacherQuizBody