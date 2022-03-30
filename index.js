const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest: "tmp/"});

const mm = require('music-metadata');

const exec = require('child_process').exec;

app.use("/", express.static('static'))

// API HTTP Requests //

app.use('/API', bodyParser.json({limit: '500mb'}));

// This is a test function
app.get('/API/test', function(req, res) {
    res.send('This is a Test API Call. Nothing Really happens, you just get this text lol')
    console.log("Ok it's actually happening... Everybody Stay Calm!")
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

// Get the Song Data of a song (separate); Returns a string in JSON formatting
app.get('/API/LoadSongMeta/:id', async function(req, res) {
    //try {
        let songmeta = await mm.parseFile(__dirname + "/tmp/" + req.params.id);
        console.log(songmeta);
        res.send(JSON.stringify(songmeta));
    //} catch (error) {
    //    res.send("ERROR");
    //}
});

app.get('/API/imp/LoadSong/:id', function(req, res) {
    exec("python ./python/impromanager.py --generate-song " + req.params.id, function(error, stdout, stderr) {
        console.log(stdout)
        res.send(JSON.stringify(__dirname + "/temp.wav"))
    });
});

app.get('/API/imp/LoadSongMeta/:id', function(req, res) {
    res.sendFile(__dirname + "/Songs/" + req.params.id + "/song.json")
})

app.listen(port, () => {
    console.log(`Impro is running on http://localhost:${port}`)
});