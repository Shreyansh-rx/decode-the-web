// Faulty Counter Implementation
// BUG 1: Initialized as string instead of integer
let count = "0";

// BUG 2: Incorrect selector query (missing dot or ID hash)
const counterDisplay = document.querySelector('counter-value');
const btnIncrement = document.getElementById('btn-add');
const btnDecrement = document.getElementById('btn-sub');
const btnReset = document.getElementById('btn-clear');

// BUG 3: String concatenation bug: "0" + 1 produces "01"
function increment() {
  count = count + 1;
  updateDisplay();
}

// BUG 4: Typo in variable name causing ReferenceError
function decrement() {
  if (counts > 0) {
    count = count - 1;
  }
  updateDisplay();
}

// BUG 5: Reset does not change the actual count variable
function reset() {
  counterDisplay.innerHTML = "0";
  // Forgot to update internal state 'count'!
}

function updateDisplay() {
  // BUG 6: Property misspelled
  counterDisplay.textContents = count;
}

// BUG 7: Missing event listener bindings or wrong event types
btnIncrement.onclick = increment(); // Runs immediately instead of on click!
// btnDecrement and btnReset listeners never attached!
