document.addEventListener("DOMContentLoaded", () => {
  const contactData = JSON.parse(localStorage.getItem("contactData"));

  if (contactData) {
    document.getElementById("display-first-name").textContent =
      contactData.firstName;
    document.getElementById("display-last-name").textContent =
      contactData.lastName;
    document.getElementById("display-email").textContent = contactData.email;
    document.getElementById("display-phone").textContent = contactData.phone;
    document.getElementById("display-message").textContent =
      contactData.message;
    document.getElementById("display-timestamp").textContent = new Date(
      contactData.timestamp
    ).toLocaleString();
  } else {
    document.querySelector(
      ".thank-you-container"
    ).innerHTML = `<p>No contact data found.</p>`;
  }
});
