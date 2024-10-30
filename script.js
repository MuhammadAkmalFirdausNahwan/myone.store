let cart = [];

const paymentMethods = ['Dana', 'Bank BCA'];

function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    alert(`${productName} telah ditambahkan ke keranjang!`);
    updateCartTotal();
    displayCartItems();
}

function updateCartTotal() {
    const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    const itemCount = cart.reduce((count, product) => count + product.quantity, 0);
    document.getElementById('cart-total').innerText = `Total: Rp ${total} (${itemCount} item)`;
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <span>${item.name} - Rp ${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${index})">Hapus</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartTotal();
    displayCartItems();
}

function displayPaymentMethods() {
    const paymentSelect = document.getElementById('payment-method');
    paymentMethods.forEach(method => {
        const option = document.createElement('option');
        option.value = method;
        option.textContent = method;
        paymentSelect.appendChild(option);
    });
}

function processPayment() {
    const selectedMethod = document.getElementById('payment-method').value;
    const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    
    if (selectedMethod && cart.length > 0) {

        const confirmPayment = confirm(`Total pembayaran: Rp ${total}\nMetode pembayaran: ${selectedMethod}\n\nKlik OK untuk membayar`);
        
        if (confirmPayment) {
            alert(`Pembayaran sebesar Rp ${total} berhasil diproses menggunakan ${selectedMethod}`);
            cart = []; // 
            updateCartTotal();
            displayCartItems();
            document.getElementById('payment-method').value = ''; 
        }
    } else if (cart.length === 0) {
        alert('Keranjang Anda kosong. Silakan tambahkan produk terlebih dahulu.');
    } else {
        alert('Silakan pilih metode pembayaran.');
    }
}

displayPaymentMethods();
displayCartItems();