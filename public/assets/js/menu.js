/* const express = require("express");
const app = express(); */
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Chicken with Vegies',
        image: '1.PNG',
        price: 40
    },
    {
        id: 2,
        name: 'Roasted Chicken',
        image: '2.PNG',
        price: 39
    },
    {
        id: 3,
        name: 'Tofu vegies',
        image: '3.PNG',
        price: 25
    },
    {
        id: 4,
        name: 'Thai Curry',
        image: '4.PNG',
        price: 29
    },
    {
        id: 5,
        name: 'Salad',
        image: '5.PNG',
        price: 10
    },
    {
        id: 6,
        name: 'Mexican Pizza',
        image: '6.PNG',
        price: 15
    },
    {
        id: 7,
        name: 'Steaks',
        image: 'promo-1.png',
        price: 45
    },
    {
        id: 8,
        name: 'Baccon with Veggies',
        image: 'promo-2.png',
        price: 15
    },
    {
        id: 9,
        name: 'Chicken Wings',
        image: 'promo-3.png',
        price: 15
    },
    {
        id: 10,
        name: 'Egg Sandwich',
        image: 'promo-4.png',
        price: 15
    },
    {
        id: 11,
        name: 'Meat Salad',
        image: 'promo-5.png',
        price: 15
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="../assets/menu image/${value.image}">
            <div class="title text-of-card">${value.name}</div>
            <div class="price text-of-card">${value.price.toLocaleString()}</div>
            <button class="btn btn-hover" onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="../assets/menu image/${value.image}"/></div>
                <div class="text-of-card">${value.name}</div>
                <div class="text-of-card"> ${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key} , ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
/* const finalcheck= document.querySelector('.total'); 
finalcheck.addEventListener('click', ()=>{
    redirect('/');
}) */