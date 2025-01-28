const spotlightContainer = document.getElementById("spotlight-members");

async function fetchSpotlightMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Failed to fetch members.json");
    }
    const members = await response.json();
    const spotlightMembers = members.filter(
      (member) => member.membership === "Gold" || member.membership === "Silver"
    );

    if (spotlightMembers.length === 0) {
      spotlightContainer.innerHTML = "<p>No spotlight members available.</p>";
      return;
    }

    const selectedMembers = spotlightMembers
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    spotlightContainer.innerHTML = selectedMembers
      .map(
        (member) => `
      <div class="spotlight-card">
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} Logo" class="spotlight-img">
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <a href="${member.website}" target="_blank" class="spotlight-btn">Visit Website</a>
        <p class="membership-level">${member.membership} Member</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    spotlightContainer.innerHTML = "<p>Error loading spotlight members.</p>";
    console.error("Error fetching spotlight members:", error);
  }
}

fetchSpotlightMembers();
