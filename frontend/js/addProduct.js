const addProductForm = document.getElementById("addProductForm");
const addProductMessage = document.getElementById("addProductMessage");

addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(addProductForm);

  try {
    const response = await fetch("https://oviu-website.onrender.com/api/admin/products", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      addProductMessage.textContent = "Product added successfully.";
      addProductMessage.style.color = "green";
      addProductForm.reset();
    } else {
      addProductMessage.textContent = data.message || "Failed to add product.";
      addProductMessage.style.color = "red";
    }
  } catch (error) {
    addProductMessage.textContent = "Server error. Please check backend.";
    addProductMessage.style.color = "red";
  }
});