let products = null;
let basePrice = 0;

// get datas from file json
fetch('../../data/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        showDetail();
    })

function showDetail(){
    // remove datas default from HTML
    let detail = document.querySelector('.detail');
    let listProduct = document.querySelector('.listProduct');
    let productId =  new URLSearchParams(window.location.search).get('id');
    let thisProduct = products.filter(value => value.id == productId)[0];

    detail.querySelector('.image img').src = '../' + thisProduct.image;
    detail.querySelector('.name').innerText = thisProduct.name;
    basePrice = thisProduct.discount_status ? thisProduct.actprice : thisProduct.price;
    detail.querySelector('.price').innerText = basePrice + ' EGP';
    detail.querySelector('.description').innerText = thisProduct.description;

    if (thisProduct.bestSeller) {
        let bestSellerBadge = document.createElement('div');
        bestSellerBadge.classList.add('best-seller');
        bestSellerBadge.innerText = 'Best Seller';
        detail.appendChild(bestSellerBadge);
    }

    (products.filter(value => value.id != productId)).forEach(product => {
        let newProduct = document.createElement('a');
        newProduct.href = '/products/detail.html?id=' + product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML = 
        `<img src="../${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">${product.price}EGP</div>`;
        listProduct.appendChild(newProduct);
    });

}
