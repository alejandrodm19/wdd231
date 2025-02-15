document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;
    const timestamp = new Date().toISOString();

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      message,
      timestamp,
    };

    localStorage.setItem("contactData", JSON.stringify(contactData));
  });
});
