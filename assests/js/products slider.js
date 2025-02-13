let products = null;
// get datas from file json
fetch('/data/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
})

function addDataToHTML(){
// remove datas default from HTML
let listProductHTML = document.querySelector('.product-container');
// add new datas
if(products != null) // if has data
{
    products.forEach(product => {
        if (product.bestSeller) {
            let newProduct = document.createElement('a');
            newProduct.href = '/products/detail.html?id=' + product.id;                            
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `
            <div class="product-card">
                <div class="product-image">
                    ${product.discount_status ? `<span class="discount-tag">${product.discount}% off</span>` : ''}
                    <a href="/products/detail.html?id=${product.id}"><img src="${product.image}" class="product-thumb" alt=""></a>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">${product.name}</h2>
                    <p class="product-short-description">${product.shortdescription}</p>
                    <span class="price">${product.price}EGP</span>
                    <span class="actual-price">${product.actprice}EGP</span>
                </div>
            </div>                  
            `;

            listProductHTML.appendChild(newProduct);
        }
    });
}
}