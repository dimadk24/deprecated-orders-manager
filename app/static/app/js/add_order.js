function removeChooseProductTypeUI(product) {
  product.querySelector('.product__type').remove();
  product.querySelector('.product__buttons-wrapper').remove();
}

function showLoader(product) {
  product.innerHTML +=
    '<div class="loader">' +
    '<div class="sk-circle">' +
    '<div class="sk-circle1 sk-child"></div>' +
    '<div class="sk-circle2 sk-child"></div>' +
    '<div class="sk-circle3 sk-child"></div>' +
    '<div class="sk-circle4 sk-child"></div>' +
    '<div class="sk-circle5 sk-child"></div>' +
    '<div class="sk-circle6 sk-child"></div>' +
    '<div class="sk-circle7 sk-child"></div>' +
    '<div class="sk-circle8 sk-child"></div>' +
    '<div class="sk-circle9 sk-child"></div>' +
    '<div class="sk-circle10 sk-child"></div>' +
    '<div class="sk-circle11 sk-child"></div>' +
    '<div class="sk-circle12 sk-child"></div>' +
    '</div>' +
    '</div>';
}

function removeLoader(product) {
  product.querySelector('.loader').remove();
}

function createParametersHTML(parameters) {
  return Handlebars.templates.product__parameters({parameters});
}

async function getParameters(productTypeId) {
  const response = await fetch(`/api/getProductTypeParameters?id=${productTypeId}`);
  return await response.json();
}

async function chooseProductType() {
  const productElement = this.parentElement.parentElement;
  const productTypeId = this.value;
  removeChooseProductTypeUI(productElement);
  showLoader(productElement);
  const parameters = await getParameters(productTypeId);
  removeLoader(productElement);
  const parametersHTML = createParametersHTML(parameters);
  productElement.insertAdjacentHTML('beforeend', parametersHTML);
}

function getProductTemplateFactory() {
  let productId = 1;
  return () => {
    const context = {
      id: productId++,
      types: window.types,
      createProductTypeLink: window.createProductTypeLink
    };
    return Handlebars.templates.product(context);
  };
}

function addProduct(addProductButton, productHTML) {
  addProductButton.insertAdjacentHTML('beforebegin', productHTML);
  const productElements = Array.from(document.querySelectorAll('.product'));
  const lastProduct = productElements[productElements.length - 1];
  const newButtons = Array.from(lastProduct.querySelectorAll('.product__choose-type-button'));
  newButtons.forEach(button => button.addEventListener('click', chooseProductType));
}

const getProductHTML = getProductTemplateFactory();
const addProductButton = document.getElementById('add-product');

addProduct(addProductButton, getProductHTML());

addProductButton.addEventListener('click', () => addProduct(addProductButton, getProductHTML()));


