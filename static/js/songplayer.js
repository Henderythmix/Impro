var Player = {
    SongLoader: document.getElementById("loaded-song"),
    SongBar: document.querySelectorAll("#song-length"),
    AudioManager: {
        0: new Audio(),
    },
    BPS: 1,
    CurrentBar: 0,
    LoadedSong: null,
    PlayingSong: false,
    BigPlayerOpen: false,
    CurrentSong: "Song",
    CurrentArtists: "Artist",
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
            Player.LoadSong("sound", data);
        },
    });
});

Player.LoadSong = function(type, SongID) {
    let NameTag = document.querySelector("#song-name");
    let ArtistTag = document.querySelector("#song-artist");
    let SongInfo = document.querySelector("#song-info");

    if (type == "sound") {
        // This is if it is to load a normal wave file
        Player.AudioManager[0].src = "http://localhost:3000/API/LoadSong/" + SongID;

        $.get("http://localhost:3000/API/LoadSongMeta/" + SongID, function(data, status) {

            let parseddata = JSON.parse(data);

            let Song, Artist;

            if (parseddata.common.title != null) {
                Song = parseddata.common.title;
            } else {
                Song = SongID;
            }

            if (parseddata.common.artist != null) {
                Artist = parseddata.common.artist;
            } else {
            Artist = "Unknown";
            }

            NameTag.innerHTML = Song;
            ArtistTag.innerHTML = Artist;
            SongInfo.innerHTML = Song + " - " + Artist;

            document.getElementById("song-info").innerHTML = Song + " - " + Artist;

            console.log(data);
        }).then(function() {
            for (i=0; i < Player.AudioManager.length; i++) {
                Player.AudioManager[i].load();
            }
            console.log("Loaded Song:" + SongID + "; Now Playing: " + Player.AudioManager[0].src);
            let playPromise = Player.AudioManager[0].play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    Player.PlayingSong = true
                })
            }
        })
    } else if (type == "package") {
        $.get("http://localhost:3000/API/imp/LoadSongMeta/" + SongID, function(data, status) {
            let parseddata = data;

            NameTag.innerHTML = parseddata.SongName;
            ArtistTag.innerHTML = parseddata.Artist;
            SongInfo.innerHTML = parseddata.SongName + " - " + parseddata.Artist;
        }).then(function() {
            Player.AudioManager[0].src = "http://localhost:3000/API/imp/LoadSong/" + SongID;
        }).then(function() {

            for (i=0; i < Player.AudioManager.length; i++) {
                if (Player.AudioManager[i] != null) Player.AudioManager[i].load();
            }
            console.log("Loaded Song:" + SongID + "; Now Playing: " + Player.AudioManager[0].src);
            let playPromise = Player.AudioManager[0].play();

            if (playPromise !== undefined) {
                console.log("play")
            }

            Player.PlayingSong = true;
        });
    }
}

Player.PlayPauseClick = function() {
    if (Player.PlayingSong) {
        Player.PlayPause("pause");
    } else {
        Player.PlayPause("play");
    } 
}

Player.PlayPause = function(a) {
    if (a == "pause") {
        // Pausing
        for (i=0; i < Player.AudioManager.length; i++) {
            Player.AudioManager[i].pause();
        }
        Player.PlayingSong = false;
    } else if (a == "play") {
        // Playing
        Player.AudioManager[0].play();
        Player.PlayingSong = true;
    }
}


// EVENT LISTENERS //

Player.SongBar[0].addEventListener("input", function () {
    Player.AudioManager[0].currentTime = Player.SongBar[0].value;
});

Player.SongBar[1].addEventListener("input", function() {
    Player.AudioManager[0].currentTime = Player.SongBar[1].value;
});

document.getElementById("big-player-manager").onclick = function() {
    if (Player.BigPlayerOpen) {
        $(".popup-background").fadeOut();
        Player.BigPlayerOpen = false;
    } else {
        $(".popup-background").fadeIn();
        Player.BigPlayerOpen = true;
    }
};

// UPDATE FUNCTION //
Player.Update = function() {
    // Update Song Time Left
    SongLeftMinutes = Math.floor((Player.AudioManager[0].duration - Player.AudioManager[0].currentTime) / 60);
    SongLeftSeconds = Math.floor((Player.AudioManager[0].duration - Player.AudioManager[0].currentTime) % 60);

    vSongLeftSeconds = SongLeftSeconds;

    if (SongLeftSeconds < 10) {
        vSongLeftSeconds = "0" + SongLeftSeconds;
    }

    let songTime = document.querySelector("#song-time");
    if (isNaN(SongLeftMinutes)) {
        songTime.innerHTML = "0:00";
    } else {
        songTime.innerHTML = SongLeftMinutes + ":" + vSongLeftSeconds;
    }

    // Update Song Distance

    let songLength = document.querySelectorAll("#song-length");
    if (!isNaN(Player.AudioManager[0].duration) && Player.PlayingSong) {
        songLength[0].max = Player.AudioManager[0].duration;
        songLength[0].value = Player.AudioManager[0].currentTime;
        songLength[1].max = Player.AudioManager[0].duration;
        songLength[1].value = Player.AudioManager[0].currentTime;
    }
    
    // Just Easily Controlling Volume
    for (i=0; i < Player.AudioManager.length; i++) {
        Player.AudioManager[i].volume = document.getElementById("volume-knob").value / 10;
    }

    // Managing the Play/Pause Button Icon
    if (Player.PlayingSong) {
        document.querySelectorAll("#pauseplay-icon")[0].src = "svg/play.svg";
        document.querySelectorAll("#pauseplay-icon")[1].src = "svg/play.svg";
    } else {
        document.querySelectorAll("#pauseplay-icon")[0].src = "svg/pause.svg";
        document.querySelectorAll("#pauseplay-icon")[1].src = "svg/pause.svg";
    }
}