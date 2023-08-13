const el = document.getElementById('playboard');
const x = Math.round(el.offsetHeight/55);
const y = Math.round(el.offsetWidth/55);
const totalbubbles = x * y;
let bubbles = '';
let score = 0;
let time = 60;
let hitval = 0;
const gameover = '<div class="overtag">Game Over</div>';
const bubblerap = '<div class="bubbles" id="bubbles"></div>';

function fbubbles(){
    bubbles = '';
    for (let i = 0; i < totalbubbles; i++) {
        const num = Math.round(Math.random()*10)
        bubbles +=`<button class="bubble">${num}</button>`;
        if(i == totalbubbles - 1){
            document.getElementById('bubbles').innerHTML = bubbles;
        }
    }
}

function fhitval(){
    hitval = Math.round(Math.random()*10);
    document.getElementById('hitval').textContent = hitval;
}

document.getElementById('bubbles').addEventListener('click', (el) => {    
    if(Number(el.target.textContent) == parseInt(hitval)){
        score += 10;
        document.getElementById('scoreval').textContent = score;
        fbubbles();
        fhitval();
    }
})

function ftimer(){
    time = 60;
    const timer = setInterval(function(){
        if(time > 0){
            time--;
            document.getElementById('timeval').textContent = time;
        }else{
            clearInterval(timer);
            document.getElementById('playboard').innerHTML = gameover;
            const highscore = localStorage.getItem('highscore');
            if(highscore !==null && parseInt(highscore) < parseInt(score)){
                localStorage.setItem('highscore', score);
                gethighscore();
            }else{
                gethighscore();
            }
        }
    }, 1000)
}

function gethighscore(){
    const highscore = localStorage.getItem('highscore');
    if(highscore !==null){
        document.getElementById('highscore').textContent = highscore;
    }else{
        localStorage.setItem('highscore', 0)
    }
    
}

document.getElementById('replay').addEventListener('click', () => {
    if(time <= 0){
        document.getElementById('playboard').innerHTML = bubblerap;
        fhitval();
        fbubbles();
        ftimer();
        gethighscore();  
    }
})

fhitval();
fbubbles();
ftimer();
gethighscore();
