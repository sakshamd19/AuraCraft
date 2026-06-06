/**
 * AuraCraft Customer Support Assistant
 */

class AuraCraftAIAssistant {
  constructor() {
    this.dom = {
      bubble: document.getElementById('ai-chat-bubble'),
      window: document.getElementById('ai-chat-window'),
      closeBtn: document.getElementById('ai-chat-close-btn'),
      messagesContainer: document.getElementById('ai-messages'),
      inputField: document.getElementById('ai-chat-input-field'),
      sendBtn: document.getElementById('ai-chat-send-btn')
    };
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    if(this.dom.bubble) this.dom.bubble.addEventListener('click', () => this.toggleWindow(true));
    if(this.dom.closeBtn) this.dom.closeBtn.addEventListener('click', () => this.toggleWindow(false));

    if(this.dom.sendBtn) this.dom.sendBtn.addEventListener('click', () => this.handleSendMessage());
    if(this.dom.inputField) {
      this.dom.inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.handleSendMessage();
        }
      });
    }
  }

  toggleWindow(isOpen) {
    if (isOpen) {
      this.dom.window.classList.add('open');
      this.dom.inputField.focus();
    } else {
      this.dom.window.classList.remove('open');
    }
  }

  sendPrompt(text) {
    this.dom.inputField.value = text;
    this.handleSendMessage();
  }

  handleSendMessage() {
    const text = this.dom.inputField.value.trim();
    if (!text) return;

    this.appendMessage('user', text);
    this.dom.inputField.value = '';

    this.appendTypingIndicator();
    
    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.processNLP(text);
      this.appendMessage('bot', response);
    }, 800 + Math.random() * 600);
  }

  appendMessage(sender, text) {
    const msgHtml = `
      <div class="chat-msg ${sender}">
        ${text}
      </div>
    `;
    this.dom.messagesContainer.insertAdjacentHTML('beforeend', msgHtml);
    this.scrollToBottom();
  }

  appendTypingIndicator() {
    const indicatorHtml = `
      <div class="chat-msg bot" id="ai-typing-indicator" style="display: flex; gap: 4px; padding: 10px;">
        <span style="width:6px; height:6px; background:#999; border-radius:50%; animation: pulse 1s infinite;"></span>
        <span style="width:6px; height:6px; background:#999; border-radius:50%; animation: pulse 1s infinite 0.2s;"></span>
        <span style="width:6px; height:6px; background:#999; border-radius:50%; animation: pulse 1s infinite 0.4s;"></span>
      </div>
      <style id="typing-anim">
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      </style>
    `;
    this.dom.messagesContainer.insertAdjacentHTML('beforeend', indicatorHtml);
    this.scrollToBottom();
  }

  removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
    const style = document.getElementById('typing-anim');
    if (style) style.remove();
  }

  scrollToBottom() {
    this.dom.messagesContainer.scrollTop = this.dom.messagesContainer.scrollHeight;
  }

  processNLP(input) {
    const raw = input.toLowerCase();

    if (raw.includes('help') || raw.includes('what can you do')) {
      return `I can help you with several things:<br>
      • <strong>Search</strong>: e.g., "show me bags", "find keyboards"<br>
      • <strong>Shopping</strong>: e.g., "add visor to cart"<br>
      • <strong>Account</strong>: e.g., "where is my order?", "go to checkout"`;
    }

    if (raw.match(/\b(hello|hi|hey)\b/)) {
      return `Hello! How can I help you find what you're looking for today?`;
    }

    if (raw.includes('where is my order') || raw.includes('track order') || raw.includes('returns')) {
      setTimeout(() => {
        app.navigateTo('dashboard');
        app.switchDashboardTab('orders');
      }, 500);
      return `I'm opening your Orders page so you can track your recent purchases.`;
    }

    if (raw.includes('checkout') || raw.includes('pay')) {
      if (app.state.cart.length === 0) {
        return `Your shopping cart is empty. Please add items to your cart before proceeding to checkout.`;
      }
      setTimeout(() => app.navigateTo('checkout'), 500);
      return `Redirecting you to the secure checkout page...`;
    }

    if (raw.includes('shop') || raw.includes('catalog')) {
      setTimeout(() => app.navigateTo('shop'), 500);
      return `Taking you to our main catalog.`;
    }

    const addKeywords = ['add', 'buy', 'get'];
    let isAddCommand = false;
    let addTarget = '';
    
    for (const kw of addKeywords) {
      if (raw.startsWith(kw + ' ') || raw.includes(' ' + kw + ' ')) {
        isAddCommand = true;
        const parts = raw.split(kw);
        addTarget = parts[parts.length - 1].replace('to cart', '').replace('to my cart', '').trim();
        break;
      }
    }

    if (isAddCommand && addTarget) {
      const found = products.find(p => p.name.toLowerCase().includes(addTarget) || addTarget.includes(p.name.toLowerCase()));
      if (found) {
        setTimeout(() => app.addToCart(found.id, 1), 400);
        return `I've added 1x <strong>${found.name}</strong> to your shopping cart. Item price is ₹${found.price.toLocaleString('en-IN')}.`;
      } else {
        return `I couldn't find a product matching "${addTarget}". Try searching the catalog directly!`;
      }
    }

    if (raw.includes('eyewear') || raw.includes('glasses') || raw.includes('visor')) {
      setTimeout(() => app.filterByCategory('Eyewear'), 500);
      return `Here are our best-selling eyewear products.`;
    }
    if (raw.includes('bag') || raw.includes('backpack')) {
      setTimeout(() => app.filterByCategory('Bags'), 500);
      return `I've filtered the store to show our backpacks and bags.`;
    }
    if (raw.includes('jacket') || raw.includes('apparel') || raw.includes('clothes')) {
      setTimeout(() => app.filterByCategory('Apparel'), 500);
      return `Showing apparel and clothing options.`;
    }
    if (raw.includes('keyboard') || raw.includes('workspace')) {
      setTimeout(() => app.filterByCategory('Workspace'), 500);
      return `Here is our selection of workspace gear, including keyboards.`;
    }
    if (raw.includes('wallet') || raw.includes('band') || raw.includes('accessories')) {
      setTimeout(() => app.filterByCategory('Accessories'), 500);
      return `Filtering for accessories.`;
    }
    if (raw.includes('buds') || raw.includes('headphones') || raw.includes('audio')) {
      setTimeout(() => app.filterByCategory('Audio'), 500);
      return `Here are our top-rated headphones and audio equipment.`;
    }

    if (raw.includes('best') || raw.includes('popular') || raw.includes('recommend')) {
      const top = products.filter(p => p.popular);
      const list = top.map(p => `• ${p.name} (₹${p.price.toLocaleString('en-IN')})`).join('<br>');
      return `Here are some of our most popular items right now:<br>${list}<br>Just tell me if you'd like to add any of these to your cart!`;
    }

    return `I'm not quite sure I understood. I can help you find products (e.g., "show me backpacks"), add items to your cart (e.g., "add visor to cart"), or check your orders ("where is my order?").`;
  }
}

const aiAssistant = new AuraCraftAIAssistant();
document.addEventListener('DOMContentLoaded', () => aiAssistant.init());
