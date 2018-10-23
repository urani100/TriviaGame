
$("document").ready(function(){

       
        // add picture 
        //reset start button at the end
      


        trivia= [
        {triviaQuestion: "how do you say CAKE in french", triviaChoices:["galette", "pain", 'gateau', 'ciel'], answer:"gateau"},
        {triviaQuestion: "how do you say COOKIES in french", triviaChoices:["voiture", "bateau", 'gateau', 'bonbon'], answer:"bonbon"}
        // {triviaQuestion: "how do you say SKY in french", triviaChoices:["savon", "oiseau", 'ciel', 'lumiere'], answer:"ciel"},
        // {triviaQuestion: "how do you say bird in french", triviaChoices:["savon", "oiseau", 'ciel', 'lumiere'], answer:"oiseau"}
        ];


        var triviaIndex = 0;
        var wins = 0;
        var losses = 0;
        var number = 10;
        var intervalId;
        
        // resets questions
        function  resetField (){ 
        $('.triviaChoices').empty();    
        }


      //populates question and assign "values" to them 
      function poputate(){
        
                var arr = trivia[triviaIndex].triviaChoices;
                var triviaQ = trivia[triviaIndex].triviaQuestion;
                var correctAnswer = trivia[triviaIndex].answer;
        
                $(".question").text(triviaQ); // populating question

                for(var i = 0; i < trivia[triviaIndex].triviaChoices.length; i++){
                
                var btn =  $('<button>');
                btn.addClass('triviaOptions'); // used for the onclick
                btn.attr("data-value", arr[i]); // set the actual value of the button
                btn.text(arr[i]); // shows the label
                 $('.triviaChoices').append(btn); // appends the class to the html
                 
                }
                
        }

        // evaluates function comapares user's value and correct answer and take apporiate actions 
        function  evaluate(value){
                var correctAnswer = trivia[triviaIndex].answer;
                        triviaIndex++;
                       
                        console.log(triviaIndex);
                        if(value === correctAnswer){
                                wins++;
                                $('#wins').html(wins); // show only at the end of the game?
                                stopTimer();
                                console.log("yes");
                         }else{
                                losses++;
                                $('#losses').html(losses); // show only at the end of the game?
                                stopTimer();
                                console.log("no");
                         }

                        if(triviaIndex < trivia.length){
                                resetField ();
                                poputate(); 
                                timer();

                        }else{
                               
                                triviaIndex = 0;
                                resetField ();
                                 poputate();
                                 timer();
                                 
                        }
                
        };
        
        
        // timer function
        function timer(){ 
                intervalId = setInterval(decrement, 1000);
        }


        //Decrement function associated with timer
        function decrement (){
                number --; 
                $('#timer').html('The reamining time is: ' + number + ' seconds');
                if(number === 0 && triviaIndex < trivia.length-1){
                        stopTimer();
                        triviaIndex++;
                        resetField ();
                        poputate(); 
                        timer();
                        losses++;
                        $('#losses').html(losses); // show only at the end of the game?

                }else if(number === 0 && triviaIndex === trivia.length-1){
                        stopTimer();
                        triviaIndex = 0;
                        resetField ();
                        poputate();
                        timer();
                        
                }
        }
        
        // stop timer function
        function stopTimer(){
                number = 10;
                clearInterval(intervalId);
        }

      
        

     // Add a listener to the document for dynamically created triviaOptions element
      $(document).on('click', ".triviaOptions", function(){
                var value = ($(this).attr('data-value'));
                evaluate(value);
                
        });

        
         $('.start').on("click", function(){
                poputate();
                timer();
                $('.start').hide(); // bring back at the end of the game

        });

     
       

})//end of ducument.ready

