interface Range {
    from:string;
    to: string;
  }

export const jobFormValidate=(name:string,value:string,range:Range,err:object,setErr:Function)=>{
    if(name==='title') titleVali(value,err,setErr)
    if(name==='category') domainVali(value,err,setErr)
    if(name==='from') fromVali(value,range,err,setErr)
    if(name==='to') toVali(value,range,err,setErr)
    if(name==='fixed') fixedVali(value,err,setErr)
    if(name==='qualification') qualiVali(value,err,setErr)
    if(name==='desc') descVali(value,err,setErr)
}

const titleVali=(val:string,err:object,setErr:Function)=>{
    const rgx=/^(?=[a-zA-Z\s]{4,20}$)[a-zA-Z\s]+$/gm
    if(val.trim().length===0) setErr({...err,title:`Filed can't be empty .`})
    else if(!rgx.test(val))setErr({...err,title:`Enter a valid Title .`}) 
    else setErr({...err,title:``})
}

const domainVali=(val:string,err:object,setErr:Function)=>{
    const rgx=/^(?=[a-zA-Z\s]{2,16}$)[a-zA-Z\s]+$/gm
    if(val.trim().length===0) setErr({...err,category:`Filed can't be empty .`})
    else if(!rgx.test(val))setErr({...err,category:`Enter a valid Domain .`}) 
    else setErr({...err,category:``})
}

const fromVali=(val:string,range:Range,err:object,setErr:Function)=>{
    if(val.trim().length===0) setErr({...err,fixed:'',from:`Filed can't be empty .`})
    else if(parseInt(val)<=0) setErr({...err,fixed:'',from:`${val} is not accepted.`})
    else if(parseInt(val)>=parseInt(range?.to)) setErr({...err,fixed:'',to:'',from:`Filed must be lesserthan ${range?.to}`})
    else if(parseInt(val)<parseInt(range?.to)) setErr({...err,fixed:'',to:'',from:``})
    else setErr({...err,fixed:'',from:``})
}

const toVali=(val:string,range:Range,err:object,setErr:Function)=>{
    if(val.trim().length===0) setErr({...err,to:`Filed can't be empty .`})
    else if(parseInt(val)<=parseInt(range?.from)) setErr({...err,fixed:'',from:'',to:`Filed must be greaterthan ${range?.from}`})
    else if(parseInt(val)>parseInt(range?.from)) setErr({...err,fixed:'',from:'',to:``})
    else setErr({...err,to:``})
}

const fixedVali=(val:string,err:object,setErr:Function)=>{
    if(val.trim().length===0) setErr({...err,to:'',from:'',fixed:`Filed can't be empty .`})
    else if(parseInt(val)<=0) setErr({...err,from:'',fixed:`${val} is not accepted.`})

    else setErr({...err,to:'',from:'',fixed:``})

}

const qualiVali=(val:string,err:object,setErr:Function)=>{
    const rgx=/^[a-zA-Z0-9\s]{2,16}$/gm
    if(val.trim().length===0) setErr({...err,qualification:`Filed can't be empty .`})
    else if(!rgx.test(val)) setErr({...err,qualification:`Enter a valid Data.`}) 
    else setErr({...err,qualification:``}) 
}

const descVali=(val:string,err:object,setErr:Function)=>{
    if(val.trim().length===0) setErr({...err,desc:`Filed can't be empty .`})
    else if(val.trim().length<10) setErr({...err,desc:`Description is very short .`})
    else setErr({...err,desc:``})


}