// /utils/cart.js
export function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    // prevent duplicates
    const isAlreadyInCart = cart.some(i => i.id === item.id);
    if (isAlreadyInCart) {
      alert(`${item.name} is already in cart 🛒`);
      return;
    }
  
    const updatedCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    // notify Navbar
    window.dispatchEvent(new Event("cartUpdated"));
  
    alert(`${item.name} added to cart 🛒`);
  }
  
  export function removeFromCart(id) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    // notify Navbar
    window.dispatchEvent(new Event("cartUpdated"));
  }
  