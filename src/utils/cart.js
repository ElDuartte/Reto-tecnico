export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

export function addToCart(item) {
  const existingCart = getCart();
  const updatedCart = [...existingCart, item];
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export function removeFromCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const updatedCart = cart.filter((item) => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated'));
}
