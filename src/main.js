const {BrowserWindow} = require('electron');
const {getConnection} = require('./database');

async function createProduct(product){
    try{
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        const result = await conn.query('INSERT INTO products SET ?', product);
        const lastProduct = await conn.query('SELECT * FROM products WHERE id=?', result.insertId);
        return lastProduct[0];
    } catch(error){
        console.error(error);
    }
}

async function getProducts() {
    try{
        const conn = await getConnection();
        const results = await conn.query("SELECT * FROM products ORDER BY id DESC");
        return results;
    } catch(error){
        console.error(error);
    }
}

async function getProductById(id) {
    try{
        const conn = await getConnection();
        const results = await conn.query('SELECT * FROM products WHERE id=?', id);
        return results[0];
    } catch(error){
        console.error(error);
    }
}

async function deleteProduct(id){
    try{
        const conn = await getConnection();
        const result = await conn.query("DELETE FROM products WHERE id=?",id);
        return result;
    } catch(error){
        console.error(error);
    }
}

async function updateProduct({id, ...product}) {
    try{
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        const result = await conn.query('UPDATE products SET ? WHERE id=?', [product, id]);
        return result;
    } catch(error){
        console.error(error);
    }
}

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    window.loadFile('src/ui/index.html');
}

module.exports = {
    createWindow,
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
};