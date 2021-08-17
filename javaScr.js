const app=()=>{
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const reset = document.querySelector(".reset");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");

    //Sounds
    const sounds = document.querySelectorAll(".sounds button");
    //Time
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".timer button");

    //outline length
    const outlineLength = outline.getTotalLength();

    //Durations by default
    let fakeDuration = 600;
    let curtime = 0;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //select sound
    timeSelect.forEach(option=>{
        option.addEventListener('click',function(){
                fakeDuration = this.getAttribute("data-time");
                let seconds = Math.floor(fakeDuration % 60);
                let minutes = Math.floor(fakeDuration / 60);
                if(seconds < 10){ 
                    seconds = "0" + seconds;
                    } 
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }
                timeDisplay.textContent = `${minutes}:${seconds}`;
            });
    });

    sounds.forEach(sounds=>{
        sounds.addEventListener("click", function(){
            song.src = this.getAttribute('data-sound');
            video.src= this.getAttribute('data-video');
            play.src = "./images/play.png";
        });

    });

    reset.addEventListener('click',function(fakeDuration){
        curtime = 0;
        song.pause();
        video.pause();
        play.src = "./images/play.png";
        minutes = "00";
        seconds = "00";
        timeDisplay.textContent = `${minutes}:${seconds}`;
        outline.style.strokeDashoffset  = outlineLength;
        fakeDuration = 600;
    });

    //play Sound
    play.addEventListener('click',()=>{
        checkPlaying(song);
   });
    
    //stop and play sound
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src="./images/pause.png";
        }
        else{
            song.pause();
            video.pause();
            play.src="./images/play.png";
        }
    };

    song.ontimeupdate = ()=>{
        if(!song.paused){
            let currentTime = curtime;
            let elapse = fakeDuration - currentTime;
            let seconds = Math.floor(elapse % 60);
            let minutes = Math.floor(elapse / 60);
            
            if(seconds < 10){ 
                seconds = "0" + seconds;
                } 
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            
            let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
            outline.style.strokeDashoffset  = progress;
            timeDisplay.textContent = `${minutes}:${seconds}`;

            curtime = curtime + .25;
            
            if(currentTime >= fakeDuration){
            song.pause();
            curtime = 0;
            play.src  = "./images/play.png";
            video.pause();
        }
    }
   };
};

app();