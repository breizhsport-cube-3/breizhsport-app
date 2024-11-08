import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

import Products from "../views/Products.vue";
import Product from "../views/Product.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import Contact from "../views/Contact.vue";
import About from "../views/About.vue";
import FAQ from "../views/FAQ.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product/:id",
    name: "Product",
    component: Product,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
