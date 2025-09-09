/* ========================================
   BEMVIRÁ - JAVASCRIPT PRINCIPAL
   ======================================== */

// ===== CONFIGURAÇÕES =====
const CONFIG = {
    phoneNumber: "5579998494303", // Número sem o +
    defaultMessage: "Olá! Tenho interesse nas peças. Poderia me dar mais informações?"
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
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===== SCROLL SUAVE =====

/**
 * Configura scroll suave para links de navegação
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Ajustar offset baseado no tamanho da tela e scroll
                const screenWidth = window.innerWidth;
                const scrollY = window.scrollY;
                
                let headerOffset;
                if (screenWidth >= 1200) {
                    headerOffset = scrollY > 100 ? 60 : 80;
                } else if (screenWidth >= 992) {
                    headerOffset = scrollY > 100 ? 55 : 75;
                } else if (screenWidth >= 769) {
                    headerOffset = scrollY > 100 ? 50 : 70;
                } else {
                    headerOffset = scrollY > 100 ? 45 : 60;
                }
                
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== HEADER SCROLL EFFECT =====

/**
 * Efeito de mudança de background e tamanho do header no scroll
 */
function initHeaderScrollEffect() {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const header = document.querySelector('header');
        const logo = document.querySelector('.logo');
        const logoImage = document.getElementById('logo-image');
        const navLinks = document.querySelector('.nav-links');
        
        if (!header) return;
        
        const scrollY = window.scrollY;
        const isScrollingDown = scrollY > lastScrollY;
        const isAtTop = scrollY < 10;
        
        // Efeito de background
        if (scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(118, 42, 133, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(118, 42, 133, 0.1)';
        }
        
        // Efeito de tamanho responsivo baseado no scroll
        if (scrollY > 100) {
            // Navbar compacta quando scrollado
            header.style.padding = '0.8rem 0';
            if (logo) logo.style.fontSize = '1.4rem';
            if (logoImage) logoImage.style.width = '1.4em';
            if (navLinks) navLinks.style.gap = '1.5rem';
        } else if (scrollY > 50) {
            // Navbar intermediária
            header.style.padding = '1rem 0';
            if (logo) logo.style.fontSize = '1.6rem';
            if (logoImage) logoImage.style.width = '1.6em';
            if (navLinks) navLinks.style.gap = '1.7rem';
        } else {
            // Navbar normal (tamanho baseado na tela)
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1200) {
                header.style.padding = '1.5rem 0';
                if (logo) logo.style.fontSize = '2rem';
                if (logoImage) logoImage.style.width = '2em';
                if (navLinks) navLinks.style.gap = '2rem';
            } else if (screenWidth >= 992) {
                header.style.padding = '1.2rem 0';
                if (logo) logo.style.fontSize = '1.8rem';
                if (logoImage) logoImage.style.width = '1.8em';
                if (navLinks) navLinks.style.gap = '1.8rem';
            } else if (screenWidth >= 769) {
                header.style.padding = '1rem 0';
                if (logo) logo.style.fontSize = '1.6rem';
                if (logoImage) logoImage.style.width = '1.6em';
                if (navLinks) navLinks.style.gap = '1.5rem';
            } else {
                header.style.padding = '0.8rem 0';
                if (logo) logo.style.fontSize = '1.4rem';
                if (logoImage) logoImage.style.width = '1.4em';
                if (navLinks) navLinks.style.gap = '1.5rem';
            }
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
}

// ===== MENU MOBILE =====

/**
 * Inicializa o menu mobile
 */
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.nav-links-mobile');
    const overlay = document.querySelector('.mobile-menu-overlay');

    if (!mobileMenuButton || !mobileMenu || !overlay) {
        console.warn('Elementos do menu mobile não encontrados');
        return;
    }

    /**
     * Alterna o estado do menu mobile
     */
    function toggleMobileMenu() {
        mobileMenuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Atualizar aria-expanded
        const isExpanded = mobileMenu.classList.contains('active');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
        mobileMenuButton.setAttribute('aria-label', isExpanded ? 'Fechar menu' : 'Abrir menu');
    }

    /**
     * Fecha o menu mobile
     */
    function closeMobileMenu() {
        mobileMenuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenuButton.setAttribute('aria-label', 'Abrir menu');
    }

    // Event listeners
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // Fechar menu ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ===== INICIALIZAÇÃO =====

/**
 * Inicializa todas as funcionalidades quando o DOM estiver pronto
 */
function init() {
    initScrollAnimations();
    initSmoothScroll();
    initHeaderScrollEffect();
    initMobileMenu();
    
    // Carregar carrinho após um pequeno delay para garantir que todos os elementos estejam prontos
    setTimeout(() => {
        loadCartFromStorage();
    }, 200);
    
    // Inicializar seção interativa de limpeza
    setTimeout(() => {
        initCleaningSection();
    }, 300);
    
    console.log('🚀 Bemvirá - Site inicializado com sucesso!');
}

// ===== EXECUÇÃO =====

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== SISTEMA DE MODAL E CARRINHO =====

// Dados dos produtos por categoria
const PRODUCTS_DATA = {
    aneis: {
        title: "Anéis",
        emoji: "💍",
        categoryImage: "img/aneis.png",
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
        categoryImage: "img/alianca.png",
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
        categoryImage: "img/colares.png",
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
        categoryImage: "img/brincos.png",
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
        categoryImage: "img/pulseira.png",
        products: [
            { id: 19, name: "Pulseira Corrente", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 20, name: "Pulseira com Charms", price: "R$ 449,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 21, name: "Pulseira Delicada", price: "R$ 349,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    braceletes: {
        title: "Braceletes",
        emoji: "💎",
        categoryImage: "img/bracelete.png",
        products: [
            { id: 22, name: "Bracelete Entrelaçado", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 23, name: "Bracelete com Pedras", price: "R$ 449,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 24, name: "Bracelete Minimalista", price: "R$ 349,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    pingentes: {
        title: "Pingentes",
        emoji: "🔮",
        categoryImage: "img/pingentes.png",
        products: [
            { id: 25, name: "Pingente Coração", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 26, name: "Pingente Flor", price: "R$ 449,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 27, name: "Pingente Personalizado", price: "R$ 499,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    },
    acessorios: {
        title: "Acessórios",
        emoji: "🔮",
        categoryImage: "img/acessorios.png",
        products: [
            { id: 28, name: "Broche Vintage", price: "R$ 399,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 29, name: "Anel de Cabelo", price: "R$ 199,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" },
            { id: 30, name: "Pulseira de Tornozelo", price: "R$ 299,90", image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png" }
        ]
    }
};

// Carrinho de compras
let cart = [];

// Variáveis para o popup de confirmação
let itemToRemove = null;

// Variáveis para a seção interativa de limpeza
let currentCleaningStep = 1;
const totalCleaningSteps = 5;

/**
 * Carrega o carrinho do localStorage
 */
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('bemvira_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
            cart = [];
        }
    }
}

/**
 * Salva o carrinho no localStorage
 */
function saveCartToStorage() {
    try {
        localStorage.setItem('bemvira_cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Erro ao salvar carrinho:', error);
    }
}

/**
 * Abre o modal de produtos para uma categoria específica
 * @param {string} category - Categoria do produto
 */
function openProductModal(category) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalProductsGrid = document.getElementById('modalProductsGrid');
    
    const categoryData = PRODUCTS_DATA[category];
    if (!categoryData) return;
    
    modalTitle.textContent = `${categoryData.emoji} ${categoryData.title}`;
    
    // Limpar grid anterior
    modalProductsGrid.innerHTML = '';
    
    // Adicionar produtos
    categoryData.products.forEach(product => {
        const productCard = createProductCard(product);
        modalProductsGrid.appendChild(productCard);
    });
    
    // Mostrar modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Cria um card de produto para o modal
 * @param {Object} product - Dados do produto
 * @returns {HTMLElement} - Elemento do card
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card-modal';
    card.innerHTML = `
        <div class="product-image-modal">
            <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
        </div>
        <div class="product-info-modal">
            <h3 class="product-name-modal">${product.name}</h3>
            <div class="product-price-modal">${product.price}</div>
            <div class="product-actions-modal">
                <button class="btn-add-cart" onclick="addToCart(${product.id}, '${product.name}', '${product.price}', '${product.image}')">
                    <i class="fas fa-cart-plus"></i>
                    Adicionar
                </button>
                <button class="btn-whatsapp-modal" onclick="sendToWhatsApp('${product.name}', '${product.price}', '💍')">
                    <i class="fab fa-whatsapp"></i>
                    WhatsApp
                </button>
            </div>
        </div>
    `;
    return card;
}

/**
 * Fecha o modal de produtos
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Adiciona produto ao carrinho
 * @param {number} id - ID do produto
 * @param {string} name - Nome do produto
 * @param {string} price - Preço do produto
 * @param {string} image - Imagem do produto
 */
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    saveCartToStorage();
    updateCartUI();
    showCartNotification();
}

/**
 * Remove produto do carrinho
 * @param {number} id - ID do produto
 */
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCartToStorage();
    updateCartUI();
}

/**
 * Aumenta a quantidade de um produto no carrinho
 * @param {number} id - ID do produto
 */
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        saveCartToStorage();
        updateCartUI();
    }
}

/**
 * Diminui a quantidade de um produto no carrinho
 * @param {number} id - ID do produto
 */
function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
            saveCartToStorage();
            updateCartUI();
        } else {
            // Se quantidade for 1, mostrar popup de confirmação
            showConfirmationModal(item);
        }
    }
}

/**
 * Atualiza a interface do carrinho
 */
function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const cartBody = document.getElementById('cartBody');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    // Verificar se os elementos principais existem
    if (!cartBadge || !cartBody || !cartFooter || !cartTotal) {
        console.error('Elementos principais do carrinho não encontrados:', {
            cartBadge: !!cartBadge,
            cartBody: !!cartBody,
            cartFooter: !!cartFooter,
            cartTotal: !!cartTotal
        });
        return;
    }
    
    // Atualizar badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    if (cart.length === 0) {
        // Carrinho vazio - mostrar mensagem de vazio
        cartFooter.style.display = 'none';
        cartBody.innerHTML = `
            <div class="cart-empty" id="cartEmpty">
                <div class="cart-empty-icon">🛒</div>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
    } else {
        // Carrinho com itens - mostrar produtos
        cartFooter.style.display = 'block';
        
        // Limpar e recriar itens
        cartBody.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            // Calcular preço total do item
            const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            const itemTotal = price * item.quantity;
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">
                        <span class="unit-price">${item.price} cada</span>
                        <span class="total-price">Total: R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="cart-quantity-controls">
                        <button class="cart-quantity-btn" onclick="decreaseQuantity(${item.id})" title="Diminuir quantidade">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="cart-quantity-display">${item.quantity}</span>
                        <button class="cart-quantity-btn" onclick="increaseQuantity(${item.id})" title="Aumentar quantidade">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remover item">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartBody.appendChild(cartItem);
        });
        
        // Calcular total
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            return sum + (price * item.quantity);
        }, 0);
        
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

/**
 * Mostra notificação de item adicionado ao carrinho
 */
function showCartNotification() {
    // Criar notificação temporária
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary-purple), var(--secondary-purple));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(118, 42, 133, 0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = '<i class="fas fa-check"></i> Produto adicionado ao carrinho!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Alterna a exibição do carrinho
 */
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

/**
 * Mostra o popup de confirmação para remoção de item
 * @param {Object} item - Item a ser removido
 */
function showConfirmationModal(item) {
    itemToRemove = item;
    const modal = document.getElementById('confirmationModal');
    const message = document.getElementById('confirmationMessage');
    
    message.textContent = `Tem certeza que deseja remover "${item.name}" do carrinho?`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Adicionar event listeners para fechar o modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeConfirmationModal();
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeConfirmationModal();
        }
    });
}

/**
 * Fecha o popup de confirmação
 */
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    itemToRemove = null;
}

/**
 * Confirma a remoção do item
 */
function confirmRemoveItem() {
    if (itemToRemove) {
        removeFromCart(itemToRemove.id);
        closeConfirmationModal();
    }
}

// ===== SEÇÃO INTERATIVA DE LIMPEZA =====

/**
 * Avança para o próximo passo da limpeza
 */
function nextStep() {
    if (currentCleaningStep < totalCleaningSteps) {
        currentCleaningStep++;
        updateCleaningStep();
    } else {
        // Mostrar resultado final
        showCleaningResult();
    }
}

/**
 * Volta para o passo anterior da limpeza
 */
function previousStep() {
    if (currentCleaningStep > 1) {
        currentCleaningStep--;
        updateCleaningStep();
    }
}

/**
 * Atualiza a exibição do passo atual
 */
function updateCleaningStep() {
    // Esconder todos os passos
    document.querySelectorAll('.cleaning-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Mostrar passo atual
    const currentStepElement = document.querySelector(`[data-step="${currentCleaningStep}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Atualizar indicador desktop
    const currentStepEl = document.getElementById('currentStep');
    if (currentStepEl) {
        currentStepEl.textContent = currentCleaningStep;
    }
    
    // Atualizar indicador mobile
    const mobileCurrentStepEl = document.getElementById('mobileCurrentStep');
    if (mobileCurrentStepEl) {
        mobileCurrentStepEl.textContent = currentCleaningStep;
    }
    
    // Atualizar botões tradicionais (desktop)
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    
    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentCleaningStep === 1;
        
        if (currentCleaningStep === totalCleaningSteps) {
            nextBtn.innerHTML = 'Finalizar <i class="fas fa-check"></i>';
        } else {
            nextBtn.innerHTML = 'Próximo <i class="fas fa-chevron-right"></i>';
        }
    }
    
    // Atualizar setas laterais (mobile)
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    
    if (arrowLeft && arrowRight) {
        arrowLeft.disabled = currentCleaningStep === 1;
        
        if (currentCleaningStep === totalCleaningSteps) {
            arrowRight.innerHTML = '<i class="fas fa-check"></i>';
        } else {
            arrowRight.innerHTML = '<i class="fas fa-chevron-right"></i>';
        }
    }
    
    // Esconder resultado se estiver visível
    const result = document.getElementById('cleaningResult');
    if (result) {
        result.style.display = 'none';
    }
}

/**
 * Mostra o resultado final da limpeza
 */
function showCleaningResult() {
    // Esconder container de passos
    document.querySelector('.cleaning-steps-container').style.display = 'none';
    
    // Esconder controles desktop
    const desktopControls = document.querySelector('.cleaning-controls');
    if (desktopControls) {
        desktopControls.style.display = 'none';
    }
    
    // Esconder setas mobile
    const mobileArrows = document.querySelector('.mobile-arrows');
    if (mobileArrows) {
        mobileArrows.style.display = 'none';
    }
    
    // Mostrar resultado
    const result = document.getElementById('cleaningResult');
    if (result) {
        result.style.display = 'block';
    }
}

/**
 * Reinicia o tutorial de limpeza
 */
function restartCleaning() {
    currentCleaningStep = 1;
    
    // Mostrar container de passos
    document.querySelector('.cleaning-steps-container').style.display = 'block';
    
    // Verificar se está em mobile ou desktop
    const isMobile = window.innerWidth <= 768;
    const desktopControls = document.querySelector('.cleaning-controls');
    const mobileArrows = document.querySelector('.mobile-arrows');
    
    if (isMobile) {
        // Mobile: mostrar apenas setas, esconder controles desktop
        if (desktopControls) {
            desktopControls.style.display = 'none';
        }
        if (mobileArrows) {
            mobileArrows.style.display = 'block';
        }
    } else {
        // Desktop: mostrar apenas controles, esconder setas mobile
        if (desktopControls) {
            desktopControls.style.display = 'flex';
        }
        if (mobileArrows) {
            mobileArrows.style.display = 'none';
        }
    }
    
    // Esconder resultado
    const result = document.getElementById('cleaningResult');
    if (result) {
        result.style.display = 'none';
    }
    
    // Atualizar para o primeiro passo
    updateCleaningStep();
}

/**
 * Inicializa a seção interativa de limpeza
 */
function initCleaningSection() {
    // Verificar se os elementos existem
    const cleaningContainer = document.querySelector('.cleaning-steps-container');
    const controls = document.querySelector('.cleaning-controls');
    const result = document.getElementById('cleaningResult');
    const mobileArrows = document.querySelector('.mobile-arrows');
    
    if (!cleaningContainer || !controls || !result) {
        console.warn('Elementos da seção de limpeza não encontrados');
        return;
    }
    
    // Configurar estado inicial
    currentCleaningStep = 1;
    
    // Configurar navegação baseada no tamanho da tela
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile: mostrar apenas setas, esconder controles desktop
        if (controls) {
            controls.style.display = 'none';
        }
        if (mobileArrows) {
            mobileArrows.style.display = 'block';
        }
    } else {
        // Desktop: mostrar apenas controles, esconder setas mobile
        if (controls) {
            controls.style.display = 'flex';
        }
        if (mobileArrows) {
            mobileArrows.style.display = 'none';
        }
    }
    
    updateCleaningStep();
    
    // Adicionar suporte a gestos touch para mobile
    initTouchGestures(cleaningContainer);
    
    // Adicionar suporte a navegação por teclado
    initKeyboardNavigation();
    
    // Adicionar listener para redimensionamento da janela
    window.addEventListener('resize', function() {
        const mobileArrows = document.querySelector('.mobile-arrows');
        const desktopControls = document.querySelector('.cleaning-controls');
        const result = document.getElementById('cleaningResult');
        
        // Só ajustar se não estiver mostrando o resultado
        if (result && result.style.display !== 'block') {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // Mobile: mostrar apenas setas, esconder controles desktop
                if (desktopControls) {
                    desktopControls.style.display = 'none';
                }
                if (mobileArrows) {
                    mobileArrows.style.display = 'block';
                }
            } else {
                // Desktop: mostrar apenas controles, esconder setas mobile
                if (desktopControls) {
                    desktopControls.style.display = 'flex';
                }
                if (mobileArrows) {
                    mobileArrows.style.display = 'none';
                }
            }
        }
    });
    
    console.log('🧽 Seção interativa de limpeza inicializada');
}

