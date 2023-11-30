export let cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
  },
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c7',
    quantity: 1,
  },
];

export function addtoCart(productId) {
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

  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

  addedMessage.classList.add('added-to-cart-visible');
  setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 2000);
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
      productId: productId,
      quantity: selectedQuantity,
    });
  }
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  console.log(cart);
}

export function removeCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}
