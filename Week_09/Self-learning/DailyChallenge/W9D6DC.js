//What You will learn :

// Create Objects
//Instructions

//In this exercise, you will use object oriented programming concepts to define and 
// use a custom object in JavaScript.

//    1. Create a class named Video. The class should be constructed with the following 
// parameters:

//        title (a string)
//     uploader (a string, the person who uploaded it)
//      time (a number, the duration of the video - in seconds)


//  2. Create a method called watch() which displays a string as follows:
//    “uploader parameter watched all time parameter of title parameter!”

//  3. Instantiate a new Video instance and call the watch() method.
//  4. Instantiate a second Video instance with different values.
//  5. Bonus: Use an array to store data for five Video instances (ie. title, uploader, time)
//    Think of the best data structure to save this information within the array.
//  6. Bonus: Loop through the array to instantiate those instances.

class Video{
    constructor(title, uploader, time){
        this.title=title;
        this.uploader=uploader;
        this.time=time;
    }
    watch(){
        if (this.time>=60){
            console.log(`${this.uploader} watched all ${Math.floor(this.time/60)} minutes ${Math.floor(this.time%60)} seconds of ${this.title}!`);
        }
        else{
            console.log(`${this.uploader} watched all ${Math.floor(this.time)} seconds of ${this.title}!`);
        }    
    }
}

const newVid1=new Video('Understeering - episode 1','Marko', 1093);
const newVid2=new Video('GTA Movie \'Portal - Vice City Smokers - ep12\'', 'Sasha', 746);
const newVid3=new Video('Robocop', 'Marko', 4823);
const newVid4=new Video('Pacific P16 logging off-highway truck in work', 'Marko', 1021);
const newVid5=new Video('UFC 6', 'Sasha', 1322);
newVid1.watch();
newVid2.watch();
//Bonus 1:
const videoData = [newVid1, newVid2, newVid3, newVid4, newVid5];
//Bonus 2:
videoData.forEach(v => v.watch());
