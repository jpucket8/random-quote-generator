let quotes = [];

// Elements
const $quoteContainer = document.getElementById("quote-contaienr");
const $quoteText = document.getElementById("quote");
const $authorText = document.getElementById("author");
const $twitterBtn = document.getElementById("twitter");
const $newQuoteBtn = document.getElementById("new-quote");

// Event Listeners
$newQuoteBtn.addEventListener("click", getQuote);
$twitterBtn.addEventListener("click", tweetQuote);

// Show New Quote
function newQuote() {
  // Pick a random quote from 'quotes' array
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return quote;
}

// Get Quote from API
async function getQuote() {
  try {
    const apiUrl = "https://type.fit/api/quotes";
    const response = await fetch(apiUrl);
    quotes = await response.json();
    const randomQuote = newQuote();
    $authorText.innerText = randomQuote.author;
    $quoteText.innerText = randomQuote.text;

    // Reduce font size for long quotes
    if (randomQuote.text.length > 50) {
      $quoteText.classList.add("long-quote");
    } else {
      $quoteText.classList.remove("long-quote");
    }
  } catch (error) {
    console.log(error);
  }
}

function tweetQuote() {
  const quote = $quoteText.innerText;
  const author = $authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// On Load
getQuote();
