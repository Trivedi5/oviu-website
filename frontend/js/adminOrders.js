const adminOrdersTable = document.getElementById("adminOrdersTable");

const loadAdminOrders = async () => {
  try {
    const response = await fetch("https://oviu-website.onrender.com/api/orders");
    const orders = await response.json();

    adminOrdersTable.innerHTML = "";

    if (orders.length === 0) {
      adminOrdersTable.innerHTML = `
        <tr>
          <td colspan="8">No orders found.</td>
        </tr>
      `;
      return;
    }

    orders.forEach(order => {
      const customerName = `${order.customer.firstName} ${order.customer.lastName}`;
      const orderDate = new Date(order.createdAt).toLocaleDateString();

      adminOrdersTable.innerHTML += `
        <tr>
          <td>${order._id.slice(-6).toUpperCase()}</td>
          <td>${customerName}</td>
          <td>${order.customer.email}</td>
          <td>$${order.total.toFixed(2)}</td>
          <td><span class="status pending">${order.paymentStatus}</span></td>
          <td><span class="status processing">${order.orderStatus}</span></td>
          <td>${orderDate}</td>
         <a href="order-details.html?id=${order._id}">
  <button class="edit-btn">View</button>
</a>
        </tr>
      `;
    });

  } catch (error) {
    adminOrdersTable.innerHTML = `
      <tr>
        <td colspan="8">Failed to load orders.</td>
      </tr>
    `;
  }
};

loadAdminOrders();