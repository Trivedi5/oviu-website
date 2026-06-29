const apiProductsGrid = document.getElementById("apiProductsGrid");
const productCount = document.getElementById("productCount");

const getImageUrl = (image) => {
  if (!image) return "../images/logo.jpg";

  const localImages = ["tshirt.jpg", "hoodie.jpg", "phone-cover.jpg", "box.jpg", "cap.jpg", "logo.jpg"];

  if (localImages.includes(image)) {
    return `../images/${image}`;
  }

  return `http://localhost:5000/uploads/${image}`;
};

const loadProducts = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    const products = await response.json();

    apiProductsGrid.innerHTML = "";
    productCount.textContent = `Showing ${products.length} of ${products.length} products`;

    products.forEach(product => {
      apiProductsGrid.innerHTML += `
        <div class="shop-card">
          <div class="heart">♡</div>
          <img src="${getImageUrl(product.image)}" alt="${product.name}">
          <div class="shop-info">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <strong>From $${product.price}.00</strong>
            <div class="stars">★★★★★ <span>(${product.stock})</span></div>
            <button class="dark-btn full" onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
          </div>
        </div>
      `;
    });

  } catch (error) {
    apiProductsGrid.innerHTML = "<p>Failed to load products.</p>";
    productCount.textContent = "Unable to load products";
    console.log(error);
  }
};

loadProducts();