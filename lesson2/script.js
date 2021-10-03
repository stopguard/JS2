'use strict';

class BasketItem {
    /**
     * @param {string} title 
     * @param {number} price 
     */
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    /** return this as html-code
     * @returns {string}
     */
    render() {
        return `<div class="good-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }

    /** add products to this cart
     * @param {[{title, price}]} products 
     */
    fetchGoods(products) {
        products.forEach(
            item => { this.goods.push(new BasketItem(item.title, item.price)) }
        );
    }

    getCost() {
        return this.goods.reduce( (result, item) => result + item.price, 0 )
    }

    /** insert this as html-code to target
     * @param {Element} target
     */
    render(target) {
        let listHtml = '<div class="goods-list">';
        this.goods.forEach(product => {
            listHtml += product.render();
        });
        listHtml += `</div><div class="cart-cost">Стоимость покупок: ${this.getCost()}</div>`
        target.insertAdjacentHTML('beforeend', listHtml);
    }

}

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const basket = new Basket();
basket.fetchGoods(goods);

const $basket = document.querySelector('.basket');
const $cartButton = document.querySelector('.cart-button');

$cartButton.addEventListener('click', () => {
    if ($basket.innerHTML.trim()) {
        $basket.classList.toggle('hidden');
        return;
    }
    basket.render($basket);
});
