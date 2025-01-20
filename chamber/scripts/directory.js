const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const membersContainer = document.querySelector("#members-container");
let membersData = [];

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    membersData = members;
    displayMembers(membersData, "grid");
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members, view) {
  membersContainer.innerHTML = "";
  members.forEach((member) => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("member-card");
    if (view === "list") {
      memberCard.classList.add("list-item"); 
      memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}" />
                <div>
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                </div>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
    } else {
      memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}" />
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
    }
    membersContainer.appendChild(memberCard);
  });
}

gridButton.addEventListener("click", () => {
  membersContainer.classList.remove("list-view");
  membersContainer.classList.add("grid-view");
  displayMembers(membersData, "grid");
  gridButton.classList.add("active");
  listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.remove("grid-view");
  membersContainer.classList.add("list-view");
  displayMembers(membersData, "list");
  listButton.classList.add("active");
  gridButton.classList.remove("active");
});


fetchMembers();

