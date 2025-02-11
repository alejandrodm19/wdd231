document.addEventListener("DOMContentLoaded", () => {
  const visitorMessage = document.getElementById("visitor-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitorMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor(
      (currentVisit - lastVisit) / (1000 * 60 * 60 * 24)
    );

    if (daysBetween === 0) {
      visitorMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      visitorMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitorMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
});
