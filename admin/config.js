/* ========================================
   BEMVIRÁ - CONFIGURAÇÕES ADMIN
   ======================================== */

// Configurações de autenticação
const ADMIN_CONFIG = {
    // 🔐 ALTERE ESTAS CREDENCIAIS EM PRODUÇÃO!
    username: 'admin',           // ← Altere para seu usuário
    password: 'admin123',        // ← Altere para uma senha forte
    
    // Configurações de sessão
    sessionTimeout: 60 * 60 * 1000, // 1 hora em millisegundos
    maxLoginAttempts: 3,
    
    // Configurações da loja
    store: {
        name: 'Bemvirá',
        description: 'Transformando cada história em algo único e especial.',
        phone: '+55 79 9849-4303',
        email: 'sac.bemvira@gmail.com'
    }
};

// Configurações de armazenamento
const STORAGE_CONFIG = {
    productsKey: 'bemvira_products',
    categoriesKey: 'bemvira_categories',
    settingsKey: 'bemvira_settings',
    sessionKey: 'bemvira_admin_session'
};

// Categorias padrão (podem ser editadas no admin)
const DEFAULT_CATEGORIES = [
    { id: 'aneis', name: 'Anéis', emoji: '💍', description: 'Anéis em prata 925' },
    { id: 'aliancas', name: 'Alianças', emoji: '💍', description: 'Alianças em prata 925' },
    { id: 'colares', name: 'Colares', emoji: '📿', description: 'Colares em prata 925' },
    { id: 'brincos', name: 'Brincos', emoji: '💎', description: 'Brincos em prata 925' },
    { id: 'pulseiras', name: 'Pulseiras', emoji: '💎', description: 'Pulseiras em prata 925' },
    { id: 'braceletes', name: 'Braceletes', emoji: '💎', description: 'Braceletes em prata 925' },
    { id: 'pingentes', name: 'Pingentes', emoji: '🔮', description: 'Pingentes em prata 925' },
    { id: 'acessorios', name: 'Acessórios', emoji: '🔮', description: 'Acessórios em prata 925' }
];

// Produtos padrão (baseados no script.js original)
const DEFAULT_PRODUCTS = [
    // Anéis
    { id: 1, name: "Anel Coração com Pedras", price: 189.90, category: 'aneis', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Anel delicado com pedras em formato de coração", stock: 10 },
    { id: 2, name: "Anel Solitário Prata", price: 220.00, category: 'aneis', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Anel solitário clássico em prata 925", stock: 5 },
    { id: 3, name: "Anel Entrelaçado", price: 199.90, category: 'aneis', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Anel com design entrelaçado único", stock: 8 },
    { id: 4, name: "Anel Flor de Lis", price: 249.90, category: 'aneis', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Anel com símbolo flor de lis", stock: 3 },
    { id: 5, name: "Anel Minimalista", price: 179.90, category: 'aneis', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Anel minimalista e elegante", stock: 12 },
    { id: 6, name: "Anel Vintage", price: 299.90, category: 'aneis', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Anel com estilo vintage", stock: 2 },
    
    // Alianças
    { id: 7, name: "Aliança Clássica", price: 249.90, category: 'aliancas', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Aliança clássica em prata 925", stock: 15 },
    { id: 8, name: "Aliança com Diamantes", price: 399.90, category: 'aliancas', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Aliança com pequenos diamantes", stock: 4 },
    { id: 9, name: "Aliança Entrelaçada", price: 299.90, category: 'aliancas', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Aliança com design entrelaçado", stock: 6 },
    { id: 10, name: "Aliança Personalizada", price: 349.90, category: 'aliancas', emoji: '💍', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Aliança personalizada com gravação", stock: 0 },
    
    // Colares
    { id: 11, name: "Colar Corrente Delicada", price: 199.90, category: 'colares', emoji: '📿', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Colar com corrente delicada", stock: 7 },
    { id: 12, name: "Colar com Pingente", price: 249.90, category: 'colares', emoji: '📿', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Colar com pingente especial", stock: 5 },
    { id: 13, name: "Colar Choker", price: 179.90, category: 'colares', emoji: '📿', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Colar choker moderno", stock: 9 },
    { id: 14, name: "Colar Longo", price: 299.90, category: 'colares', emoji: '📿', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Colar longo elegante", stock: 3 },
    
    // Brincos
    { id: 15, name: "Brincos Argola", price: 399.90, category: 'brincos', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Brincos argola clássicos", stock: 8 },
    { id: 16, name: "Brincos com Pedras", price: 449.90, category: 'brincos', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Brincos com pedras preciosas", stock: 4 },
    { id: 17, name: "Brincos Minimalistas", price: 349.90, category: 'brincos', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Brincos minimalistas e elegantes", stock: 6 },
    { id: 18, name: "Brincos Vintage", price: 499.90, category: 'brincos', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Brincos com estilo vintage", stock: 2 },
    
    // Pulseiras
    { id: 19, name: "Pulseira Corrente", price: 399.90, category: 'pulseiras', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Pulseira com corrente", stock: 7 },
    { id: 20, name: "Pulseira com Charms", price: 449.90, category: 'pulseiras', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Pulseira com charms especiais", stock: 5 },
    { id: 21, name: "Pulseira Delicada", price: 349.90, category: 'pulseiras', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Pulseira delicada e feminina", stock: 9 },
    
    // Braceletes
    { id: 22, name: "Bracelete Entrelaçado", price: 399.90, category: 'braceletes', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Bracelete com design entrelaçado", stock: 6 },
    { id: 23, name: "Bracelete com Pedras", price: 449.90, category: 'braceletes', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Bracelete com pedras preciosas", stock: 4 },
    { id: 24, name: "Bracelete Minimalista", price: 349.90, category: 'braceletes', emoji: '💎', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Bracelete minimalista", stock: 8 },
    
    // Pingentes
    { id: 25, name: "Pingente Coração", price: 399.90, category: 'pingentes', emoji: '🔮', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Pingente em formato de coração", stock: 5 },
    { id: 26, name: "Pingente Flor", price: 449.90, category: 'pingentes', emoji: '🔮', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Pingente com formato de flor", stock: 3 },
    { id: 27, name: "Pingente Personalizado", price: 499.90, category: 'pingentes', emoji: '🔮', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Pingente personalizado", stock: 1 },
    
    // Acessórios
    { id: 28, name: "Broche Vintage", price: 399.90, category: 'acessorios', emoji: '🔮', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Broche com estilo vintage", stock: 4 },
    { id: 29, name: "Anel de Cabelo", price: 199.90, category: 'acessorios', emoji: '🔮', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Anel de cabelo elegante", stock: 7 },
    { id: 30, name: "Pulseira de Tornozelo", price: 299.90, category: 'acessorios', emoji: '🔮', image: "https://res.cloudinary.com/dmfgy0ccd/image/upload/v1755168227/CasinhaBemvira%CC%81-removebg-preview_kz35ya.png", description: "Pulseira de tornozelo delicada", stock: 6 }
];

// Exportar configurações para uso global
window.ADMIN_CONFIG = ADMIN_CONFIG;
window.STORAGE_CONFIG = STORAGE_CONFIG;
window.DEFAULT_CATEGORIES = DEFAULT_CATEGORIES;
window.DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;