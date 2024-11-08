import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),

  actions: {
    initializeCart() {
      const savedCart = localStorage.getItem('cart')
      const savedTime = localStorage.getItem('cartTimestamp')
      
      if (savedCart && savedTime) {
        const now = new Date().getTime()
        const cartTime = parseInt(savedTime)
        
        if (now - cartTime < 24 * 60 * 60 * 1000) {
          this.items = JSON.parse(savedCart)
        } else {
          localStorage.removeItem('cart')
          localStorage.removeItem('cartTimestamp')
        }
      }
    },

    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items))
      localStorage.setItem('cartTimestamp', new Date().getTime().toString())
    },

    addItem(item) {
      const existingItemIndex = this.items.findIndex(i => 
        i.id === item.id && 
        i.size === item.size && 
        i.color === item.color
      );

      if (existingItemIndex !== -1) {
        this.items[existingItemIndex].quantity += item.quantity;
      } else {
        this.items.push({ ...item });
      }
      this.saveCart()
    },

    removeItem(itemId, size, color) {
      const index = this.items.findIndex(i => 
        i.id === itemId && 
        i.size === size && 
        i.color === color
      );
      if (index > -1) {
        this.items.splice(index, 1);
      }
      this.saveCart()
    },

    updateQuantity(itemId, size, color, newQuantity) {
      const item = this.items.find(i => 
        i.id === itemId && 
        i.size === size && 
        i.color === color
      );
      if (item) {
        item.quantity = newQuantity;
        this.saveCart();
      }
    },

    clearCart() {
      this.items = [];
      this.saveCart()
    },

    updateVariant(itemId, oldSize, oldColor, updates) {
      const itemIndex = this.items.findIndex(i => 
        i.id === itemId && 
        i.size === oldSize && 
        i.color === oldColor
      );
      
      if (itemIndex > -1) {
        const existingItemIndex = this.items.findIndex(i => 
          i.id === itemId && 
          i.size === (updates.size || oldSize) && 
          i.color === (updates.color || oldColor)
        );

        if (existingItemIndex !== -1 && existingItemIndex !== itemIndex) {
          this.items[existingItemIndex].quantity += this.items[itemIndex].quantity;
          this.items.splice(itemIndex, 1);
        } else {
          this.items[itemIndex] = {
            ...this.items[itemIndex],
            ...updates
          };
        }
      }
    },
  },

  getters: {
    totalItems: (state) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      return state.items.reduce((sum, item) => {
        return sum + (Number(item.quantity) || 0);
      }, 0);
    },
    
    totalPrice: (state) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      return state.items.reduce((sum, item) => {
        return sum + (Number(item.price) * Number(item.quantity) || 0);
      }, 0);
    },

    itemTotalQuantity: (state) => (productId) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      return state.items
        .filter(item => item.id === productId)
        .reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    }
  },
});
