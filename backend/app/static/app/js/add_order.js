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
  const product = select.parentElement.parentElement.parentElement;
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
  productInputs.insertAdjacentHTML('beforebegin', loaderHtml);
  const parameters = await getParameters(productTypeId);
  removeLoader(productElement);
  const parametersHTML = createParametersHTML(parameters);
  productInputs.insertAdjacentHTML('beforebegin', parametersHTML);
  const selectElements = Array.from(productElement.querySelectorAll('.parameters-select'));
  selectElements.forEach(select => select.addEventListener('change', onParameterSelect));
  updateName({product: productElement, id: 'parameter', value});
  productElement.setAttribute('data-product-type-id', productTypeId);
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

function removeProductByCloseButton() {
  this.parentElement.parentElement.remove();
}

function addProduct(productHTML) {
  const productsContainer = document.querySelector('.products');
  productsContainer.insertAdjacentHTML('beforeend', productHTML);
  const productElements = Array.from(document.querySelectorAll('.product'));
  const lastProduct = productElements[productElements.length - 1];
  const removeButton = lastProduct.querySelector('.product__close');
  removeButton.addEventListener('click', removeProductByCloseButton);
  const newButtons = Array.from(lastProduct.querySelectorAll('.product__choose-type-button'));
  newButtons.forEach(button => button.addEventListener('click', chooseProductType));
  nameCreators.push(window.nameCreatorFactory());
}

function getFlatpickrTimestamp(element) {
  const picker = element._flatpickr;
  return picker.selectedDates[0].getTime();
}

function getElementValue(elementId) {
  const element = document.getElementById(elementId);
  return element.value;
}

function getAsideInputs() {
  const aside = document.querySelector('aside');
  const orderDatetime = getFlatpickrTimestamp(aside.querySelector('#order-datetime'));
  const deliveryDate = getFlatpickrTimestamp(aside.querySelector('#delivery-date'));
  const inputIds = [
    'delivery-time',
    'main-phone-input',
    'add-phone-input',
    'index-input',
    'area-input',
    'city-input',
    'street-type-select',
    'street-input',
    'house-input',
    'building-input',
    'flat-input',
    'floor-input',
    'entrance-input',
    'order-comment-area'
  ];
  const simpleInputValues = inputIds.reduce((accumulator, inputId) => ({
    ...accumulator,
    [inputId]: getElementValue(inputId)
  }), {});
  return {
    ...simpleInputValues,
    'order-datetime': orderDatetime,
    'delivery-date': deliveryDate
  };
}

function validateProductSelects(product) {
  const selects = Array.from(product.getElementsByTagName('select'));
  selects.forEach(select => {
    if (select.value === '0') throw new Error('select is not chosen');
  });
}

function markProductAsInvalid(element) {
  element.classList.add('product--error');
}

function resetProductValidStatus(element) {
  if (element.classList.contains('product--error'))
    element.classList.remove('product--error');
}

function getProductData(element) {
  resetProductValidStatus(element);
  const productTypeId = parseInt(element.getAttribute('data-product-type-id'), 10);
  if (productTypeId === 0) {
    markProductAsInvalid(element);
    throw new Error('Product type isn\'t chosen');
  }
  try {
    validateProductSelects(element);
  } catch (e) {
    markProductAsInvalid(element);
    throw new Error('select is not chosen');
  }
  const name = element.querySelector('.name-input').value;
  const price = element.querySelector('.price-input').value.replace(',', '.');
  const purchasePrice = element.querySelector('.purchase-price-input').value.replace(',', '.');
  const number = element.querySelector('.number-input').value;
  const comment = element.querySelector('.comment-area').value;
  const selects = Array.from(element.querySelectorAll('.parameters-select'));
  const selectsInputs = selects.map(select => select.value);
  return {
    name, price, purchasePrice, number, comment, selectsInputs, productTypeId
  };
}

function getProductsData() {
  const products = Array.from(document.querySelectorAll('.product'));
  return products.map(getProductData);
}

function convertAsideDataToApiFormat(data) {
  return {
    additional_phone: data['add-phone-input'],
    area: data['area-input'],
    building: data['building-input'],
    city: data['city-input'],
    delivery_date: data['delivery-date'],
    delivery_time: data['delivery-time'],
    entrance: data['entrance-input'],
    flat: data['flat-input'],
    floor: data['floor-input'],
    house: data['house-input'],
    index: data['index-input'],
    main_phone: data['main-phone-input'],
    comment: data['order-comment-area'],
    order_datetime: data['order-datetime'],
    street_name: data['street-input'],
    street_type: data['street-type-select']
  };
}

function convertProductsDataToApiFormat(products) {
  return products.map(
    ({comment, name, number, price, purchasePrice, selectsInputs, productTypeId}) => ({
      comment,
      name,
      price,
      number,
      purchase_price: purchasePrice,
      option_ids: selectsInputs,
      type_id: productTypeId
    }));
}

async function sendOrder({orderId, asideData, productsData: products}) {
  const response = await fetch('/api/createOrder', {
    method: 'POST',
    body: JSON.stringify({order_id: orderId, ...asideData, products})
  });
  if (!response.ok) throw new Error('server error');
  const jsonResponse = await response.json();
  if (jsonResponse.ok !== 'ok') throw new Error('server error');
}

function resetRequiredFieldsStatus() {
  const errorFields = Array.from(document.querySelectorAll('.input--error'));
  errorFields.forEach(field => {
    if (field.classList.contains('input--error')) field.classList.remove('input--error');
  });
}

function checkRequiredFields() {
  resetRequiredFieldsStatus();
  const requiredFields = Array.from(document.querySelectorAll('[required]'));
  let invalid = false;
  requiredFields.forEach(field => {
    if (!field.value) {
      field.classList.add('input--error');
      invalid = true;
    }
  });
  if (invalid) throw new Error(`some required fields aren't set`);
}

function showSaveOrderLoader() {
  const saveOrderButton = document.getElementById('save-order');
  saveOrderButton.insertAdjacentHTML('beforebegin', getLoaderHtml());
}

function removeSaveOrderLoader() {
  const loader = document.querySelector('.loader');
  loader.remove();
}

function showSaveOrderFailedModal(text) {
  swal({
    title: 'Ошибка',
    text,
    icon: 'error'
  });
}

function showSaveOrderSucceedModal() {
  swal({
    text: 'Успешно сохранено',
    icon: 'success'
  });
}

async function saveOrder() {
  let orderId, asideData, productsData;
  try {
    checkRequiredFields();
    orderId = getElementValue('order-id');
    asideData = getAsideInputs();
    productsData = getProductsData();
  } catch (e) {
    showSaveOrderFailedModal('Неверно заполены некоторые поля. Они отмечены красным');
    throw new Error("fields aren't  valid")
  }
  showSaveOrderLoader();
  const asideDataInApiFormat = convertAsideDataToApiFormat(asideData);
  const productsDataInApiFormat = convertProductsDataToApiFormat(productsData);
  try {
    await sendOrder({
      orderId,
      asideData: asideDataInApiFormat,
      productsData: productsDataInApiFormat
    });
    showSaveOrderSucceedModal();
  } catch (e) {
    showSaveOrderFailedModal('Возникла ошибка при сохранении');
    throw new Error('saving failed');
  } finally {
    removeSaveOrderLoader();
  }
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
  defaultDate: 'today',
  dateFormat: 'j.m.Y H:i'
});
flatpickr('#delivery-date', {
  defaultDate: 'today',
  dateFormat: 'j.m.Y H:i'
});

const saveOrderButton = document.querySelector('#save-order');
saveOrderButton.addEventListener('click', saveOrder);
