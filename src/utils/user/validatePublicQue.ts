export const validatePublicQue=(name:string,value:string)=>{
    if(name==='title'){
        if(value.trim().length===0) return `Field can't be empty`
        else if(value.trim().length<4) return `Enter a valid Title`
        else return ''
    }
    if(name==='question'){
        if(value.trim().length===0) return `Field can't be empty`
        else if(value.trim().length<4) return `Enter a valid Question`
        else return ''
    }
    if(name==='language'){
        if(value.trim().length===0) return `Field can't be empty`
        else return ''
    }
    if(name==='answer'){
        if(value.trim().length===0) return `Field can't be empty`
        else if(value.trim().length<4) return `Enter a valid Answer`
        else return ''
    }
    return ''

}