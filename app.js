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
    
const cardsContainer = document.querySelector(".deck");       
let openedCards = [];
let matchedCards = [];

//CREATE AN ARRAY TO HOLD THE ICONS
const icons = ["C", "C", "I", "I", "R", "R", "C", "C", "L", "L", "E", "E", "S", "S", "8", "8"];
    
    
    
//BUILD CARD GAME, INVOKE CLICK EVENT, AND SHUFFLE ICONS FOR THE NEW GAME.   
function init() {
    
    //LOOP THRU THE ICONS AND BUILD THE CARDS. BUILD THE PARENT CONTAINER AND APPEND THE CHILDREN.
    
    //SHUFFLE THE ICONS.
    shuffle(icons);
    
    for(let i=0; i<icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        
        //'<li><i class="fa fa-star"><fa fa-star"></i></li>
        card.innerHTML = icons[i];       
        
        cardsContainer.appendChild(card);

        //INVOKE A CLICK EVENT FOR EACH CARD.
        click(card);
    }        
}    
        
        
        
//SHUFFLE THE ICONS.
function shuffle(deck) {
    //EACH RE-SHUFFLE GET 3000 SHUFFLES OF THE ICONS.
    //SHUFFLE THE ICONS OF RANDOM CARDS BETWEEN THE 2 'SHUFFLE' ARRAYS. 

    for(var i=0; i<3000; i++) {
        let currentCard = Math.floor((Math.random() * deck.length));
        let randomCard = Math.floor((Math.random() * deck.length));
        let tmp = deck[currentCard];

        deck[currentCard] = deck[randomCard];
        deck[randomCard] = tmp;            
    }
        return deck;
}
    
    

//THE BUTTON FOR THE 'GAME-RULES' INSTRUCTIONS.
function GameRulesBtn() {             
    document.getElementById("gameRules").style.display = "contents"; 
    setTimeout (function() {
           document.getElementById("gameRules").style.display = "none";
        }, 12000);            
} 
    
    
        
//THE CLICK EVENT LISTENER.
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
                
                //CONSISTENTLY CHECK IF 'GAME IS OVER'!
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
        
        
        
//CONSISTENTLY CHECK IF 'GAME IS OVER'.
function isOver() {
    if(matchedCards.length === icons.length) {
        alert("Game Over! You WIN with " +moves+ " moves.");
        
        //alert("You Win! ... Game Over! You WON with " +fa fa-star+ " stars" +moves+ " moves.");
        //starsContainer.innerHTML
    }        
}       
   
  
        
//THE 'ADDMOVE' FUNCTION ADDS EACH MOVE TO THE COUNTER.
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
        
        
//THE 'RESTART BUTTON'("TRY AGAIN") PREPARES FOR A BRAND NEW GAME.
const restartBtn = document.querySelector(".restart");
    
    restartBtn.addEventListener("click", function() {
        //DELETE ALL CARDS.
        cardsContainer.innerHTML = "";
        
        //CALL 'INIT' TO CREATE NEW CARDS.
        init();
        
        //RESET OTHER PARTS OF THE CODE.
        matchedCards = [];
        openedCards = [];
        
        moves = 0;
        movesContainer.innerHTML = moves;        
        starsContainer.innerHTML = ['<li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li> <li><i class="fa fa-star"><fa fa-star"></i></li>'];
    });
        
        
        
//INVOKE 'INIT' TO RE-BUILD A NEW GAME AND RE-SHUFFLE NEW CARDS.
init();