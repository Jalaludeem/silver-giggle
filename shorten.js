//Function to validate URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to shorten URL
async function shortenUrlBackend(url) {
  const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN_HERE',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      long_url: url,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.link;
}

// Function to handle form submission
function shortenUrl(event) {
  event.preventDefault(); // Prevent form submission
  const urlInput = document.getElementById('url-input');
  const url = urlInput.value.trim(); // Get URL from input and trim whitespace
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // Clear previous result
  // Check if URL is valid
  if (!isValidUrl(url)) {
    resultDiv.innerHTML = 'Invalid URL. Please enter a valid URL.';
    return;
  }
  // Send URL to backend for shortening
  shortenUrlBackend(url)
    .then((shortUrl) => {
      // Display shortened URL
      const shortUrlLink = document.createElement('a');
      shortUrlLink.href = shortUrl;
      shortUrlLink.textContent = shortUrl;
      resultDiv.appendChild(shortUrlLink);
    })
    .catch((error) => {
      resultDiv.innerHTML = `Error: ${error.message}`;
    });
}

// Attach event listener to form submit button
const urlForm = document.getElementById('url-form');
urlForm.addEventListener('submit', shortenUrl);
