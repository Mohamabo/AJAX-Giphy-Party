const API_KEY = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'; // GIPHY API Key
const form = document.querySelector('#searchForm');
const gifContainer = document.querySelector('#gifContainer');
const clearButton = document.querySelector('#clearButton');

// Handle form submission
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const searchTerm = document.querySelector('#searchTerm').value;

  try {
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
      params: {
        q: searchTerm,
        api_key: API_KEY
      }
    });

    const gifs = response.data.data; // Array of GIFs
    if (gifs.length > 0) {
      // Select a random GIF from the array
      const randomIndex = Math.floor(Math.random() * gifs.length);
      const gifUrl = gifs[randomIndex].images.downsized.url;

      // Create and append the GIF to the container
      const img = document.createElement('img');
      img.src = gifUrl;
      img.alt = searchTerm;
      gifContainer.appendChild(img);
    } else {
      alert('No GIFs found for this search!');
    }
  } catch (error) {
    console.error('Error fetching data from GIPHY API:', error);
  }
});

// Handle clearing GIFs
clearButton.addEventListener('click', function () {
  gifContainer.innerHTML = '';
});