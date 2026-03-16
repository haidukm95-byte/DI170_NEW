console.log("Starting ...")


const getArtwork = () => {
    console.log("Working ...")
    fetch("https://api.artic.edu/api/v1/artworks/14572")
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Wrong artwork")
            }
        })
        .then((obj) => {
            console.log(obj);
            console.log(`The painting is named ${obj.data.title} 
                         by the artist ${obj.data.artist_title}`)
        })
        .catch(function (error) {
            console.log(`We got the error ${error}`)
        });
    console.log("Work Done ...")
}


getArtwork()