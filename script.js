const adviceNumberEl = document.getElementById('advice-number');
const adviceTextEl = document.getElementById('advice-text');
const diceButton = document.querySelector('.dice-button');

async function fetchAdvice() {
  if (!diceButton) return;

  diceButton.disabled = true;

  try {
    const response = await fetch(`https://api.adviceslip.com/advice?timestamp=${Date.now()}`);

    if (!response.ok) {
      throw new Error('Unable to fetch advice.');
    }

    const data = await response.json();
    const advice = data.slip;

    adviceNumberEl.textContent = `#${advice.id}`;
    adviceTextEl.textContent = `“${advice.advice}”`;
  } catch (error) {
    adviceNumberEl.textContent = '#000';
    adviceTextEl.textContent = '“Something went wrong. Please try again.”';
    console.error(error);
  } finally {
    diceButton.disabled = false;
  }
}

diceButton.addEventListener('click', fetchAdvice);
fetchAdvice();
