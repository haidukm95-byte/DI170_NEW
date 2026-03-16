
const submit=document.querySelector('#submit');

submit.addEventListener('click', ()=>{
    const phrase1=document.querySelector('#phrase1').value;
    const phrase2=document.querySelector('#phrase2').value;
    if(phrase1 && phrase2) {
        function checkAnagram(){
            if(phrase1.toLowerCase().replace(/\s/g, '').split('').sort().join('')==phrase2.toLowerCase().replace(/\s/g, '').split('').sort().join('')){
                return `${phrase1} is an anagram of ${phrase2}`;
            }
            else{
                return `${phrase1} is not an anagram of ${phrase2}`;
            }
        }
        
        alert(checkAnagram())
    }
    else{
        alert('Please enter the phrase!')
    }
    
});
