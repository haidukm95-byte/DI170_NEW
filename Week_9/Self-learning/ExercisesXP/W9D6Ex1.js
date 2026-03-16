//Exercise 1 : Location
//Instructions

    //Analyze the code below. What will be the output?

const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);
// The destructurization method has been impemented.
// name, city, country, latitude, longtitude will be displayed on the output.
//Output: I am John Doe from Vancouver, Canada. Latitude49.2827, Longtitude-123.1207

