'use strict';

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const $goodList = document.querySelector('.goods-list');

const renderGoodsItem = ({ title, price }) => {
    return `<div class="good-item"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list) => {
    let items = list.map(
        (item) => {
            return renderGoodsItem(item);
        }
    ).join('');

    $goodList.insertAdjacentHTML('beforeend', items);
};

const cartButton = document.querySelector('.cart-button');
cartButton.addEventListener('click', () => {
    console.log($goodList.innerHTML.trim())
    if ($goodList.innerHTML.trim()) {
        $goodList.classList.toggle('hidden');
        return;
    }
    renderGoodsList(goods);
});
