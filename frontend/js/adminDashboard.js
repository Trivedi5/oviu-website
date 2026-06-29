const totalProducts = document.getElementById("totalProducts");
const totalOrders = document.getElementById("totalOrders");
const totalRevenue = document.getElementById("totalRevenue");
const totalCustomers = document.getElementById("totalCustomers");
const totalCustomOrders = document.getElementById("totalCustomOrders");
const pendingOrders = document.getElementById("pendingOrders");
const pendingCustomOrders = document.getElementById("pendingCustomOrders");

const latestOrdersTable = document.getElementById("latestOrdersTable");

const summaryProducts = document.getElementById("summaryProducts");
const summaryOrders = document.getElementById("summaryOrders");
const summaryCustomOrders = document.getElementById("summaryCustomOrders");

const loadDashboard = async () => {
  try {
    const statsResponse = await fetch("http://localhost:5000/api/dashboard");
    const stats = await statsResponse.json();

    totalProducts.textContent = stats.totalProducts;
    totalOrders.textContent = stats.totalOrders;
    totalRevenue.textContent = `$${stats.revenue.toFixed(2)}`;
    totalCustomers.textContent = stats.totalCustomers;
    totalCustomOrders.textContent = stats.totalCustomOrders;

    pendingOrders.textContent = `${stats.pendingOrders} processing`;
    pendingCustomOrders.textContent = `${stats.pendingCustomOrders} pending`;

    summaryProducts.textContent = `${stats.totalProducts} products available`;
    summaryOrders.textContent = `${stats.totalOrders} orders received`;
    summaryCustomOrders.textContent = `${stats.totalCustomOrders} custom requests`;

    const ordersResponse = await fetch("http://localhost:5000/api/orders");
    const orders = await ordersResponse.json();

    latestOrdersTable.innerHTML = "";

    orders.slice(0, 5).forEach(order => {
      latestOrdersTable.innerHTML += `
        <tr>
          <td>#${order._id.slice(-6).toUpperCase()}</td>
          <td>${order.customer.firstName} ${order.customer.lastName}</td>
          <td>$${order.total.toFixed(2)}</td>
          <td><span class="status processing">${order.orderStatus}</span></td>
        </tr>
      `;
    });

    if (orders.length === 0) {
      latestOrdersTable.innerHTML = `
        <tr>
          <td colspan="4">No orders yet.</td>
        </tr>
      `;
    }

  } catch (error) {
    console.log(error);
  }
};

loadDashboard();