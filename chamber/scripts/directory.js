const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const membersContainer = document.querySelector("#members-container");

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members, "grid"); // Mostrar en grid por defecto
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members, view) {
  membersContainer.innerHTML = ""; // Limpiar contenido existente
  members.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("member-card");

    if (view === "list") {
      // Vista de lista
      memberCard.classList.add("list-item");
      memberCard.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" />
        <div>
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Website</a>
        </div>
      `;
    } else {
      // Vista de cuadrícula
      memberCard.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" />
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Website</a>
      `;
    }

    membersContainer.appendChild(memberCard);
  });
}

// Botón de vista de cuadrícula
gridButton.addEventListener("click", () => {
  fetchMembers().then(() => {
    membersContainer.classList.remove("list-view");
    membersContainer.classList.add("grid-view");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
  });
});

// Botón de vista de lista
listButton.addEventListener("click", () => {
  fetchMembers().then(() => {
    membersContainer.classList.remove("grid-view");
    membersContainer.classList.add("list-view");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
  });
});

// Cargar miembros inicialmente en vista de cuadrícula
fetchMembers();
