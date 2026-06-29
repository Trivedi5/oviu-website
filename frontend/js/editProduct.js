const editProductForm = document.getElementById("editProductForm");
const editProductMessage = document.getElementById("editProductMessage");

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const loadProductDetails = async () => {
  try {
    const response = await fetch(`https://oviu-website.onrender.com/api/products/${productId}`);
    const product = await response.json();

    document.getElementById("name").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("description").value = product.description;
    document.getElementById("price").value = product.price;
    document.getElementById("stock").value = product.stock;
    document.getElementById("featured").value = String(product.featured);
  } catch (error) {
    editProductMessage.textContent = "Failed to load product details.";
    editProductMessage.style.color = "red";
  }
};

editProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedProduct = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
    price: Number(document.getElementById("price").value),
    stock: Number(document.getElementById("stock").value),
    featured: document.getElementById("featured").value === "true"
  };

  try {
    const response = await fetch(`https://oviu-website.onrender.com/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedProduct)
    });

    if (response.ok) {
      editProductMessage.textContent = "Product updated successfully.";
      editProductMessage.style.color = "green";

      setTimeout(() => {
        window.location.href = "admin-products.html";
      }, 1000);
    } else {
      editProductMessage.textContent = "Failed to update product.";
      editProductMessage.style.color = "red";
    }
  } catch (error) {
    editProductMessage.textContent = "Server error.";
    editProductMessage.style.color = "red";
  }
});

loadProductDetails();