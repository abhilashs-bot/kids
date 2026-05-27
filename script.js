const otpBox = document.getElementById("otpBox");
const timerText = document.getElementById("timer");
const resetBtn = document.getElementById("resetBtn");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const submitBtn = document.getElementById("submitBtn");

const answers = document.getElementById("answers");

const result = document.getElementById("result");

const inputSection =
document.getElementById("inputSection");

const otpHistory =
document.getElementById("otpHistory");

const historySection =
document.getElementById("historySection");

const TOTAL_OTPS = 10;
const DISPLAY_TIME = 3;

let otpList = [];
let round = 0;

let timerInterval = null;
let running = false;

function generateOTP(){

return Math.floor(
100000 + Math.random()*900000
).toString();

}

function finishGame(stopped=false){

running = false;

clearInterval(timerInterval);

timerInterval = null;

otpBox.textContent =
stopped ? "Stopped" : "Finished";

timerText.textContent =
"Enter OTPs below";

startBtn.disabled = false;
stopBtn.disabled = true;

inputSection.hidden = false;

historySection.hidden = false;

otpHistory.innerHTML =
otpList
.map(
otp =>
`<div class="otpCard">
${otp}
</div>`
)
.join("");

function showOTP(){

if(!running) return;

const otp = generateOTP();

otpList.push(otp);

otpBox.textContent = otp;

let seconds = DISPLAY_TIME;

timerText.textContent =
`Next OTP in ${seconds}s`;

clearInterval(timerInterval);

timerInterval =
setInterval(()=>{

if(!running){

clearInterval(timerInterval);

return;

}

seconds--;

timerText.textContent =
`Next OTP in ${seconds}s`;

if(seconds <= 0){

clearInterval(timerInterval);

round++;

if(!running) return;

if(round >= TOTAL_OTPS){

finishGame();

}else{

showOTP();

}

}

},1000);

}

startBtn.onclick = ()=>{

running = true;

otpList = [];

round = 0;

answers.value = "";

result.textContent = "";

historySection.hidden = true;

inputSection.hidden = true;

startBtn.disabled = true;

stopBtn.disabled = false;

showOTP();

};

stopBtn.onclick = ()=>{

finishGame(true);

};

submitBtn.onclick = ()=>{

const entered =
answers.value
.trim()
.split("\n")
.map(x=>x.trim())
.filter(x=>x);

let score = 0;

otpList.forEach(otp=>{

if(
entered.includes(otp)
){

score++;

}

});

const accuracy =
otpList.length
? Math.round(
(score/otpList.length)*100
)
:0;

result.innerHTML =
`
Score:
${score}/${otpList.length}
<br>
Accuracy:
${accuracy}%
`;

};

  function resetGame(){

running=false;

clearInterval(timerInterval);

timerInterval=null;

otpList=[];

round=0;

otpBox.textContent="------";

timerText.textContent=
"Press Start";

answers.value="";

result.textContent="";

otpHistory.innerHTML="";

historySection.hidden=true;

inputSection.hidden=true;

startBtn.disabled=false;

stopBtn.disabled=true;

}
  resetBtn.onclick=()=>{

resetGame();

};
