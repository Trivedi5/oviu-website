const adminCustomOrdersTable = document.getElementById("adminCustomOrdersTable");

const fileUrl = (filename) => {
  if (!filename) return "";
  return `http://localhost:5000/uploads/custom-orders/${filename}`;
};

const fileLink = (filename, label) => {
  if (!filename) return `<span style="color:#999;">No ${label}</span>`;

  return `
    <a href="${fileUrl(filename)}" target="_blank">
      <button class="edit-btn">${label}</button>
    </a>
  `;
};

const loadCustomOrders = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/custom-orders");
    const orders = await response.json();

    adminCustomOrdersTable.innerHTML = "";

    if (orders.length === 0) {
      adminCustomOrdersTable.innerHTML = `
        <tr>
          <td colspan="7">No custom orders found.</td>
        </tr>
      `;
      return;
    }

    orders.forEach(order => {
      adminCustomOrdersTable.innerHTML += `
        <tr>
          <td>
            <strong>${order.customer.name}</strong><br>
            <small>${order.customer.email}</small><br>
            <small>${order.customer.phone || ""}</small>
          </td>

          <td>${order.productType}</td>
          <td>${order.quantity}</td>
          <td>${order.color || "N/A"}</td>

          <td>
            ${fileLink(order.logoFile, "Logo")}
            ${fileLink(order.artworkFile, "Artwork")}
            ${fileLink(order.referenceFile, "Reference")}
          </td>

          <td>
            <span class="status pending">${order.status}</span>
          </td>

          <td>${order.notes || "No notes"}</td>
        </tr>
      `;
    });

  } catch (error) {
    adminCustomOrdersTable.innerHTML = `
      <tr>
        <td colspan="7">Failed to load custom orders.</td>
      </tr>
    `;
  }
};

loadCustomOrders();