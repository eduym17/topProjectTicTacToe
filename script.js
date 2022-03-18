let circleTurn;
const xClass = 'x';
const oClass = 'o';
const board = document.getElementById('board');
const resultMsgElement = document.getElementById('result-msg');
const restartButton = document.getElementById('restartbtn');
const winningMsgTxtElement = document.querySelector('[data-winning-message-text]');
const displayName = document.querySelector('.displayName');

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');

startGame();
restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  displayName.innerText = `X's turn:`;

  cellElements.forEach(cell => {
    cell.classList.remove(oClass);
    cell.classList.remove(xClass);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });

  showClassHover();
  resultMsgElement.classList.remove('show');
};

function handleClick(event) {
  const cell = event.target;
  const currentClass = circleTurn ? oClass : xClass;

  placeMark(cell, currentClass);
  
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()){
    endGame(true)
  } else {
    switchTurn();
    showClassHover();
  };

  circleTurn === false ? displayName.innerText = `X's turn:` : displayName.innerText = `O's turn:`;
};

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(oClass) || cell.classList.contains(xClass)
  });
};

function endGame(draw) {
  draw ? winningMsgTxtElement.innerText = 'Draw!' : winningMsgTxtElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`;

  resultMsgElement.classList.add('show');
};

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
};

function switchTurn() {
  circleTurn = !circleTurn;
};

function showClassHover() {
  board.classList.remove(xClass);
  board.classList.remove(oClass);

  circleTurn ? board.classList.add(oClass) : board.classList.add(xClass);
};

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};