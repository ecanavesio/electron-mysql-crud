const productForm = document.getElementById("productForm");

const {remote} = require('electron');
const main = remote.require('./main');

const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");

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
    productsList.innerHTML = renderProduct(product) + productsList.innerHTML;
}

const getProducts = async () => {
    const products = await main.getProducts();
    renderProducts(products);
}

const renderProducts = products => {
    productsList.innerHTML = '';
    products.forEach( product => {
        productsList.innerHTML += renderProduct(product);
    });
}

const renderProduct = product => `
    <div class="card card-body my-2 animated fadeInLeft" id="product-${product.id}">
        <h4>${product.name}</h4>
        <p>${product.description}</p>
        <h3>${product.price}</h3>
        <p>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">DELETE</button>
            <button class="btn btn-secondary">EDIT</button>
        </p>
    </div>
`;

const deleteProduct = async idProduct => {
    const response = confirm('Are your sure you want to delete it?');
    if(response){
        await main.deleteProduct(idProduct);
        document.getElementById(`product-${idProduct}`).remove();
    }
    return;
}

async function init(){
    await getProducts();
}

init();