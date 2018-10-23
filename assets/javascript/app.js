
$("document").ready(function(){

       
        // set interval beetween questions...
        // where should I place the settimeout between questions? would be inefficeient if I was 
        //to use it everytime I call populate?
        //the clock must be place on time out as well 

        //create a function that calls these function in a bumdle then place a time out on it....

        //reset start button at the end
      


        trivia= [
        {triviaQuestion: "how do you say CAKE in french", triviaChoices:["galette", "pain", 'gateau', 'ciel'], answer:"gateau"},
        {triviaQuestion: "how do you say COOKIES in french", triviaChoices:["voiture", "bateau", 'gateau', 'bonbon'], answer:"bonbon"},
        {triviaQuestion: "how do you say SKY in french", triviaChoices:["savon", "oiseau", 'ciel', 'lumiere'], answer:"ciel"},
        {triviaQuestion: "how do you say bird in french", triviaChoices:["pain", "oiseau", 'ciel', 'lumiere'], answer:"oiseau"}
        ];

        pictures =["assets/images/gateau.jpg", "assets/images/pain.jpg", "assets/images/gateau.jpg", "assets/images/pain.jpg"];



        var triviaIndex = 0;
        var wins = 0;
        var losses = 0;
        var number = 10;
        var intervalId;
        
        // resets questions fields
        function  resetField (){ 
        $('.triviaChoices').empty();    
        }


      //populates question and assign "values" to them 
      function populate(){
        
                var arr = trivia[triviaIndex].triviaChoices;
                console.log(trivia[triviaIndex].triviaChoices);
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

        // evaluate function comapares user's value and correct answer and take approiate actions 
        function  evaluate(value){
                var correctAnswer = trivia[triviaIndex].answer;
                
                triviaIndex++;
                        if(value === correctAnswer){
                                pictureChange();
                                wins++;
                                $('#wins').html(wins); // show only at the end of the game?
                                stopTimer();
                                console.log("yes");
                         }else{
                                pictureChange();
                                losses++;
                                $('#losses').html(losses); // show only at the end of the game?
                                stopTimer();
                                console.log("no");
                         }

                        if(triviaIndex < trivia.length){
                                resetField ();
                                setTimeout(populate, 4000);
                                //populate();  // interval?
                                timer();

                        }else{
                               
                                triviaIndex = 0;
                                resetField ();
                                 populate(); // interval?
                                 timer();
                                 
                        }
                
        };
        
        
        // timer function
        function timer(){ 
                intervalId = setInterval(decrement, 1000);
        }


        //decrement function associated with timer
        function decrement (){
                number --; 
                $('#timer').html('The remaining time is: ' + number + ' seconds');
                if(number === 0 && triviaIndex < trivia.length-1){
                        losses++; // only takes place 3 times 4th time is not registered. 
                        $('#losses').html(losses); // show only at the end of the game?
                        console.log(triviaIndex);
                        stopTimer();
                        triviaIndex++;
                        resetField ();
                        populate(); 
                        timer();

                }else if(number === 0 && triviaIndex === trivia.length-1){
                        losses++; // only takes place 3 times 4th time is not registered. 
                        $('#losses').html(losses); // show only at the end of the game?
                        //that is the end of the game? restart...
                        console.log("the game ended");
                        stopTimer();
                        triviaIndex = 0;
                        resetField ();
                        populate(); // interval?
                        timer();
                        
                }
        }
        
        // stop timer function
        function stopTimer(){
                number = 10;
                clearInterval(intervalId);
        }

        // change picture function
        function pictureChange(){
                $("#image").html("<img src=" + pictures[triviaIndex] + " width='100px'>").fadeOut(4000);
        }
        

     // Add a listener to the document for dynamically created triviaOptions element
      $(document).on('click', ".triviaOptions", function(){
                var value = ($(this).attr('data-value'));
                evaluate(value);
                
        });

        
         $('.start').on("click", function(){
                populate();
                timer();
                $('.start').hide(); // bring back at the end of the game

        });

     
       

})//end of ducument.ready

