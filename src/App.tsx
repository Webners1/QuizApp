import React, { useState, useEffect } from "react";
import { Quiz } from "./QuizCard";
import logo from "./logo.svg";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./App.css";
import { fetchQuestion, Difficulty, QuestionState } from "./API";
import { Paper } from "@material-ui/core";
import { any } from "prop-types";
function App() {
  var[status,setStatus] = useState(0);
  var [questions, setQuestions] = useState<QuestionState[]>([]);
  var [answer, setAnswer] = useState<AnswerObject[]>([]);
  var [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  var [Score, setScore] = useState(0);
  var [finish, setFinish] = useState(true);
  const total_questions = 10;
  type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  };

  const Start = async () => {
    setLoading(true);
    setFinish(false);
    const newquestions = await fetchQuestion(total_questions, Difficulty.EASY);
    setQuestions(newquestions);
    setScore(0);
    setAnswer([]);
    setCount(0);
    setLoading(false);
  };
  const nextQuestion = async() => {
    setStatus(2)
    if(count===total_questions-1){
      setFinish(true);
    }
    else{
    setCount((count += 1));
    }
  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!finish){
      const answer = e.currentTarget.value;
      console.log(e.currentTarget)
      const corrAnswer=questions[count].correct_answer ===answer
      
      if(corrAnswer){
        setStatus(1)
        setScore(Score+=10)
      console.log(Score)
    };
      if(!corrAnswer){
        setStatus(0);

      }
      const answerObject = {
        question: questions[count].question,
        answer,
        correct:false,
        correctAnswer: questions[count].correct_answer,
      };
      setAnswer(prev=>[...prev,answerObject])
    }
  };
  return (
    <div className='main' style={{height:'953px'}}>
      
      
      {finish || count === total_questions - 1 ? (
        <button className='start'onClick={Start}>Start</button>
      ) : null}
      {loading &&!finish ? <CircularProgress color="secondary" /> : null}

<div className='subMain' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      {!loading && !finish ? (
        
        <Quiz
          totalQuestion={total_questions}
          questionNo={count + 1}
          Question={questions[count].question}
          answer={questions[count].answer}
          userAnswer={answer ? answer[count] : undefined}
          callback={checkAnswer}
          status={status}
          score={Score}
        />
        
        ) : null}
      {!loading && !finish && answer.length === count + 1 &&count !== total_questions-1? (
        <button className="next" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
      </div>
    </div>
  );
}

export default App;
