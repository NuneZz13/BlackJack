// pcm 20172018a Blackjack oop

let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization(){
    document.getElementById("card").disabled        = false;
    document.getElementById("stand").disabled       = false;
    document.getElementById("new_game").disabled    = true;
}

function finalize_buttons(){
    document.getElementById("card").disabled        = true;
    document.getElementById("stand").disabled       = true;
    document.getElementById("new_game").disabled    = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game(){

    game = new BlackJack();
    document.getElementById("winner").style.visibility = "hidden"
    document.getElementById("lose").style.visibility = "hidden"

    //While para percorrer todos os childs do div "dealermove" e até este ter childs(cartas) remove os mesmo até ficar vazio
    let divdealer = document.getElementById("dealermove");
    while(divdealer.firstChild){
        divdealer.removeChild(divdealer.firstChild);
    }

    let divplayer = document.getElementById("playermove");
    while(divplayer.firstChild){
        divplayer.removeChild(divplayer.firstChild);
    }

    dealer_new_card();
    dealer_new_card();

    let dealercards = game.get_dealer_cards();
    let aux = document.getElementById("dealermove").firstElementChild.nextSibling;
    aux.setAttribute("src", "img/back.png");

    player_new_card();
    buttons_initialization();


    document.getElementById("dealer").innerHTML = JSON.stringify(dealercards);



    //debug(game);
}

function update_dealer(state){
    let dealerCards = JSON.stringify(game.get_dealer_cards());

    //verifica se o jogo ganhou
    if(state.gameEnded){
        //verifica se o dealer ganhou
        if(state.dealerWon){
            document.getElementById("lose").src = "img/youlose.png"
            document.getElementById("winner").style.visibility = "visible"
            document.getElementById("lose").style.visibility = "visible"
            dealerCards += " GANHOU!";
        }
        else{
            document.getElementById("lose").src = "img/youwin.png"
            document.getElementById("winner").style.visibility = "visible"
            document.getElementById("lose").style.visibility = "visible"
            dealerCards += " PERDEU!";
        }
        finalize_buttons();
    }
    document.getElementById("dealer").innerHTML = dealerCards;
}

function update_player(state){
    let playerCards = JSON.stringify(game.get_player_cards());

    if(state.gameEnded){
        if(state.playerBusted){
            document.getElementById("lose").src = "img/youlose.png"
            document.getElementById("winner").style.visibility = "visible"
            document.getElementById("lose").style.visibility = "visible"
            playerCards += " PERDEU!";
        }
        else {
            document.getElementById("lose").src = "img/youwin.png"
            document.getElementById("winner").style.visibility = "visible"
            document.getElementById("lose").style.visibility = "visible"
            playerCards += " GANHOU!";
        }
        finalize_buttons();
    }
    document.getElementById("player").innerHTML = playerCards;
}

function dealer_new_card(){
    let state = game.dealer_move();
    update_dealer(state);
    //debug(game);
    return state;
}

function player_new_card(){
    let state = game.player_move();
    update_player(state);
    //debug(game);
    return state;
}

function dealer_finish(){
    game.setDealerTurn(true);

    let state = game.get_game_state();
    let dealercards = game.get_dealer_cards();
    let aux = document.getElementById("dealermove").firstElementChild.nextSibling;
    aux.setAttribute("src", dealercards[1].img);
    update_dealer(state);
    
    while(!state.gameEnded){
        update_dealer(state);
        dealer_new_card();
        state = game.get_game_state();
    }



}

