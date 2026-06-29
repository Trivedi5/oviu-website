const navActions = document.querySelector(".nav-actions");
const userData = JSON.parse(localStorage.getItem("user"));
const tokenData = localStorage.getItem("token");

if (navActions) {
  if (!tokenData || !userData) {
    navActions.innerHTML = `
      <a href="cart.html"><button>Cart</button></a>
      <a href="login.html"><button>Login</button></a>
      <a href="register.html"><button>Register</button></a>
    `;
  } else if (userData.role === "admin") {
    navActions.innerHTML = `
      <a href="admin-dashboard.html"><button>Dashboard</button></a>
      <button id="logoutNavBtn">Logout</button>
    `;
  } else {
    navActions.innerHTML = `
      <a href="cart.html"><button>Cart</button></a>
      <a href="custom-order.html"><button>Custom Order</button></a>
      <a href="customer-dashboard.html"><button>My Account</button></a>
      <button id="logoutNavBtn">Logout</button>
    `;
  }

  const logoutNavBtn = document.getElementById("logoutNavBtn");

  if (logoutNavBtn) {
    logoutNavBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
}