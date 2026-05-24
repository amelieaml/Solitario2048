let score = 0;
let currentCard = generateRandomCard();
const columns = [[], [], [], []];
const MAX_CARDS = 8;

const scoreEl = document.getElementById('score');
const columnsEl = document.querySelectorAll('.column');

// Generar carta aleatoria
function generateRandomCard() {
    const values = [2, 4, 8, 16, 32];
    return values[Math.floor(Math.random() * values.length)];
}

// Fusionar cartas iguales en una columna
function fuseCards(colArray) {
    if (colArray.length < 2) return;
    
    const lastIdx = colArray.length - 1;
    if (colArray[lastIdx] === colArray[lastIdx - 1]) {
        const newValue = colArray[lastIdx] * 2;
        colArray.pop();
        colArray.pop();
        colArray.push(newValue);
        score += newValue;
        
        if (newValue == 2048) {
            colArray.length = 0;
        } else {
            fuseCards(colArray);
        }
    }
}

// Renderizar el tablero
function render() {
    columnsEl.forEach((colEl, i) => {
        colEl.innerHTML = '';
        columns[i].forEach(val => {
            const card = document.createElement('div');
            card.className = `card card-${val}`;
            colEl.appendChild(card);
        });
    });
    scoreEl.innerText = score;
    
    document.querySelector('#current-card-container').innerHTML = `<div class="card card-${currentCard}"></div>`;
}

// Flujo completo del juego
columnsEl.forEach((col, i) => {
    col.addEventListener('click', () => {
        if (columns[i].length >= MAX_CARDS) {
            alert("¡Columna llena! Game Over.");
            location.reload();
            return;
        }

        columns[i].push(currentCard);
        fuseCards(columns[i]);
        currentCard = generateRandomCard();
        render();
    });
});

document.getElementById('btn-reset').addEventListener('click', () => location.reload());
render();