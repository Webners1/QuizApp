import React, { Component,useState,useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import useWebAnimations, { bounce } from "@wellyshen/use-web-animations";
import './App.css'
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  active: {
    width: "100%",
    color: "white",
    fontSize: "30px",
    border:'none',
    fontFamily: "Nerko One, cursive",
    backgroundImage:
      "linear-gradient(to right, #00ffd6 , #008fb5 100%,#166e86 100%)",
    fontWeight: 500,
  },
}));

type Props = {
   Question:string;
    answer:string[];
    callback:any;
    userAnswer:any;
    questionNo:number;
    totalQuestion:number;
    status:number;
    score:number;
    
}
export const Quiz: React.FC<Props> =({score,status,Question,answer,callback,questionNo,userAnswer,totalQuestion})=>{
  const{ref,playState,getAnimation} = useWebAnimations({...bounce})
  const keyframe = [
    { boxShadow: "0px 0px 8px 6px white", transform: "rotate(0)" },
    { boxShadow: "1px 1px 7px 6px #ff4f6d", transform: "rotate(5deg)" },
    { boxShadow: "2px 2px 6px 6px #63101e", transform: "rotate(-5deg)" },
    { boxShadow: "3px 3px 7px 6px #940019", transform: "rotate(5deg)" },
    { boxShadow: "5px 5px 8px 6px #f01c40", transform: "rotate(-5deg)" },
    { boxShadow: "3px 3px 9px 6px #fb002b", transform: "rotate(0deg)" },
  ];
  const timing={
    duration:1000,
    iteration:1,
    easing:'ease-in-out'
  }
  const keyframe1 = [
    { boxShadow: "0px 0px 8px 6px white" },
    { boxShadow: "1px 1px 7px 6px #1eb69e" },
    { boxShadow: "2px 2px 6px 6px #57ffe4" },
    { boxShadow: "3px 3px 7px 6px #d2f75c" },
    { boxShadow: "5px 5px 8px 6px #bff219" },
    { boxShadow: "3px 3px 9px 6px #fbee08" },
  ];
  const timing1 = {
    duration: 1000,
    iteration: 1,
    easing: "ease-in-out",
  };
  useEffect(()=>{
    getAnimation()?.pause();
    if(status===1){
  const anim = document.getElementById("paper")?.animate(keyframe1, timing1);
      getAnimation()?.play();
    }
    else if(status===0){
  const anim = document.getElementById("paper")?.animate(keyframe, timing);
      anim?.play();

    }
  },[status])
  const classes = useStyles();
  var [clas,setClass]=useState('simple')
const active=()=> setClass('active')
const unactive = () => setClass('simple');
    return (
      <div>
        <Paper
          id="paper"
          ref={ref ? ref : null}
          style={{
            marginTop: "70px",
            boxShadow: "3px 3px 8px 4px rgb(0,0,0,0.4)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "27px",
              marginBottom: "1px",
              fontFamily: "Nerko One, cursive",
              fontWeight: 500,
              textDecoration: "underline",
              position: "relative",
              margin: "right",
            }}
          >
            SCORE:{score}
          </p>
          <p
            style={{
              fontSize: "30px",
              fontFamily: "Nerko One,cursive",
              fontWeight:600,
              padding: "4px",
              borderBottom: "4px solid black",
            }}
          >
            {questionNo}/{totalQuestion}
          </p>
          <h1
            dangerouslySetInnerHTML={{ __html: Question }}
            style={{ textAlign:'center',fontSize: "30px", fontFamily: "Nerko One, cursive",fontWeight:500}}
          />
          {answer.map((val, i) => (
            <Paper
              style={{ width: "30%", margin: "5px" }}
              elevation={4}
              onDoubleClick={unactive}
              onClick={active}
            >
              <button
                onClick={callback}
                className={userAnswer ? classes.active : "simple"}
                disabled={userAnswer}
                value={val}
              >
                <span dangerouslySetInnerHTML={{ __html: val }}></span>
              </button>
            </Paper>
          ))}
        </Paper>
      </div>
    );
}
