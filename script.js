const dialog = document.querySelector('dialog');
const submit = document.getElementById('confirmInfo');
const form = document.getElementById('info');
const name1 = document.getElementById('player1');
const name2 = document.getElementById('player2');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
let player1 = 0;
let player2 = 0;
let awaitedPlayer = 0;
let counter = 0;
let interrupt = 0;


const gameBoard = (function(){
    let board = {
        1 : " ",
        2 : " ",
        3 : " ",
        4 : " ",
        5 : " ",
        6 : " ",
        7 : " ",
        8 : " ",
        9 : " ",
    };
    let modify = (position, marker)=> {
        board[position] = marker;
    };
    let getBoardState = () => Object.assign({}, board);
    let clear = () => {board = 
    {1 : " ",
    2 : " ",
    3 : " ",
    4 : " ",
    5 : " ",
    6 : " ",
    7 : " ",
    8 : " ",
    9 : " "}};
    return {modify, getBoardState, clear};
})();

const player = (name, marker)=> {
    return {name, marker};
}

function display(){
    counter ++;
    let boardState = gameBoard.getBoardState();
    const board = document.querySelector('main');
    board.textContent='';
    for(key in boardState){
        const cell = document.createElement('div');
        cell.textContent = `${boardState[key]}`;
        cell.classList.add(key);
        cell.classList.add('cell');
        cell.addEventListener('click', playerMove)
        board.appendChild(cell);
    }
    if(counter===10){
        result.textContent='Its\'s a tie';
        interrupt=1;
    }
}

function playerMove(e){
    let currentPlayer = awaitedPlayer;
    if(interrupt){
        return;
    }
    if(e.target.textContent == " "){
        gameBoard.modify(e.target.classList[0] , currentPlayer.marker);
        display();
        awaitedPlayer = (awaitedPlayer==player1? player2: player1);
    }else{
        return;
    }
    winCheck(currentPlayer);
}

function winCheck(currentPlayer){
    board = gameBoard.getBoardState();
    if(board[1]==board[2] && board[2]==board[3] && !(board[1]===' ')){
        result.textContent = `${currentPlayer.name} wins!`;
        interrupt = 1;
    }else if(board[4]==board[5] && board[5]==board[6] && !(board[4]===' ')){
        result.textContent = `${currentPlayer.name} wins!`;
        interrupt = 1;
    }else if(board[7]==board[8] && board[8]==board[9] && !(board[7]===' ')){
        result.textContent = `${currentPlayer.name} wins!`;
        interrupt = 1;
    }else if(board[1]==board[4] && board[4]==board[7] && !(board[1]===' ')){
        result.textContent = `${currentPlayer.name} wins!`;
        interrupt = 1;
    }else if(board[2]==board[5] && board[5]==board[8] && !(board[2]===' ')){
        result.textContent = `${currentPlayer.name} wins!`;
        interrupt = 1;
    }else if(board[3]==board[6] && board[6]==board[9] && !(board[3]===' ')){
        result.textContent = `${currentPlayer.name} wins!`;
        interrupt = 1;
    }else if(board[1]==board[5] && board[5]==board[9] && !(board[1]===' ')){
        result.textContent = `${currentPlayer.name} wins!`;
        interrupt = 1;
    }else if(board[3]==board[5] && board[5]==board[7] && !(board[3]===' ')){
        result.textContent = `${currentPlayer.name} wins!`;
        interrupt = 1;
    }
}

function setup(){
    dialog.showModal();
    let body = document.querySelector('body');
    body.style = "background-color: black;";
    const dialogHeight = dialog.offsetHeight;
    const dialogWidth = dialog.offsetWidth;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    dialog.style = `left: ${windowWidth/2 - dialogWidth/2}px; top: ${windowHeight/2 - dialogHeight/2}px`;
    submit.addEventListener('click', (e)=>{
        e.preventDefault();
        if(form.checkValidity()){
            player1 = player(name1.value, 'X');
            player2 = player(name2.value, 'O');
            awaitedPlayer = player1;
            body.style = "background-color: #e2e8f0;";
            dialog.close();
        }
    });
}

function reset(){
    player1 = 0;
    player2 = 0;
    awaitedPlayer = 0;
    counter = 0;
    interrupt = 0;
    gameBoard.clear();
    result.textContent='';
    setup();
    display();
}

restart.addEventListener('click', reset);

setup();
display();
