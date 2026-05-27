const otpBox = document.getElementById("otpBox");
const timerText = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const answers = document.getElementById("answers");
const result = document.getElementById("result");
const inputSection = document.getElementById("inputSection");

let otpList = [];
let round = 0;

const TOTAL_OTPS = 10;
const DISPLAY_TIME = 3;

function generateOTP() {
    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();
}

function showOTP() {

    let otp = generateOTP();

    otpList.push(otp);

    otpBox.textContent = otp;

    let timeLeft = DISPLAY_TIME;

    timerText.textContent =
    `Next OTP in: ${timeLeft}`;

    let countdown = setInterval(() => {

        timeLeft--;

        timerText.textContent =
        `Next OTP in: ${timeLeft}`;

        if(timeLeft <= 0){

            clearInterval(countdown);

            round++;

            if(round < TOTAL_OTPS){

                showOTP();

            } else {

                otpBox.textContent =
                "Finished";

                timerText.textContent =
                "Enter OTPs below";

                inputSection.hidden = false;
            }

        }

    },1000);

}

startBtn.addEventListener("click",()=>{

    startBtn.disabled = true;

    otpList = [];
    round = 0;

    result.textContent = "";

    inputSection.hidden = true;

    answers.value = "";

    showOTP();

});

submitBtn.addEventListener("click",()=>{

    let userInput =
    answers.value
    .trim()
    .split("\n")
    .map(x=>x.trim());

    let score = 0;

    for(let otp of otpList){

        if(userInput.includes(otp)){
            score++;
        }

    }

    result.innerHTML =
    `Score: ${score}/${TOTAL_OTPS}<br>
     Accuracy:
     ${Math.round(score/TOTAL_OTPS*100)}%`;

});
