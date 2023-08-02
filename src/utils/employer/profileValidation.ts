export const empProfile=(name:string,value:string)=>{
    if(name==='username'){
        const unameRgx:RegExp=/^[A-Za-z]{4,10}$/
        if(value.trim().length===0) return `Field cant't be empty.`
        else if(!unameRgx.test(value)) return `Enter a valid Username`
        else return ''
    }
    if(name==='firstname'){
        const fnameRgx:RegExp=/^[A-Za-z]{4,10}$/
        if(value.trim().length===0) return `Field cant't be empty.`
        else if(!fnameRgx.test(value)) return `Enter a valid Firstname`
        else return ''
    }
    if(name==='lastname'){
        const lnameRgx:RegExp=/^[A-Za-z]{1,10}$/
        if(value.trim().length===0) return `Field cant't be empty.`
        else if(!lnameRgx.test(value)) return `Enter a valid Lastname`
        else return ''
    }
    if (name === 'company') {
        const companyRgx: RegExp = /^[A-Za-z]{4,10}$/
        if (value.trim().length === 0) return `Field can't be empty.`
        else if (!companyRgx.test(value)) return `Enter a valid Company name`
        else return ''
    }
    if(name==='location'){
    const locationRgx:RegExp=/^[A-Za-z]{4,10}$/
    if (value.trim().length === 0) return `Field can't be empty.`
    else if (!locationRgx.test(value)) return `Enter a valid Location`
    else return ''
    }
    if(name==='facebook' || name==='instagram' || name==='linkedIn'){
        const urlRgx = /^(https?|ftp):\/\/[^\s\$.?#].[^\s]*$/
        if (value.trim().length === 0) return ``
        else if(!urlRgx.test(value)) return `Enter a valid URL`
        else return ''
    }
}