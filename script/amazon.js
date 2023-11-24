/* 
this node
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
      <select class="js-quantity-selector-${product.id}">
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

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="images/icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary" data-product-id="${
      product.id
    }">Add to Cart</button>
  </div>`;
});

// merubah isi didalam class products-grid menjadi productsHTML
document.querySelector('.products-grid').innerHTML = productsHTML;

// Memilih semua elemen dengan class 'add-to-cart-button'
document.querySelectorAll('.add-to-cart-button').forEach((button) => {
  // Menambahkan event listener untuk setiap elemen
  button.addEventListener('click', () => {
    // Mengambil product name dari dataset attribute button
    // const productId = button.dataset.productId;
    // destructuring code jadi di bawah ini
    const { productId } = button.dataset;

    // Inisialisasi variabel untuk menyimpan item yang sama dalam keranjang
    let matchingItem;

    // dibawah ini code untuk mengecek apakah ada product yang sama ketika ditambahkan kedalam cart array (apakah didalam cart array sudah ada product yg sama?)
    // Iterasi melalui setiap item dalam keranjang
    // parameter item ini berisi productName dan quantity
    cart.forEach((item) => {
      // Memeriksa apakah nama produk saat ini sama dengan produk yang akan ditambahkan
      if (productId === item.productId) {
        // Jika sama, simpan referensi ke item tersebut
        matchingItem = item;
      }
    });

    // 1. tadi salah lu naroh diatas jadinya productid gk kedetec undefined
    // 2. productid penulisannya juga salah, awalnya nulis product.id kan harusnya productID berubah wey

    // ini untuk memasukan nilai dari selected value ke variabel quantitySelector
    const quantitySelecor = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    // nah kan hasil value tadi bentuknya string harus berubah jadi number pake cara ini dan disimpan ke variabel selectedQuantity
    const selectedQuantity = Number(quantitySelecor.value);

    // Setelah iterasi selesai, periksa apakah ada item yang cocok
    if (matchingItem) {
      // Jika ada, tambahkan satu unit ke quantity item yang cocok
      matchingItem.quantity += selectedQuantity;
    } else {
      // Jika tidak ada item yang cocok, tambahkan produk baru ke dalam keranjang
      cart.push({
        // namanya bebas, valuenya dari const diatas
        //destructuring code ini dibawah ini
        // productId: productId,
        // quantity: selectedQuantity,
        productId,
        quantity,
      });
    }

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    console.log(cart);
  });
});
