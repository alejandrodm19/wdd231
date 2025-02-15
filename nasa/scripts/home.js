document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "3KxRU6woJPYypdPQFQerexhnT0gmOEitBAKyShCh"; 
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  const apodContainer = document.getElementById("apod-container");

  async function fetchAPOD() {
    try {
      const response = await fetch(apodUrl);
      const data = await response.json();

      console.log("APOD Data:", data); 

      let mediaElement;
      if (data.media_type === "image") {
        mediaElement = `<img src="${data.url}" alt="${data.title}" class="apod-image">`;
      } else if (data.media_type === "video") {
        mediaElement = `<iframe src="${data.url}" frameborder="0" allowfullscreen class="apod-video"></iframe>`;
      } else {
        mediaElement = `<p>No media available for today.</p>`;
      }

      apodContainer.innerHTML = `
                <h3>${data.title}</h3>
                <p><strong>Date:</strong> ${data.date}</p>
                ${mediaElement}
                <p>${data.explanation}</p>
                <p><strong>Credit:</strong> ${data.copyright || "NASA/APOD"}</p>
            `;
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      apodContainer.innerHTML = `<p>Failed to load Astronomy Picture of the Day.</p>`;
    }
  }

  fetchAPOD();
});
