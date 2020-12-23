let quotes = [];

// Elements
const $quoteContainer = document.getElementById("quote-contaienr");
const $quoteText = document.getElementById("quote");
const $authorText = document.getElementById("author");
const $twitterBtn = document.getElementById("twitter");
const $newQuoteBtn = document.getElementById("new-quote");

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
  } catch (error) {
    console.log(error);
  }
}

// On Load
getQuote();
