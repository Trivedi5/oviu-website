const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const welcomeText = document.getElementById("welcomeText");
const logoutBtn = document.getElementById("logoutBtn");

if (!token || !user) {
  window.location.href = "login.html";
}

if (user && welcomeText) {
  welcomeText.textContent = `Welcome, ${user.name}. Manage your orders and custom requests here.`;
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
});