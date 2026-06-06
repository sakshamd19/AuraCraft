/**
 * AuraCraft Core Application Controller (Amazon Style)
 */

class AuraCraftApp {
  constructor() {
    this.state = {
      cart: JSON.parse(localStorage.getItem('auracraft_cart')) || [],
      wishlist: JSON.parse(localStorage.getItem('auracraft_wishlist')) || [],
      activeView: 'home',
      selectedProductId: null,
      filters: {
        category: null,
        searchQuery: '',
        minPrice: 0,
        maxPrice: 9999,
        minRating: 0
      },
      sort: 'featured',
      activeDashTab: 'orders',
      orders: JSON.parse(localStorage.getItem('auracraft_orders')) || [
        {
          id: "114-8890123-4567890",
          date: "June 1, 2026",
          items: "Vortex Carbon Wallet x1",
          price: 79.00,
          status: "Delivered"
        }
      ]
    };

    // Cache DOM Elements
    this.dom = {
      views: document.querySelectorAll('.view'),
      cartOverlay: document.getElementById('cart-overlay'),
      cartClose: document.getElementById('cart-close-btn'),
      cartItemsList: document.getElementById('cart-items-list'),
      cartSubtotalVal: document.getElementById('cart-subtotal-val'),
      cartCount: document.getElementById('cart-count'),
      
      // Header Search
      headerSearchInput: document.getElementById('header-search-input'),
      headerCategorySelect: document.getElementById('header-category-select'),
      
      // Home
      trendingGrid: document.getElementById('trending-products-grid'),
      
      // Shop
      catalogGrid: document.getElementById('catalog-products-grid'),
      categoryFilterList: document.getElementById('category-filter-list'),
      sortSelector: document.getElementById('sort-selector'),
      catalogCountLabel: document.getElementById('catalog-count-label'),
      
      // Detail
      detailContainer: document.getElementById('product-detail-container'),
      
      // Checkout
      checkoutItems: document.getElementById('checkout-summary-items'),
      checkoutTotal: document.getElementById('checkout-total'),
      btnSubmitOrder: document.getElementById('btn-submit-order'),
      successOverlay: document.getElementById('checkout-success-overlay'),
      successClose: document.getElementById('success-close-btn'),
      shippingForm: document.getElementById('shipping-form'),
      
      // Dashboard
      dashMenuBtns: document.querySelectorAll('.dash-menu-btn'),
      dashPanes: document.querySelectorAll('.dash-pane'),
      ordersTableBody: document.getElementById('orders-log-tbody'),
      dashWishlistGrid: document.getElementById('dash-wishlist-grid')
    };
  }

  init() {
    this.setupEventListeners();
    this.renderHome();
    this.renderShopSidebar();
    this.renderShopProducts();
    this.updateCartUI();
    this.renderDashboard();
    
    this.handleRouting();
    window.addEventListener('hashchange', () => this.handleRouting());
  }

