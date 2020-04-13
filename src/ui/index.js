const productForm = document.getElementById("productForm");
let editingStatus = false;

const {remote} = require('electron');
const main = remote.require('./main');

const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");

const productsList = document.getElementById("products");

const buttonSave = document.getElementById("buttonSave");
const buttonCancel = document.getElementById("buttonCancel");

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!editingStatus){
        const newProduct = {
            name : productName.value,
            price: productPrice.value,
            description : productDescription.value
        }
        const result = await main.createProduct(newProduct);
        if(result){
            renderNewProduct(result);
        }
    } else {
        const editedProduct = {
            id : productForm.getAttribute("data-key"),
            name : productName.value,
            price: productPrice.value,
            description : productDescription.value
        }
        endEditionMode();
        const result = await main.updateProduct(editedProduct);
        if(result){
            renderEditedProduct(editedProduct);
        }
    }
    productForm.reset();
    productName.focus();
});

const renderNewProduct = product => {
    productsList.innerHTML = renderProduct(product) + productsList.innerHTML;
}

const renderEditedProduct = ({id, name, price, description}) => {
    document.querySelector(`#product-${id} h4`).innerHTML = name;
    document.querySelector(`#product-${id} p`).innerHTML = description;
    document.querySelector(`#product-${id} h3`).innerHTML = price;
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
        <div>
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">DELETE</button>
            <button class="btn btn-secondary" onclick="editProduct(${product.id})">EDIT</button>
        </div>
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

const editProduct = async id => {
    const result = await main.getProductById(id);
    productName.value = result.name;
    productPrice.value = result.price;
    productDescription.value = result.description;

    productForm.setAttribute("data-key", id);
    buttonSave.classList.add("mb-3");
    buttonCancel.classList.remove("d-none");
    editingStatus = true;
}

function cancelEdition(event){
    event.preventDefault();
    endEditionMode();
    productForm.reset();
    productName.focus();
}

function endEditionMode(){
    productForm.removeAttribute("data-key");
    buttonSave.classList.remove("mb-3");
    buttonCancel.classList.add("d-none");
    editingStatus = false;
}

async function init(){
    await getProducts();
}

init();