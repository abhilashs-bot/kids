const otpBox =
document.getElementById("otpBox");

const timerText =
document.getElementById("timer");

const startBtn =
document.getElementById("startBtn");

const stopBtn =
document.getElementById("stopBtn");

const submitBtn =
document.getElementById("submitBtn");

const answers =
document.getElementById("answers");

const result =
document.getElementById("result");

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

let timerInterval;
let running = false;

function generateOTP(){

return Math.floor(
100000 + Math.random()*900000
).toString();

}

function finishGame(){

running = false;

clearInterval(timerInterval);

otpBox.textContent =
"Finished";

timerText.textContent =
"Enter OTPs";

startBtn.disabled = false;
stopBtn.disabled = true;

inputSection.hidden = false;

historySection.hidden = false;

otpHistory.innerHTML =
otpList.join("<br>");

}

function showOTP(){

if(!running) return;

const otp = generateOTP();

otpList.push(otp);

otpBox.textContent = otp;

let timeLeft = DISPLAY_TIME;

timerText.textContent =
`Next OTP: ${timeLeft}s`;

clearInterval(timerInterval);

timerInterval =
setInterval(()=>{

timeLeft--;

timerText.textContent =
`Next OTP: ${timeLeft}s`;

if(timeLeft<=0){

clearInterval(
timerInterval
);

round++;

if(
round >= TOTAL_OTPS
){

finishGame();

}else{

showOTP();

}

}

},1000);

}

startBtn.addEventListener(
"click",
()=>{

running=true;

otpList=[];

round=0;

answers.value="";

result.textContent="";

historySection.hidden=true;

inputSection.hidden=true;

startBtn.disabled=true;

stopBtn.disabled=false;

showOTP();

});

stopBtn.addEventListener(
"click",
()=>{

finishGame();

});

submitBtn.addEventListener(
"click",
()=>{

const entered =
answers.value
.trim()
.split("\n")
.map(x=>x.trim());

let score=0;

otpList.forEach(
otp=>{

if(
entered.includes(otp)
){

score++;

}

});

const accuracy =
Math.round(
(score/
otpList.length)*100
);

result.innerHTML=
`
Correct:
${score}/${otpList.length}
<br>
Accuracy:
${accuracy}%
`;

});
