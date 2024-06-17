
      function toggleNav() {
    var navToggleContainer = document.getElementById('navToggleContainer');
    navToggleContainer.style.display = (navToggleContainer.style.display === 'none' || navToggleContainer.style.display === '') ? 'flex' : 'none';
 }
    

    function toggleCart() {
        var cartSidebar = document.getElementById('cartSidebar');
        cartSidebar.classList.toggle('open');
    }

    

                         // Function to open modal and initiate restocking
function restockItem(button) {
    var modal = document.getElementById('restockModal');
    modal.style.display = 'block';

    // Get the item and current stock count
    var item = button.closest('.item');
    var stockCountElement = item.querySelector('.stock-count');
    var currentStock = parseInt(stockCountElement.textContent);

    
  
    // Confirm restock function
    window.confirmRestock = function() {
        var restockQuantity = parseInt(document.getElementById('restockQuantity').value);

        if (!isNaN(restockQuantity) && restockQuantity > 0) {
            var newStock = currentStock + restockQuantity;
            stockCountElement.textContent = newStock;
            item.setAttribute('data-stock', newStock); // Update data-stock attribute if needed
            modal.style.display = 'none';
            alert('Item restocked successfully!');
        } else {
            alert('Please enter a valid quantity to restock.');
        }
    };

    // Close modal function
    window.closeModal = function() {
        modal.style.display = 'none';
    };
}

    // Function to remove item from cart
    function removeCartItem(button) {
        var cartItem = button.closest('.cart-item');
        cartItem.remove();
    }
    function addToCart(button) {
    var item = button.closest('.item');
    var itemId = item.getAttribute('data-id');
    var itemName = item.querySelector('.item-name').textContent;
    var itemPrice = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
    var cartItems = document.getElementById('cartItems');
    var cartTotalAmount = document.getElementById('cartTotalAmount');
    var stockCountElement = item.querySelector('.stock-count');
    var currentStock = parseInt(stockCountElement.textContent);

    // Check if item is already in cart
    var existingCartItem = cartItems.querySelector('.cart-item[data-id="' + itemId + '"]');
    if (existingCartItem) {
        alert('This item is already in your cart.');
    } else {
        if (currentStock > 0) {
            // Decrease stock count on homepage
            currentStock--;
            stockCountElement.textContent = currentStock;

            // Create cart item element
            var cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.setAttribute('data-id', itemId);
            cartItem.innerHTML = `
                <div class="item-details">
                    <div class="item-name">${itemName} 
                        <button onclick="removeCartItem(this)" class="remove">Remove</button>
                    </div>
                    <div class="item-price">$${itemPrice.toFixed(2)}</div>
                </div>
                <div class="item-actionss">
                    <button class="cart-quantity-btn" onclick="decreaseQuantity(this, ${itemId})">-</button>
                    <span class="cart-quantity-input">1</span>
                    <button class="cart-quantity-btn" onclick="increaseQuantity(this, ${itemId}, ${currentStock})">+</button>
                    <div class="cart-item-amount">$${itemPrice.toFixed(2)}</div>
                </div>
            `;

            // Append cart item to cart sidebar
            cartItems.appendChild(cartItem);

            // Update total amount
            updateCartTotal();

            // Open cart sidebar
            var cartSidebar = document.getElementById('cartSidebar');
            cartSidebar.classList.add('open');
        } else {
            alert('This item is out of stock.');
        }
    }
}






// Function to decrease quantity in the cart
function decreaseQuantity(button, itemId) {
    var cartItem = button.closest('.cart-item');
    var quantityElement = cartItem.querySelector('.cart-quantity-input');
    var currentQuantity = parseInt(quantityElement.textContent);

    if (currentQuantity > 1) {
        currentQuantity--;
        quantityElement.textContent = currentQuantity;

        var itemPrice = parseFloat(cartItem.querySelector('.item-price').textContent.replace('$', ''));
        var itemTotalElement = cartItem.querySelector('.cart-item-amount');
        var itemTotal = itemPrice * currentQuantity;
        itemTotalElement.textContent = '$' + itemTotal.toFixed(2);

        // Increase the stock count back since the quantity is decreasing
        var stockCountElement = document.querySelector(`.item[data-id="${itemId}"] .stock-count`);
        var currentStock = parseInt(stockCountElement.textContent);
        stockCountElement.textContent = currentStock + 1;

        // Update total amount of the entire cart
        updateCartTotal();
    } else {
        alert('Minimum quantity reached.');
    }
}

