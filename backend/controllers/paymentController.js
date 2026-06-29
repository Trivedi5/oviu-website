const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { orderId, items } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `http://127.0.0.1:5501/oviu-website/frontend/pages/order-success.html?orderId=${orderId}`,
      cancel_url: `http://127.0.0.1:5501/oviu-website/frontend/pages/checkout.html`,
      metadata: {
        orderId,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log("STRIPE ERROR:", error.message);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
};

module.exports = {
  createCheckoutSession,
};