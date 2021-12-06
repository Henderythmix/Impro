const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: "tmp/"});

app.use("/", express.static('static'))

// API HTTP Requests //

app.use('/API', bodyParser.json({limit: '100mb'}));

// This is a test function
app.get('/API/test', function(req, res) {
    res.send('This is a Test API Call. Nothing Really happens, you just get this text lol')
    console.log("Ok it's actually happening... Everybody Stay Calm! STAY ****ING CALM!!!")
});

// Upload a song file using this
app.post('/API/UploadSong', upload.single('Song'), function(req, res) {
    console.log("Song has been temporarily uploaded: " + req.file.originalname);
    res.send(req.file.filename);
});

// Load a song file with this
app.get('/API/LoadSong/:id', function(req, res) {
    res.sendFile(__dirname + '/tmp/' + req.params.id)
})

// Get the Song Data of a song (separate)
/*app.get('API/LoadRegularSongInfo/:id', function(req, res) {

});/*

/* Example JQuery POST Request
$.ajax({
        url: '/API/RenderSong',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({id: "test"}),
        success: function(response){ alert(response); },
});
*/

app.listen(port, () => {
    console.log(`Impro is running on http://localhost:${port}`)
});