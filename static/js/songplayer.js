var Player = {
    SongLoader: document.getElementById("loaded-song"),
    AudioManager: [
        new Audio(),
    ],

    LoadedSong: null,
}

Player.LoadSongFile = function() {
    Player.SongLoader.click();
}

Player.SongLoader.addEventListener("change", function() {
    SongData = Player.SongLoader.files[0];

    var songUpload = new FormData();
    songUpload.append('Song', SongData);

    $.ajax(
    {
        url: 'http://localhost:3000/API/UploadSong', 
        type: 'POST', 
       contentType: false, 
        processData: false,
        data: songUpload,
        success: function(data, status) {
            Player.LoadSong(data);
        },
    });
});

Player.LoadSong = function(SongID) {
    Player.AudioManager[0].src = "http://localhost:3000/API/LoadSong/" + SongID;
    console.log("Loaded Song:" + SongID + "; Now Playing: " + Player.AudioManager[0].src);
    Player.AudioManager[0].play();
}

Player.Update = function() {

}