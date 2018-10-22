
$("document").ready(function(){
var obj = {
        trivia: [
        {triviaQuestion: "how do you say CAKE in french", triviaChoices:["galette", "pain", 'gateau', 'ciel'], answer:"gateau"},
        {triviaQuestion: "how do you say COOKIES in french", triviaChoices:["voiture", "bateau", 'gateau', 'bonbon'], answer:"bonbon"}
        ],

        triviaIndex : 0,
        
        //how do I move to the next?
        //clear previous values
        //triviaOptions does not work anymore grrrrrrrrr!!!!!!!!

         resetField: function(){ 
                $('.triviaChoices').empty();    
        },

        poputate: function (){
              
                var arr = this.trivia[this.triviaIndex].triviaChoices;
                var triviaQ = this.trivia[this.triviaIndex].triviaQuestion;
                
                $(".question").text(triviaQ);

                for(var i = 0; i < this.trivia[this.triviaIndex].triviaChoices.length; i++){
                
                var btn = $('<button>');
                btn.addClass('triviaOptions'); // used for the onclick
                btn.attr("data-value", arr[i]);
                btn.text(arr[i]); // shows the label
                $('.triviaChoices').append(btn); // appends the class to the html
                }
        },

        evaluate:function(value){
                var correctAnswer = this.trivia[this.triviaIndex].answer;
                if(value === correctAnswer){
                        alert("yes");
                }else{
                        alert("no");
                }
                this.triviaIndex++;
                this.resetField();
                this.poputate();
        }
        
       
}

obj.poputate();

        $('.triviaOptions').on('click', function(){
                var value = ($(this).attr('data-value'));
                obj.evaluate(value);
               
        });

        // $('.start').on("click", function(){
        //         debugger;
        //         obj.poputate();
        //         $('.start').hide(); // bring back at the end of the game
                
        // });

      
     

        

})//end of ducument.ready

