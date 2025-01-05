function handleLogin(event) {
    event.preventDefault(); // Mencegah reload halaman
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Contoh validasi sederhana
    if (username === 'admin' && password === 'admin') {
        alert('Login berhasil!');
        document.getElementById('login-page').style.display = 'none'; // Sembunyikan halaman login
        document.getElementById('main-page').style.display = 'block'; // Tampilkan halaman utama
    } else {
        alert('Username atau password salah!');
    }
}

const products = [
    {
        id: 1,
        name: "Hanasui Brightening Skincare",
        price: 150000,
        image: "https://down-id.img.susercontent.com/file/f5fbfd5b3124a0d34bdb04013215573c",
        description: "Untuk mencerahkan kulit, mengandung Niacinamide",
        stock: 8
    },
    {
        id: 2,
        name: "Hanasui Acne Treatment",
        price: 150000,
        image: "https://enviostore.com/media/product/768/product_image-1634124141.jpg",
        description: "5 produk untuk jerawat, mengandung Salicylic Acid & Niacinamide",
        stock: 10
    },
    {
        id: 3,
        name: "Wardah Acnederm Series ",
        price: 170000,
        image: "https://d2jlkn4m127vak.cloudfront.net/medias/articles/medias-1571372858.png",
        description: "Skincare pencerah dengan Crystal-White Active & Niacinamide",
        stock: 15
    },
    {
        id: 4,
        name: "Wardah White Secret ",
        price: 299000,
        image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1635224334/cf9b678b-42fe-4df9-95df-dbbd4dd5ed00_c4yipx.jpg",
        description: "Berbahan dasar Centella Asiatica untuk menenangkan dan melembapkan kulit",
        stock: 11
    },
    {
        id: 5,
        name: "Skin1004 Madagascar Centella Asiatica Series",
        price: 599900,
        image: "https://down-id.img.susercontent.com/file/1ba826a734dcd2f2e82a99499ea46d7a",
        description: "Mengandung 5 ceramide untuk memperkuat barrier kulit",
        stock: 7
    },
    {
        id: 6,
        name: "SKINTIFIC 5x Ceramide series",
        price: 349000,
        image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/104/MTA-162535739/brd-86234_skintific-5pcs-set-paket-skincare-5x-ceramide-series-moisturizer-toner-serum-sunscreen-cleanser_full01-aead467a.jpg",
        description: "Rangkaian untuk glowing, mengandung Vitamin C & Niacinamide",
        stock: 12
    },
    {
        id: 7,
        name: "Skintific Glowing Set",
        price: 249000,
        image: "https://down-id.img.susercontent.com/file/id-11134207-7qukw-lh7e5ztbnzcjda",
        description: "Rangkaian untuk glowing, mengandung Vitamin C & Niacinamide",
        stock: 12
    },
    {
        id: 8,
        name: "SK-II",
        price: 5999000,
        image: "https://s3-ap-southeast-1.amazonaws.com/content-platform-production/sephora-content-platform-_26b83643-fba2-484a-875a-b9b327ee26fb",
        description: "Premium skincare dengan Pitera™ untuk regenerasi dan kecerahan kulit",
        stock: 5
    },
    {
        id: 9,
        name: "The Originote - Acne Kit",
        price: 225000,
        image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/9/14/ba45ad50-adf5-48bd-a86d-1548a3912390.jpg.webp?ect=4g",
        description: "Mengandung Salicylic Acid, Niacinamide, dan Tea Tree Oil untuk mengatasi jerawat, mencerahkan, dan mengontrol minyak",
        stock: 20
    },
    {
        id: 10,
        name: "The Originote - Glowing kit",
        price: 225000,
        image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2023/4/1/84a53e10-ac06-46dc-92bd-ad0f9603e272.jpg.webp?ect=4g",
        description: "Mengandung Niacinamide, Hyaluronic Acid, Ceramide, dan Vitamin C untuk melembapkan, mencerahkan, dan memperbaiki skin barrier",
        stock: 19
    }
];

let cart = [];

function displayProducts() {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">Rp ${product.price.toLocaleString()}</p>
                <p>${product.description}</p>
                <div class="product-stock">
                    <p><strong>Stok: ${product.stock > 0 ? product.stock : 0}</strong></p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})" ${product.stock <= 0 ? 'disabled' : ''}>
                        ${product.stock > 0 ? 'Tambah ke Keranjang' : 'Habis'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product.stock > 0) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        product.stock -= 1; // Kurangi stok setelah ditambahkan ke keranjang
        updateCartDisplay();
        displayProducts(); // Perbarui tampilan stok produk
    } else {
        alert("Produk sudah habis stok!");
    }
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        const product = products.find(p => p.id === item.id);

        product.stock += item.quantity; // Kembalikan stok produk
        cart.splice(itemIndex, 1); // Hapus dari keranjang
        updateCartDisplay();
        displayProducts(); // Perbarui tampilan stok produk
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);

    if (item && product) {
        if (change > 0 && product.stock > 0) {
            item.quantity += 1;
            product.stock -= 1;
        } else if (change < 0) {
            item.quantity -= 1;
            product.stock += 1;

            if (item.quantity <= 0) {
                removeFromCart(productId);
            }
        }

        updateCartDisplay();
        displayProducts(); // Perbarui tampilan stok produk
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString()}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" ${products.find(p => p.id === item.id).stock <= 0 ? 'disabled' : ''}>+</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rp ${total.toLocaleString()}`;
}

function toggleCart() {
    const cartModal = document.querySelector('.cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

function showPaymentModal() {
    const paymentModal = document.querySelector('.payment-modal');
    paymentModal.style.display = 'block';
}

function closePaymentModal() {
    const paymentModal = document.querySelector('.payment-modal');
    paymentModal.style.display = 'none';
}

function processPayment(method) {
    alert(`Pembayaran dengan ${method} berhasil! Terima kasih telah berbelanja.`);
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    cart = [];
    updateCartDisplay();
    displayProducts(); // Perbarui tampilan stok setelah pembayaran
    closePaymentModal();
    toggleCart();
}

// Initialize the page
displayProducts();
