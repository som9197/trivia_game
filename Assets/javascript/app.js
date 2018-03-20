$("#start").on("click" , function(){
    $("#start").remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
})

$(document).on('click', '#reset', function(){
    game.reset();
})

var questions = [{
    question: "In the episode 'Diwali', Michael eats some Indian food and spits it out because he thinks it is what?",
    answers: ["Pizza Pocket", "Pop Tart", "Monkey Brains", "Smores"],
    correctAnswer: "Smores",
    image:"./../images/diwali.gif"
}, {
    question: "Where did Michael get his 'World's Best Boss' mug?",
    answers: ["Birthday Present", "His Mother", "Spencer's", "Corporate"],
    correctAnswer: "Spencer's",
    image:"./../images/mug.gif"
}, {
    question: "What Pennsylvania county is Dunder Mifflin's Scranton branch located in?",
    answers: ["Wallenpaupack County", "Carbondale County", "Lackawanna County", "Throop County"],
    correctAnswer: "Lackawanna County",
    image:"./../images/Lackawanna.gif"
}, {
    question: "Members of the Stamford branch played what video game that Jim was terrible at?",
    answers: ["Metal Gear Solid", "Halo", "Call of Duty", "Minesweeper"],
    correctAnswer: "Call of Duty",
    image:"./../images/CallofDuty.gif"
}, {
    question: "What is the name of the HR rep at Corporate in New York?",
    answers: ["Rory", "Kendall", "Rolando", "Erin"],
    correctAnswer: "Kendall",
    image:"./../images/wallace.gif"
}, {
    question: "Which of the following companies was NOT a competitor of Dunder Mifflin?",
    answers: ["Osprey Paper", "Prince Paper", "Big Red Paper Company", "Herfindahl Paper Company"],
    correctAnswer: "Herfindahl Paper Company",
    image:"./../images/competitors.gif"
}, {
    question: "Kelly sabotages Dwight and Jim's performance reviews becuase they didn't attend which party?",
    answers: ["America's Got Talent", "The Voice", "America's Next Top Model", "Glee"],
    correctAnswer: "America's Got Talent",
    image:"./../images/kelly.gif"
}, {
    question: "At the end of 'Basketball', which office worker is shown draining shots?",
    answers: ["Phyllis", "Kevin", "Ryan", "Angela"],
    correctAnswer: "Kevin",
    image:"./../images/Kevin.gif"
}, {
    question: "Where is Michael's favorite place to grab a New York slice?",
    answers: ["Lombardi's", "Roberta's", "Mario's", "Sbarro"],
    correctAnswer: "Sbarro",
    image:"./../images/Sbarro.gif"
}, {
    question: "At the end of 'Basketball', which office worker is shown draining shots?",
    answers: ["Phyllis", "Kevin", "Ryan", "Angela"],
    correctAnswer: "Kevin",
    image:"./../images/Kevin.gif"
}];

var game = {
    questions:questions,
    currentQuestion:0,
    counter:10,
    correct:0,
    incorrect:0,
    countdown: function (){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("Time Up!");
            game.timeUp();
        }
    },
    loadQuestion: function (){
        timer = setInterval(game.countdown,1000);
        $('#subwrapper').html("<h2> Time Remaining <span id='counter'>10</span> Seconds </h2>");
        $('#subwrapper').append('<h2>'+ questions[game.currentQuestion].question+'</h2>');
        for(var i=0; i<questions[game.currentQuestion].answers.length; i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 10; 
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        $('#subwrapper').html('<h2>Out of Time</h2>');
        $('#subwrapper').append('<h3> The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'<h3>'); 
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>Complete</h2>");
        $('#subwrapper').append("<h3>Correct: "+game.correct+"<h3>");
        $('#subwrapper').append("<h3>Incorrect: "+game.incorrect)+"</h3>";
        $('#subwrapper').append("<button id='reset'>RESET</button>");
  
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else{
            game.answeredIncorrectly();
        }

    },
    answeredCorrectly: function(){
        console.log("Yes!");
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>YES!</h2>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log('NO NO NO NOOOOOOOOOO!');
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>DWIGHT YOU IGNORANT SLUT!</h2>');
        $('#subwrapper').append('<h3> The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'<h3>'); 
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        gmae.loadQuestion();
    }
}



