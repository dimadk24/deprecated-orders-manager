function getChildIndex(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}

function removeChooseProductTypeUI(product) {
  product.querySelector('.product__type').remove();
  product.querySelector('.product__buttons-wrapper').remove();
}

function getLoaderHtml() {
  return '<div class="loader">' +
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

function removePlaceholderOptionIfExists(options) {
  const placeholderOption = options.find(option => option.getAttribute('value') === '0');
  if (placeholderOption) placeholderOption.remove();
}

function updateName({product, id, value}) {
  const nameInput = product.querySelector('.name-input');
  const productIndex = getChildIndex(product);
  const nameCreator = nameCreators[productIndex];
  nameInput.value = nameCreator({id, value});
}

function onParameterSelect({target: select}) {
  const parameterName = select.getAttribute('name');
  const optionId = select.value;
  const options = Array.from(select.querySelectorAll('option'));
  const currentOption = options.find(option => option.getAttribute('value') === optionId);
  const product = select.parentElement.parentElement.parentElement.parentElement;
  updateName({product, id: parameterName, value: currentOption.innerText});
  removePlaceholderOptionIfExists(options);
}

async function chooseProductType() {
  const productElement = this.parentElement.parentElement;
  const productTypeId = this.value;
  const value = this.innerText;
  removeChooseProductTypeUI(productElement);
  const productInputs = productElement.querySelector('.product__inputs');
  const loaderHtml = getLoaderHtml(productElement, productInputs);
  productInputs.insertAdjacentHTML('afterend', loaderHtml);
  const parameters = await getParameters(productTypeId);
  removeLoader(productElement);
  const parametersHTML = createParametersHTML(parameters);
  productInputs.insertAdjacentHTML('beforeend', parametersHTML);
  const selectElements = Array.from(productElement.querySelectorAll('.parameters-select'));
  selectElements.forEach(select => select.addEventListener('change', onParameterSelect));
  updateName({product: productElement, id: 'parameter', value});
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

function addProduct(productHTML) {
  const productsContainer = document.querySelector('.products');
  productsContainer.insertAdjacentHTML('beforeend', productHTML);
  const productElements = Array.from(document.querySelectorAll('.product'));
  const lastProduct = productElements[productElements.length - 1];
  const newButtons = Array.from(lastProduct.querySelectorAll('.product__choose-type-button'));
  newButtons.forEach(button => button.addEventListener('click', chooseProductType));
  nameCreators.push(window.nameCreatorFactory());
}

const getProductHTML = getProductTemplateFactory();
const addProductButton = document.getElementById('add-product');

nameCreators = [];
addProduct(getProductHTML());

addProductButton.addEventListener('click', () => addProduct(getProductHTML()));

flatpickr.localize(flatpickr.l10ns.ru);
flatpickr('#order-datetime', {
  enableTime: true,
  time_24hr: true,
  defaultDate: 'today'
});
flatpickr('#delivery-date', {
  defaultDate: 'today'
});
