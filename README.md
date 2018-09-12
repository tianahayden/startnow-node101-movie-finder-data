In this project, I used the Express framework to build a server that can talk to another server and cache the results. My web server responds to GET requests for http://localhost:3000/ and return the data from the OMDb API (https://omdbapi.com/?apikey=8730e0e&i=tt0111161). 

When making a second request to the same endpoint http://localhost:3000/?i=tt3896198, the server doesn't return data from the OMDB API, but instead from cached data in an object or array.