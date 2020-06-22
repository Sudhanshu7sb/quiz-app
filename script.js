// - Title of the question
// - Options of the question
// - Correct answer

class Question{
    constructor(title,options,correctAnswerIndex){
        this.title = title;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
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
        <div>
            
                ${this.options.map(
                    (option,index) =>  `
                    <input type="radio" id="contactChoice-${index}" name="option" value=${index}  class="userAnswer">
                    <label for="contactChoice-${index}">${option}</label>
                    `
                        ).join("")}
                
          
                
          </div>
          </fieldset>
          </form>`;
    }
}



let questionOne = new Question(
    "Which HTML element is used for displaying the biggest header",
    ["h1","h2","h4","h7"],
    0
);

let questionTwo = new Question(
    "Which element is used to provide title of the page",
    ["h1","p","title","i"],
    2
    );
let questionThree = new Question(
    "Which element is used to emphasize text?",
    ["h1","p","em","i"],
    2
    );
let questionFour = new Question(
    "How many heading elements are there in HTML5?",
    ["1","3","5","6"],
    3
    );
let questionFive = new Question(
    "Which tag is used to link pages?",
    ["link","a","href","ref"],
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
        this.rootElm  = rootElm;
        this.nextElm  = nextElm;
        this.activeQuestionIndex = 0;
        this.score = 0;
        
        progress.max = this.questions.length;
        progress.value = 0;
        p.innerText = ` Question : ${this.activeQuestionIndex+1} / ${this.questions.length}`;
        
        
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
        }
        else {
            root.innerHTML = "";
            progress.outerHTML = "";
            p.outerHTML = "";
            nextBtn.outerHTML = "";
            error.outerHTML = "";
            console.log(this.score);
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
            console.log("NO : " +  answer.value);
            // "returning a string value so we are converting it to number"
            if((this.questions[this.activeQuestionIndex].isCorrect(+answer.value))){
                console.log( "Yes : " +answer.value);
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
]);

quiz.rootUI();

