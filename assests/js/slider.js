const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

// Function to create a product card
function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.classList.add('product-card');

  const productLink = document.createElement('a');
  productLink.href = `/products/detail.html?id=${product.id}`;

  const productImage = document.createElement('div');
  productImage.classList.add('product-image');

  const productThumb = document.createElement('img');
  productThumb.src = '../' + product.image; // Adjust the path as needed
  productThumb.alt = product.name;
  productThumb.classList.add('product-thumb');
  productImage.appendChild(productThumb);

  productLink.appendChild(productImage);

  const productInfo = document.createElement('div');
  productInfo.classList.add('product-info');

  const productBrand = document.createElement('h2');
  productBrand.classList.add('product-brand');
  productBrand.textContent = product.name;
  productInfo.appendChild(productBrand);

  const price = document.createElement('span');
  price.classList.add('price');

  // Handle price ranges
  let priceText = '';
  if (typeof product.price === 'string' && product.price.includes('-')) {
    const priceRange = product.price.split('-');
    const minPrice = parseInt(priceRange[0]);
    const maxPrice = parseInt(priceRange[1]);
    priceText = `${minPrice} - ${maxPrice} EGP`; // Display price range
  } else {
    priceText = product.price + ' EGP'; // Display single price
  }
  price.textContent = priceText;
  productInfo.appendChild(price);

  productLink.appendChild(productInfo);
  productCard.appendChild(productLink);

  return productCard;
}

// Function to create a slider section
function createSliderSection(title, products) {
  const section = document.createElement('section');
  section.classList.add('product');

  const categoryHeader = document.createElement('h2');
  categoryHeader.classList.add('product-category');
  categoryHeader.textContent = title;
  section.appendChild(categoryHeader);

  const productContainer = document.createElement('div');
  productContainer.classList.add('product-container');

  const slider = document.createElement('div');
  slider.classList.add('slider');
  productContainer.appendChild(slider);

  const preBtn = document.createElement('button');
  preBtn.classList.add('pre-btn');
  preBtn.innerHTML = '<img src="assests/icons/arrows.svg" alt="">';
  slider.appendChild(preBtn);

  const nxtBtn = document.createElement('button');
  nxtBtn.classList.add('nxt-btn');
  nxtBtn.innerHTML = '<img src="assests/icons/arrows.svg" alt="">';
  slider.appendChild(nxtBtn);

  const productsContainer = document.createElement('div');
  productsContainer.classList.add('bestseller-products'); // Reusing existing class
  slider.appendChild(productsContainer);

  products.forEach(product => {
    try {
      const productCard = createProductCard(product);
      productsContainer.appendChild(productCard);
    } catch (error) {
      console.error('Error creating product card:', error);
    }
  });

  section.appendChild(productContainer);
  return section;
}

// Fetch products and create sliders
fetch('../../data/products.json') // Adjust the path as needed
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const products = data.products;
    const categories = data.categories;
    const mainContainer = document.querySelector('main'); // Assuming your content is inside a <main> element

    if (!mainContainer) {
      console.error('Main container not found in HTML.');
      return;
    }

    // 1. Create "Best Seller" slider
    const bestSellerProducts = products.filter(product => product.bestSeller);
    const bestSellerSection = createSliderSection('Best Sellers', bestSellerProducts);
    mainContainer.appendChild(bestSellerSection);

    // 2. Create category-based sliders
    if (categories && Array.isArray(categories)) {
      categories.forEach(category => {
        const categoryProducts = products.filter(product => category.products.includes(product.id));
        const categorySection = createSliderSection(category.name, categoryProducts);
        mainContainer.appendChild(categorySection);
      });
    } else {
      console.warn('No categories found or invalid categories data.');
    }

    // 3. Create type-based sliders
    const uniqueTypes = [...new Set(products.map(product => product.type))];
    uniqueTypes.forEach(type => {
      const typeProducts = products.filter(product => product.type === type);
      const typeSection = createSliderSection(type, typeProducts);
      mainContainer.appendChild(typeSection);
    });
  })
  .catch(error => console.error('Error fetching or processing products:', error));