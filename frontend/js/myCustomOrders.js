const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
const myCustomOrdersContainer = document.getElementById("myCustomOrdersContainer");
const logoutBtn = document.getElementById("logoutBtn");

if (!token || !user) {
  window.location.href = "login.html";
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

const loadMyCustomOrders = async () => {
  try {
    const response = await fetch("https://oviu-website.onrender.com/api/custom-orders");
    const orders = await response.json();

    const myOrders = orders.filter(order => order.customer.email === user.email);

    if (myOrders.length === 0) {
      myCustomOrdersContainer.innerHTML = "<p>No custom orders found.</p>";
      return;
    }

    myCustomOrdersContainer.innerHTML = "";

    myOrders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString();

      myCustomOrdersContainer.innerHTML += `
        <div class="my-order-card">
          <h3>Custom Order #${order._id.slice(-6).toUpperCase()}</h3>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Product:</strong> ${order.productType}</p>
          <p><strong>Quantity:</strong> ${order.quantity}</p>
          <p><strong>Color:</strong> ${order.color || "N/A"}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Notes:</strong> ${order.notes || "No notes"}</p>
        </div>
      `;
    });

  } catch (error) {
    myCustomOrdersContainer.innerHTML = "<p>Failed to load custom orders.</p>";
  }
};

loadMyCustomOrders();