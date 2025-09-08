/* ========================================
   BEMVIRÁ - ADMIN JAVASCRIPT
   ======================================== */

// Variáveis globais
let currentUser = null;
let products = [];
let categories = [];
let settings = {};
let currentEditingProduct = null;
let currentEditingCategory = null;

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
});

function initializeAdmin() {
    // Verificar se as configurações estão carregadas
    if (typeof ADMIN_CONFIG === 'undefined' || typeof STORAGE_CONFIG === 'undefined') {
        console.error('❌ Configurações não carregadas! Verifique se o arquivo config.js está sendo carregado.');
        alert('Erro: Configurações não carregadas. Verifique se o arquivo config.js existe.');
        return;
    }
    
    // Verificar se há sessão ativa
    checkSession();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Carregar dados iniciais
    loadInitialData();
    
    console.log('🚀 Admin Bemvirá inicializado!');
}

// ===== AUTENTICAÇÃO =====
function checkSession() {
    const session = getSession();
    if (session && session.isValid) {
        const now = new Date().getTime();
        if (now < session.expiresAt) {
            currentUser = session.user;
            showDashboard();
            return;
        }
    }
    
    // Sessão inválida ou expirada
    clearSession();
    showLogin();
}

function showLogin() {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('adminDashboard').classList.remove('hidden');
    loadDashboardData();
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navigation tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });
    
    // Product management
    document.getElementById('addProductBtn').addEventListener('click', () => openProductModal());
    document.getElementById('addCategoryBtn').addEventListener('click', () => openCategoryModal());
    
    // Modal controls
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Product form
    document.getElementById('productForm').addEventListener('submit', handleProductSubmit);
    
    // Category form
    document.getElementById('categoryForm').addEventListener('submit', handleCategorySubmit);
    
    // Settings form
    document.getElementById('storeSettingsForm').addEventListener('submit', handleSettingsSubmit);
    
    // Backup/Export
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('importDataBtn').addEventListener('click', () => document.getElementById('importFile').click());
    document.getElementById('importFile').addEventListener('change', handleImport);
    
    // Debug/Sync
    document.getElementById('forceSyncBtn').addEventListener('click', forceSyncWithMainSite);
    document.getElementById('debugDataBtn').addEventListener('click', debugData);
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });
}

// ===== LOGIN HANDLING =====
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    // Verificar credenciais
    if (username === ADMIN_CONFIG.username && password === ADMIN_CONFIG.password) {
        // Login bem-sucedido
        currentUser = { username, loginTime: new Date().getTime() };
        createSession(currentUser);
        showDashboard();
        errorDiv.style.display = 'none';
        
        // Limpar formulário
        document.getElementById('loginForm').reset();
    } else {
        // Login falhou
        errorDiv.classList.remove('hidden');
        document.getElementById('password').value = '';
        
        // Esconder erro após 3 segundos
        setTimeout(() => {
            errorDiv.classList.add('hidden');
        }, 3000);
    }
}

function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        clearSession();
        currentUser = null;
        showLogin();
    }
}

// ===== SESSION MANAGEMENT =====
function createSession(user) {
    const session = {
        user: user,
        isValid: true,
        expiresAt: new Date().getTime() + ADMIN_CONFIG.sessionTimeout
    };
    
    localStorage.setItem(STORAGE_CONFIG.sessionKey, JSON.stringify(session));
}

function getSession() {
    const sessionData = localStorage.getItem(STORAGE_CONFIG.sessionKey);
    return sessionData ? JSON.parse(sessionData) : null;
}

function clearSession() {
    localStorage.removeItem(STORAGE_CONFIG.sessionKey);
}

