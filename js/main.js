    /*F I L T E R   Start*/

let categorySelector = document.querySelector('.select-box .select-control');
let PriceSelector = document.querySelector('.price-select-box .select-control');
let categoryItems = document.querySelectorAll('.product-box__item');
let priceItems = document.querySelectorAll('.price');

categorySelector.addEventListener('change', function(){
    let category = document.querySelector('.select-box .select-control > option:checked').value;
    let price = document.querySelector('.price-select-box .select-control > option:checked').value;

    for (let i = 0; i < categoryItems.length; i++){
        if ((categoryItems[i].getAttribute('data-category') == category || category == 0) &&  (Number(priceItems[i].innerHTML) <= price || price == 0)){
            categoryItems[i].setAttribute('style', 'display: flex');
        }else{
            categoryItems[i].setAttribute('style', 'display: none');
        }
    }
});

PriceSelector.addEventListener('change', function () {
    let category = document.querySelector('.select-box .select-control > option:checked').value;
    let price = document.querySelector('.price-select-box .select-control > option:checked').value;

    for (let i = 0; i < categoryItems.length; i++){
        if ((categoryItems[i].getAttribute('data-category') == category || category == 0) &&  (Number(priceItems[i].innerHTML) <= price || price == 0)){
            categoryItems[i].setAttribute('style', 'display: flex');
        }else{
            categoryItems[i].setAttribute('style', 'display: none');
        }
    }
});
    /*F I L T E R   End*/

let productBtnList = document.querySelectorAll('.product-box__btn');
let allProduct = 0;
let allPrice = 0;
for(let i = 0; i < productBtnList.length; i++){
    productBtnList[i].addEventListener('click', function() {
        let qty;
        let price;
        let children = this.parentElement.childNodes;

        for(let j = 0; j < children.length; j++){
            if(children[j].className === "qty"){
                let input = children[j].children[0];
                if(input.value === "" || input.value === 0){
                    input.style.borderColor = 'red';
                    setTimeout(function () {
                        input.style.borderColor = 'initial';
                    },2000);
                    break;
                } else {
                    input.style.borderColor = 'initial';
                    qty = Number(input.value);
                    input.value = "";
                }
            }
            if(children[j].nodeName === "P"){
                price = Number(children[j].children[0].innerHTML);
            }
        }
        if (!(isNaN(qty) || qty === undefined || qty === 0)) {
            allPrice = allPrice + price*qty;
            allProduct = allProduct + qty;
            document.querySelector('.top-cart-info__item').children[0].innerHTML = allProduct;
            document.querySelector('.top-cart-info__item').children[1].innerHTML = allPrice;
        }
    });
}


/*Modal Window*/
    document.querySelector('.btn-check').setAttribute('style','cursor:pointer');
    document.querySelector('.container .btn-check').setAttribute('onclick','Modal()');
    let modalWindow = document.createElement('div');
    modalWindow.className = 'modalWindow';
    modalWindow.setAttribute('style','position:absolute; text-align:center; width:400px; margin-left:-150px; left:50%; top:-100%; padding:20px; border:1px solid #333; z-index:999; transition: all 0.5s ease 0.5s; background-color:lightgray');
    modalWindow.innerHTML = "<i onclick='closeModal()' style='display: block; float: right; padding: 5px; cursor: pointer; position: absolute; right: 1px; top: 1px;'>X</i><h1>Оформити заказ</h1><form  style='clear: both'><input type='text' class='userName' style='margin: 10px; width: 255px; height: 25px' required placeholder='Ваше імя'><br><input type='email' class='userEmail' style='margin-bottom: 10px; width: 255px; height: 25px' required placeholder='Ваш email'><br><input type='submit' class='sendOffer btn-check' onclick='sendModal()' style='cursor: pointer' placeholder='Відправити'></form>";
    document.body.appendChild(modalWindow);

function Modal() {
    if (document.querySelector('.top-cart-info__item').children[0].innerHTML == 0) {
        alert("Товарів для замовлення немає!!!");
    } else {
        let height = modalWindow.offsetHeight;
        modalWindow.style.marginTop = -height / 2 + "px";
        modalWindow.style.top = "50%";
    }
}
function closeModal() {
    modalWindow.style.top = "-100%";
    document.querySelector('.userName').value = "";
    document.querySelector('.userEmail').value = "";
}

function sendModal() {
    let userName = document.querySelector('.userName');
    let userEmail = document.querySelector('.userEmail');
        if (userName.value.trim() === "" || userEmail.value.trim() ===""){
            alert('Заповніть поля');
        } else if(!validateEmail(userEmail.value.trim())){
            alert('Введіть коректний Email');
        } else{
            alert('Дякуємо за замовлення! Вам зателефонує менеджер на протязі 5хв.');
            userName.value = "";
            userEmail.value = "";
            closeModal();
            allProduct = 0;
            allPrice = 0;
            document.querySelector('.top-cart-info__item').children[0].innerHTML = allProduct;
            document.querySelector('.top-cart-info__item').children[1].innerHTML = allPrice;
        }
}


function validateEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
        /*Modal Window END*/