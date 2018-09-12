const express = require('express');
const app = express();

var morgan = require('morgan')
morgan(':method :url :status :response-time ms - :res[content-length]')

const axios = require('axios');

// need to have cache start blank and then populate after you make the call to the api
var cache = {}

app.get('/', function (req, res) {
    // if there's i in the url, then check if it's cached or not. If cached, serve cache. If not, API request
    if (req.query.i !== undefined) {
        if (cache.id == req.query.i) {
            res.send(cache.data)
            console.log('cache with id')
            console.log(cache.id)
        }

        else {
            axios.get('http://www.omdbapi.com/?i=' + req.query.i + '&apikey=8730e0e')
                .then(response => {
                    res.send(response.data)
                    cache.id = req.query.i
                    cache.data = response.data
                    console.log('new api call with id')
                    console.log(cache.id)
                    })
                .catch(error => {
                    console.log(error);
                  });
        }
    }
    

    // else if there's t in the url, then check if it's cached or not. If cached, serve cache. If not, API request
    else if (req.query.t !== undefined) {
        if (cache.title == req.query.t) {
            res.send(cache.data)
            console.log('cache with title')
            console.log(cache.title)
        }

        else {
            var query = encodeURI(req.query.t)
            axios.get('http://www.omdbapi.com/?t=' + query + '&apikey=8730e0e')
                .then(response => {
                        res.send(response.data)
                        cache.title = req.query.t;
                        cache.data = response.data
                        console.log('new api call with title')
                        console.log(cache.title)
                    })
                .catch(error => {
                    console.log(error);
                    });
        }
    }


    // else return an error
    else {
        console.log(error)
    }

});









// THIS WORKS TO GET CACHED TITLE
// app.get('/', function (req, res) {
//     // if the thing they are searching is in cache, send cache
//     if (cache.title == req.query.t) {
//         res.send(cache.data)
//         console.log('cache')
//     }
//     // otherwise get it from api
//     else {
//         axios.get('http://www.omdbapi.com/?t=' + req.query.t + '&apikey=8730e0e')
//         .then(response => {
//                 cache.title = req.query.t;
//                 cache.data = response.data
//                 res.send(response.data)
//                 console.log(cache.title)
//             })
//           .catch(error => {
//             console.log(error);
//           });
//     };
// })





// THIS WORKS TO SHOW API DATA
// app.get('/', function (req, res) {
// axios.get('http://www.omdbapi.com/?t=' + req.query.t + '&apikey=8730e0e')
//         .then(response => {
//                 res.send(response.data)
//                 console.log('not cache')
//             })
//           .catch(error => {
//             console.log(error);
//           });
//         })
    

// THIS WORKS to TELL ME IS I OR T IS USED
// app.get('/', function (req, res) {
//     if (req.query.i == undefined) {
//         axios.get('http://www.omdbapi.com/?t=' + req.query.t + '&apikey=8730e0e')
//             .then(response => {
//                     res.send(response.data)
//                     console.log('title')
//                 })
//               .catch(error => {
//                 console.log(error);
//               });
//     }

//     else {
//         axios.get('http://www.omdbapi.com/?i=' + req.query.i + '&apikey=8730e0e')
//             .then(response => {
//                     res.send(response.data)
//                     console.log('index')
//                 })
//               .catch(error => {
//                 console.log(error);
//               });
//     }
        
// })



module.exports = app;