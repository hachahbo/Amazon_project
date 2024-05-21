import { cart, removefromCart, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct} from '../../data/products.js';
import { formatCurrency } from './../utils/money.js';
// import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';
//
import {counter, updateCartQuantity } from '../amazon.js';

    let i = 1;
    // counter ++;
    export function renderOrderSummury()
    {

        let cartSummaryHtml = '';
        cart.forEach((cartItem) =>
        {
            const productid = cartItem.pID;
            const matchingProduct =  getProduct(productid);

            const deliveryOptionId = cartItem.deliveryOptionId;

            const deliveryOption = getDeliveryOption(deliveryOptionId);

            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format('dddd, MMM D');

            cartSummaryHtml += `
            <div class="cart-item-container 
                js-cart-item-container-${matchingProduct.id}
            data-product-id="${matchingProduct.id}">
                    <div class="delivery-date">
                    Delivery date: ${dateString}
                    </div>
        
                    <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${matchingProduct.image}">
        
                    <div class="cart-item-details">
                        <div class="product-name">
                        ${matchingProduct.name};
                        </div>
                        <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link"
                        data-product-id=
                        ${matchingProduct.id}>
                            Delete
                        </span>
                        </div>
                    </div>
        
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                            ${deliveryOptionHTML(matchingProduct, cartItem)}
                    </div>
                    </div>
                </div>
        
            `;
            i++;
        });
        
        
        function deliveryOptionHTML(matchingProduct, cartItem)
        {
            let html = ''
            deliveryOptions.forEach((deliveryOption) =>
                {
                    const today = dayjs();
                    const deliveryDate = today.add(
                        deliveryOption.deliveryDays,
                        'days'
                    );
                    const dateString = deliveryDate.format('dddd, MMM D');
                    const priceString = deliveryOption.priceCents === 0
                    ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} `;
                    
                    const ischecked = deliveryOption.id === cartItem.deliveryOptionId;
                    html += `
                    <div class="delivery-option js-delivery-option"
                        data-product-id="${matchingProduct.id}"
                        data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio"
                        ${ischecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${i}">
                        <div>
                            <div class="delivery-option-date">
                            ${dateString}
                            </div>
                            <div class="delivery-option-price">
                            ${priceString}- Shipping
                            </div>
                        </div>
                    </div>
                    `
                })
                return html;
            }
            
            let ordersummery  = document.querySelector('.order-summary');
            ordersummery.innerHTML = cartSummaryHtml;
            
            document.querySelectorAll('.js-delete-link')
            .forEach((link) =>
                {
                    link.addEventListener('click', () => {
                        
                        const productId = link.dataset.productId;
                        removefromCart(productId);
                        
                        const container =  document.querySelector(`.js-cart-item-container-${productId}`)
                        console.log(container);
                        container.remove();
                        updateCartQuantity(counter, 0);
                        renderPaymentSummary(); 
                    });
                } 
            );
            document.querySelectorAll('.js-delivery-option')
            .forEach((element) =>
                {
                    element.addEventListener('click', () =>
                        {
                            const {productId, deliveryOptionId} = element.dataset;
                            updateDeliveryOption(productId, deliveryOptionId);
                            renderOrderSummury();
                            renderPaymentSummary(); 
                        });
                });
    }

