let quotes = [];

// Elements
const $quoteContainer = document.getElementById("quote-container");
const $quoteText = document.getElementById("quote");
const $authorText = document.getElementById("author");
const $twitterBtn = document.getElementById("twitter");
const $newQuoteBtn = document.getElementById("new-quote");
const $loader = document.getElementById("loader");

// Event Listeners
$newQuoteBtn.addEventListener("click", getQuote);
$twitterBtn.addEventListener("click", tweetQuote);

// Show Loading
function loading() {
  $loader.hidden = false;
  $quoteContainer.hidden = true;
}

// Hide Loading
function completed() {
  if (!$loader.hidden) {
    $quoteContainer.hidden = false;
    $loader.hidden = true;
  }
}

// Show New Quote
function newQuote() {
  // Pick a random quote from 'quotes' array
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return quote;
}

// Get Quote from API
async function getQuote() {
  try {
    loading();
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

    // Stop Loader, Show Quote
    completed();
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
