import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartsummaryHTML = '';
// jadi ini untuk setiap data yg ada didalam cart akan diberi parameter cartItem
cart.forEach((cartItem) => {
  // kemudian variabel productId dan memberikan value berupa cartItem.productId
  const productId = cartItem.productId;

  //   membuat variabel matchingProduct
  let matchingProduct;
  // pada setiap data yg ada didalam products diberi parameter product
  products.forEach((product) => {
    // jika data product.id sama dengan data yg ada di cart namun ditaruh kedalam variabel productId
    if (product.id === productId) {
      // maka variabel matching product akan diberi value berupa data yg ada didalam parameter product
      matchingProduct = product;
    }
  });
  cartsummaryHTML += `<div class="cart-item-container">
    <div class="delivery-date">Delivery date: Wednesday, June 15</div>

    <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />

      <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-price">$${formatCurrency(
          matchingProduct.priceCents
        )}</div>
        <div class="product-quantity">
          <span>
            Quantity:
            <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">Update</span>
          <span class="delete-quantity-link link-primary">Delete</span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>

        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input
            type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
          />
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  console.log(cartsummaryHTML);
});

document.querySelector('.order-summary').innerHTML = cartsummaryHTML;