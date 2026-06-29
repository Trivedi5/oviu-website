const homeProductGrid = document.getElementById("productGrid");

const getHomeImageUrl = (image) => {
  if (!image) return "images/logo.jpg";

  const localImages = ["tshirt.jpg", "hoodie.jpg", "phone-cover.jpg", "box.jpg", "cap.jpg", "logo.jpg"];

  if (localImages.includes(image)) {
    return `images/${image}`;
  }

  return `https://oviu-website.onrender.com/uploads/${image}`;
};

const loadFeaturedProducts = async () => {
  try {
    const response = await fetch("https://oviu-website.onrender.com/api/products");
    const products = await response.json();

    const featuredProducts = products.filter(product => product.featured === true);

    homeProductGrid.innerHTML = "";

    featuredProducts.forEach(product => {
      homeProductGrid.innerHTML += `
        <div class="product-card">
          <div class="product-img">
            <img src="${getHomeImageUrl(product.image)}" alt="${product.name}">
          </div>

          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <strong>From $${product.price}.00</strong>
            <button class="dark-btn full" onclick='addToCart(${JSON.stringify(product)})'>Add to cart</button>
          </div>
        </div>
      `;
    });

  } catch (error) {
    homeProductGrid.innerHTML = "<p>Failed to load featured products.</p>";
    console.log(error);
  }
};

loadFeaturedProducts();