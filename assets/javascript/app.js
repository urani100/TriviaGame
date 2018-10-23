
$("document").ready(function(){

        // add timer
        // add picture 
        //reset start button at the end
        // 


        trivia= [
        {triviaQuestion: "how do you say CAKE in french", triviaChoices:["galette", "pain", 'gateau', 'ciel'], answer:"gateau"},
        {triviaQuestion: "how do you say COOKIES in french", triviaChoices:["voiture", "bateau", 'gateau', 'bonbon'], answer:"bonbon"},
        {triviaQuestion: "how do you say SKY in french", triviaChoices:["savon", "oiseau", 'ciel', 'lumiere'], answer:"ciel"},
        {triviaQuestion: "how do you say bird in french", triviaChoices:["savon", "oiseau", 'ciel', 'lumiere'], answer:"oiseau"}
        ];


        var triviaIndex = 0;
        

        function  resetField (){ 
        $('.triviaChoices').empty();    
        }



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

        function  evaluate(value){
               
                var correctAnswer = trivia[triviaIndex].answer;
                        triviaIndex++;
                       
                        console.log(triviaIndex);
                        if(value === correctAnswer){
                                console.log("yes");
                         }else{
                                console.log("no");
                         }

                        if(triviaIndex < trivia.length){
                                resetField ();
                                poputate();

                        }else{
                                //$('.start').show()???
                                triviaIndex = 0;
                                resetField ();
                                 poputate();

                        }
                
        };

     // Add a listener to the document for dynamically created triviaOptions element
      $(document).on('click', ".triviaOptions", function(){
                var value = ($(this).attr('data-value'));
                evaluate(value);
        });

        
         $('.start').on("click", function(){
                poputate();
                $('.start').hide(); // bring back at the end of the game

        });

     
       

})//end of ducument.ready

