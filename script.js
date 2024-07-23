const text = document.querySelector('#texto');
const input = document.querySelector('#entrada');
const restartBtn = document.querySelector('#reiniciar');
const result = document.querySelector('#resultado');
const historyDiv = document.querySelector('#historico');
const changeThemeBtn = document.querySelector('#alterarTema');

const textArray = [
  'Exemplo de texto para digitar.',
  'Outro exemplo de texto para digitar.',
  'Mais um exemplo de texto para digitar.',
  'Digite isso.',
  'Você pode digitar isso aqui.',
];

const newText = () => {
  const index = Math.floor(Math.random() * textArray.length);
  console.log(index)
  text.textContent = textArray[index];
}

const refreshTest = () => {
  start();

  if (input.value === text.textContent) {
    checkInput()
  }
}

const start = () => {
  const testStatus = JSON.parse(localStorage.getItem('runningTest'));

  if (!testStatus) {
    localStorage.setItem('initialTime', new Date().getTime());
    localStorage.setItem('runningTest', true);
  }
}

const checkInput = () => {
  const finalTime = new Date().getTime();
  const initialTime = parseInt(localStorage.getItem('initialTime'));
  const spentTime = (finalTime - initialTime) / 1000;

  addToHistory(text.textContent, spentTime);

  localStorage.setItem('runningTest', false)
  input.value = '';
  newText();

  result.textContent = `Parabéns! Você levou ${spentTime} segundos`;
}

const addToHistory = (typedText, duration) => {
  const historyItem = document.createElement('p');
  historyItem.textContent = `Texto "${typedText}" - Tempo: ${duration}`;
  historyDiv.appendChild(historyItem);
}

const restartTest = () => {
  input.value = '';
  result.textContent = '';
  newText();
  localStorage.setItem('runningTest', false);
  historyDiv.textContent = '';
}

const changeTheme = () => {
  const body = document.querySelector('body');
  body.classList.toggle('claro');
  body.classList.toggle('escuro');
}

input.addEventListener('keyup', refreshTest);
restartBtn.addEventListener('click', restartTest);
changeThemeBtn.addEventListener('click', changeTheme);

newText();