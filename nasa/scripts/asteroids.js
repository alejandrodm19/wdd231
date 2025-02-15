document.addEventListener("DOMContentLoaded", () => {
  const asteroidsList = document.getElementById("asteroids-list");

  const apiKey = "3KxRU6woJPYypdPQFQerexhnT0gmOEitBAKyShCh";
  const baseUrl = "https://api.nasa.gov/neo/rest/v1/feed";

  async function fetchAsteroids(startDate = getTodayDate()) {
    try {
      const response = await fetch(
        `${baseUrl}?start_date=${startDate}&end_date=${startDate}&api_key=${apiKey}`
      );
      if (!response.ok) throw new Error("Failed to fetch asteroid data.");

      const data = await response.json();
      displayAsteroids(data);
    } catch (error) {
      asteroidsList.innerHTML = `<p>Error loading asteroid data. Please try again later.</p>`;
      console.error("Error fetching asteroid data:", error);
    }
  }

  function displayAsteroids(data) {
    asteroidsList.innerHTML = ""; 

    if (!data || !data.near_earth_objects) {
      asteroidsList.innerHTML = `<p>No asteroids found for this date.</p>`;
      return;
    }

    const asteroids =
      data.near_earth_objects[Object.keys(data.near_earth_objects)[0]];

    asteroids.forEach((asteroid) => {
      const asteroidCard = document.createElement("div");
      asteroidCard.classList.add("asteroid-card");
      asteroidCard.innerHTML = `
                <h3>${asteroid.name}</h3>
                <p><strong>NASA JPL ID:</strong> ${asteroid.id}</p>
                <p><strong>Diameter:</strong> ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
                  2
                )} km</p>
                <p><strong>Closest Approach Date:</strong> ${
                  asteroid.close_approach_data[0].close_approach_date
                }</p>
                <p><strong>Miss Distance:</strong> ${parseFloat(
                  asteroid.close_approach_data[0].miss_distance.kilometers
                ).toLocaleString()} km</p>
                <p><strong>Velocity:</strong> ${parseFloat(
                  asteroid.close_approach_data[0].relative_velocity
                    .kilometers_per_hour
                ).toFixed(2)} km/h</p>
                <p><strong>Hazardous:</strong> ${
                  asteroid.is_potentially_hazardous_asteroid
                    ? "Yes 🚨"
                    : "No ✅"
                }</p>
            `;
      asteroidsList.appendChild(asteroidCard);
    });
  }

  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split("T")[0]; 
  }


  fetchAsteroids();
});
