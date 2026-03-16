let today=new Date();
let passover=new Date('2026-04-01');
let anotherDay=new Date('2026-05-04');

function dateState(date){
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (date<passover) {
                resolve("The Passover didn`t come yet!");
            } 
            else {
                reject("The Passover had already come!");
            }
        }, 4000);
    });
}
dateState(today)
    .then(result => console.log(result))
    .catch(error => console.log(error));

dateState(anotherDay)
    .then(result => console.log(result))
    .catch(error => console.log(error));