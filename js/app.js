// E-commerce site application logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let currentCategory = 'all';
let currentProduct = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  renderCartCount();
  updateUserUI();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Navigation clicks
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      navigateTo(page);
    });
  });

  // Cart buttons
  document.getElementById('cartBtn').addEventListener('click', toggleCart);
  document.getElementById('cartClose').addEventListener('click', toggleCart);
  document.getElementById('cartOverlay').addEventListener('click', toggleCart);

  // Category tabs
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentCategory = tab.getAttribute('data-category');
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProducts();
    });
  });

  // Login/Register toggle
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.getAttribute('data-type');
      document.getElementById('loginForm').style.display = type === 'login' ? 'block' : 'none';
      document.getElementById('registerForm').style.display = type === 'register' ? 'block' : 'none';
    });
  });

  // Login form
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('registerForm').addEventListener('submit', handleRegister);

  // Checkout form
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);

  // Payment method selection
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
      method.querySelector('input').checked = true;
    });
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

// Page navigation
function navigateTo(page, productId = null) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page + 'Page').classList.add('active');
  
  // Update nav active state
  document.querySelectorAll('.nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('data-page') === page) {
      a.classList.add('active');
    }
  });

  if (page === 'product' && productId) {
    renderProductDetail(productId);
  }
  if (page === 'checkout') {
    renderCheckout();
  }
  
  window.scrollTo(0, 0);
}

// Render product list
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.category === currentCategory);
  
  grid.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div class="product-image">
        ${product.hot ? '<span class="product-badge">HOT</span>' : ''}
        <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><rect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/><text x=%22100%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2240%22>❄️</text></svg>'">
      </div>
      <div class="product-info">
        <div class="product-category">${product.categoryName}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-model">Model: ${product.model} | ${product.btu}</div>
        <div class="product-price">
          <span class="price-current">$${product.price}</span>
          <span class="price-original">$${product.originalPrice}</span>
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
          <button class="btn-detail" onclick="navigateTo('product', ${product.id})">Details</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render product detail
function renderProductDetail(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  currentProduct = product;

  document.getElementById('productDetail').innerHTML = `
    <div class="breadcrumb">
      <a href="#" onclick="navigateTo('home');return false;">Home</a>
      <span>/</span>
      <a href="#" onclick="navigateTo('products');return false;">${product.categoryName}</a>
      <span>/</span>
      ${product.name}
    </div>
    <div class="product-detail-grid">
      <div class="product-detail-images">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><rect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/><text x=%22100%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2240%22>❄️</text></svg>'">
      </div>
      <div class="product-detail-info">
        <h1>${product.name}</h1>
        <div class="product-detail-model">Model: ${product.model} | ${product.btu} | Stock: ${product.stock} pcs</div>
        <div class="product-detail-price">
          <span class="price-current">$${product.price}</span>
          <span class="price-original">$${product.originalPrice}</span>
        </div>
        <div class="product-detail-desc">${product.description}</div>
        <div class="product-features">
          <h3>Features</h3>
          <div class="feature-tags">
            ${product.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
          </div>
        </div>
        <div class="quantity-selector">
          <label>Quantity:</label>
          <div class="quantity-control">
            <button onclick="changeQuantity(-1)">-</button>
            <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
            <button onclick="changeQuantity(1)">+</button>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn btn-blue" onclick="addToCartFromDetail()">Add to Cart</button>
          <button class="btn btn-primary" style="background:var(--danger-color);color:#fff;" onclick="buyNow()">Buy Now</button>
        </div>
      </div>
    </div>
    <div class="specs-section">
      <h2>Specifications</h2>
      <table class="specs-table">
        ${Object.entries(product.specs).map(([key, value]) => `
          <tr><td>${key}</td><td>${value}</td></tr>
        `).join('')}
      </table>
    </div>
  `;
}

// Quantity adjustment
function changeQuantity(delta) {
  const input = document.getElementById('quantity');
  let value = parseInt(input.value) + delta;
  value = Math.max(1, Math.min(value, currentProduct.stock));
  input.value = value;
}

