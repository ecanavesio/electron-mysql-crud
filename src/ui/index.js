const productForm = document.getElementById("productForm");

const {remote} = require('electron');
const main = remote.require('./main');

const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");

productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newProduct = {
        name : productName.value,
        price: productPrice.value,
        description : productDescription.value
    }
    main.createProduct(newProduct);
});