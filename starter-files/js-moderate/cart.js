// Faulty Cart State & Logic
let cartItems = [
  { id: 1, name: "Mechanical Keyboard", price: 89.99, qty: 1 },
  { id: 2, name: "Wireless Gaming Mouse", price: 49.50, qty: 2 },
  { id: 3, name: "Desk Mat Extended", price: 19.99, qty: 1 }
];

function updateQuantity(id, delta) {
  const item = cartItems.find(i => i.id === id);
  if (!item) return;

  // BUG 1: Allows negative and zero quantities without removing
  item.qty += delta; 

  renderCart();
  // BUG 2: calculateTotal not updating properly
}

function removeItem(id) {
  // BUG 3: Removes DOM element directly without updating cartItems array!
  const row = document.getElementById("item-" + id);
  if (row) row.remove();
  // State remains unchanged!
}

function calculateTotal() {
  let total = 0;
  // BUG 4: Off-by-one index error causing NaN!
  for (let i = 0; i <= cartItems.length; i++) {
    total += cartItems[i].price * cartItems[i].qty;
  }
  // BUG 5: Does not format to 2 decimal places (.toFixed(2) missing)
  document.getElementById("cart-total").innerText = "$" + total;
}

function checkEmptyState() {
  // BUG 6: Incorrect empty condition check
  const emptyBanner = document.getElementById("empty-cart-msg");
  const checkoutBtn = document.getElementById("checkout-btn");
  if (cartItems.length = 0) { // BUG: Assignment instead of comparison!
    emptyBanner.style.display = "block";
    checkoutBtn.disabled = true;
  }
}

function renderCart() {
  const container = document.getElementById("cart-items-container");
  container.innerHTML = "";
  cartItems.forEach(item => {
    const row = document.createElement("div");
    row.id = "item-" + item.id;
    row.className = "cart-row";
    row.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <button onclick="updateQuantity(${item.id}, -1)">-</button>
      <span>${item.qty}</span>
      <button onclick="updateQuantity(${item.id}, 1)">+</button>
      <button onclick="removeItem(${item.id})">Remove</button>
    `;
    container.appendChild(row);
  });
  calculateTotal();
  checkEmptyState();
}

window.onload = renderCart;
