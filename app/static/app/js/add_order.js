function removeChooseProductTypeUI() {
    document.getElementById('product-type').remove();
    document.getElementsByClassName('buttons-wrapper')[0].remove();
}

function showLoader() {
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML +=
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

function removeLoader() {
    document.getElementsByClassName('loader')[0].remove();
}

function createParametersHTML(parameters) {
    let html = '<section class="parameters">';
    for (const parameter of parameters) {
        html += `<label class="parameter" for="parameters-select-${parameter.id}">` +
            `<span>${parameter.name}:</span>` +
            `<select name="parameter${parameter.id}" id="parameters-select-${parameter.id}">`;
        for (const option of parameter.options) {
            html += `<option value="${option.id}">${option.name}</option>`;
        }
        html += "</select></label>";
    }
    html += '</section>';
    return html;
}

function appendHTMLToMain(html) {
    const main = document.getElementsByTagName('main')[0];
    main.innerHTML += html;
}

async function getParameters(productTypeId) {
    const response = await fetch(`/api/getProductTypeParameters?id=${productTypeId}`);
    return await response.json();
}

async function chooseProductType() {
    removeChooseProductTypeUI();
    showLoader();
    const productTypeId = this.value;
    const parameters = await getParameters(productTypeId);
    removeLoader();
    const parametersHTML = createParametersHTML(parameters);
    appendHTMLToMain(parametersHTML);
}

const buttons = Array.from(document.getElementsByClassName('choose-type-button'));
buttons.forEach(button => button.addEventListener('click', chooseProductType));
