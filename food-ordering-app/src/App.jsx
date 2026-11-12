
import React, { useState } from "react";
import "./App.css";

// Food items available in the restaurant
const foodItems = [
  {
    id: 1,
    name: "Pizza",
    price: 250,
    image: "🍕",
    description: "Delicious cheese pizza"
  },
  {
    id: 2,
    name: "Burger",
    price: 120,
    image: "🍔",
    description: "Fresh vegetable burger"
  },
  {
    id: 3,
    name: "French Fries",
    price: 100,
    image: "🍟",
    description: "Crispy golden fries"
  },
  {
    id: 4,
    name: "Sandwich",
    price: 90,
    image: "🥪",
    description: "Healthy vegetable sandwich"
  },
  {
    id: 5,
    name: "Biryani",
    price: 180,
    image: "🍛",
    description: "Spicy chicken biryani"
  },
  {
    id: 6,
    name: "Ice Cream",
    price: 80,
    image: "🍨",
    description: "Chocolate ice cream"
  }
];

function App() {

  // State to store cart items
  const [cart, setCart] = useState([]);

  // State to store order confirmation
  const [message, setMessage] = useState("");

  // Add food item to cart
  const addToCart = (food) => {

    setMessage("");

    const existingItem = cart.find(
      (item) => item.id === food.id
    );

    if (existingItem) {

      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        { ...food, quantity: 1 }
      ]);

    }
  };

  // Increase item quantity
  const increaseQuantity = (id) => {

    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {

    setCart(
      cart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate total bill
  const totalAmount = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Place order
  const placeOrder = () => {

    if (cart.length === 0) {
      setMessage("Please add items to your cart!");
      return;
    }

    setMessage(
      "Your order has been placed successfully!"
    );

    setCart([]);
  };

  return (

    <div className="app">

      {/* Application Header */}
      <header>
        <h1>🍴 Foodie</h1>
        <p>Online Food Ordering Application</p>
      </header>

      {/* Food Menu */}
      <h2>Our Food Menu</h2>

      <div className="food-container">

        {foodItems.map((food) => (

          <div className="food-card" key={food.id}>

            <div className="food-image">
              {food.image}
            </div>

            <h3>{food.name}</h3>

            <p>{food.description}</p>

            <h4>₹{food.price}</h4>

            <button onClick={() => addToCart(food)}>
              Add to Cart
            </button>

          </div>

        ))}

      </div>

      {/* Shopping Cart */}
      <div className="cart">

        <h2>🛒 Your Shopping Cart</h2>

        {cart.length === 0 ? (

          <p>Your cart is empty.</p>

        ) : (

          cart.map((item) => (

            <div className="cart-item" key={item.id}>

              <span>
                {item.image} {item.name}
              </span>

              <span>₹{item.price}</span>

              <div className="quantity">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>

              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>

            </div>

          ))

        )}

        <h3>Total Amount: ₹{totalAmount}</h3>

        <button
          className="order-button"
          onClick={placeOrder}
        >
          Place Order
        </button>

        {message && (
          <p className="message">{message}</p>
        )}

      </div>

    </div>
  );
}

export default App;
