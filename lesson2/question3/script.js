'use strict';

function FormException(message) {
    this.message = message;
}

class BurgerParam {
    constructor() {
        this.name = '';
        this.price = 0;
        this.caloric = 0;
    }

    getName() { return this.name }
    getPrice() { return this.price }
    getCalories() { return this.caloric }
}

class BigSize extends BurgerParam {
    constructor() {
        super();
        this.name = "большой";
        this.price = 100;
        this.caloric = 40;
    }

    getName() { return this.name }
    getPrice() { return this.price }
    getCalories() { return this.caloric }
}

class SmallSize extends BurgerParam {
    constructor() {
        super();
        this.name = "маленький";
        this.price = 50;
        this.caloric = 20;
    }
}

class CheeseStuff extends BurgerParam {
    constructor() {
        super();
        this.name = "сырный";
        this.price = 10;
        this.caloric = 20;
    }
}

class SaladStuff extends BurgerParam {
    constructor() {
        super();
        this.name = "салатный";
        this.price = 20;
        this.caloric = 5;
    }
}

class PotatoStuff extends BurgerParam {
    constructor() {
        super();
        this.name = "картофельный";
        this.price = 15;
        this.caloric = 10;
    }
}

class SpiceTop extends BurgerParam {
    constructor() {
        super();
        this.name = "c приправой";
        this.price = 15;
        this.caloric = 0;
    }
}

class MayoTop extends BurgerParam {
    constructor() {
        super();
        this.name = "с майонезом";
        this.price = 20;
        this.caloric = 5;
    }
}

const CONF = {
    small: SmallSize,
    big: BigSize,
    cheese: CheeseStuff,
    salad: SaladStuff,
    potato: PotatoStuff,
    spice: SpiceTop,
    mayo: MayoTop,
};

class Hamburger {
    constructor(size, stuffing) {
        this.size = new CONF[size]();
        this.stuffing = new CONF[stuffing]();
        this.topping = {};
    }

    addTopping(topping) {
        this.topping[topping] = new CONF[topping]();
    }           // Добавить добавку

    removeTopping(topping) {
        delete this.topping[topping];
    }           // Убрать добавку

    getToppings() {
        let result = '';
        Object.entries(this.topping).forEach(
            top => {
                result += `${top[1].getName()} `
            }
        );
        return result;
    }           // Получить список добавок

    getSize() {
        return this.size.getName();
    }           // Узнать размер гамбургера

    getStuffing() {
        return this.stuffing.getName();
    }           // Узнать начинку гамбургера

    calculatePrice() {
        let result = this.size.getPrice() + this.stuffing.getPrice();
        Object.entries(this.topping).forEach(
            top => result += top[1].getPrice()
        );
        return result;
    }           // Узнать цену

    calculateCalories() {
        let result = this.size.getCalories() + this.stuffing.getCalories();
        Object.entries(this.topping).forEach(
            top => result += top[1].getCalories()
        );
        return result;
    }           // Узнать калорийность

    returnSummary() {
        return `${this.getSize()} ${this.getStuffing()} гамбургер ${this.getToppings()}
Цена: ${this.calculatePrice()} р.
Энергитическая ценность: ${this.calculateCalories()} калорий.`
    }
}

function sendForm(size, stuffing) {
    if (stuffing && size) {
        burger = new Hamburger(size, stuffing);
    } else {
        throw new FormException('Необходимо указать размер и начинку!');
    }
}

const $form = document.querySelector("form");
const $log = document.querySelector("#log");
const $topping = document.querySelector('.topping');
const $spice = document.querySelector('#spice');
const $mayo = document.querySelector('#mayo');
let burger;

$form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData($form);
    let stuffing;
    let size;
    for (const entry of data) {
        if (size) {
            stuffing = entry[1];
        } else {
            size = entry[1];
        }
    };
    try {
        sendForm(size, stuffing);
    } catch (e) {
        alert(e.message);
        return;
    }
    $topping.classList.remove('hidden');
    $spice.checked = false;
    $mayo.checked = false;
    $log.innerText = burger.returnSummary();
});

$spice.addEventListener('change', (event) => {
    if (event.target.checked) {
        burger.addTopping('spice');
    } else {
        burger.removeTopping('spice');
    }
    $log.innerText = burger.returnSummary();
});

$mayo.addEventListener('change', (event) => {
    if (event.target.checked) {
        burger.addTopping('mayo');
    } else {
        burger.removeTopping('mayo');
    }
    $log.innerText = burger.returnSummary();
});
