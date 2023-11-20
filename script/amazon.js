/* 
this for note
main idea of javascript
1. save the data
2. generate the html
3. make it interactive
*/

/* gunanya foreach itu mengambil setiap object 
didalam variabel products dan menyimpannya 
di dalam parameter product kemudian menjalankan sebuah fungsi */
let productsHTML = '';
/* variabel productsHTML digunakan untuk menampung sebuah hasil perulangan dari foreach, kan foreach itu hanya menghasilkan satu object nah karena diatas ada 3 object, 3 object tersebut dibuat menjadi satu sehingga nanti jika dipanggil akan menghasilkan 3 object html */
products.forEach((product) => {
  productsHTML += `<div class="product-container">
    <div class="product-image-container">
      <img
        class="product-image"
        src="${product.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img
        class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png"
      />
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>

    <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>
    
    <div class="product-quantity-container">
      <select>
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
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary">Add to Cart</button>
  </div>`;
});

document.querySelector('.products-grid').innerHTML = productsHTML;

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    console.log('added product');
  });
});