/**
 * Inicializa gestos touch para navegação em mobile
 */
function initTouchGestures(container) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    // Detectar se é dispositivo touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) return;
    
    container.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    container.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Verificar se é um swipe horizontal significativo
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                // Swipe para direita - passo anterior
                if (currentCleaningStep > 1) {
                    previousStep();
                }
            } else {
                // Swipe para esquerda - próximo passo
                if (currentCleaningStep < totalCleaningSteps) {
                    nextStep();
                } else {
                    showCleaningResult();
                }
            }
        }
    }
}

/**
 * Inicializa navegação por teclado
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Só funciona se a seção de limpeza estiver visível
        const cleaningSection = document.querySelector('.limpeza-interactive-card');
        if (!cleaningSection || !isElementInViewport(cleaningSection)) {
            return;
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                if (currentCleaningStep > 1) {
                    previousStep();
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                if (currentCleaningStep < totalCleaningSteps) {
                    nextStep();
                } else {
                    showCleaningResult();
                }
                break;
            case 'Home':
                e.preventDefault();
                currentCleaningStep = 1;
                updateCleaningStep();
                break;
            case 'End':
                e.preventDefault();
                showCleaningResult();
                break;
        }
    });
}

/**
 * Verifica se um elemento está visível na viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Finaliza a compra no WhatsApp
 */
