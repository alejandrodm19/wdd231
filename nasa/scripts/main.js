const apiKey = "3KxRU6woJPYypdPQFQerexhnT0gmOEitBAKyShCh";
const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

async function fetchApodForHomePage() {
  try {
    const response = await fetch(apodUrl);
    const data = await response.json();

    if (data.media_type === "image") {
      document.getElementById("nasa-image").src = data.url;
    } else {
      document.getElementById("nasa-image").src = "images/default-image.jpg"; // Fallback image
    }
  } catch (error) {
    console.error("Error fetching APOD for home page:", error);
    document.getElementById("nasa-image").src = "images/default-image.jpg"; // Fallback image
  }
}

fetchApodForHomePage();
