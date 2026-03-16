function cellAppend(){
    const main=document.querySelector('.main');
    for(let i=0; i<1500; i++){
        const cell=document.createElement('div');
        cell.classList.add('cell');
        main.appendChild(cell);
    }
}

cellAppend();
let selectedColor='';
function drawing(){
    let colors=document.querySelectorAll('.color');
    colors.forEach(color => {
        color.addEventListener('click', function() {
            selectedColor = this.style.backgroundColor;
        });
    });

    let cells=document.querySelectorAll('.cell');
    let isMouseDown=false;
    document.addEventListener('mousedown', ()=> isMouseDown=true);
    document.addEventListener('mouseup', ()=>isMouseDown=false);
        cells.forEach(cell=>{
            cell.addEventListener('mousedown', function(){
                this.style.backgroundColor = selectedColor;
            });
            cell.addEventListener('mouseover', function(){
                if(isMouseDown){
                    this.style.backgroundColor=selectedColor
                }
            });
        });
    };


drawing();

function clear(){
    let button=document.querySelector('button');
    let cells=document.querySelectorAll('.cell');  // add this
    button.addEventListener('click', function(){
        cells.forEach(cell=>{
            cell.style.backgroundColor='white';
        })
    })
}
    
clear();