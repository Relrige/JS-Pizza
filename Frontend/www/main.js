    
var pizza_info = [
    {
        id:1,
        icon:'assets/images/pizza_7.jpg',
        title: "Імпреза",
        type: 'М’ясна піца',
        content: {
            meat: ['балик', 'салямі'],
            chicken: ['куриця'],
            cheese: ['сир моцарелла', 'сир рокфорд'],
            pineapple: ['ананаси'],
            additional: ['томатна паста', 'петрушка']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 99
        },
        big_size:{
            weight: 660,
            size: 40,
            price: 169
        },
        is_new:true

    },
    {
        id:2,
        icon:'assets/images/pizza_2.jpg',
        title: "BBQ",
        type: 'М’ясна піца',
        content: {
            meat: ['мисливські ковбаски', 'ковбаски папероні', 'шинка'],
            cheese: ['сир домашній'],
            mushroom: ['шампінйони'],
            additional: ['петрушка', 'оливки']
        },
        small_size:{
            weight: 460,
            size: 30,
            price: 139
        },
        big_size:{
            weight: 840,
            size: 40,
            price: 199
        },
        is_popular:true
    },
    {
        id:3,
        icon:'assets/images/pizza_1.jpg',
        title: "Міксовий поло",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'куриця копчена'],
            cheese: ['сир моцарелла'],
            pineapple: ['ананаси'],
            additional: ['кукурудза', 'петрушка', 'соус томатний']
        },
        small_size:{
            weight: 430,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 179
        }
    },
    {
        id:4,
        icon:'assets/images/pizza_5.jpg',
        title: "Сициліано",
        type: 'М’ясна піца',
        content: {
            meat: ['вітчина', 'салямі'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            additional: ['перець болгарський',  'соус томатний']
        },
        small_size:{
            weight: 450,
            size: 30,
            price: 111
        },
        big_size:{
            weight: 790,
            size: 40,
            price: 169
        }
    },
    {
        id:17,
        icon:'assets/images/pizza_3.jpg',
        title: "Маргарита",
        type: 'Вега піца',
        content: {
            cheese: ['сир моцарелла', 'сир домашній'],
            tomato: ['помідори'],
            additional: ['базилік', 'оливкова олія', 'соус томатний']
        },
        small_size:{
            weight: 370,
            size: 30,
            price: 89
        }
    },
    {
        id:43,
        icon:'assets/images/pizza_6.jpg',
        title: "Мікс смаків",
        type: 'М’ясна піца',
        content: {
            meat: ['ковбаски'],
            cheese: ['сир моцарелла'],
            mushroom: ['шампінйони'],
            pineapple: ['ананаси'],
            additional: ['цибуля кримська', 'огірки квашені', 'соус гірчичний']
        },
        small_size:{
            weight: 470,
            size: 30,
            price: 115
        },
        big_size:{
            weight: 780,
            size: 40,
            price: 180
        }
    },
    {
        id:90,
        icon:'assets/images/pizza_8.jpg',
        title: "Дольче Маре",
        type: 'Морська піца',
        content: {
            ocean: ['криветки тигрові', 'мідії', 'ікра червона', 'філе червоної риби'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        big_size:{
            weight: 845,
            size: 40,
            price: 399
        }
    },
    {
        id:6,
        icon:'assets/images/pizza_4.jpg',
        title: "Россо Густо",
        type: 'Морська піца',
        content: {
            ocean: ['ікра червона', 'лосось копчений'],
            cheese: ['сир моцарелла'],
            additional: ['оливкова олія', 'вершки']
        },
        small_size:{
            weight: 400,
            size: 30,
            price: 189
        },
        big_size:{
            weight: 700,
            size: 40,
            price: 299
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.select-button, .select-button-deselect');
    filterButtons.forEach(button => button.addEventListener('click', handleFilterClick));
    renderPizzas(pizza_info);
    loadCartFromLocalStorage();
});

function handleFilterClick(event) {
    const filter = event.target.getAttribute('data-filter');
    const filterButtons = document.querySelectorAll('.select-button, .select-button-deselect');
    filterButtons.forEach(button => button.className="select-button-deselect");
    event.target.className="select-button";
    let filteredPizzas;
    if (filter === 'all') {
        filteredPizzas = pizza_info;
    } else if (filter === 'pineapple') {
        filteredPizzas = pizza_info.filter(pizza => pizza.content.pineapple);
    } else if (filter === 'mushroom') {
        filteredPizzas = pizza_info.filter(pizza => pizza.content.mushroom);
    } else {
        filteredPizzas = pizza_info.filter(pizza => pizza.type === filter);
    }
    renderPizzas(filteredPizzas);
    document.getElementById('pizza-count').innerText = filteredPizzas.length;
}

function renderPizzas(pizzas) {
    const pizzaList = document.getElementById('pizzas-wrapper1');
    pizzaList.innerHTML = '';
    pizzas.forEach(pizza => {
        const pizzaSection = createPizzaSection(pizza);
        pizzaList.appendChild(pizzaSection);
    });
}

function generatePizzaDescription(content) {
    let description = '';
    for (let category in content) {
        if (content.hasOwnProperty(category)) {
            description += `${content[category].join(', ')}, `;
        }
    }
    return description.charAt(0).toUpperCase() + description.slice(1,description.length-2);
}

function createPizzaSection(pizza) {
    const section = document.createElement('section');
    section.className = 'pizza-container';
    let name = pizza.title;
    let icon = pizza.icon;
    const newBadge = pizza.is_new ? '<div class="new-badge"></div>' : '';
    const popularBadge = pizza.is_popular ? '<div class="popular-badge"></div>' : '';
    const pizzaImage = `<div class="pizza-image" style="background-image: url('${pizza.icon}');"></div>`;
    const pizzaName = `<div class="pizza-name">${pizza.title}</div>`;
    const pizzaType = `<div class="pizza-type">${pizza.type}</div>`;
    const pizzaDescription = `<div class="pizza-description">${generatePizzaDescription(pizza.content)}</div>`;
    if(pizza.small_size!=undefined){
        var smallSizeDetails = `
        <div>
        <div class="detail-row">
            <div class="detail-label">∅</div>
            <div class="detail-value-small">${pizza.small_size.size}</div>
        </div>
        <div class="detail-row">
            <div class="detail-value-small">
                <img src="assets/images/weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">
                ${pizza.small_size.weight}
            </div>
        </div>
        <div class="detail-row">
            <div class="detail-price">
                <strong>${pizza.small_size.price}</strong>
                <span>грн.</span>
            </div>
        </div>
        <div class="detail-row">
            <button class="select-button" onclick="addToCart('${name}', ${pizza.small_size.price}, ${pizza.small_size.size},'${icon}')">Купити</button>
        </div>
        </div>
    `;
    }else{
        var smallSizeDetails ="";
    }
    if(pizza.big_size!=undefined){
    var bigSizeDetails = `
        <div>
            <div class="detail-row">
                <div class="detail-label">∅</div>
                <div class="detail-value-small">${pizza.big_size.size}</div>
            </div>
            <div class="detail-row">
                <div class="detail-value-small">
                    <img src="assets/images/weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">
                    ${pizza.big_size.weight}
                </div>
            </div>
            <div class="detail-row">
                <div class="detail-price">
                    <strong>${pizza.big_size.price}</strong>
                    <span>грн.</span>
                </div>
            </div>
            <div class="detail-row">
                <button class="select-button" onclick="addToCart( '${name}', ${pizza.big_size.price}, ${pizza.big_size.size},'${icon}')">Купити</button>
            </div>
        </div>      
    `;
}else{
    var bigSizeDetails ="";
}
    const pizzaDetails = `
        <section class="pizza-details">
            ${smallSizeDetails}
            ${bigSizeDetails}
        </section>
    `;
    section.innerHTML = `${popularBadge}${newBadge}${pizzaImage}${pizzaName}${pizzaType}${pizzaDescription}${pizzaDetails}`;
    return section;
}

const pizzasWrapper = document.querySelector('.pizzas-wrapper');
pizza_info.forEach(pizza => {
    pizzasWrapper.appendChild(createPizzaSection(pizza));
});

//////////////////
let cart = [];

function addToCart(name, price, size, icon) {
    const itemIndex = cart.findIndex(item => item.name === name && item.size === size);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({ name, price, size, quantity: 1,icon });
    }
    updateCart();
    saveCartToLocalStorage();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');

    cartItems.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
        if(item.size==30){
            var size= "(Маленька)"
        }else{ 
            var size= "(Велика)"
        }
        const cartItem = document.createElement('section');
        cartItem.className = 'grid-container';
        cartItem.innerHTML = `
          <div class="column-1">
            <div class="row1 orange-font1">${item.name} ${size}</div>
            <div class="row2">
              <div class="detail-row detail-row-grid" style="margin-right: 10px;">
                <div class="detail-label">∅</div>
                <div class="detail-value-small">${item.size} </div>
              </div>
              <div class="detail-row detail-row-grid">
                <div class="detail-value-small">
                  <img src="assets/images/weight.svg" alt="Weight Icon" style="width: 16px; height: 16px; margin-right: 5px;">
                  8${item.size} 
                </div>
              </div>
            </div>
            <div class="row3">
              <div class="price">${item.price} грн.</div>
              <button class="red-button" onclick="changeQuantity('${item.name}', ${item.size}, -1)">-</button>
              <div class="number">${item.quantity}</div>
              <button class="green-button" onclick="changeQuantity('${item.name}', ${item.size}, 1)">+</button>
              <button class="gradient-button" onclick="removeFromCart('${item.name}', ${item.size})">
                <span class="cross">✕</span>
              </button>
            </div>
          </div>
            <img src="${item.icon}" class="column-img">
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('total-amount').innerText = `${totalAmount} грн.`;
    document.querySelector('.circle').innerText = cart.length;

    drawPizzaCharts();
}

function changeQuantity(name, size, delta) {
    const itemIndex = cart.findIndex(item => item.name === name && item.size === size);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
        updateCart();
        saveCartToLocalStorage();
    }
}

function removeFromCart(name, size) {
    cart = cart.filter(item => item.name !== name || item.size !== size);
    updateCart();
    saveCartToLocalStorage();
}

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
    saveCartToLocalStorage();
});

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

function getPizzaDataForChart() {
    const pizzaData = {};

    cart.forEach(item => {
        let sizeName = item.size == 30 ? "(Маленька)" : "(Велика)";

        let fullItemName = item.name + sizeName;

        if (pizzaData[fullItemName]) {
            pizzaData[fullItemName].quantity += item.quantity;
            pizzaData[fullItemName].price += item.price * item.quantity;
        } else {
            pizzaData[fullItemName] = {
                name: fullItemName,
                quantity: item.quantity,
                price: item.price * item.quantity
            };
        }
    });

    return pizzaData;
}

function drawPizzaCharts() {
    const pizzaData = getPizzaDataForChart();

    const quantityData = [['Pizza', 'Quantity']];
    const priceData = [['Pizza', 'Total Price']];

    for (const pizzaName in pizzaData) {
        quantityData.push([pizzaName, pizzaData[pizzaName].quantity]);
        priceData.push([pizzaName, pizzaData[pizzaName].price]);
    }

    google.charts.load('current', { 'packages': ['corechart'] });

    google.charts.setOnLoadCallback(() => {
        drawQuantityChart(quantityData);
        drawPriceChart(priceData);
    });
}

function drawQuantityChart(data) {
    const dataTable = google.visualization.arrayToDataTable(data);

    const options = {
        title: 'Pizza Quantity Distribution',
        is3D: true
    };

    const chart = new google.visualization.PieChart(document.getElementById('quantity-chart'));
    chart.draw(dataTable, options);
}

function drawPriceChart(data) {
    const dataTable = google.visualization.arrayToDataTable(data);

    const options = {
        title: 'Total Price per Pizza',
        hAxis: { title: 'Pizza' },
        vAxis: { title: 'Total Price (грн)' },
        legend: { position: 'none' }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('price-chart'));
    chart.draw(dataTable, options);
}


document.getElementById('order-button').addEventListener('click', () => {
    document.getElementById("head-for-menu").style.display="none";
    document.getElementById("pizzas-wrapper1").style.display="none";
    document.getElementById("charts").id="charts-top";
    document.getElementsByClassName("go-back-button")[0].style.display="inline-block";
    drawPizzaCharts();
});
document.getElementsByClassName('go-back-button')[0].addEventListener('click', () => {
    document.getElementById("head-for-menu").style.display="grid";
    document.getElementById("pizzas-wrapper1").style.display="grid";
    document.getElementById("charts-top").id="charts";
    document.getElementsByClassName("go-back-button")[0].style.display="none";
});

window.addEventListener("resize", myFunction);
function myFunction() {
    drawPizzaCharts();
  }