// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;


// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            const suits = 4;
            const cards_per_suit = 13;
            let deck = [];
            for(let i = 0; i < suits * cards_per_suit; i++){
                deck[i] = (i % cards_per_suit) + 1;
            }
            deck[0] =  {valor: 1, img: "img/ace_of_clubs.png"};
            deck[1] =  {valor: 2, img: "img/2_of_clubs.png"};
            deck[2] =  {valor: 3, img: "img/3_of_clubs.png"};
            deck[3] =  {valor: 4, img: "img/4_of_clubs.png"};
            deck[4] =  {valor: 5, img: "img/5_of_clubs.png"};
            deck[5] =  {valor: 6, img: "img/6_of_clubs.png"};
            deck[6] =  {valor: 7, img: "img/7_of_clubs.png"};
            deck[8] =  {valor: 8, img: "img/8_of_clubs.png"};
            deck[9] =  {valor: 9, img: "img/9_of_clubs.png"};
            deck[10] =  {valor: 10, img: "img/10_of_clubs.png"};
            deck[11] =  {valor: 11, img: "img/queen_of_clubs.png"};
            deck[12] =  {valor: 12, img: "img/jack_of_clubs.png"};
            deck[13] =  {valor: 13, img: "img/king_of_clubs.png"};

            deck[14] =  {valor: 1, img: "img/ace_of_hearts.png"};
            deck[15] =  {valor: 2, img: "img/2_of_hearts.png"};
            deck[16] =  {valor: 3, img: "img/3_of_hearts.png"};
            deck[17] =  {valor: 4, img: "img/4_of_hearts.png"};
            deck[18] =  {valor: 5, img: "img/5_of_hearts.png"};
            deck[19] =  {valor: 6, img: "img/6_of_hearts.png"};
            deck[20] =  {valor: 7, img: "img/7_of_hearts.png"};
            deck[21] =  {valor: 8, img: "img/8_of_hearts.png"};
            deck[22] =  {valor: 9, img: "img/9_of_hearts.png"};
            deck[23] =  {valor: 10, img: "img/10_of_hearts.png"};
            deck[24] =  {valor: 11, img: "img/queen_of_hearts.png"};
            deck[25] =  {valor: 12, img: "img/jack_of_hearts.png"};
            deck[26] =  {valor: 13, img: "img/king_of_hearts.png"};


            deck[27] =  {valor: 1, img: "img/ace_of_diamonds.png"};
            deck[28] =  {valor: 2, img: "img/2_of_diamonds.png"};
            deck[29] =  {valor: 3, img: "img/3_of_diamonds.png"};
            deck[30] =  {valor: 4, img: "img/4_of_diamonds.png"};
            deck[31] =  {valor: 5, img: "img/5_of_diamonds.png"};
            deck[32] =  {valor: 6, img: "img/6_of_diamonds.png"};
            deck[33] =  {valor: 7, img: "img/7_of_diamonds.png"};
            deck[34] =  {valor: 8, img: "img/8_of_diamonds.png"};
            deck[35] =  {valor: 9, img: "img/9_of_diamonds.png"};
            deck[36] =  {valor: 10, img: "img/10_of_diamonds.png"};
            deck[37] =  {valor: 11, img: "img/queen_of_diamonds.png"};
            deck[38] =  {valor: 12, img: "img/jack_of_diamonds.png"};
            deck[39] =  {valor: 13, img: "img/king_of_diamonds.png"};

            deck[40] =  {valor: 1, img: "img/ace_of_spades.png"};
            deck[41] =  {valor: 2, img: "img/2_of_spades.png"};
            deck[42] =  {valor: 3, img: "img/3_of_spades.png"};
            deck[43] =  {valor: 4, img: "img/4_of_spades.png"};
            deck[44] =  {valor: 5, img: "img/5_of_spades.png"};
            deck[45] =  {valor: 6, img: "img/6_of_spades.png"};
            deck[46] =  {valor: 7, img: "img/7_of_spades.png"};
            deck[47] =  {valor: 8, img: "img/8_of_spades.png"};
            deck[48] =  {valor: 9, img: "img/9_of_spades.png"};
            deck[49] =  {valor: 10, img: "img/10_of_spades.png"};
            deck[50] =  {valor: 11, img: "img/queen_of_spades.png"};
            deck[51] =  {valor: 12, img: "img/jack_of_spades.png"};
            deck[52] =  {valor: 13, img: "img/king_of_spades.png"};

            return deck;
        };

        this.shuffle = function (deck) {
            let indexes = [];
            let shuffled = [];
            let index = null;
            for (let i = 0; i < deck.length; i++) {
                indexes.push(i);
            }
            for (let i = 0; i < deck.length; i++) {
                index = Math.floor(Math.random() * indexes.length);
                shuffled.push(deck[indexes[index]]);
                indexes.splice(index, 1);
            }
            return shuffled;
        };

        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
    }

    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn (val) {
        this.dealerTurn = val;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        let noAces = cards.filter(function(card){ return card.valor != 1; });
        let figtrans = noAces.map(function(c){ return c.valor > 10 ? 10 : c.valor; });
        let sum = figtrans.reduce(function(sum, value){ return sum += value;}, 0);
        let numAces = cards.length - noAces.length;
        while (numAces > 0) {
            if (sum + 11 + (numAces - 1) > MAX_POINTS){
                return sum + numAces;
            }
            sum += 11;
            numAces -= 1;
        }
        return sum + numAces
    }

    dealer_move() {
        let card = this.deck[0];            //obter primeira carta do baralho
        this.deck.splice(0, 1);             //remover primeira carta do baralho
        this.dealer_cards.push(card);       //adicionar carta ao baralho do dealer

        var element = document.getElementById("dealermove");
        var x = document.createElement("img");
        x.setAttribute("src", card.img);
        element.appendChild(x);


        return this.get_game_state()       //atualizar estado do jogo
    }

    player_move() {
        let card = this.deck[0];            //obter primeira carta do baralho
        this.deck.splice(0, 1);             //remover primeira carta do baralho
        this.player_cards.push(card);       //adicionar carta ao baralho do jogador


        var element = document.getElementById("playermove");
        var x = document.createElement("img");
        x.setAttribute("src", card.img);
        element.appendChild(x);

        return this.get_game_state()       //atualizar estado do jogo
    }

    get_game_state() {
        let playerPoints = this.get_cards_value(this.player_cards);
        let dealerPoints = this.get_cards_value(this.dealer_cards);
        let playerBusted = playerPoints > MAX_POINTS;
        let playerWon = playerPoints === MAX_POINTS;
        let dealerBusted = this.dealerTurn && (dealerPoints > MAX_POINTS);
        let dealerWon = this.dealerTurn && dealerPoints >= playerPoints && dealerPoints <= MAX_POINTS;

        this.state.gameEnded = playerBusted || playerWon || dealerBusted || dealerWon;
        this.state.dealerWon = dealerWon;
        this.state.playerBusted = playerBusted;

        return this.state;
    }
}

