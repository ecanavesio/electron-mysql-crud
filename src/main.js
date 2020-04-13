const {BrowserWindow} = require('electron');
const {getConnection} = require('./database');

async function createProduct(product){
    try{
        const conn = await getConnection();
        product.price = parseFloat(product.price);
        const result = await conn.query('INSERT INTO products SET ?', product);
        console.log(result);
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
    createProduct
};