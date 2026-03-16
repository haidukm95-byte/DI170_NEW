//Exercise 6 : Fortune teller

//Instructions

//Create a self invoking function that takes 4 arguments: number of children, 
// partner’s name, geographic location, job title.

//The function should display in the DOM a sentence like "You will be a 
// <job title> in <geographic location>, and married to <partner's name> 
// with <number of children> kids."
(function(numofkids, pname, geolocation, jobtitle) {
    document.body.innerHTML = `You will be a ${jobtitle} in ${geolocation}, and married to ${pname} with ${numofkids} kids.`;
})(3, 'Shlomit', 'Israel', 'Full stack web developer');
