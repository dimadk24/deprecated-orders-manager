function chooseProductType() {
    const productTypeId = this.value;
    console.log(productTypeId);
}

const buttons = Array.from(document.getElementsByClassName('choose-type-button'));
buttons.forEach(button => button.addEventListener('click', chooseProductType));
