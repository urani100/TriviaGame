
$("document").ready(function(){

       
        // set interval beetween questions...
        //reset start button at the end?
      
        trivia= [
        {triviaQuestion: "how do you say CAKE in french", triviaChoices:["galette", "pain", 'gateau', 'ciel'], answer:"gateau"},
        {triviaQuestion: "how do you say COOKIES in french", triviaChoices:["voiture", "bateau", 'gateau', 'bonbon'], answer:"bonbon"}
        // {triviaQuestion: "how do you say SKY in french", triviaChoices:["savon", "oiseau", 'ciel', 'lumiere'], answer:"ciel"}
        // {triviaQuestion: "how do you say bird in french", triviaChoices:["pain", "oiseau", 'ciel', 'lumiere'], answer:"oiseau"}
        ];

        pictures =["assets/images/gateau.jpg", "assets/images/pain.jpg", "assets/images/element.jpg"];


        var triviaIndex = 0;
        var wins = 0;
        var losses = 0;
        var unanswered = 0; 
        var number = 10;
        var intervalId;
        
        // resets questions fields
        function resetField (){ 
                $('.triviaChoices').empty();    
                $('.question').empty();
                $('#timer').empty();
                $('#image').hide();
        }


      //populates questions and assigns "values" to them 
      function populate(){
        
                var arr = trivia[triviaIndex].triviaChoices;
                var triviaQ = trivia[triviaIndex].triviaQuestion;
                var correctAnswer = trivia[triviaIndex].answer;
        
                $(".question").text(triviaQ); // populating question

                for(var i = 0; i < trivia[triviaIndex].triviaChoices.length; i++){
                var btn =  $('<button>');
                btn.addClass('triviaOptions'); // used for the onclick
                btn.attr("data-value", arr[i]); // set the actual value of the button
                btn.text(arr[i]); // shows the label
                 $('.triviaChoices').append(btn); // appends the class to html
                 
                }
                
        }

        // comapares user's value and correct answer and take approiate actions 
        function  evaluate(value){
                var correctAnswer = trivia[triviaIndex].answer;
                triviaIndex++;
                        if(value === correctAnswer){
                                wins++;
                                stopTimer();
                                $("#timer").html("YOU ARE CORRECT!!!")
                                pictureChange(); 
                                setTimeout(nextQuestionH, 4000);
                         }else{
                                losses++;
                                stopTimer();
                                $("#timer").html("SORRY THIS IS INCORRECT!!! The correct answer is: " + correctAnswer); 
                                pictureChange(); 
                                setTimeout(nextQuestionH, 4000);
                               // $('#image').hide();
                         }
                
   
        };// end of evaluate function
        
        // happy path next question
        function nextQuestionH(){
                if(triviaIndex < trivia.length){
                        resetField();
                        populate(); 
                        timer(); 
                }else{
                      reset();
                       //game is over 
                }
        }


        //alternative path next question
        // will not use nextQuestionPos here because the condition of the else statements are not the same
        function nextQuestionA(){
                resetField ();
                populate(); 
                timer();
        }

        // timer function
        function timer(){ 
                intervalId = setInterval(decrement, 1000);
        }

        //decrement function associated to timer
        function decrement (){
                number --; 
                $('#timer').html('The remaining time is: ' + number + ' seconds');
                if(number === 0 && triviaIndex < trivia.length-1){
                        triviaIndex++;
                        unanswered++;  
                        stopTimer();
                        $("#timer").html("SORRY YOU ARE OUT OF TIME!!! The correct answer is: "); //+ correctAnswer
                        pictureChange(); 
                        setTimeout(nextQuestionA, 4000);                

                }else if(number === 0 && triviaIndex === trivia.length-1){
                        // why do I have this condition? this is the end of the game NO????
                         unanswered++; 
                         $("#timer").html("SORRY YOU ARE OUT OF TIME!!! The correct answer is: " ); //+ correctAnswer
                         pictureChange(); 
                        reset();
                }
        }



        
        // stop timer function
        function stopTimer(){
                number = 10;
                clearInterval(intervalId);
        }

        // change picture function
        function pictureChange(){
                $('#image').show();
                $("#image").html("<img src=" + pictures[triviaIndex-1] + " width='500px'>");
        }

        // reset function
        function reset(){
                triviaIndex = 0;
                stopTimer();
                resetField ();
                $('#wins').html(wins).show(); // show only at the end of the game
                $('#losses').html(losses).show(); // show only at the end of the game
                $('#unanswered').html(unanswered).show(); // show only at the end of the game
                $('.start').show();
        }

        // init function
         $('.start').on("click", function(){
                populate();
                timer();
                $('.start').hide(); // bring back at the end of the game
                $('#wins').hide(); // show only at the end of the game!
                $('#losses').hide(); // show only at the end of the game!
                $('#unanswered').hide(); // show only at the end of the game?
                wins = 0;
                losses = 0;
                unanswered=0;
        });

        // Add a listener to the document for dynamically created triviaOptions element
        $(document).on('click', ".triviaOptions", function(){
        var value = ($(this).attr('data-value'));
        evaluate(value);

        
});

     
       

})//end of ducument.ready

