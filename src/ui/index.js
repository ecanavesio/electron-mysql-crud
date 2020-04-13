const productForm = document.getElementById("productForm");

const {remote} = require('electron');
const main = remote.require('./main');

const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");

let products = [];
const productsList = document.getElementById("products");

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newProduct = {
        name : productName.value,
        price: productPrice.value,
        description : productDescription.value
    }
    const [result] = await main.createProduct(newProduct);
    renderNewProduct(result);
    productForm.reset();
    productName.focus();
});

const renderNewProduct = product => {
    products.unshift(product);
    productsList.innerHTML = renderProduct(product) + productsList.innerHTML;
}

const getProducts = async () => {
    products = await main.getProducts();
    renderProducts();
}

const renderProducts = () => {
    productsList.innerHTML = '';
    products.forEach( product => {
        productsList.innerHTML += renderProduct(product);
    });
}

const renderProduct = product => `
    <div class="card card-body my-2 animated fadeInLeft">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <h3>${product.price}</h3>
        <p>
            <button class="btn btn-danger">DELETE</button>
            <button class="btn btn-secondary">EDIT</button>
        </p>
    </div>
`;

async function init(){
    await getProducts();
}

init();