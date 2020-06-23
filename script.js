// - Title of the question
// - Options of the question
// - Correct answer
let start = document.querySelector(".start");
let quizComponent = document.querySelector(".quizComponent");
quizComponent.style.display = "none";
start.addEventListener("click", handleDisplay);
// localStorage.getItem('index') || [];


function handleDisplay() {
    start.outerHTML = "";
    quizComponent.style.display="block";
}


class Question{
    constructor(title,options,correctAnswerIndex){
        this.title = title;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
        // localStorage.setItem("question",JSON.stringify(Question));
        // localStorage.setItem("array",JSON.stringify(this.questions));    
        // let parse = JSON.parse(localStorage["question"]);
    }
    
    isCorrect(userAnswer){      
        return (this.correctAnswerIndex === userAnswer);
        
    }
    
    getCorrectAnswer(){
        return this.options[this.correctAnswerIndex];
    }
    
    createUI(){
        return  `<form>
        <fieldset>
        <legend>${this.title}</legend>
        <div class="option-box">
            
                ${this.options.map(
                    (option,index) =>  `
                    <div class = "options">
                    <input type="radio" id="contactChoice-${index}" name="option" value=${index}  class="userAnswer">
                    <label for="contactChoice-${index}">${option}</label>
                    </div>
                    `
                        ).join("")}
                
          
                
          </div>
          </fieldset>
          </form>`;
    }
}



let questionOne = new Question(
    "Inside which HTML element do we put the Javascript?",
    ["&ltjs&gt","&ltjavascript&gt","&ltscript&gt","&ltscripting&gt"],
    2
);

let questionTwo = new Question(
    "Which is the correct syntax to display'Javascript' using alertbox in Javascript?",
    ["alertbox('Javascript')","msg('Javascript')","msgbox('Javascript')","alert('Javascript')"],
    3
    );
let questionThree = new Question(
    "Which is the correct syntax for referring to an external script called 'script.js'",
    ["&lt script src='geek.js' &gt","&lt script href='geek.js' &gt","&lt script ref='geek.js' &gt","&lt script name='geek.js' &gt"],
    0
    );
let questionFour = new Question(
    "The external JavaScript file must contain &lt script &gt tag. True or False?",
    ["True","False"],
    1
    );
let questionFive = new Question(
    "Which of the following is not a reserved word in JavaScript?",
    [" interface","throws","program","short"],
    2
    );

let questionSix = new Question(
    "What is the syntax for creating a function in JavaScript named as jsDev?",
    ["function = jsDev()","function jsDev()","function := jsDev()","function : jsDev()"],
    1
    );
let questionSeven = new Question(
    "How is the function named 'jSDev' called in JavaScript?",
    [" call jSDev();","call function jSDev();","jSDev()","function : jSdev()"],
    2
    );
let questionEight = new Question(
    " What is the correct syntax for adding comments in JavaScript?",
    [" &lt!–This is a comment–&gt","//This is a comment","**This is a comment**"],
    1
    );
let questionNine = new Question(
    "What is the JavaScript syntax for printing values in Console?",
    ["print(5)","console.log(5);"," console.print(5);","print.console(5);"],
    1
    );
let questionTen = new Question(
    "What is the method in JavaScript used to remove the whitespace at the beginning and end of any string ?",
    ["strip()","trim()","stripped()","trimmed()"],
    1
    );


    
    
questionOne.createUI();
questionTwo.createUI();

let root = document.getElementById("root");

let nextBtn = document.querySelector(".btn");
let progress = document.querySelector(".progress");
let p = document.querySelector("p");
let score = document.querySelector("h3");
let error = document.querySelector(".error"); 
let retake = document.querySelector(".retake");


class Quiz{
    constructor(rootElm,nextElm,questions){
        this.questions = questions;
        // localStorage.setItem("array",JSON.stringify(this.questions));    
        // let parse = JSON.parse(localStorage["array"]);//now parse == this.questions in localStorage
        // console.log(parse);
           
        this.rootElm  = rootElm;
        this.nextElm  = nextElm;
        this.activeQuestionIndex = 0;
        this.score = 0;
        
        progress.max = this.questions.length;
        progress.value = 0;
        p.innerText = ` Question : ${this.activeQuestionIndex+1} / ${this.questions.length}`;
        // console.log(`${this.activeQuestionIndex}`);
        
    }
    
    nextQuestion(index){
        //check whether it has reached end of the array
        if(this.activeQuestionIndex < this.questions.length-1){
            this.activeQuestionIndex ++;
            progress.value++;
            retake.display = "none";
            p.innerText = ` Question : ${this.activeQuestionIndex+1} / ${this.questions.length}`;
            this.rootElm.innerHTML = this.questions[
            this.activeQuestionIndex
            ].createUI();
            console.log(this.activeQuestionIndex);
            // this.activeQuestionIndex++;
            // localStorage.setItem('index',this.activeQuestionIndex);
            
        }
        else {
            root.innerHTML = "";
            progress.outerHTML = "";
            p.outerHTML = "";
            nextBtn.outerHTML = "";
            error.outerHTML = "";
            // console.log(this.score);
            score.textContent = "Score : " + this.score +" / " +this.questions.length;
            retake.classList.add("showRetake");
            function reload(){
                window.location.reload();
            }
            retake.addEventListener("click",reload);
        }
        
    }

    updateScore(){
        this.score++;
        // localStorage.setItem('score', this.score++);
        // localStorage.setItem("index", this.activeQuestionIndex);
        // console.log((this.questions[this.activeQuestionIndex].correctAnswerIndex) == answer.value);
        // console.log("correctAns : " + this.questions[this.activeQuestionIndex].correctAnswerIndex);
    }

    rootUI(){
        this.nextElm.addEventListener('click', () => {
            const answer = document.querySelector(".userAnswer:checked"); 
             
                     
            if(!answer) {
                error.innerText = "Choose Any One!!";
                return
            }
            
            // "returning a string value so we are converting it to number"
            if((this.questions[this.activeQuestionIndex].isCorrect(+answer.value))){
                error.innerHTML = "";
                this.updateScore();
            }
            
            // calling nextQuestion with activeQuestionIndex
            this.nextQuestion(this.activeQuestionIndex)
            
        });
       
        
        
        this.rootElm.innerHTML = this.questions[
            this.activeQuestionIndex
        ].createUI();
        
    }
}



let quiz = new Quiz(root,nextBtn,[
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
    questionFive,
    questionSix,
    questionSeven,
    questionEight,
    questionNine,
    questionTen,
]);
quiz.rootUI();