// ===== NAVIGATION =====
function switchTab(tabName) {
    // Atualizar navegação
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Atualizar conteúdo
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}Tab`).classList.add('active');
    
    // Carregar dados específicos da aba
    switch(tabName) {
        case 'products':
            loadProducts();
            break;
        case 'categories':
            loadCategories();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// ===== DATA MANAGEMENT =====
function loadInitialData() {
    // Carregar produtos
    const savedProducts = localStorage.getItem(STORAGE_CONFIG.productsKey);
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        products = [...DEFAULT_PRODUCTS];
        saveProducts();
    }
    
    // Carregar categorias
    const savedCategories = localStorage.getItem(STORAGE_CONFIG.categoriesKey);
    if (savedCategories) {
        categories = JSON.parse(savedCategories);
    } else {
        categories = [...DEFAULT_CATEGORIES];
        saveCategories();
    }
    
    // Carregar configurações
    const savedSettings = localStorage.getItem(STORAGE_CONFIG.settingsKey);
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    } else {
        settings = { ...ADMIN_CONFIG.store };
        saveSettings();
    }
}

function loadDashboardData() {
    loadProducts();
    loadCategories();
    loadSettings();
}

function saveProducts() {
    localStorage.setItem(STORAGE_CONFIG.productsKey, JSON.stringify(products));
    // Sincronizar com o site principal
    syncWithMainSite();
}

function saveCategories() {
    localStorage.setItem(STORAGE_CONFIG.categoriesKey, JSON.stringify(categories));
}

function saveSettings() {
    localStorage.setItem(STORAGE_CONFIG.settingsKey, JSON.stringify(settings));
}

// ===== PRODUCT MANAGEMENT =====
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="loading">
                <p>Nenhum produto encontrado. <button onclick="openProductModal()" class="btn-primary">Adicionar primeiro produto</button></p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = products.map(product => {
        const category = categories.find(cat => cat.id === product.category);
        const stockStatus = getStockStatus(product.stock);
        
        return `
            <div class="product-card">
                <div class="product-header">
                    <div>
                        <div class="product-emoji">${product.emoji || '💍'}</div>
                        <div class="product-category">${category ? category.name : 'Sem categoria'}</div>
                    </div>
                    <div class="product-actions">
                        <button class="btn-success" onclick="editProduct(${product.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-danger" onclick="deleteProduct(${product.id})" title="Excluir">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                <div class="product-description">${product.description || 'Sem descrição'}</div>
                <div class="product-stock ${stockStatus.class}">
                    Estoque: ${product.stock} unidades
                </div>
            </div>
        `;
    }).join('');
}

function getStockStatus(stock) {
    if (stock === 0) {
        return { class: 'out', text: 'Sem estoque' };
    } else if (stock <= 5) {
        return { class: 'low', text: 'Estoque baixo' };
    } else {
        return { class: '', text: 'Em estoque' };
    }
}

function openProductModal(productId = null) {
    currentEditingProduct = productId;
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('modalTitle');
    
    // Limpar formulário
    form.reset();
    
    // Preencher categorias
    const categorySelect = document.getElementById('productCategory');
    categorySelect.innerHTML = '<option value="">Selecione uma categoria</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
    
    if (productId) {
        // Modo edição
        const product = products.find(p => p.id === productId);
        if (product) {
            title.textContent = 'Editar Produto';
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productEmoji').value = product.emoji || '';
            document.getElementById('productImage').value = product.image || '';
            document.getElementById('productDescription').value = product.description || '';
            document.getElementById('productStock').value = product.stock || 0;
        }
    } else {
        // Modo adição
        title.textContent = 'Adicionar Produto';
    }
    
    modal.classList.add('active');
}

function handleProductSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const productData = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        emoji: formData.get('emoji') || '💍',
        image: formData.get('image') || '',
        description: formData.get('description') || '',
        stock: parseInt(formData.get('stock')) || 0
    };
    
    if (currentEditingProduct) {
        // Editar produto existente
        const index = products.findIndex(p => p.id === currentEditingProduct);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            showSuccessMessage('Produto atualizado com sucesso!');
        }
    } else {
        // Adicionar novo produto
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        products.push({ id: newId, ...productData });
        showSuccessMessage('Produto adicionado com sucesso!');
    }
    
    saveProducts();
    loadProducts();
    closeAllModals();
}

function editProduct(productId) {
    openProductModal(productId);
}

function deleteProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product && confirm(`Tem certeza que deseja excluir o produto "${product.name}"?`)) {
        products = products.filter(p => p.id !== productId);
        saveProducts();
        loadProducts();
        showSuccessMessage('Produto excluído com sucesso!');
    }
}

// ===== CATEGORY MANAGEMENT =====
function loadCategories() {
    const categoriesGrid = document.querySelector('.categories-grid');
    if (!categoriesGrid) return;
    
    if (categories.length === 0) {
        categoriesGrid.innerHTML = `
            <div class="loading">
                <p>Nenhuma categoria encontrada. <button onclick="openCategoryModal()" class="btn-primary">Adicionar primeira categoria</button></p>
            </div>
        `;
        return;
    }
    
    categoriesGrid.innerHTML = categories.map(category => {
        const productCount = products.filter(p => p.category === category.id).length;
        
        return `
            <div class="category-card">
                <div class="category-emoji">${category.emoji || '💍'}</div>
                <div class="category-name">${category.name}</div>
                <div class="category-description">${category.description || 'Sem descrição'}</div>
                <div class="category-stats">${productCount} produto(s)</div>
                <div class="category-actions">
                    <button class="btn-success" onclick="editCategory('${category.id}')" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-danger" onclick="deleteCategory('${category.id}')" title="Excluir">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function openCategoryModal(categoryId = null) {
    currentEditingCategory = categoryId;
    const modal = document.getElementById('categoryModal');
    const form = document.getElementById('categoryForm');
    const title = document.getElementById('categoryModalTitle');
    
    // Limpar formulário
    form.reset();
    
    if (categoryId) {
        // Modo edição
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            title.textContent = 'Editar Categoria';
            document.getElementById('categoryName').value = category.name;
            document.getElementById('categoryEmoji').value = category.emoji || '';
            document.getElementById('categoryDescription').value = category.description || '';
        }
    } else {
        // Modo adição
        title.textContent = 'Adicionar Categoria';
    }
    
    modal.classList.add('active');
}

function handleCategorySubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const categoryData = {
        name: formData.get('name'),
        emoji: formData.get('emoji') || '💍',
        description: formData.get('description') || ''
    };
    
    if (currentEditingCategory) {
        // Editar categoria existente
        const index = categories.findIndex(c => c.id === currentEditingCategory);
        if (index !== -1) {
            categories[index] = { ...categories[index], ...categoryData };
            showSuccessMessage('Categoria atualizada com sucesso!');
        }
    } else {
        // Adicionar nova categoria
        const newId = 'cat_' + Date.now();
        categories.push({ id: newId, ...categoryData });
        showSuccessMessage('Categoria adicionada com sucesso!');
    }
    
    saveCategories();
    loadCategories();
    closeAllModals();
}

function editCategory(categoryId) {
    openCategoryModal(categoryId);
}

function deleteCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    const productCount = products.filter(p => p.category === categoryId).length;
    
    if (productCount > 0) {
        alert(`Não é possível excluir esta categoria pois ela possui ${productCount} produto(s) associado(s).`);
        return;
    }
    
    if (category && confirm(`Tem certeza que deseja excluir a categoria "${category.name}"?`)) {
        categories = categories.filter(c => c.id !== categoryId);
        saveCategories();
        loadCategories();
        showSuccessMessage('Categoria excluída com sucesso!');
    }
}

// ===== SETTINGS MANAGEMENT =====
function loadSettings() {
    document.getElementById('storeName').value = settings.name || '';
    document.getElementById('storeDescription').value = settings.description || '';
    document.getElementById('storePhone').value = settings.phone || '';
    document.getElementById('storeEmail').value = settings.email || '';
}

function handleSettingsSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    settings = {
        name: formData.get('storeName'),
        description: formData.get('storeDescription'),
        phone: formData.get('storePhone'),
        email: formData.get('storeEmail')
    };
    
    saveSettings();
    showSuccessMessage('Configurações salvas com sucesso!');
}

