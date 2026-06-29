const orderDetailsContainer = document.getElementById("orderDetailsContainer");

const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");

const loadOrder = async () => {
  try {
    const response = await fetch(`https://oviu-website.onrender.com/api/orders/${orderId}`);
    const order = await response.json();

    let productsHTML = "";

    order.items.forEach(item => {
      productsHTML += `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${item.price.toFixed(2)}</td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `;
    });

    orderDetailsContainer.innerHTML = `
      <div class="order-detail-grid">

        <div>
          <h2>Customer Information</h2>
          <p><strong>Name:</strong> ${order.customer.firstName} ${order.customer.lastName}</p>
          <p><strong>Email:</strong> ${order.customer.email}</p>
          <p><strong>Phone:</strong> ${order.customer.phone}</p>

          <hr>

          <h2>Shipping Address</h2>
          <p>${order.shippingAddress.street}</p>
          <p>${order.shippingAddress.city}, ${order.shippingAddress.province}</p>
          <p>${order.shippingAddress.postalCode}</p>
          <p>${order.shippingAddress.country}</p>
        </div>

        <div>
          <h2>Order Status</h2>

          <label>Order Status</label>
          <select id="orderStatus">
            <option value="Processing" ${order.orderStatus === "Processing" ? "selected" : ""}>Processing</option>
            <option value="Shipped" ${order.orderStatus === "Shipped" ? "selected" : ""}>Shipped</option>
            <option value="Delivered" ${order.orderStatus === "Delivered" ? "selected" : ""}>Delivered</option>
            <option value="Cancelled" ${order.orderStatus === "Cancelled" ? "selected" : ""}>Cancelled</option>
          </select>

          <br><br>

          <label>Payment Status</label>
          <select id="paymentStatus">
            <option value="Pending" ${order.paymentStatus === "Pending" ? "selected" : ""}>Pending</option>
            <option value="Paid" ${order.paymentStatus === "Paid" ? "selected" : ""}>Paid</option>
            <option value="Refunded" ${order.paymentStatus === "Refunded" ? "selected" : ""}>Refunded</option>
          </select>

          <br><br>

          <button class="dark-btn" onclick="updateOrder()">Save Changes</button>

          <p id="statusMessage"></p>
        </div>

      </div>

      <hr>

      <h2>Products</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          ${productsHTML}
        </tbody>
      </table>

      <hr>

      <h2>Order Summary</h2>
      <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
      <p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>
      <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
      <h3>Total: $${order.total.toFixed(2)}</h3>
    `;

  } catch (error) {
    orderDetailsContainer.innerHTML = "<h2>Failed to load order.</h2>";
  }
};

const updateOrder = async () => {
  const orderStatus = document.getElementById("orderStatus").value;
  const paymentStatus = document.getElementById("paymentStatus").value;

  try {
    const response = await fetch(`https://oviu-website.onrender.com/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderStatus,
        paymentStatus,
      }),
    });

    if (response.ok) {
      document.getElementById("statusMessage").innerHTML =
        "<span style='color:green;font-weight:bold;'>Order updated successfully!</span>";

      setTimeout(() => {
        loadOrder();
      }, 700);
    } else {
      document.getElementById("statusMessage").innerHTML =
        "<span style='color:red;'>Failed to update order.</span>";
    }
  } catch (error) {
    document.getElementById("statusMessage").innerHTML =
      "<span style='color:red;'>Server error.</span>";
  }
};

loadOrder();