function checkoutCart() {
    if (cart.length === 0) return;
    
    let message = '🛒 *Pedido da Bemvirá*\n\n';
    message += 'Olá! Gostaria de finalizar o seguinte pedido:\n\n';
    
    let total = 0;
    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        
        message += `${index + 1}. ${item.name}\n`;
        message += `   Preço: ${item.price} x${item.quantity} = R$ ${itemTotal.toFixed(2).replace('.', ',')}\n\n`;
    });
    
    message += `💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    message += 'Por favor, confirme a disponibilidade e me informe sobre o prazo de entrega.';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Limpar carrinho após envio
    cart = [];
    saveCartToStorage();
    updateCartUI();
    toggleCart();
}

// ===== FUNÇÃO DE TESTE =====

/**
 * Função para testar se os elementos do carrinho estão sendo encontrados
 */
function testCartElements() {
    const elements = {
        cartBadge: document.getElementById('cartBadge'),
        cartBody: document.getElementById('cartBody'),
        cartFooter: document.getElementById('cartFooter'),
        cartTotal: document.getElementById('cartTotal')
    };
    
    console.log('Teste dos elementos principais do carrinho:', elements);
    return elements;
}

// ===== EXPORT PARA USO GLOBAL =====

// Tornar funções disponíveis globalmente se necessário
window.sendToWhatsApp = sendToWhatsApp;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.toggleCart = toggleCart;
window.checkoutCart = checkoutCart;
window.testCartElements = testCartElements;
window.showConfirmationModal = showConfirmationModal;
window.closeConfirmationModal = closeConfirmationModal;
window.confirmRemoveItem = confirmRemoveItem;
window.nextStep = nextStep;
window.previousStep = previousStep;
window.restartCleaning = restartCleaning;
