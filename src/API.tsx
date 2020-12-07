import { type } from "os";

import {shuffleArray} from './utilities'

export const fetchQuestion=async(amount:number,difficulty:Difficulty)=>{
const endpoint =  `https://opentdb.com/api.php?amount=${amount}&category=23&difficulty=${difficulty}&type=multiple`;
const Data= await (await fetch(endpoint)).json()
return Data.results.map((question:Question)=>(
    {
        ...question,
        answer:shuffleArray([...question.incorrect_answers,question.correct_answer])
    }
))
}
export enum Difficulty{
    EASY='easy',
    MEDIUM='medium',
    HARD='hard'
}
export type Question={
    category:string;
    difficulty:string;
    incorrect_answers:string[];
    question:string;
    correct_answer:string;
    type:string;
}
export type QuestionState= Question&{answer:string[]};