/* ========================================
   BEMVIRÁ - JAVASCRIPT PRINCIPAL
   ======================================== */

// ===== CONFIGURAÇÕES =====
const CONFIG = {
    phoneNumber: "5579998494303", // Número sem o +
    defaultMessage: "Olá! Tenho interesse nas peças. Poderia me dar mais informações?"
};

// ===== DADOS DOS PRODUTOS =====
const PRODUCTS_DATA = {
    aneis: {
        title: "Anéis",
        emoji: "💍",
        products: [
            { id: 1, name: "Anel Coração com Pedras", price: "R$ 189,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 2, name: "Anel Solitário Prata", price: "R$ 220,00", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 3, name: "Anel Entrelaçado", price: "R$ 199,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 4, name: "Anel Flor de Lis", price: "R$ 249,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 5, name: "Anel Minimalista", price: "R$ 179,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 6, name: "Anel Vintage", price: "R$ 299,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    aliancas: {
        title: "Alianças",
        emoji: "💍",
        products: [
            { id: 7, name: "Aliança Clássica", price: "R$ 249,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 8, name: "Aliança com Diamantes", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 9, name: "Aliança Entrelaçada", price: "R$ 299,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 10, name: "Aliança Personalizada", price: "R$ 349,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    colares: {
        title: "Colares",
        emoji: "📿",
        products: [
            { id: 11, name: "Colar Corrente Delicada", price: "R$ 199,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 12, name: "Colar com Pingente", price: "R$ 249,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 13, name: "Colar Choker", price: "R$ 179,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 14, name: "Colar Longo", price: "R$ 299,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    brincos: {
        title: "Brincos",
        emoji: "💎",
        products: [
            { id: 15, name: "Brincos Argola", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 16, name: "Brincos com Pedras", price: "R$ 449,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 17, name: "Brincos Minimalistas", price: "R$ 349,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 18, name: "Brincos Vintage", price: "R$ 499,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    pulseiras: {
        title: "Pulseiras",
        emoji: "💎",
        products: [
            { id: 19, name: "Pulseira Corrente", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 20, name: "Pulseira com Charms", price: "R$ 449,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 21, name: "Pulseira Delicada", price: "R$ 349,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    braceletes: {
        title: "Braceletes",
        emoji: "💎",
        products: [
            { id: 22, name: "Bracelete Entrelaçado", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 23, name: "Bracelete com Pedras", price: "R$ 449,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 24, name: "Bracelete Minimalista", price: "R$ 349,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    pingentes: {
        title: "Pingentes",
        emoji: "🔮",
        products: [
            { id: 25, name: "Pingente Coração", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 26, name: "Pingente Flor", price: "R$ 449,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 27, name: "Pingente Personalizado", price: "R$ 499,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    acessorios: {
        title: "Acessórios",
        emoji: "🔮",
        products: [
            { id: 28, name: "Broche Vintage", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 29, name: "Anel de Cabelo", price: "R$ 199,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 30, name: "Pulseira de Tornozelo", price: "R$ 299,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    }
};

// ===== FUNÇÕES PRINCIPAIS =====

/**
 * Envia mensagem para WhatsApp
 * @param {string} productName - Nome do produto
 * @param {string} price - Preço do produto
 * @param {string} emoji - Emoji do produto
 * @param {string} customMessage - Mensagem personalizada (opcional)
 */
function sendToWhatsApp(productName, price, emoji, customMessage = null) {
    let message;
    
    if (customMessage) {
        message = customMessage;
    } else if (productName && price && emoji) {
        message = `Olá! Tenho interesse na peça: ${emoji} ${productName} - ${price}. Poderia me dar mais informações?`;
    } else {
        message = CONFIG.defaultMessage;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ===== ANIMAÇÕES DE SCROLL =====

/**
 * Configuração do Intersection Observer para animações
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

/**
 * Inicializa as animações de scroll
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up');
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ===== MODAL DE PRODUTOS =====

/**
 * Abre o modal com os produtos de uma categoria
 * @param {string} categoryId - ID da categoria
 */
function openProductModal(categoryId) {
    const category = PRODUCTS_DATA[categoryId];
    if (!category) return;

    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = `${category.emoji} ${category.title}`;
    modalContent.innerHTML = '';

    category.products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card-modal';
        productCard.innerHTML = `
            <div class="product-image-modal">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
            </div>
            <div class="product-info-modal">
                <h3>${product.name}</h3>
                <div class="product-price-modal">${product.price}</div>
                <button class="whatsapp-btn-modal" onclick="sendToWhatsApp('${product.name}', '${product.price}', '${category.emoji}')">
                    <i class="fab fa-whatsapp"></i>
                    Entrar em Contato
                </button>
            </div>
        `;
        modalContent.appendChild(productCard);
    });

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Fecha o modal de produtos
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ===== INICIALIZAÇÃO =====

/**
 * Carrega os produtos na tela
 */
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) {
        console.error('❌ Elemento products-grid não encontrado');
        return;
    }

    console.log('🔄 Carregando produtos...');
    console.log('📊 Categorias disponíveis:', Object.keys(PRODUCTS_DATA));
    
    productsGrid.innerHTML = '';

    Object.keys(PRODUCTS_DATA).forEach(categoryId => {
        const category = PRODUCTS_DATA[categoryId];
        if (category.products && category.products.length > 0) {
            // Calcular preço mínimo
            const prices = category.products.map(p => parseFloat(p.price.replace('R$ ', '').replace(',', '.')));
            const minPrice = Math.min(...prices);
            const formattedPrice = `R$ ${minPrice.toFixed(2).replace('.', ',')}`;

            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            card.onclick = () => openProductModal(categoryId);
            card.innerHTML = `
                <div class="product-image" data-emoji="${category.emoji}">
                    <img src="https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" alt="${category.title}" onerror="this.style.display='none'">
                </div>
                <div class="product-info">
                    <h3>${category.title}</h3>
                    <div class="product-price">A partir de ${formattedPrice}</div>
                    <a href="#" class="whatsapp-btn" onclick="event.stopPropagation(); openProductModal('${categoryId}')">
                        <i class="fas fa-eye"></i>
                        Ver Produtos
                    </a>
                </div>
            `;
            productsGrid.appendChild(card);
            console.log(`✅ Card criado para categoria: ${category.title}`);
        }
    });

    console.log(`🎨 Total de cards criados: ${productsGrid.children.length}`);
    
    // Re-inicializar animações para os novos elementos
    initScrollAnimations();
}

/**
 * Inicializa o site
 */
function init() {
    console.log('🚀 Bemvirá - Site inicializado com sucesso!');
    
    // Carregar produtos
    loadProducts();
    
    // Inicializar animações
    initScrollAnimations();
    
    // Configurar event listeners
    setupEventListeners();
}

/**
 * Configura os event listeners
 */
function setupEventListeners() {
    // Fechar modal ao clicar fora
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('productModal');
        if (event.target === modal) {
            closeProductModal();
        }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeProductModal();
        }
    });
}

// ===== FUNÇÃO DE DEBUG =====
function debugProducts() {
    console.log('🔍 === DEBUG PRODUTOS ===');
    console.log('📊 Dados dos produtos:', PRODUCTS_DATA);
    console.log('🎯 Elemento products-grid:', document.getElementById('products-grid'));
    console.log('📝 Total de categorias:', Object.keys(PRODUCTS_DATA).length);
    
    Object.keys(PRODUCTS_DATA).forEach(categoryId => {
        const category = PRODUCTS_DATA[categoryId];
        console.log(`📦 ${categoryId}: ${category.title} (${category.products.length} produtos)`);
    });
}

// ===== INICIALIZAÇÃO AUTOMÁTICA =====
document.addEventListener('DOMContentLoaded', init);

// Expor função de debug globalmente
window.debugProducts = debugProducts;