// 电商网站应用逻辑
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentUser = JSON.parse(localStorage.getItem('user')) || null;
let currentCategory = 'all';
let currentProduct = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  renderCartCount();
  updateUserUI();
  setupEventListeners();
});

// 设置事件监听
function setupEventListeners() {
  // 导航点击
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      navigateTo(page);
    });
  });

  // 购物车按钮
  document.getElementById('cartBtn').addEventListener('click', toggleCart);
  document.getElementById('cartClose').addEventListener('click', toggleCart);
  document.getElementById('cartOverlay').addEventListener('click', toggleCart);

  // 分类标签
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentCategory = tab.getAttribute('data-category');
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderProducts();
    });
  });

  // 登录/注册切换
  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.getAttribute('data-type');
      document.getElementById('loginForm').style.display = type === 'login' ? 'block' : 'none';
      document.getElementById('registerForm').style.display = type === 'register' ? 'block' : 'none';
    });
  });

  // 登录表单
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('registerForm').addEventListener('submit', handleRegister);

  // 结算表单
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);

  // 支付方式选择
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
      method.classList.add('selected');
      method.querySelector('input').checked = true;
    });
  });

  // 退出登录
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
}

// 页面导航
function navigateTo(page, productId = null) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(page + 'Page').classList.add('active');
  
  // 更新导航激活状态
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

// 渲染产品列表
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = currentCategory === 'all' 
    ? products 
    : products.filter(p => p.category === currentCategory);
  
  grid.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div class="product-image">
        ${product.hot ? '<span class="product-badge">热卖</span>' : ''}
        <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22><rect fill=%22%23f0f0f0%22 width=%22200%22 height=%22200%22/><text x=%22100%22 y=%22100%22 text-anchor=%22middle%22 fill=%22%23999%22 font-size=%2240%22>❄️</text></svg>'">
      </div>
      <div class="product-info">
        <div class="product-category">${product.categoryName}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-model">型号: ${product.model} | ${product.btu}</div>
        <div class="product-price">
          <span class="price-current">¥${product.price}</span>
          <span class="price-original">¥${product.originalPrice}</span>
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart(${product.id})">加入购物车</button>
          <button class="btn-detail" onclick="navigateTo('product', ${product.id})">详情</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 渲染产品详情
function renderProductDetail(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  currentProduct = product;

  document.getElementById('productDetail').innerHTML = `
    <div class="breadcrumb">
      <a href="#" onclick="navigateTo('home');return false;">首页</a>
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
        <div class="product-detail-model">型号: ${product.model} | ${product.btu} | 库存: ${product.stock}件</div>
        <div class="product-detail-price">
          <span class="price-current">¥${product.price}</span>
          <span class="price-original">¥${product.originalPrice}</span>
        </div>
        <div class="product-detail-desc">${product.description}</div>
        <div class="product-features">
          <h3>产品特点</h3>
          <div class="feature-tags">
            ${product.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
          </div>
        </div>
        <div class="quantity-selector">
          <label>数量:</label>
          <div class="quantity-control">
            <button onclick="changeQuantity(-1)">-</button>
            <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
            <button onclick="changeQuantity(1)">+</button>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn btn-blue" onclick="addToCartFromDetail()">加入购物车</button>
          <button class="btn btn-primary" style="background:var(--danger-color);color:#fff;" onclick="buyNow()">立即购买</button>
        </div>
      </div>
    </div>
    <div class="specs-section">
      <h2>规格参数</h2>
      <table class="specs-table">
        ${Object.entries(product.specs).map(([key, value]) => `
          <tr><td>${key}</td><td>${value}</td></tr>
        `).join('')}
      </table>
    </div>
  `;
}

// 数量调整
function changeQuantity(delta) {
  const input = document.getElementById('quantity');
  let value = parseInt(input.value) + delta;
  value = Math.max(1, Math.min(value, currentProduct.stock));
  input.value = value;
}

