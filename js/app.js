//I FOLLOWED MY STRONG DESIRE HERE TO EXPRESS MY CREATIVE THOUGHTS TO BUILD A SLIGHTLY DIFFERENT MEMORY GAME. THIS CONCEPT IS BASED ON BRIGHT, YELLOW, SUNSHINE CIRCLES THAT PUSH THE USER'S MOOD TO HAPPY FEELINGS OF BRIGHT, WARM, FUN THOUGHTS AND EMOTIONS. I BELIEVE THAT THE USER'S EMOTIONS WILL THEN CREATE A DESIRE TO KEEP PLAYING THE "HAPPY YELLOW SUNSHINE CIRCLES GAME" OVER AND OVER AND OVER AGAIN LOL. I INTEND TO COMEBACK LATER TO ADD "WARM, HAPPY, SUNSHINE-RELATED" ICONS TO INCREASE THE USER'S HAPPY, EMOTIONAL FEELINGS!

//MY RUBRIC TO BUILD THIS PROJECT!
//WHAT ARE THE PROJECT'S FINAL OBJECTIVES ?
//DETERMINE THE 'LOGIC STATEGIES BEST SUITED FOR THIS SPECIFIC PROJECT !
//BREAK UP THE PROJECT INTO 'MANY SMALL BUILDABLE PARTS' !
//DETERMINE THE BEST 'LOGIC STRATEGY' FOR EACH 'SMALL BUILDABLE PART' !
//RESEARCH 'EXAMPLES' FOR EACH 'LOGIC STRATEGY' FROM OTHER PROJECTS !
//WHICH 'SMALL BUILDABLE PARTS' WILL GET THE PROJECT STARTED QUICKLY !
//GET AS MANY 'SMALL WINS' ASAP WITH MY 'SMALL BUILDABLE PARTS' !
//WHICH CODE METHODS ARE MOST COMMONLY NEEDED FOR THIS PROJECT ?
//WHERE IS THE BEST LOCATION TO PLACE EACH PIECE OF 'CODE LOGIC' ???
//WHAT DEBUGGING METHODS ARE BEST USED FOR THIS PROJECT ?

//CREATE AN ARRAY TO HOLD THE ICONS.
const icons = ["C", "C", "I", "I", "R", "R", "C", "C", "L", "L", "E", "E", "S", "S", "8", "8"]; 
//PARENT CONTAINER TO HOLD THE CARDS.    
const cardsContainer = document.querySelector(".deck"); 
//CONTAINER TO EMPTY THE OPENEDCARDS ARRAY.
let openedCards = [];
//CONTAINER TO EMPTY THE MATCHEDCARDS ARRAY.
let matchedCards = [];


    
//INIT FUNCTION TO BUILD THE CARD GAME, INVOKE CLICK EVENT, AND SHUFFLE ICONS.   
function init() {
    
    //SHUFFLE THE ICONS.
    shuffle(icons);
    
    //LOOP THRU THE ICONS AND BUILD THE CARDS. BUILD THE PARENT CONTAINER.
    for(let i=0; i<icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        
        //DISPLAY THE LETTERS AND NUMBER ICONS ON THE CARD.
        card.innerHTML = icons[i];
        //'<li><i class="fa fa-star"><fa fa-star"></i></li>
        
        //APPEND THE CHILD CARDS TO THE 'DECK' PARENT CONTAINER. JAVASCRIPT LOGIC ADAPTED FROM: http://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript .
        cardsContainer.appendChild(card);

        //INVOKE A CLICK EVENT FOR EACH CARD.
        click(card);
    }        
}    
        
        
        
//'SHUFFLE THE ICONS' FUNCTION.
//LOGIC ADAPTED FROM: http://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript .
function shuffle(deck) {
    //EACH RE-SHUFFLE GET 3000 SHUFFLES OF THE ICONS.
    //SHUFFLE THE ICONS OF RANDOM CARDS BETWEEN THE 2 'SHUFFLE CARDS' ARRAYS. 

    for(var i=0; i<3000; i++) {
        let currentCard = Math.floor((Math.random() * deck.length));
        let randomCard = Math.floor((Math.random() * deck.length));
        let tmp = deck[currentCard];

        deck[currentCard] = deck[randomCard];
        deck[randomCard] = tmp;            
    }
        return deck;
}
    
    

//THE JAVASCRIPT LOGIC FOR THE "GAME-RULE INSTRUCTIONS" BUTTON.
//THIS BUTTON INSTRUCTS THE USER ON 'HOW-TO-PLAY' THE "HAPPY YELLOW SUNSHINE CIRCLES GAME". IT ALSO EXPLAINS THE MEANING OF THE "SKYBLUE SUNSHINE STAR" RATINGS. IT INCLUDES A TIMER TO 'TOGGLE OFF' THE GAME-RULE INSTRUCTIONS AFTER 12 SECONDS.
function GameRulesBtn() {             
    document.getElementById("gameRules").style.display = "contents"; 
    setTimeout (function() {
           document.getElementById("gameRules").style.display = "none";
        }, 12000);            
} 
    
    
        
