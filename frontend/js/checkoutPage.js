const checkoutUser = JSON.parse(localStorage.getItem("user"));
const checkoutToken = localStorage.getItem("token");

if (!checkoutToken || !checkoutUser) {
  showToast("Please login or register before checkout.", "error");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);
}
const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutTax = document.getElementById("checkoutTax");
const checkoutTotal = document.getElementById("checkoutTotal");
const checkoutCartCount = document.getElementById("checkoutCartCount");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");

const localImages = ["tshirt.jpg", "hoodie.jpg", "phone-cover.jpg", "box.jpg", "cap.jpg", "logo.jpg"];

function getCheckoutCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function getCheckoutImageUrl(image) {
  if (!image) return "../images/logo.jpg";
  if (localImages.includes(image)) return `../images/${image}`;
  return `https://oviu-website.onrender.com/uploads/${image}`;
}

function renderCheckout() {
  const cart = getCheckoutCart();
  checkoutItems.innerHTML = "";

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  checkoutCartCount.textContent = `Cart ${totalItems}`;

  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    checkoutItems.innerHTML += `
      <div class="checkout-product">
        <img src="${getCheckoutImageUrl(item.image)}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>Qty: ${item.quantity}</p>
        </div>
        <strong>$${itemTotal.toFixed(2)}</strong>
      </div>
    `;
  });

  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  checkoutShipping.textContent = `$${shipping.toFixed(2)}`;
  checkoutTax.textContent = `$${tax.toFixed(2)}`;
  checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cart = getCheckoutCart();

  if (cart.length === 0) {
    checkoutMessage.textContent = "Your cart is empty.";
    checkoutMessage.style.color = "red";
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  const orderData = {
    customer: {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    },
    shippingAddress: {
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      province: document.getElementById("province").value,
      postalCode: document.getElementById("postalCode").value,
      country: document.getElementById("country").value,
    },
    items: cart,
    subtotal,
    shipping,
    tax,
    total,
  };

  try {
    checkoutMessage.textContent = "Creating order...";
    checkoutMessage.style.color = "black";

    const orderResponse = await fetch("https://oviu-website.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const order = await orderResponse.json();

    if (!orderResponse.ok) {
      checkoutMessage.textContent = order.message || "Failed to create order.";
      checkoutMessage.style.color = "red";
      return;
    }

    checkoutMessage.textContent = "Redirecting to Stripe...";
    checkoutMessage.style.color = "green";

    const stripeResponse = await fetch("https://oviu-website.onrender.com/api/payments/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        orderId: order._id,
        items: cart
      })
    });

    const stripeData = await stripeResponse.json();

    if (!stripeResponse.ok) {
      checkoutMessage.textContent = stripeData.message || "Stripe checkout failed.";
      checkoutMessage.style.color = "red";
      return;
    }

    localStorage.setItem("lastOrder", JSON.stringify(order));
    window.location.href = stripeData.url;

  } catch (error) {
    checkoutMessage.textContent = "Server error. Please check backend.";
    checkoutMessage.style.color = "red";
    console.log(error);
  }
});

renderCheckout();