// 从详情页加入购物车
function addToCartFromDetail() {
  const quantity = parseInt(document.getElementById('quantity').value);
  addToCart(currentProduct.id, quantity);
}

// 立即购买
function buyNow() {
  const quantity = parseInt(document.getElementById('quantity').value);
  addToCart(currentProduct.id, quantity, false);
  navigateTo('checkout');
}

// 加入购物车
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
    showToastMessage('已加入购物车');
  }
}

// 从购物车移除
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  renderCartCount();
}

// 更新购物车数量
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

// 保存购物车
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 渲染购物车
function renderCart() {
  const container = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>购物车是空的</p>
        <p style="font-size:13px;margin-top:10px;">快去挑选心仪的产品吧</p>
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
          <div class="cart-item-price">¥${item.price}</div>
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
  document.getElementById('cartTotal').textContent = '¥' + total;
}

// 渲染购物车数量
function renderCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartCount').style.display = count > 0 ? 'flex' : 'none';
}

// 切换购物车侧边栏
function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
  renderCart();
}

// 渲染结算页面
function renderCheckout() {
  const itemsContainer = document.getElementById('orderItems');
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p style="color:var(--text-light);">购物车为空</p>';
    document.getElementById('orderTotal').textContent = '¥0';
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="order-item">
      <span>${item.name} × ${item.quantity}</span>
      <span>¥${item.price * item.quantity}</span>
    </div>
  `).join('');
  
  document.getElementById('orderTotal').textContent = '¥' + total;
}

// 处理结算
function handleCheckout(e) {
  e.preventDefault();
  
  if (cart.length === 0) {
    showToastMessage('购物车为空，请先添加商品');
    return;
  }

  if (!currentUser) {
    showToastMessage('请先登录');
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
    status: '待发货',
    date: new Date().toLocaleString()
  };

  // 保存订单
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // 清空购物车
  cart = [];
  saveCart();
  renderCartCount();

  // 显示成功页面
  document.getElementById('checkoutPage').classList.remove('active');
  document.getElementById('successPage').classList.add('active');
  document.getElementById('orderNumber').textContent = order.id;
  document.getElementById('orderTotalDisplay').textContent = '¥' + total;
  
  window.scrollTo(0, 0);
}

// 处理登录
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // 简单验证（实际项目应连接后端）
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    currentUser = { name: user.name, email: user.email };
    localStorage.setItem('user', JSON.stringify(currentUser));
    updateUserUI();
    showToastMessage('登录成功');
    navigateTo('home');
  } else {
    // 如果没有注册用户，允许直接登录（演示用）
    currentUser = { name: email.split('@')[0], email: email };
    localStorage.setItem('user', JSON.stringify(currentUser));
    updateUserUI();
    showToastMessage('登录成功');
    navigateTo('home');
  }
}

// 处理注册
function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  if (password !== confirmPassword) {
    showToastMessage('两次密码不一致');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.email === email)) {
    showToastMessage('该邮箱已注册');
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  
  currentUser = { name, email };
  localStorage.setItem('user', JSON.stringify(currentUser));
  updateUserUI();
  showToastMessage('注册成功');
  navigateTo('home');
}

// 退出登录
function handleLogout() {
  currentUser = null;
  localStorage.removeItem('user');
  updateUserUI();
  showToastMessage('已退出登录');
  navigateTo('home');
}

// 更新用户界面
function updateUserUI() {
  const userBtn = document.getElementById('userBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (currentUser) {
    userBtn.textContent = currentUser.name;
    userBtn.onclick = () => showToastMessage('欢迎回来，' + currentUser.name);
    logoutBtn.style.display = 'inline-block';
  } else {
    userBtn.textContent = '登录/注册';
    userBtn.onclick = () => navigateTo('auth');
    logoutBtn.style.display = 'none';
  }
}

// 显示提示消息
function showToastMessage(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
