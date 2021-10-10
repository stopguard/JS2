'use strict';

class Product {
    /**
     * @param {{id_product, product_name, price}} product
     */
    constructor(product) {
        this.idProduct = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
    }

    /** return this as html-code
     * @returns {string}
     */
    render() {
        return `<div class="good-item"><h3>${this.title}</h3><p>${this.price}</p>
        <a href="#" id="buy${this.idProduct}" class="buy">Добавить</a></div>`;
    }
}

class Items {
    constructor() {
        this.goods = [];
    }

    /** add products to this cart 
     * @param {Element} target
     */
    fetchGoods(target) {
        fetch(API_URL + API_CATALOG)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.goods = request.map(item => new Product(item));
                this.render(target);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /** insert this as html-code to target
     * @param {Element} target
     */
    render(target) {
        let listHtml = '<div class="goods-list">';
        this.goods.forEach(product => {
            listHtml += product.render();
        });
        listHtml += `</div>`;
        target.insertAdjacentHTML('beforeend', listHtml);
        const products = this;
        target.querySelectorAll('a.buy').forEach(el => {
            el.addEventListener('click', function add(event) {
                event.preventDefault();
                products.addToBasket(event.target.id);
            });
        });
    }

    addToBasket(itemId) {
        fetch(API_URL + API_ADD_TO_BASKET/*, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ id: +itemId })
        }*/)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                if (request.result == 1) {
                    document.querySelector(`#${itemId}`).classList.add('added');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

class CartItem {
    /**
     * @param {{id_product, product_name, price, quantity}} product
     */
    constructor(product) {
        this.idProduct = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
    }

    /** return this as html-code
     * @returns {string}
     */
    render() {
        return `<div class="good-item"><h3>${this.title}</h3><p>${this.price}</p><p>${this.quantity}</p>
        <a href="#" id="delete${this.idProduct}" class="delete">Удалить</a></div>`;
    }

}

class Cart {
    constructor() {
        this.cost = 0;
        this.countGoods = 0;
        this.goods = [];
    }

    /** add products to this cart
     * @param {Element} target
     */
    fetchGoods(target) {
        fetch(API_URL + API_BASKET)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.cost = request.amount;
                this.countGoods = request.countGoods;
                this.goods = request.contents.map(item => new CartItem(item));

                this.render(target);
            })
            .catch((err) => {
                console.log(err.text);
            })
    }

    /** insert this as html-code to target
     * @param {Element} target
     */
    render(target) {
        let listHtml = '<div class="goods-list">';
        this.goods.forEach(product => {
            listHtml += product.render();
        });
        listHtml += `</div>
        <div class="cart-cost">
        <p>Товаров в корзине - ${this.countGoods} ед. на сумму ${this.cost} руб.</p>
        </div>`;
        target.insertAdjacentHTML('beforeend', listHtml);
        const products = this;
        target.querySelectorAll('a.delete').forEach(el => {
            el.addEventListener('click', function del(event) {
                event.preventDefault();
                products.delFromBasket(event.target.id);
            });
        });
    }

    delFromBasket(itemId) {
        fetch(API_URL + API_REMOVE_FROM_BASKET/*, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify({ id: +itemId })
            }*/
        )
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                if (request.result == 1) {
                    document.querySelector(`#${itemId}`).classList.add('deleted');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_CATALOG = '/catalogData.json';
const API_BASKET = '/getBasket.json';
const API_ADD_TO_BASKET = '/addToBasket.json';
const API_REMOVE_FROM_BASKET = '/deleteFromBasket.json';

const $products = document.querySelector('.products');
const $productsButton = document.querySelector('.products-button');
const $basket = document.querySelector('.basket');
const $cartButton = document.querySelector('.cart-button');

const items = new Items();
items.fetchGoods($products);

const basket = new Cart();
basket.fetchGoods($basket);

$productsButton.addEventListener('click', () => {
    if ($products.classList.contains('hidden')) {
        $products.innerHTML = '';
        items.fetchGoods($products);
    }
    $products.classList.toggle('hidden');
});

$cartButton.addEventListener('click', () => {
    if ($basket.classList.contains('hidden')) {
        $basket.innerHTML = '';
        basket.fetchGoods($basket);
    }
    $basket.classList.toggle('hidden');
});
