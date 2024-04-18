
// ? questions and options
let questions = [
    {
        numb: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
          "Hyper Text Preprocessor",
          "Hyper Text Markup Language",
          "Hyper Text Multiple Language",
          "Hyper Tool Multi Language"
        ]
      },
      {
        numb: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
          "Common Style Sheet",
          "Colorful Style Sheet",
          "Computer Style Sheet",
          "Cascading Style Sheet"
        ]
      },
      {
        numb: 3,
        question: "What does PHP stand for?",
        answer: "Hypertext Preprocessor",
        options: [
          "Hypertext Preprocessor",
          "Hypertext Programming",
          "Hypertext Preprogramming",
          "Hometext Preprocessor"
        ]
      },
        {
        numb: 4,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        options: [
          "Stylish Question Language",
          "Stylesheet Query Language",
          "Statement Question Language",
          "Structured Query Language"
        ]
      },
        {
        numb: 5,
        question: "What does XML stand for?",
        answer: "eXtensible Markup Language",
        options: [
          "eXtensible Markup Language",
          "eXecutable Multiple Language",
          "eXTra Multi-Program Language",
          "eXamine Multiple Language"
        ]
      },
      {
        numb: 6,
        question: "What does MERN stack stand for?",
        answer: " MongoDB, Express.js, React, Node.js",
        options: [
          " MongoDB, Express.js, React, Node.js",
          " MySQL, Ember.js, React, .NET",
          " MongoDB, Express.js, Angular, Node.js",
          " Meteor.js, Ember.js, React, Node.js"
        ]
      },
      {
        numb: 7,
        question: "Which component of the MERN stack is used for server-side routing and middleware handling?",
        answer: " Express.js",
        options: [
          " MongoDB",
          " Express.js",
          " React",
          " Node.js"
        ]
      },
      {
        numb: 8,
        question: "Which database is commonly used with the MERN stack for storing data?",
        answer: " MongoDB",
        options: [
          " MySQL",
          " PostgreSQL",
          " MongoDB",
          " SQLite"
        ]
      },
      {
        numb: 9,
        question: "What is the role of React in the MERN stack?",
        answer: " Frontend user interface",
        options: [
          " Backend server",
          " Database management",
          " Frontend user interface",
          " Middleware"
        ]
      },
      {
        numb: 10,
        question: "Which tool is used for managing dependencies and packages in a Node.js project?",
        answer: " npm (Node Package Manager)",
        options: [
          " npm (Node Package Manager)",
          " Git",
          " Docker",
          " Yarn"
        ]
      },     
];

const start_btn = document.querySelector('.start-btn');
const info_box = document.querySelector(".info-box");
const continue_btn = document.querySelector('.restart');
const quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector(".result-box");
const option_list = document.querySelector(".option-list");
const timeText = document.querySelector(".timer-txt");
const timeCount = document.querySelector(".timer-sec");
const time_line = document.querySelector(".time-line");
const bottom_ques = document.querySelector(".total-que");
const next_btn = document.querySelector(".next-btn");
const quit_quiz = document.querySelector(".quit");

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// ?start quiz button
start_btn.addEventListener('click', () => {
    info_box.classList.add('activeInfo');
});
// ? continue button
continue_btn.addEventListener('click', () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(timeValue);
    startTimerLine(widthValue);
});

// ?next button
next_btn.addEventListener('click', () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
});


// ? quit button
quit_quiz.addEventListener('click', ()=>{
    window.location.reload();
});


// ? getting questions and options
function showQuestions(index){
    const que_text = document.querySelector(".questions");

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="bi bi-check-lg"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="bi bi-x"></i>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if(userAns == correcAns){
        userScore +=1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("correct Answer");
        console.log("Your correct answers = " + userScore);
    } else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
        
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

    const scoreText = result_box.querySelector(".score-txt");
    
    let scoreMessage;
    if (userScore > 10) {
      scoreMessage = `<span> Excellent! You got <p>${userScore}</p> out of <p>${questions.length}</p>.</span>`;
  } else if (userScore > 8) {
    scoreMessage = `<span> Great Job! You got <p>${userScore}</p> out of <p>${questions.length}</p>.</span>`;
  } else if (userScore > 5) {
    scoreMessage = `<span> congrats! You got <p>${userScore}</p> out of <p>${questions.length}</p>.</span>`;
  } else if (userScore > 3) {
      scoreMessage = `<span>Nice! You got <p>${userScore}</p> out of <p>${questions.length}</p>.</span>`;
  } else if (userScore > 1) {
    scoreMessage = `<span>Well done! You got <p>${userScore}</p> out of <p>${questions.length}</p>.</span>`;
  } else {
      scoreMessage = `<span>Sorry, you got only <p>${userScore}</p> out of <p>${questions.length}</p>.</span>`;
  }

  scoreText.innerHTML = scoreMessage;

}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                } 
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time +=1;
        time_line.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}


function queCounter(index){
    let totalQueCounTag = `<span><p>${index}</p> of <p>${questions.length}</p> Questions</span>`;
    bottom_ques.innerHTML = totalQueCounTag; 
}