function increaseQuantity(button, itemId, currentStock) {
    var cartItem = button.closest('.cart-item');
    var quantityElement = cartItem.querySelector('.cart-quantity-input');
    var currentQuantity = parseInt(quantityElement.textContent);
    var stockCountElement = document.querySelector(`.item[data-id="${itemId}"] .stock-count`);
    var currentStock = parseInt(stockCountElement.textContent);

    if (currentStock > 0) {
        currentQuantity++;
        quantityElement.textContent = currentQuantity;
        stockCountElement.textContent = currentStock - 1;

        var itemPrice = parseFloat(cartItem.querySelector('.item-price').textContent.replace('$', ''));
        var itemTotalElement = cartItem.querySelector('.cart-item-amount');
        var itemTotal = itemPrice * currentQuantity;
        itemTotalElement.textContent = '$' + itemTotal.toFixed(2);

        // Update total amount of the entire cart
        updateCartTotal();
    } else {
        alert('Maximum stock reached.');
    }
}

                          // Function to update total amount for each cart item
    function updateCartTotal() {
    var cartItems = document.querySelectorAll('.cart-item');
    var total = 0;

    cartItems.forEach(function(cartItem) {
        var itemTotal = parseFloat(cartItem.querySelector('.cart-item-amount').textContent.replace('$', ''));
        total += itemTotal;
    });

    // Update total amount in the cart
    document.getElementById('cartTotalAmount').textContent = '$' + total.toFixed(2);
}


// Function to update total amount of the entire cart
                             
function updateCartTotal() {
    var cartItems = document.querySelectorAll('.cart-item');
    var total = 0;

    cartItems.forEach(function(cartItem) {
        var itemPrice = parseFloat(cartItem.querySelector('.item-price').textContent.replace('$', ''));
        var quantity = parseInt(cartItem.querySelector('.cart-quantity-input').textContent);
        var itemTotal = itemPrice * quantity;
        total += itemTotal;
    });

    // Update total amount in the cart
    document.getElementById('cartTotalAmount').textContent = '$' + total.toFixed(2);
}


// Function to remove item from cart
function removeCartItem(button) {
    var cartItem = button.closest('.cart-item');
    cartItem.remove();

    // Update total amount
    updateCartTotal();
}


function updateTotal() {
    var cartItems = document.querySelectorAll('.cart-item');
    var total = 0;

    cartItems.forEach(function(cartItem) {
        var itemPrice = parseFloat(cartItem.querySelector('.item-price').textContent.replace('$', ''));
        var quantity = parseInt(cartItem.querySelector('.cart-quantity-input').textContent);
        total += itemPrice * quantity;
    });

    var discount = document.getElementById('user-type').value;
    switch (discount) {
        case 'student':
            total *= 0.9; // 10% discount for students
            break;
        case 'senior':
            total *= 0.8; // 20% discount for seniors
            break;
        case 'pwd':
            total *= 0.7; // 30% discount for PWD
            break;
        default:
            break;
    }

    document.getElementById('cartTotalAmount').textContent = "$" + total.toFixed(2);
}


// Function to calculate change
function calculateChange() {
    var cashInput = document.getElementById('cash-input').value;
    var totalAmount = parseFloat(document.getElementById('cartTotalAmount').textContent.replace('$', ''));

    if (isNaN(cashInput) || cashInput === '') {
        alert('Please enter a valid cash amount.');
        return;
    }

    var cashAmount = parseFloat(cashInput);

    if (cashAmount < totalAmount) {
        alert('Insufficient cash. Please enter a higher amount.');
        return;
    }

    var change = cashAmount - totalAmount;
    alert('Change: $' + change.toFixed(2));
}

function toggleCart() {
    var cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');

    
}


