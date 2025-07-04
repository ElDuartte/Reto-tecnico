export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(item) {
  const existingCart = getCart();
  const updatedCart = [...existingCart, item];
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export function removeFromCart(uniqueId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.uniqueId !== uniqueId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated'));
}

