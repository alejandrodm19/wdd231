document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://images-api.nasa.gov/search?q=";
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const galleryGrid = document.getElementById("gallery-grid");

  async function fetchImages(query) {
    try {
      const response = await fetch(`${apiUrl}${query}&media_type=image`);
      const data = await response.json();

      console.log("NASA Image API Data:", data); 

      const images = data.collection.items.slice(0, 15); 
      galleryGrid.innerHTML = ""; 

      if (images.length === 0) {
        galleryGrid.innerHTML = "<p>No results found. Try another search.</p>";
        return;
      }

      images.forEach((item) => {
        const imgSrc = item.links[0].href;
        const title = item.data[0].title;

        const imageCard = document.createElement("div");
        imageCard.classList.add("gallery-item");

        imageCard.innerHTML = `
                    <img src="${imgSrc}" alt="${title}">
                    <p>${title}</p>
                `;

        galleryGrid.appendChild(imageCard);
      });
    } catch (error) {
      console.error("Error fetching NASA images:", error);
      galleryGrid.innerHTML = `<p>Failed to load images. Please try again later.</p>`;
    }
  }

  fetchImages("galaxy");

  searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchImages(query);
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) fetchImages(query);
    }
  });
});
