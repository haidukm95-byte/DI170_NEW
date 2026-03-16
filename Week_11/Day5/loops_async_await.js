//Async/Await In Loops

//WARNING: async/await doesn’t play nicely with .forEach() loops
//async/await plays nicely with for , for of and while loops


async function showTimeout (milliseconds, id) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(id," Done!");
        resolve("OK");
      }, milliseconds);
    });
};

(async function() {
    console.log("start");

    ["first", "second", "third"].forEach(async (id) => {
        await showTimeout(2000, id);
    });

    console.log("end");
})();


//We receive:

//start
//end
//first  Done!
//second  Done!
//third  Done!


//As you can see, the “start” and “end” finish first, followed then by all async functions at the same time, which is not what you’re likely going for here.


async function showTimeout (milliseconds, id) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(id," Done!");
        resolve("OK");
      }, milliseconds);
    });
};

(async function() {
    console.log("start");

    for (const item of ["first", "second", "third"]) {
        await showTimeout(2000, item);
    }

    console.log("end");
})()


//We receive

//start
//first  Done!
//second  Done!
//third  Done!
//end
