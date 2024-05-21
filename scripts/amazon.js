import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
// import { cart as MyCart } from "../data/cart.js";

let productsHtml = '';
let cartQuantity_bar = 0;
let cartQuantityHTML = '';

 console.log('hama');

products.forEach((product)=> 
{
    // console.log(products.image);
    // console.log(products.name);
    // console.log(products.rating);
    // console.log(products.priceCents);
    productsHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name};
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select id="quantitySelect">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button 
          button-primary
           js-add-to-cart
           data-product-id="${product.id}"
           ref="${product.id}"
           >
            Add to Cart
          </button>
        </div>
        `;
    })
    function updateCartQuantity(counter, sel_quantity) {
      let cartQuantity = 0;
      cart.forEach((item) => {
          cartQuantity += item.quantity;
      });
      // let selectElement = ;
      const cartQuantityElement = document.querySelector('.js-cart-quantity');
      if (cartQuantityElement) {
          cartQuantityElement.textContent = sel_quantity;
      } else {
          console.error("Element with class '.js-cart-quantity' not found.");
      }
      counter = cartQuantity;
      const counterElement = document.getElementById('counter');
      if (counterElement) {
          counterElement.textContent = sel_quantity;
      }
      counter = sel_quantity;
      localStorage.setItem('counter', counter);
  }
  
  let counter = localStorage.getItem('counter') || 0;
  document.addEventListener('DOMContentLoaded', () => {
      let thegrid = document.querySelector('.js-products-grid');
      if (thegrid) {
          thegrid.innerHTML = productsHtml;
      } else {
          console.error("Element with class '.js-products-grid' not found.");
      }
  
      const counterElement = document.getElementById('counter');
      if (counterElement) {
          counterElement.textContent = counter;
      } else {
          console.error("Element with id 'counter' not found.");
      }
  
      document.querySelectorAll('.js-add-to-cart').forEach((button) => {
          button.addEventListener('click', () => {
              let productID = button.getAttribute('ref');
              addToCart(productID);
              const selectElement = document.getElementById('quantitySelect');
              // Get the selected value at any point
              const selectedValue = selectElement.value;
              console.log(`Selected value:`,selectedValue);
              let sel_quantity = parseInt(selectedValue);
              console.log(sel_quantity);
              updateCartQuantity(counter, sel_quantity);
          });
      });
  });
  export {counter, updateCartQuantity};