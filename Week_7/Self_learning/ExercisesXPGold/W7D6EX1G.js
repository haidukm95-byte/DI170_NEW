const isBlank=(string)=>{
    if(string.trim()==''){
        return true;
    }
    else{
        return false;
    }
}

isBlank('');
isBlank(' ');
isBlank('abc');