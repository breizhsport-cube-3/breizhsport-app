import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore('checkout', {
  state: () => ({
    shippingForm: {},
    selectedShippingMethod: null
  }),

  actions: {
    setShippingMethod(method) {
      this.selectedShippingMethod = method;
    },
    
    setShippingForm(form) {
      this.shippingForm = form;
    }
  }
});
