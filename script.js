const dialog = document.querySelector('dialog');
const submit = document.getElementById('confirmInfo');
const form = document.getElementById('info');
const name1 = document.getElementById('player1');
const name2 = document.getElementById('player2');
let player1 = 0;
let player2 = 0;
let awaitedPlayer = 0;


const gameBoard = (function(){
    const board = {
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
    return {modify, getBoardState};
})();

const player = (name, marker)=> {
    const positions = [];
    const showPositions = ()=>{console.log(positions)};
    return {name, marker, showPositions};
}

function display(){
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
    console.log("I am called first!");
}

function playerMove(e){
    let currentPlayer = awaitedPlayer;
    console.log(currentPlayer.name);
    if(e.target.textContent == " "){
        // e.target.textContent = `${currentPlayer.marker}`; 
        gameBoard.modify(e.target.classList[0] , currentPlayer.marker);
        display();
        awaitedPlayer = (awaitedPlayer==player1? player2: player1);
    }else{
        alert("Invalid move!");
    }
    winCheck(currentPlayer);
}

function winCheck(currentPlayer){
    board = gameBoard.getBoardState();
    if(board[1]==board[2] && board[2]==board[3] && !(board[1]===' ')){
        alert(`The winner is ${currentPlayer.name}!`);
        console.log(1);
    }else if(board[4]==board[5] && board[5]==board[6] && !(board[4]===' ')){
        alert(`The winner is ${currentPlayer.name}!`);
        console.log(2);
    }else if(board[7]==board[8] && board[8]==board[9] && !(board[7]===' ')){
        alert(`The winner is ${currentPlayer.name}!`);
        console.log(3);
    }else if(board[1]==board[4] && board[4]==board[7] && !(board[1]===' ')){
        alert(`The winner is ${currentPlayer.name}!`);
        console.log(4);
    }else if(board[2]==board[5] && board[5]==board[8] && !(board[2]===' ')){
        alert(`The winner is ${currentPlayer.name}!`);
        console.log(5);
    }else if(board[3]==board[6] && board[6]==board[9] && !(board[3]===' ')){
        alert(`The winner is ${currentPlayer.name}!`);
        console.log(6);
    }else if(board[1]==board[5] && board[5]==board[9] && !(board[1]===' ')){
        alert(`The winner is ${currentPlayer.name}!`);
        console.log(7);
    }else if(board[3]==board[5] && board[5]==board[7] && !(board[3]===' ')){
        alert(`The winner is ${currentPlayer.name}!`);
        console.log(8);
    }
}

function setup(){
    dialog.showModal();
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
            dialog.close();
        }
    });
}

setup();
display();
