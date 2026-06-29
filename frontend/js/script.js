const products = [
  {
    name: "Anime T-Shirt",
    type: "Premium Cotton",
    price: "$30.00",
    image: "images/tshirt.jpg"
  },
  {
    name: "Rex Hoodie",
    type: "Premium Hoodie",
    price: "$65.00",
    image: "images/hoodie.jpg"
  },
  {
    name: "Custom Phone Cover",
    type: "Personalized Design",
    price: "$20.00",
    image: "images/phone-cover.jpg"
  },
  {
    name: "Luxury Gift Box",
    type: "Premium Gift Package",
    price: "$75.00",
    image: "images/box.jpg"
  }
];

const productGrid = document.getElementById("productGrid");

if (productGrid) {
  products.forEach(product => {
    productGrid.innerHTML += `
      <div class="product-card">
        <div class="product-img">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.type}</p>
          <strong>From ${product.price}</strong>
          <button class="dark-btn full">Add to cart</button>
        </div>
      </div>
    `;
  });
}