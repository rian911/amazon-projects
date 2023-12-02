import {
  cart,
  removeCart,
  updateCartQuantity,
  updateQuantity,
} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

hello();
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

  cartsummaryHTML += `<div class="cart-item-container-${matchingProduct.id}">
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
            <span class="quantity-label js-quantity-label-${
              matchingProduct.id
            }">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary" data-product-id="${
            matchingProduct.id
          }">Update</span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
          <span class="save-quantity-link link-primary" data-product-id="${
            matchingProduct.id
          }">Save</span>
          <span class="delete-quantity-link link-primary" data-product-id="${
            matchingProduct.id
          }">Delete</span>
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
});

// cartsummaryHTML isinya adalah hasil gabungan foreach setiap html diatas
document.querySelector('.order-summary').innerHTML = cartsummaryHTML;

// remove cart
// ini untuk setiap class dengan nama delete-quantity link akan ditaruh kedalam paramater link
document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  // kemudian paramter link dipanggil dan diberi evenlistener berupa click
  link.addEventListener('click', () => {
    // setelah click delete dilakukan akan diberi perintah dibawah ini
    // membuat link mengambil dataset productId kemudian disimpan kedalam variabel productId
    const productId = link.dataset.productId;
    // memanggil funsi remove cart
    removeCart(productId);
    // membuat elemen html dengan product id ditampung kedalam container
    const container = document.querySelector(
      `.cart-item-container-${productId}`
    );
    // menghapus elemen html yang ada di atas
    container.remove();

    updateCartQuantity('.return-to-home-link');
  });
});

// untuk menampilkan jumlah cart pada awal page muncul atau saat di refresh
updateCartQuantity('.return-to-home-link');

document.querySelectorAll('.update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(
      `.cart-item-container-${productId}`
    );
    container.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.save-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    // Here's an example of a feature we can add: validation.
    // Note: we need to move the quantity-related code up
    // because if the new quantity is not valid, we should
    // return early and NOT run the rest of the code. This
    // technique is called an "early return".

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quantityInput.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }
    updateQuantity(productId, newQuantity);

    const container = document.querySelector(
      `.cart-item-container-${productId}`
    );
    container.classList.remove('is-editing-quantity');

    const quantityLabel = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    quantityLabel.innerHTML = newQuantity;

    updateCartQuantity('.return-to-home-link');
  });
});
