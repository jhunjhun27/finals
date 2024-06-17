var toggleButton = document.querySelector('.toggle');
        var navLinks = document.querySelector('nav ul');

        toggleButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
            //order_cart

let orderIcon = document.querySelector("#bag-icon");
let  cart_open = document.querySelector(".order_cart");


//open
orderIcon.onclick = () =>{
    cart_open.classList.add("active");
};
//close


//order working 
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready();
}



//function
function ready() {
    //remove order from cart 
    let removeCartbuttons = document.getElementsByClassName('bin')
    console.log(removeCartbuttons)
    for (var i = 0; i < removeCartbuttons.length; i++){
        var button = removeCartbuttons[i]
        button.addEventListener('click', removeCartitem);
    }
 //change quantity
var quantityInput = document.getElementsByClassName("order_quantity");
for (var i = 0; i < quantityInput .length; i++) {
    var input = quantityInput[i]
    input.addEventListener("change", quantityChanged);
}
 //order add
 var addorder = document.getElementsByClassName('btn_addtoorder');
 for (var i = 0; i < addorder .length; i++){
    var btn_addtoorder =addorder[i]
    btn_addtoorder.addEventListener("click",addtoorder);
 }

}

//removeCartitem
function removeCartitem(event) {
    var buttonClicked  = event.target
    buttonClicked.parentElement.remove();
    updateTotal();
}

//changes quantity
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
    input.value=1;
    }
  updateTotal();
 } 
 //btn_addtoorder
 function addtoorder(event) {
    var button = event.target;
    var food = button.parentElement;
    var title = food.querySelector(".title").innerText;
    var price = food.querySelector(".price").innerText;
    var imgSrc = food.querySelector(".picture").src;

    var existingItem = document.querySelector(`.order_product_title[data-title="${title}"]`);
    if (existingItem) {
        var quantityInput = existingItem.parentElement.querySelector('.order_quantity');
        quantityInput.value = parseInt(quantityInput.value) + 1;
    } else {
        var confirmation = confirm("Are you sure you want to add \"" + title + "\" to your cart?");
        if (confirmation) {
            addfoodtocart(title, price, imgSrc);
        }
    }
    updateTotal();
}




                    
                    
function addfoodtocart(title, price, imgSrc) {
    var cartContent = document.querySelector('.order_content');
    var Cartfoodbox = document.createElement("div");
    Cartfoodbox.classList.add('order_box');

    var cartboxcontent = `
        <img src="${imgSrc}" alt="${title}" class="picture">
        <div class="detail_box">
            <div class="order_product_title" data-title="${title}">${title}</div>
            <div class="order_price">${price}</div>
            <input type="number" value="1" class="order_quantity">
        </div>
        <img src="img/trash-can.png" class="bin">`;

    Cartfoodbox.innerHTML = cartboxcontent;
    cartContent.appendChild(Cartfoodbox);

    Cartfoodbox.querySelector('.bin').addEventListener('click', removeCartitem);
    Cartfoodbox.querySelector('.order_quantity').addEventListener('change', quantityChanged);

    // Add class to make the cart visible
    showCart();
}

function showCart() {
    var cartContainer = document.querySelector('.order_cart');
    cartContainer.classList.add('active');
}


var studentDiscountRate = 0.1; // 10% discount for students
var seniorDiscountRate = 0.2; // 20% discount for seniors
var pwdDiscountRate = 0.3; // 30% discount for people with disabilities

 
//update total
function updateTotal() {
    var cartContent = document.querySelector('.order_content');
    var orderBoxItems = cartContent.querySelectorAll('.order_box');
    var total = 0;

    // Loop through each item in the cart
    orderBoxItems.forEach(function(orderBox) {
        var priceElement = orderBox.querySelector('.order_price');
        var quantityElement = orderBox.querySelector('.order_quantity');
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = parseInt(quantityElement.value);

        // Add the price of each item to the total
        total += price * quantity;
    });

    // Apply discounts based on user type
    var userType = document.getElementById('user-type').value; // Assume userType is 'student', 'senior', 'pwd', or 'normal'
    switch(userType) {
        case 'student':
            total *= (1 - studentDiscountRate); // Apply student discount
            break;
        case 'senior':
            total *= (1 - seniorDiscountRate); // Apply senior discount
            break;
        case 'pwd':
            total *= (1 - pwdDiscountRate); // Apply PWD discount
            break;
        default:
            // No discount for normal users
            break;
    }

    // Round the total to 2 decimal places
    total = Math.round(total * 100) / 100;

    // Display the total
    document.querySelector(".total_price").innerText = '$' + total;
}
function calculateChange() {
    var total = parseFloat(document.querySelector(".total_price").innerText.replace("$", ""));
    var cashInput = parseFloat(document.getElementById("cash-input").value);
    if (!isNaN(cashInput)) {
        var change = cashInput - total;
        if (change >= 0) {
            alert("Change: $" + change.toFixed(2));
        } else {
            alert("Insufficient cash amount!");
        }
    } else {
        alert("Please enter a valid cash amount!");
    }
} 
window.addEventListener('scroll', function() {
            var sections = document.querySelectorAll('section');
            var navLinks = document.querySelectorAll('nav ul a');

            sections.forEach(function(section, index) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.clientHeight;

                if (window.scrollY >= sectionTop - 80 && window.scrollY < sectionTop + sectionHeight - 80) {
                    navLinks[index].classList.add('active');
                } else {
                    navLinks[index].classList.remove('active');
                }
            });

        });



        var cartIcon = document.getElementById('bag-icon');
        var cartSection = document.getElementById('cart');
        var mainContent = document.querySelector('.Main');

        // Toggle cart section visibility when clicking the cart icon
        cartIcon.addEventListener('click', function() {
            cartSection.classList.toggle('active');
            if (cartSection.classList.contains('active')) {
                mainContent.style.marginRight = '250px'; /* Adjust for cart width */
            } else {
                mainContent.style.marginRight = '0';
            }
        });