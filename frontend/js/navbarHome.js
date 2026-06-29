const navActions = document.querySelector(".nav-actions");
const userData = JSON.parse(localStorage.getItem("user"));
const tokenData = localStorage.getItem("token");

if (navActions) {
 if (!tokenData || !userData) {
  navActions.innerHTML = `
    <a href="pages/cart.html"><button>Cart</button></a>
    <a href="pages/login.html"><button>Login</button></a>
    <a href="pages/register.html"><button>Register</button></a>
  `;

  } else if (userData.role === "admin") {
    navActions.innerHTML = `
      <a href="pages/admin-dashboard.html"><button>Dashboard</button></a>
<a href="pages/admin-custom-orders.html"><button>Custom Orders</button></a>
<button id="logoutNavBtn">Logout</button>
    `;
  } else {
    navActions.innerHTML = `
     <a href="pages/cart.html"><button>Cart</button></a>
<a href="pages/custom-order.html"><button>Custom Order</button></a>
<a href="pages/customer-dashboard.html"><button>My Account</button></a>
<button id="logoutNavBtn">Logout</button>
    `;
  }

  const logoutNavBtn = document.getElementById("logoutNavBtn");

  if (logoutNavBtn) {
    logoutNavBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "pages/login.html";
    });
  }
}