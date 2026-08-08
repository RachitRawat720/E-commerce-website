console.log("Script Loaded");

document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector("#menu");
    const close = document.querySelector("#close");
    const navbar = document.querySelector("#navbar");
    let selected = document.querySelector(".selected");
    const addCart = document.querySelector("#addCart");
    const addCart2 = document.querySelector(".add-cart")

    if (menu) {
        menu.addEventListener('click', () => {
            navbar.classList.add('active');
        })
    }

    if (close) {
        close.addEventListener('click', () => {
            navbar.classList.remove('active');
        })
    }

    // ----------------------------- editing from here --------------------------------

    if (addCart) {

        addCart.addEventListener("click", () => {

            const product = {

                id: Date.now(),

                image: document
                    .querySelector(".product-image")
                    .getAttribute("src")
                    .replace("../", ""),

                brand: document.querySelector("#brand").innerText,

                name: document.querySelector("#product-name").innerText,

                price: Number(
                    document
                        .querySelector("#price")
                        .innerText
                        .replace("₹", "")
                ),

                quantity: 1

            }

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.name === product.name);

            if (existing) {
                existing.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Added to Cart!");

        })
    }
    

    const container = document.querySelector(".item-container");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (container) {
        container.innerHTML = "";
        cart.forEach(product => {
            const item = document.createElement("div");
            item.classList.add("cart-item");
            item.innerHTML = `
                <div class="pro-img">
                    <img src="${product.image}">
                </div>

                <div class="pro-desc">
                    <h3 class="big-heading">${product.brand}</h3>
                    <p class="para">${product.name}</p>
                    <h4 class="small-heading">₹${product.price}</h4>
                    <button class="btn" onclick="decrease(${product.id})">-</button>
                    <span class="pro-quant">${product.quantity}</span>
                    <button class="btn" onclick="increase(${product.id})">+</button>
                    <button class="remove-btn" onclick="removeItem(${product.id})">
                        Remove
                    </button>
                </div>
            `;
            container.appendChild(item);
        });

        const total = cart.reduce((sum, item) => {
            return sum + item.price * item.quantity;
        }, 0);

        const totalPrice = document.querySelector("#total-price");

        if (totalPrice) {
            totalPrice.innerText = `Subtotal : ₹${total}`;
        }

        if (container && cart.length === 0) {
            container.innerHTML = `
                <h2 class="empty-cart-heading" >Your cart is empty</h2>
            `;
            totalPrice.innerText = "";
        }
    }
})

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(product => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function increase(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const product = cart.find(item => item.id === id);
    product.quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}

function decrease(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const product = cart.find(item => item.id === id);
    if (product.quantity > 1) {
        product.quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
