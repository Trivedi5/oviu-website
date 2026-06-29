const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartShipping = document.getElementById("cartShipping");
const cartTax = document.getElementById("cartTax");
const cartTotal = document.getElementById("cartTotal");
const cartCountBtn = document.getElementById("cartCountBtn");

const localImages = ["tshirt.jpg", "hoodie.jpg", "phone-cover.jpg", "box.jpg", "cap.jpg", "logo.jpg"];

const getCartImageUrl = (image) => {
  if (!image) return "../images/logo.jpg";

  if (localImages.includes(image)) {
    return `../images/${image}`;
  }

  return `https://oviu-website.onrender.com/uploads/${image}`;
};

const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const updateCartCount = () => {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountBtn) {
    cartCountBtn.textContent = `Cart ${totalItems}`;
  }
};

const renderCart = () => {
  const cart = getCart();

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add products to your cart before checkout.</p>
        <a href="products.html">
          <button class="dark-btn">Shop Products</button>
        </a>
      </div>
    `;

    cartSubtotal.textContent = "$0.00";
    cartShipping.textContent = "$0.00";
    cartTax.textContent = "$0.00";
    cartTotal.textContent = "$0.00";
    updateCartCount();
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    cartItemsContainer.innerHTML += `
      <div class="cart-card">
        <img src="${getCartImageUrl(item.image)}" alt="${item.name}">

        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>OVIU Product</p>
          <span>Price: $${item.price}.00</span>
        </div>

        <div class="cart-qty">
          <button onclick="decreaseQty('${item._id}')">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty('${item._id}')">+</button>
        </div>

        <strong>$${itemTotal.toFixed(2)}</strong>

        <button class="remove-btn" onclick="removeFromCart('${item._id}')">Remove</button>
      </div>
    `;
  });

  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartShipping.textContent = `$${shipping.toFixed(2)}`;
  cartTax.textContent = `$${tax.toFixed(2)}`;
  cartTotal.textContent = `$${total.toFixed(2)}`;

  updateCartCount();
};

const increaseQty = (id) => {
  const cart = getCart();
  const item = cart.find(product => product._id === id);

  if (item) {
    item.quantity += 1;
  }

  saveCart(cart);
  renderCart();
};

const decreaseQty = (id) => {
  let cart = getCart();
  const item = cart.find(product => product._id === id);

  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(product => product._id !== id);
  }

  saveCart(cart);
  renderCart();
};

const removeFromCart = (id) => {
  let cart = getCart();
  cart = cart.filter(product => product._id !== id);

  saveCart(cart);
  renderCart();
};

renderCart();