  setupEventListeners() {
    // Cart Drawer Toggle
    this.dom.cartClose.addEventListener('click', () => this.toggleCartDrawer(false));
    this.dom.cartOverlay.addEventListener('click', (e) => {
      if (e.target === this.dom.cartOverlay) this.toggleCartDrawer(false);
    });

    document.getElementById('cart-checkout-btn').addEventListener('click', () => {
      this.toggleCartDrawer(false);
      this.navigateTo('checkout');
    });

    // Header Search Enter Key
    if(this.dom.headerSearchInput) {
      this.dom.headerSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.performGlobalSearch();
      });
    }

    // Shop Filters - Sort
    if(this.dom.sortSelector) {
      this.dom.sortSelector.addEventListener('change', (e) => {
        this.state.sort = e.target.value;
        this.renderShopProducts();
      });
    }

    // Submit Order
    if(this.dom.btnSubmitOrder) {
      this.dom.btnSubmitOrder.addEventListener('click', (e) => {
        e.preventDefault();
        this.processCheckout();
      });
    }

    // Close Success Modal
    if(this.dom.successClose) {
      this.dom.successClose.addEventListener('click', () => {
        this.dom.successOverlay.style.display = 'none';
        this.navigateTo('dashboard');
        this.switchDashboardTab('orders');
      });
    }

    // Dashboard Tabs
    this.dom.dashMenuBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.switchDashboardTab(tab);
      });
    });
  }

  handleRouting() {
    const hash = window.location.hash.replace('#/', '');
    if (hash === 'shop') {
      this.navigateTo('shop', {}, false);
    } else if (hash.startsWith('product/')) {
      const id = hash.split('/')[1];
      this.navigateTo('detail', { id }, false);
    } else if (hash === 'checkout') {
      this.navigateTo('checkout', {}, false);
    } else if (hash === 'dashboard') {
      this.navigateTo('dashboard', {}, false);
      this.switchDashboardTab('orders');
    } else {
      this.navigateTo('home', {}, false);
    }
  }

  navigateTo(viewName, params = {}, updateHash = true) {
    this.state.activeView = viewName;
    
    if (updateHash) {
      if (viewName === 'home') window.location.hash = '';
      else if (viewName === 'detail') window.location.hash = `#/product/${params.id}`;
      else window.location.hash = `#/${viewName}`;
    }

    this.dom.views.forEach(view => {
      if(view) view.classList.remove('active');
    });
    
    const activeViewEl = document.getElementById(`view-${viewName}`);
    if(activeViewEl) activeViewEl.classList.add('active');

    window.scrollTo(0, 0);

    if (viewName === 'detail' && params.id) {
      this.state.selectedProductId = params.id;
      this.renderProductDetail(params.id);
    } else if (viewName === 'checkout') {
      this.renderCheckout();
    } else if (viewName === 'dashboard') {
      this.renderDashboard();
    } else if (viewName === 'shop') {
      this.renderShopProducts();
    }
  }

  // --- Search & Filters ---
  performGlobalSearch() {
    const query = this.dom.headerSearchInput.value.trim();
    const cat = this.dom.headerCategorySelect.value;
    
    this.state.filters.searchQuery = query;
    this.state.filters.category = cat === 'All' ? null : cat;
    
    this.navigateTo('shop');
    this.renderShopProducts();
    this.renderShopSidebar();
  }

  filterByCategory(cat) {
    this.state.filters.category = cat === 'null' ? null : cat;
    this.navigateTo('shop');
    this.renderShopSidebar();
    this.renderShopProducts();
  }

  filterByRating(minRating) {
    this.state.filters.minRating = minRating;
    this.renderShopProducts();
  }

  filterByPriceRange(min, max) {
    this.state.filters.minPrice = min;
    this.state.filters.maxPrice = max;
    this.renderShopProducts();
  }

  // --- Home Page Rendering ---
  renderHome() {
    const featured = products.filter(p => p.popular);
    if(this.dom.trendingGrid) {
      this.dom.trendingGrid.innerHTML = featured.map(p => this.createProductCardHtml(p)).join('');
    }
  }

  renderShopSidebar() {
    const categories = ['All', ...new Set(products.map(p => p.category))];
    if(this.dom.categoryFilterList) {
      this.dom.categoryFilterList.innerHTML = categories.map(cat => {
        const isActive = cat === 'All' && !this.state.filters.category || this.state.filters.category === cat;
        return `
          <li>
            <a href="#" class="${isActive ? 'active' : ''}" style="${isActive ? 'font-weight:bold;' : ''}" onclick="app.filterByCategory('${cat === 'All' ? 'null' : cat}'); event.preventDefault();">
              ${cat}
            </a>
          </li>
        `;
      }).join('');
    }
  }

  renderShopProducts() {
    let filtered = products.filter(p => {
      const matchCategory = !this.state.filters.category || p.category === this.state.filters.category;
      const matchPrice = p.price >= this.state.filters.minPrice && p.price <= this.state.filters.maxPrice;
      const matchRating = p.rating >= this.state.filters.minRating;
      const matchSearch = p.name.toLowerCase().includes(this.state.filters.searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(this.state.filters.searchQuery.toLowerCase());
      return matchCategory && matchPrice && matchRating && matchSearch;
    });

    if (this.state.sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (this.state.sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (this.state.sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if(this.dom.catalogCountLabel) {
      this.dom.catalogCountLabel.textContent = `1-${filtered.length} of over ${filtered.length} results`;
    }
    
    if(this.dom.catalogGrid) {
      this.dom.catalogGrid.innerHTML = filtered.length > 0 
        ? filtered.map(p => this.createProductCardHtml(p)).join('') 
        : `<div style="grid-column: span 3; padding: 40px;">No results for current filters.</div>`;
    }
  }

  createProductCardHtml(p) {
    const fullStars = Math.floor(p.rating);
    const starString = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
    
    return `
      <div class="product-card" onclick="app.navigateTo('detail', { id: '${p.id}' })">
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}" class="product-img" onerror="this.src='https://placehold.co/400x400/f8f8f8/999?text=${encodeURIComponent(p.name)}'">
        </div>
        <div class="product-title">${p.name}</div>
        <div class="product-rating">
          ${starString} <span>${p.reviewsCount}</span>
        </div>
        <div class="product-price">
          <small>₹</small>${p.price.toLocaleString('en-IN')}
        </div>
        ${p.popular ? '<div class="product-badge">Best Seller</div>' : ''}
        <div class="card-actions" onclick="event.stopPropagation();">
          <button class="btn-primary" onclick="app.addToCart('${p.id}')" style="display: flex; align-items: center; justify-content: center;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Add to Cart
          </button>
        </div>
      </div>
    `;
  }

  // --- Detail View Rendering ---
  renderProductDetail(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    const fullStars = Math.floor(p.rating);
    const starString = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
    const isWishlisted = this.state.wishlist.includes(p.id);

    const bullets = p.features.map(f => `<li>${f}</li>`).join('');

    if(this.dom.detailContainer) {
      this.dom.detailContainer.innerHTML = `
        <div class="detail-gallery">
          <img src="${p.image}" alt="${p.name}" onerror="this.src='https://placehold.co/600x600/f8f8f8/999?text=${encodeURIComponent(p.name)}'">
        </div>

        <div class="detail-info">
          <h1>${p.name}</h1>
          <div class="brand">Visit the AuraCraft Store</div>
          <div class="product-rating" style="font-size:16px;">
            ${starString} <span>${p.rating} out of 5 stars (${p.reviewsCount} ratings)</span>
          </div>
          
          <div class="detail-divider"></div>
          
          <div class="detail-price-block">
            <span style="font-size: 14px; vertical-align: top;">₹</span><span class="price">${p.price.toLocaleString('en-IN')}</span>
          </div>
          
          <div style="font-weight:bold; margin-bottom:10px;">About this item</div>
          <ul class="detail-bullets">
            ${bullets}
            <li>${p.description}</li>
          </ul>
        </div>

        <div class="buy-box">
          <div class="price">₹${p.price.toLocaleString('en-IN')}</div>
          <div style="font-size: 14px; margin-bottom:10px;">FREE Returns</div>
          <div class="stock-status">In Stock</div>
          
          <select id="detail-qty-select">
            <option value="1">Qty: 1</option>
            <option value="2">Qty: 2</option>
            <option value="3">Qty: 3</option>
          </select>

          <button class="btn-primary" onclick="app.addDetailToCart('${p.id}')" style="display: flex; align-items: center; justify-content: center;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Add to Cart
          </button>
          <button class="btn-secondary" onclick="app.addDetailToCart('${p.id}'); app.navigateTo('checkout');" style="display: flex; align-items: center; justify-content: center;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            Buy Now
          </button>
          
          <div class="detail-divider"></div>
          <button class="btn-outline" onclick="app.toggleWishlist('${p.id}')" style="display: flex; align-items: center; justify-content: center;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            ${isWishlisted ? 'Remove from List' : 'Add to List'}
          </button>
        </div>
      `;
    }
  }

  addDetailToCart(productId) {
    const qtySelect = document.getElementById('detail-qty-select');
    const quantity = qtySelect ? parseInt(qtySelect.value) : 1;
    this.addToCart(productId, quantity);
  }

  // --- Cart System ---
  toggleCartDrawer(isOpen) {
    if (isOpen) {
      this.dom.cartOverlay.classList.add('open');
      this.updateCartUI();
    } else {
      this.dom.cartOverlay.classList.remove('open');
    }
  }

  addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = this.state.cart.find(item => item.product.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.state.cart.push({ product, quantity });
    }

    this.saveCart();
    this.updateCartUI();
    this.toggleCartDrawer(true);
  }

  updateCartQuantity(productId, quantity) {
    const item = this.state.cart.find(i => i.product.id === productId);
    if (!item) return;
    
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      item.quantity = quantity;
      this.saveCart();
      this.updateCartUI();
    }
  }

  removeFromCart(productId) {
    this.state.cart = this.state.cart.filter(item => item.product.id !== productId);
    this.saveCart();
    this.updateCartUI();
  }

  saveCart() {
    localStorage.setItem('auracraft_cart', JSON.stringify(this.state.cart));
  }

  updateCartUI() {
    const totalCount = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    if(this.dom.cartCount) this.dom.cartCount.textContent = totalCount;

    const subtotal = this.state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    if(this.dom.cartSubtotalVal) this.dom.cartSubtotalVal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    if(this.dom.cartItemsList) {
      if (this.state.cart.length === 0) {
        this.dom.cartItemsList.innerHTML = `<p>Your Amazon Cart is empty.</p>`;
        document.getElementById('cart-checkout-btn').style.display = 'none';
      } else {
        document.getElementById('cart-checkout-btn').style.display = 'block';
        this.dom.cartItemsList.innerHTML = this.state.cart.map(item => `
          <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}" onerror="this.src='https://placehold.co/100/f8f8f8/999'">
            <div class="cart-item-details">
              <div class="cart-item-title">${item.product.name}</div>
              <div class="cart-item-price">₹${item.product.price.toLocaleString('en-IN')}</div>
              <div class="cart-item-actions">
                <select onchange="app.updateCartQuantity('${item.product.id}', parseInt(this.value))">
                  ${[1,2,3,4,5,6,7,8,9,10].map(n => `<option value="${n}" ${item.quantity === n ? 'selected' : ''}>Qty: ${n}</option>`).join('')}
                </select>
                | <button onclick="app.removeFromCart('${item.product.id}')" style="display:inline-flex; align-items:center; gap:4px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    Delete
                  </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // --- Wishlist System ---
  toggleWishlist(productId) {
    const idx = this.state.wishlist.indexOf(productId);
    if (idx > -1) {
      this.state.wishlist.splice(idx, 1);
    } else {
      this.state.wishlist.push(productId);
    }
    localStorage.setItem('auracraft_wishlist', JSON.stringify(this.state.wishlist));
    
    if (this.state.activeView === 'detail' && this.state.selectedProductId === productId) {
      this.renderProductDetail(productId);
    }
    if (this.state.activeView === 'dashboard') this.renderDashboard();
  }

  // --- Checkout Processing ---
  renderCheckout() {
    const subtotal = this.state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    if(this.dom.checkoutTotal) this.dom.checkoutTotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

    if(this.dom.checkoutItems) {
      this.dom.checkoutItems.innerHTML = this.state.cart.map(item => `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-size:14px;">
          <span>${item.product.name} (x${item.quantity})</span>
          <span>₹${(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
        </div>
      `).join('');
    }
  }

  processCheckout() {
    if (this.state.cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    if(this.dom.shippingForm && !this.dom.shippingForm.checkValidity()) {
        alert("Please complete the shipping form.");
        return;
    }

    const subtotal = this.state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const orderId = `114-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const cargoItems = this.state.cart.map(item => `${item.product.name} x${item.quantity}`).join(', ');

    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    this.state.orders.unshift({
      id: orderId,
      date: formattedDate,
      items: cargoItems,
      price: subtotal,
      status: "Preparing for Shipment"
    });
    localStorage.setItem('auracraft_orders', JSON.stringify(this.state.orders));

    this.state.cart = [];
    this.saveCart();
    this.updateCartUI();

    if(this.dom.successOverlay) this.dom.successOverlay.style.display = 'block';
  }

  // --- Dashboard Rendering ---
  renderDashboard() {
    if(this.dom.ordersTableBody) {
      this.dom.ordersTableBody.innerHTML = this.state.orders.map(o => `
        <tr>
          <td style="color:var(--amz-link);">${o.id}</td>
          <td>${o.date}</td>
          <td style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${o.items}</td>
          <td style="font-weight: bold;">₹${parseFloat(o.price).toLocaleString('en-IN')}</td>
          <td style="color:var(--amz-success); font-weight:bold;">${o.status}</td>
        </tr>
      `).join('');
    }

    const wishlistedProds = products.filter(p => this.state.wishlist.includes(p.id));
    if(this.dom.dashWishlistGrid) {
      if (wishlistedProds.length === 0) {
        this.dom.dashWishlistGrid.innerHTML = `<div style="grid-column: span 3;">No items in your list.</div>`;
      } else {
        this.dom.dashWishlistGrid.innerHTML = wishlistedProds.map(p => this.createProductCardHtml(p)).join('');
      }
    }
  }

  switchDashboardTab(tabName) {
    this.state.activeDashTab = tabName;
    
    this.dom.dashMenuBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabName) {
        btn.classList.add('active');
        btn.style.fontWeight = 'bold';
      } else {
        btn.classList.remove('active');
        btn.style.fontWeight = 'normal';
      }
    });

    this.dom.dashPanes.forEach(pane => {
      pane.style.display = pane.id === `dash-pane-${tabName}` ? 'block' : 'none';
    });
  }
}

const app = new AuraCraftApp();
document.addEventListener('DOMContentLoaded', () => app.init());