//THE CLICK EVENT LISTENER, OPENED CARDS, AND MATCHED CARD FUNCTIONS.
//MY JAVASCRIPT LOGIC IS ADAPTED FROM: YAHYA ELHARONY @ https://www.youtube.com/watch?v=G8J13lmApkQ&t=2689s . THE YOUNG MAN GAVE AN EXCELLENT PROJECT WALKTHROUGH. HE CLEARLY AND THROUGHLY EXPLAINED THE JAVASCRIPT LOGIC, LINE BY LINE, AND PATIENTLY ASKED FOR QUESTIONS. EXCELLENT TUTORIAL!
function click(card) {
    
    //BUILD THE EVENT LISTENER FOR ALL CARD CLICKS.    
    card.addEventListener('click', function() {
        //console.log(card.innerHTML);

        const currentCard = this;
        const previousCard = openedCards[0];

        //COMPARE IF THE 2 OPENED CARDS MATCH ???
        if(openedCards.length === 1) {       

            card.classList.add('open', 'show', 'disabled');
            openedCards.push(this);

            compare(currentCard, previousCard);            

        }else{
            currentCard.classList.add('open', 'show', 'disabled');
            openedCards.push(this);
        }
    });    
}        
        

        
//COMPARE THE OPENED CARDS.
function compare(currentCard, previousCard) {    
    
    if(currentCard.innerHTML === previousCard.innerHTML) {
                //console.log('MATCHED');             
                
                //ADD MATCHED CARDS TO THE MATCHEDCARDS ARRAY.
                currentCard.classList.add('match');
                previousCard.classList.add('match');
                matchedCards.push(currentCard, previousCard);
                
                //CLEAR OPENEDCARDS ARRAY AFTER EACH MATCH!!!
                openedCards = [];  
                
                //CONSISTENTLY CHECK FOR THE END OF THE GAME!
                isOver();
        
            }else{
                
                //SET A DELAY FOR THE CURRENTCARD[1] TO DISPLAY ITS ICON. SET THE TIMEOUT TO ALLOW 433 MILLISECONDS TO DISPLAY THE 2ND ICON!
                setTimeout (function() {
                    currentCard.classList.remove('open', 'show', 'disabled');
                    previousCard.classList.remove('open', 'show', 'disabled');
                    //console.log('NO MATCH');
                    openedCards = [];
                }, 433);         
            }  
                //ADD 1 MOVE TO THE 'MOVES COUNTER' AFTER 2 CLICKS.     
                addMove();
        }   
        
        
        
//CONSISTENTLY CHECK FOR THE END OF THE GAME!
function isOver() {
    if(matchedCards.length === icons.length) {
        alert("Game Over! You WIN after making " +moves+ " moves.");
    }        
}       
   
  
        
//THE 'ADDMOVE' FUNCTION ADDS 1 MOVE TO THE COUNTER, AFTER MAKING 2 'CIRCLE CLICKS'. 
const movesContainer = document.querySelector('.moves');
    let moves = 0;
    movesContainer.innerHTML = 0;
    function addMove() {
        moves++;
        movesContainer.innerHTML = moves;
        
        //SET THE RATING.
        rating();        
    }
        
        
        
//THE 'STARS RATING SYSTEM' DETERMINES THE NUMBER OF 'STARS' EARNED.
//MY JAVASCRIPT LOGIC IS ADAPTED FROM: YAHYA ELHARONY @ https://www.youtube.com/watch?v=G8J13lmApkQ&t=2689s .
const starsContainer = document.querySelector('.stars');

function rating() {
    switch(moves) {
        case 5:
            starsContainer.innerHTML = '<li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li>';
            break;
        case 10:
            starsContainer.innerHTML = '<li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li>';
            break
        case 15:
            starsContainer.innerHTML = '<li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li>';
            break;
        case 20:
            starsContainer.innerHTML = '<li><i class="fa fa-star"><fa fa-star"></i></li>';
            break;
    }    
}
        
        
//THE 'RESTART BUTTON'("PLAY AGAIN") HELPS TO PREPARE FOR A BRAND NEW GAME.
const restartBtn = document.querySelector(".restart");
    
    restartBtn.addEventListener("click", function() {
        //DELETE ALL THE CARDS.
        cardsContainer.innerHTML = "";
        
        //CALL 'INIT' TO RE-BUILD A NEW "HAPPY YELLOW SUNSHINE CIRCLES GAME".
        init();
        
        //EMPTY THESE 2 ARRAYS.
        matchedCards = [];
        openedCards = [];
        
        //RE-SET THE MOVES AND STARS FUNCTIONS.
        moves = 0;
        movesContainer.innerHTML = moves;        
        starsContainer.innerHTML = ['<li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li>'];
    });
        
        
        
//CALL 'INIT' TO RE-BUILD A NEW GAME AND RE-SHUFFLE NEW CARDS.
init();