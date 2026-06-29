const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const myOrdersContainer = document.getElementById("myOrdersContainer");
const logoutBtn = document.getElementById("logoutBtn");

if (!token || !user) {
  window.location.href = "login.html";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

const loadMyOrders = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/orders");
    const orders = await response.json();

    const myOrders = orders.filter(order => order.customer.email === user.email);

    if (myOrders.length === 0) {
      myOrdersContainer.innerHTML = "<p>No orders found.</p>";
      return;
    }

    myOrdersContainer.innerHTML = "";

    myOrders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString();

      myOrdersContainer.innerHTML += `
        <div class="my-order-card">
          <h3>Order #${order._id.slice(-6).toUpperCase()}</h3>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          <p><strong>Payment:</strong> ${order.paymentStatus}</p>
          <p><strong>Status:</strong> ${order.orderStatus}</p>
        </div>
      `;
    });

  } catch (error) {
    myOrdersContainer.innerHTML = "<p>Failed to load orders.</p>";
  }
};

loadMyOrders();