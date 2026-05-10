const products = [
    // Niños
    { id: 1, title: "Conjunto Buzo Infantil Nike", category: "niños", price: 0, image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&q=80&w=800" },
    { id: 2, title: "Zapatillas Adidas Kids", category: "niños", price: 0, image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800" },
    { id: 3, title: "Polera Algodón Estampada", category: "niños", price: 0, image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=800" },
    // Mujer
    { id: 4, title: "Vestido Zara Noche", category: "mujer", price: 0, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Blusa Seda Mango", category: "mujer", price: 0, image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=800" },
    { id: 6, title: "Pantalón Wide Leg H&M", category: "mujer", price: 0, image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=800" },
    // Bolsos
    { id: 7, title: "Cartera Cuero Aldo", category: "bolsos", price: 0, image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800" },
    { id: 8, title: "Mochila Urbana Guess", category: "bolsos", price: 0, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800" },
    { id: 9, title: "Bolso de Mano Michael Kors", category: "bolsos", price: 0, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800" },
    // Hombre
    { id: 10, title: "Camisa Oxford Polo", category: "hombre", price: 0, image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e98?auto=format&fit=crop&q=80&w=800" },
    { id: 11, title: "Jeans Levi's 501", category: "hombre", price: 0, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800" },
    { id: 12, title: "Chaqueta Cuero Diesel", category: "hombre", price: 0, image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800" },
    // Hogar
    { id: 13, title: "Set de Vasos Cristal", category: "hogar", price: 0, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" },
    { id: 14, title: "Lámpara de Mesa Nórdica", category: "hogar", price: 0, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800" },
    { id: 15, title: "Cojín Decorativo", category: "hogar", price: 0, image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800" }
];

const productGrid = document.getElementById('productGrid');
const cartCountElement = document.querySelector('.cart-count');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartIcon = document.getElementById('cartIcon');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalValue = document.getElementById('cartTotalValue');
const categoryNavLinks = document.querySelectorAll('#categoryNav a[data-category]');

let cart = [];

// Formatear precio a CLP
function formatPrice(price) {
    if (price === 0) return "Precio pendiente";
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 0
    }).format(price);
}

// Render products dynamically based on array
function renderProducts(productsToRender) {
    productGrid.innerHTML = ''; // Limpiar grilla

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-light);">No hay productos en esta categoría.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <span class="product-price">${formatPrice(product.price)}</span>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Agregar al carrito</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Category Filtering Logic
categoryNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Quitar clase active de todos
        categoryNavLinks.forEach(nav => nav.classList.remove('active'));
        // Agregar a este
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-category');

        if (category === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === category);
            renderProducts(filtered);
        }
    });
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    // Verificar si ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    // Animación pequeña en el icono
    cartCountElement.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 200);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Renderizar items
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); margin-top: 2rem;">Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="item-details">
                    <h4>${item.title}</h4>
                    <span class="item-price">${formatPrice(item.price)} x ${item.quantity}</span>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Actualizar total
    cartTotalValue.textContent = formatPrice(totalPrice);
}

// Controlar apertura/cierre del carrito
function toggleCart(e) {
    if (e) e.preventDefault();
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

cartIcon.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Iniciar renderizado con todos los productos al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartUI();
});