// Add to cart from detail page
function addToCartFromDetail() {
  const quantity = parseInt(document.getElementById('quantity').value);
  addToCart(currentProduct.id, quantity);
}

// Buy now
function buyNow() {
  const quantity = parseInt(document.getElementById('quantity').value);
  addToCart(currentProduct.id, quantity, false);
  navigateTo('checkout');
}

// Add to cart
function addToCart(productId, quantity = 1, showToast = true) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  renderCart();
  renderCartCount();
  
  if (showToast) {
    showToastMessage('Added to cart');
  }
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  renderCartCount();
}

// Update cart quantity
function updateCartQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart();
    renderCart();
    renderCartCount();
  }
}

// Save cart
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Render cart
function renderCart() {
  const container = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size:13px;margin-top:10px;">Start shopping now</p>
      </div>
    `;
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
          <div class="cart-item-quantity">
            <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
      </div>
    `).join('');
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('cartTotal').textContent = '$' + total;
}

// Render cart count
function renderCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartCount').style.display = count > 0 ? 'flex' : 'none';
}

// Toggle cart sidebar
function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
  renderCart();
}

// Render checkout page
function renderCheckout() {
  const itemsContainer = document.getElementById('orderItems');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p style="color:var(--text-light);">Cart is empty</p>';
    document.getElementById('orderTotal').textContent = '$0';
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="order-item">
      <span>${item.name} × ${item.quantity}</span>
      <span>$${item.price * item.quantity}</span>
    </div>
  `).join('');
  
  document.getElementById('orderTotal').textContent = '$' + total;
}

// Handle checkout
function handleCheckout(e) {
  e.preventDefault();
  
  if (cart.length === 0) {
    showToastMessage('Cart is empty, please add products first');
    return;
  }

  if (!currentUser) {
    showToastMessage('Please login first');
    navigateTo('auth');
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: 'ORD' + Date.now(),
    items: cart,
    total: total,
    customer: {
      name: document.getElementById('checkoutName').value,
      phone: document.getElementById('checkoutPhone').value,
      address: document.getElementById('checkoutAddress').value,
      email: document.getElementById('checkoutEmail').value
    },
    payment: document.querySelector('input[name="payment"]:checked').value,
    status: 'Pending',
    date: new Date().toLocaleString()
  };

  // Save order
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart
  cart = [];
  saveCart();
  renderCartCount();

  // Show success page
  document.getElementById('checkoutPage').classList.remove('active');
  document.getElementById('successPage').classList.add('active');
  document.getElementById('orderNumber').textContent = order.id;
  document.getElementById('orderTotalDisplay').textContent = '$' + total;
  
  window.scrollTo(0, 0);
}

// Handle login
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Simple validation (real project should connect to backend)
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = { name: user.name, email: user.email };
    localStorage.setItem('user', JSON.stringify(currentUser));
    updateUserUI();
    showToastMessage('Login successful');
    navigateTo('home');
  } else {
    // If no registered user, allow direct login (demo)
    currentUser = { name: email.split('@')[0], email: email };
    localStorage.setItem('user', JSON.stringify(currentUser));
    updateUserUI();
    showToastMessage('Login successful');
    navigateTo('home');
  }
}

// Handle register
function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  if (password !== confirmPassword) {
    showToastMessage('Passwords do not match');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    showToastMessage('This email is already registered');
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  
  currentUser = { name, email };
  localStorage.setItem('user', JSON.stringify(currentUser));
  updateUserUI();
  showToastMessage('Registration successful');
  navigateTo('home');
}

// Handle logout
function handleLogout() {
  currentUser = null;
  localStorage.removeItem('user');
  updateUserUI();
  showToastMessage('Logged out');
  navigateTo('home');
}

// Update user UI
function updateUserUI() {
  const userBtn = document.getElementById('userBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (currentUser) {
    userBtn.textContent = currentUser.name;
    userBtn.onclick = () => showToastMessage('Welcome back, ' + currentUser.name);
    logoutBtn.style.display = 'inline-block';
  } else {
    userBtn.textContent = 'Login/Register';
    userBtn.onclick = () => navigateTo('auth');
    logoutBtn.style.display = 'none';
  }
}

// Show toast message
function showToastMessage(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
