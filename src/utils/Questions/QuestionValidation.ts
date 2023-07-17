import { QuestionTypes } from "../../models/Questions";

export const QuestionFormVali=(name:string,value:string,err:QuestionTypes,setErr:Function)=>{
    if(name==='question'){
        if(value.trim().length===0) setErr({...err,[name]:`Field can't be empty.`})
        else if(value.trim().length<5) setErr({...err,[name]:`Enter a valid question`})
        else setErr({...err,[name]:``})
    }
    if(name==='answer' || name==='option1' || name==='option2' || name==='option3'){
        if(value.trim().length===0) setErr({...err,[name]:`Field can't be empty.`})
       
        else setErr({...err,[name]:``})
    }

}