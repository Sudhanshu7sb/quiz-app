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
        return this.options[this.correctAnswerIndex];
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
                    (option) => `<input type="radio" id="contactChoice1"
                    name=${this.title} value=${option} >
                        <label for="contactChoice3">${option}</label>`
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

class Quiz{
    constructor(rootElm,nextElm,questions){
        this.questions = questions;
        this.rootElm  = rootElm;
        this.nextElm  = nextElm;
        this.activeQuestionIndex = 0;
        this.score = 0;
    }

    nextQuestion(index){
       this.activeQuestionIndex ++;
       this.rootElm.innerHTML = this.questions[
        this.activeQuestionIndex
    ].createUI();
    // if(this.activeQuestionIndex > this.questions.length){
    //     root.innerHTML = "";
    //     console.log(root.innerHTML);
    // }
    
    
    
        
    }

    updateScore(index){
        this.score++;
        console.log(this.score);
    }

    rootUI(){
        // console.log(this.nextElm);
      
        
        this.nextElm.addEventListener('click', () => this.nextQuestion(this.activeQuestionIndex));
        this.nextElm.addEventListener('click', () => this.updateScore(this.activeQuestionIndex));
        
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

