
$("document").ready(function(){

// This HW is heavily commented because if its inticate steps (I was so lost at one point lol)
// I want to ensure that I remmember the reasons behind my choices, espacially if I revisit it in the future.
// This code has only been been tested in Chrome

      
        trivia= [
        {triviaQuestion: "The Nile River Flows Through", triviaChoices:["Egytpt", "Egypt, Ethiopia and Eritrea", "Egypt & 10 other countries", "Rwanda"], answer:"Egypt & 10 other countries"},
        {triviaQuestion: "The Yangtze River is _ _ _ _ _  Long", triviaChoices:["5,080 km", "6,380 km", '6,883 km', '3,380 km'], answer:"6,380 km"},
        {triviaQuestion: "The longest River in North America is The_ _ _ _ _ _ River", triviaChoices:["Missouri", "Colorado", "Mackenzie", "Ohio"], answer:"Missouri"},
        {triviaQuestion: "The Loire River is located in", triviaChoices:["Italy", "Switzerland", 'Liechtenstein', 'France'], answer:"France"},
        {triviaQuestion: "The World's Deepest Recorded River is Located in", triviaChoices:["China", "India", 'The U.S.A', "The Kongo"], answer:"The Kongo"},
        {triviaQuestion: "The Amazon River Flows Through Brazil, Peru & _ _ _ _ _ _ _ _", triviaChoices:["Columbia", "Venezuela", "Bolivia", 'Mexico'], answer:"Columbia"},
        {triviaQuestion: "The Most Sacred River to Hindus in India is The", triviaChoices:["Narmada", "Betwa", "Gange", "Godavari"], answer:"Gange"}
        ];

        pictures =["assets/images/nile.png", "assets/images/yangtze.png", "assets/images/Missouri.png", 
                  "assets/images/loire.png", "assets/images/kongo2.png", "assets/images/amazon.png","assets/images/gange.png"];


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
                correctAnswer = trivia[triviaIndex].answer; // must be global
        
                $(".question").text(triviaQ); // populating question

                for(var i = 0; i < trivia[triviaIndex].triviaChoices.length; i++){
                var btn =  $('<div>');
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
                                $(".question").html("CORRECT!")
                                pictureChange(); 
                                setTimeout(nextQuestionH, 9000);
                         }else{
                                losses++;
                                stopTimer();
                                $(".question").html("You are Incorect. The Answer is: " + correctAnswer); 
                                pictureChange(); 
                                setTimeout(nextQuestionH, 9000);
                               // $('#image').hide();
                         }
                
   
        };
        
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
                $('#timer').html('Your Remaining Time For This Question is: ' + number + ' Seconds');

                if(number === 0 && triviaIndex < trivia.length-1){
                        triviaIndex++;
                        unanswered++;  
                        stopTimer();
                        $(".question").html("You are out of time. The Correct Answer is: " + correctAnswer); 
                        pictureChange(); 
                        setTimeout(nextQuestionA, 9000);                

                }else if(number === 0 && triviaIndex === trivia.length-1){
                        //Needs improovement ... was not not sure how to go about it... but it does the job

                        //triviaIndex is not incremented otherwise it would go out of bound
                        stopTimer();// working in conjunction with the setTimeout
                        unanswered++; 
                        $(".question").html("You are out of time. The Correct Answer is: " + correctAnswer); 
                        //pictureChange(); // index is not incremented therefore it would show the wrong picture
                        $('#image').show();
                        $("#image").html("<img src=" + pictures[triviaIndex] + "width='800px'>");
                        setTimeout(reset, 4000); //necessary otherwise picture does not have a chance to show one last time
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
                $("#image").html("<img src=" + pictures[triviaIndex-1] + " width='800px'>");
        }

        // reset function
        function reset(){
                triviaIndex = 0;
                stopTimer();
                resetField ();
                $('#wins').html('WINS:' + wins).show(); // show only at the end of the game
                $('#losses').html('LOSSES:' +losses).show(); // show only at the end of the game
                $('#unanswered').html('UNANSWERED:' + unanswered).show(); // show only at the end of the game
                $('.start').show(); // show only at the end of the game
        }

        // start function
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

        // Add a listener to the document for dynamically created triviaOptions elements
        $(document).on('click', ".triviaOptions", function(){
        var value = ($(this).attr('data-value'));
        evaluate(value);
        });      

})//end of ducument.ready

