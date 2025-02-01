

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", () => {
      const timestamp = new Date().toISOString();
      document.getElementById("timestamp").value = timestamp;
    });
  }

  const urlParams = new URLSearchParams(window.location.search);

  const formData = {
    "first-name": urlParams.get("first-name"),
    "last-name": urlParams.get("last-name"),
    email: urlParams.get("email"),
    phone: urlParams.get("phone"),
    organization: urlParams.get("organization"),
    timestamp: urlParams.get("timestamp"),
  };

  Object.keys(formData).forEach((key) => {
    const element = document.getElementById(key);
    if (element) {
      element.textContent =
        key === "timestamp"
          ? new Date(formData[key]).toLocaleString()
          : formData[key];
    }
  });
});
