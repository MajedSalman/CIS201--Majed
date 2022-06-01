const products = [
{id: 1, name: 'Cobb Salad', price: 60},
{id: 3, name: 'Cheese Sampler', price: 105},
{id: 4, name: 'SMOKED WAGYU NIGIRI', price: 130},
{id: 5, name: 'AKAMI NIGIRI', price: 90},
{id: 6, name: 'Wagyu Steak', price: 409},
{id: 7, name: 'WHOLE LAMB RACK', price: 330},
{id: 8, name: 'SALAMON TERIYAKI', price: 165},
{id: 9, name: 'BLACK COD', price: 265},
{id: 10, name: 'Vanilla Cheesecake', price: 45},
{id: 11, name: 'Apple Pie', price: 35},
{id: 12, name: 'Coca-Cola', price: 12},
{id: 13, name: 'Sprite', price: 12}
];
const getLocalStorageData = () => {
    const productsId = JSON.parse(localStorage.getItem('cart'));
    return productsId ? productsId : [];
}
//delete a specific product from cookies 
const deleteItemFromLocalStorage = id => {
    const savedIds = getLocalStorageData();
    const index = savedIds.indexOf(id);
    if (index > -1) {
        savedIds.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(savedIds));
    window.location.reload();
}
// delete all products from cookies
const deleteLocalStorage = () => {
    localStorage.removeItem("cart");
    alert('Your order has been successfully placed');
    window.location.href = './index.html';

}
//save newly added to cart product to cookies
const saveToLocalStorage = id => {
    const savedIds = getLocalStorageData();
    let productsId;
    !savedIds.includes(id) ? (productsId = [...savedIds, id]) : (productsId = [...savedIds]);
    localStorage.setItem('cart', JSON.stringify(productsId));
    if (confirm('Product added to cart. Click yes to goto cart page, Cancel to stay and add more products to cart.')) {
        window.location.href = './cart.html';
    }
}
//show saved products from cookies to cart page
const showCartProducts = products => {
    const container = document.getElementById('cart-container');
    container.innerHTML = "";
    const priceContainer = document.getElementById('price');
    let productsName = [];
    let productsId = [];
    let subtotal = 0;
    const savedIds = getLocalStorageData();
    if (savedIds.length === 0) {
        container.innerHTML = "<p>No products on cart</p>";
    }
    else {
        for (const product of products) {
            if (savedIds.includes(product.id)) {
                const div = document.createElement("div");
                div.innerHTML = `<div class=" mt-5 d-flex align-items-center justify-content-between">
                            <button onclick=deleteItemFromLocalStorage(${product.id}) class="btn btn-danger fw-bold">X</button>
                            <h4>${product.name}</h4>
                            <h5>Price: ${product.price}SR</h5>
                        </div>`;
                container?.appendChild(div);
                productsId.push(product.id);
                productsName.push(product.name);
                subtotal = subtotal + parseInt(product.price);
            }

        }
    }
    document.getElementById('total-price').innerText = subtotal;


}
showCartProducts(products);