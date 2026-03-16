let data={};
    const formContainer=document.querySelector('#formContainer');
    const firstname=document.querySelector('#firstname');        const lastname=document.querySelector('#lastname');
    const send=document.querySelector('#submit');
    send.addEventListener('click', (e)=>{
        e.preventDefault();
        if (firstname.value && lastname.value){
            data={'name': firstname.value, 'last name': lastname.value};
            let jsonData=JSON.stringify(data);
            let p=document.createElement('p');
            p.className='dataString';
            p.textContent=jsonData;
            formContainer.appendChild(p);
        };
    });