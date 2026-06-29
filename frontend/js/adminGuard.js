const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (!token || !user) {
  alert("Please login as admin first.");
  window.location.href = "login.html";
} else if (user.role !== "admin") {
  alert("Access denied. Admin only.");
  window.location.href = "../index.html";
}