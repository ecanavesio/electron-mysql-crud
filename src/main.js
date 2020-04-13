const {BrowserWindow} = require('electron');
const {getConnection} = require('./database');

async function createProduct(product){
    try{
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        const result = await conn.query('INSERT INTO products SET ?', product);
        const lastProduct = await conn.query('SELECT * FROM products WHERE id=?', result.insertId);
        return lastProduct;
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
    getProducts
};