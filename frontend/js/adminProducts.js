const adminProductsTable = document.getElementById("adminProductsTable");

const getAdminImageUrl = (image) => {
  if (!image) return "../images/logo.jpg";

  const localImages = ["tshirt.jpg", "hoodie.jpg", "phone-cover.jpg", "box.jpg", "cap.jpg", "logo.jpg"];

  if (localImages.includes(image)) {
    return `../images/${image}`;
  }

  return `http://localhost:5000/uploads/${image}`;
};

const loadAdminProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();

    adminProductsTable.innerHTML = "";

    products.forEach(product => {
      adminProductsTable.innerHTML += `
        <tr>
          <td><img class="table-image" src="${getAdminImageUrl(product.image)}" alt="${product.name}"></td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>$${product.price}</td>
          <td>${product.stock}</td>
          <td>
           <a href="edit-product.html?id=${product._id}">
  <button class="edit-btn">Edit</button>
</a>
            <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
          </td>
        </tr>
      `;
    });

  } catch (error) {
    adminProductsTable.innerHTML = `
      <tr>
        <td colspan="6">Failed to load products.</td>
      </tr>
    `;
  }
};

const deleteProduct = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this product?");

  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      loadAdminProducts();
    } else {
      alert("Failed to delete product.");
    }
  } catch (error) {
    alert("Server error.");
  }
};

loadAdminProducts();