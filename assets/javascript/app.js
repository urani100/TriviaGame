
$("document").ready(function(){

        trivia= [
        {triviaQuestion: "how do you say CAKE in french", triviaChoices:["galette", "pain", 'gateau', 'ciel'], answer:"gateau"},
        {triviaQuestion: "how do you say COOKIES in french", triviaChoices:["voiture", "bateau", 'gateau', 'bonbon'], answer:"bonbon"},
        {triviaQuestion: "how do you say SKY in french", triviaChoices:["savon", "oiseau", 'ciel', 'lumiere'], answer:"ciel"}
        ];

        var triviaIndex = 0;
        
        //how do I move to the next?
        //clear previous values
       //on click only works one time...

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
                resetField();
                poputate();
                if(value === correctAnswer){
                        alert("yes");
                }else{
                        alert("no");
                }
        };


       // poputate();
        
 

       //does not work unless poputate() is beeing call in it's scope?
      // works for the other games!??
      
       

      $(document).on('click', ".triviaOptions", function(){
                debugger;
                var value = ($(this).attr('data-value'));
                evaluate(value);

        });

        
         $('.start').on("click", function(){
                poputate();
                $('.start').hide(); // bring back at the end of the game

                // $('.triviaOptions').on('click', 'button', function(){
                //         value = ($(this).attr('data-value'));
                //         console.log(value);
                //         evaluate(value);
                //         triviaIndex++; 
                //         resetField();
                //         poputate();
                        
                        
                // });
        
               
                
        });

     
       

})//end of ducument.ready