// ===== BACKUP & EXPORT =====
function exportData() {
    const data = {
        products: products,
        categories: categories,
        settings: settings,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bemvira-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccessMessage('Dados exportados com sucesso!');
}

function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            
            if (confirm('Isso irá substituir todos os dados atuais. Tem certeza?')) {
                if (data.products) products = data.products;
                if (data.categories) categories = data.categories;
                if (data.settings) settings = data.settings;
                
                saveProducts();
                saveCategories();
                saveSettings();
                loadDashboardData();
                
                showSuccessMessage('Dados importados com sucesso!');
            }
        } catch (error) {
            alert('Erro ao importar arquivo. Verifique se é um arquivo JSON válido.');
        }
    };
    reader.readAsText(file);
    
    // Limpar input
    e.target.value = '';
}

// ===== UTILITY FUNCTIONS =====
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    currentEditingProduct = null;
    currentEditingCategory = null;
}

function showSuccessMessage(message) {
    // Remover mensagens anteriores
    document.querySelectorAll('.success-message').forEach(msg => msg.remove());
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    
    const main = document.querySelector('.admin-main');
    main.insertBefore(successDiv, main.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// ===== SYNC WITH MAIN SITE =====
async function syncWithMainSite() {
    // Criar um objeto com a estrutura esperada pelo site principal
    const productsData = {};
    
    categories.forEach(category => {
        const categoryProducts = products.filter(p => p.category === category.id);
        productsData[category.id] = {
            title: category.name,
            emoji: category.emoji || '💍',
            products: categoryProducts.map(product => ({
                id: product.id,
                name: product.name,
                price: `R$ ${product.price.toFixed(2).replace('.', ',')}`,
                image: product.image || "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png"
            }))
        };
    });
    
    // Salvar no GitHub (sincronização automática)
    try {
        if (typeof saveProductsToGitHub === 'function') {
            const result = await saveProductsToGitHub(productsData);
            
            if (result.success) {
                console.log('🔄 Dados sincronizados com o GitHub');
                console.log('📊 Categorias:', categories.length);
                console.log('📦 Produtos:', products.length);
                console.log('💾 Dados salvos:', Object.keys(productsData));
                console.log('🔗 Commit:', result.commit);
                
                showGitHubSyncSuccess(result.commit);
            } else {
                console.error('❌ Erro ao salvar no GitHub:', result.error);
                showGitHubSyncError(result.error);
            }
        } else {
            // Fallback para localStorage se GitHub não estiver configurado
            localStorage.setItem('bemvira_products_data', JSON.stringify(productsData));
            console.log('🔄 Dados sincronizados com o localStorage (GitHub não configurado)');
            showSyncInstructions();
        }
    } catch (error) {
        console.error('❌ Erro na sincronização:', error);
        showGitHubSyncError(error.message);
    }
}

// Função para mostrar sucesso da sincronização GitHub
function showGitHubSyncSuccess(commitUrl) {
    const successMessage = `
        <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 15px; margin: 10px 0;">
            <h4 style="color: #2e7d32; margin: 0 0 10px 0;">✅ Dados Sincronizados com GitHub!</h4>
            <p style="margin: 0 0 10px 0; color: #2e7d32;">
                Os dados foram salvos automaticamente no repositório GitHub.
            </p>
            <p style="margin: 0; color: #2e7d32;">
                <a href="${commitUrl}" target="_blank" style="color: #2e7d32; text-decoration: underline;">
                    🔗 Ver commit no GitHub
                </a>
            </p>
        </div>
    `;
    
    showTemporaryMessage(successMessage, 'github-sync-success');
}

// Função para mostrar erro da sincronização GitHub
function showGitHubSyncError(error) {
    const errorMessage = `
        <div style="background: #ffebee; border: 1px solid #f44336; border-radius: 8px; padding: 15px; margin: 10px 0;">
            <h4 style="color: #c62828; margin: 0 0 10px 0;">❌ Erro na Sincronização GitHub</h4>
            <p style="margin: 0 0 10px 0; color: #c62828;">
                Erro: ${error}
            </p>
            <p style="margin: 0; color: #c62828;">
                Verifique as configurações do GitHub em github-config.js
            </p>
        </div>
    `;
    
    showTemporaryMessage(errorMessage, 'github-sync-error');
}

// Função para mostrar instruções de sincronização (fallback localStorage)
function showSyncInstructions() {
    const instructions = `
        <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 8px; padding: 15px; margin: 10px 0;">
            <h4 style="color: #2e7d32; margin: 0 0 10px 0;">🔄 Dados Sincronizados!</h4>
            <p style="margin: 0 0 10px 0; color: #2e7d32;">
                Os dados foram salvos no localStorage. Para sincronizar com outros dispositivos:
            </p>
            <ol style="margin: 0; padding-left: 20px; color: #2e7d32;">
                <li>Use o botão "Exportar Dados" para baixar um arquivo JSON</li>
                <li>No outro dispositivo, use "Importar Dados" para carregar o arquivo</li>
                <li>Ou copie os dados do console e cole no outro dispositivo</li>
            </ol>
        </div>
    `;
    
    showTemporaryMessage(instructions, 'sync-instructions');
}

// Função auxiliar para mostrar mensagens temporárias
function showTemporaryMessage(message, id) {
    // Remover mensagem existente
    const existingMessage = document.getElementById(id);
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.id = id;
    messageDiv.innerHTML = message;
    
    const dashboard = document.getElementById('adminDashboard');
    if (dashboard) {
        dashboard.insertBefore(messageDiv, dashboard.firstChild);
        
        // Remover após 10 segundos
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 10000);
    }
}

// Função para forçar sincronização (útil para debug)
function forceSyncWithMainSite() {
    syncWithMainSite();
    console.log('🔄 Sincronização forçada executada');
}

// Tornar função disponível globalmente para debug
window.forceSyncWithMainSite = forceSyncWithMainSite;

// Função para debug dos dados
function debugData() {
    console.log('🔍 === DEBUG DOS DADOS ===');
    console.log('📊 Categorias:', categories);
    console.log('📦 Produtos:', products);
    console.log('⚙️ Configurações:', settings);
    
    // Verificar localStorage
    console.log('💾 === LOCALSTORAGE ===');
    console.log('bemvira_products:', localStorage.getItem('bemvira_products'));
    console.log('bemvira_categories:', localStorage.getItem('bemvira_categories'));
    console.log('bemvira_products_data:', localStorage.getItem('bemvira_products_data'));
    
    // Mostrar estrutura dos dados sincronizados
    const productsData = {};
    categories.forEach(category => {
        const categoryProducts = products.filter(p => p.category === category.id);
        productsData[category.id] = {
            title: category.name,
            emoji: category.emoji || '💍',
            products: categoryProducts.map(product => ({
                id: product.id,
                name: product.name,
                price: `R$ ${product.price.toFixed(2).replace('.', ',')}`,
                image: product.image || "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png"
            }))
        };
    });
    
    console.log('🔄 === DADOS PARA SINCRONIZAÇÃO ===');
    console.log(productsData);
    
    // Mostrar comando para copiar dados
    console.log('📋 === COMANDO PARA COPIAR DADOS ===');
    console.log('Copie este comando e cole no console do outro dispositivo:');
    console.log(`localStorage.setItem('bemvira_products_data', '${JSON.stringify(productsData)}');`);
    
    showSuccessMessage('Debug executado! Verifique o console do navegador (F12)');
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // ESC para fechar modais
    if (e.key === 'Escape') {
        closeAllModals();
    }
    
    // Ctrl+N para novo produto (quando na aba de produtos)
    if (e.ctrlKey && e.key === 'n' && document.getElementById('productsTab').classList.contains('active')) {
        e.preventDefault();
        openProductModal();
    }
    
    // Ctrl+S para salvar (quando em formulários)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const activeForm = document.querySelector('form:not([style*="display: none"])');
        if (activeForm) {
            activeForm.dispatchEvent(new Event('submit'));
        }
    }
});

// ===== AUTO-SAVE =====
// Salvar automaticamente a cada 30 segundos
setInterval(() => {
    if (currentUser) {
        saveProducts();
        saveCategories();
        saveSettings();
    }
}, 30000);

console.log('📊 Admin Bemvirá carregado com sucesso!');
