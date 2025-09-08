/* ========================================
   BEMVIRÁ - GITHUB API FUNCTIONS
   ======================================== */

/**
 * Carrega dados dos produtos do repositório GitHub
 */
async function loadProductsFromGitHub() {
    try {
        console.log('🔄 Carregando dados do GitHub...');
        
        const response = await fetch(getRawUrl());
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Dados carregados do GitHub com sucesso');
            return data;
        } else if (response.status === 404) {
            console.log('⚠️ Arquivo não encontrado no GitHub, usando dados padrão');
            return getDefaultProductsData();
        } else {
            console.error('❌ Erro ao carregar dados do GitHub:', response.status);
            return getDefaultProductsData();
        }
    } catch (error) {
        console.error('❌ Erro na requisição para GitHub:', error);
        return getDefaultProductsData();
    }
}

/**
 * Salva dados dos produtos no repositório GitHub
 */
async function saveProductsToGitHub(productsData) {
    try {
        console.log('🔄 Salvando dados no GitHub...');
        
        // Primeiro, obter o SHA do arquivo atual (se existir)
        let sha = null;
        try {
            const getResponse = await fetch(getApiUrl(`/contents/${GITHUB_CONFIG.filePath}`), {
                headers: getApiHeaders()
            });
            
            if (getResponse.ok) {
                const fileData = await getResponse.json();
                sha = fileData.sha;
            }
        } catch (error) {
            console.log('📝 Arquivo não existe, será criado');
        }
        
        // Preparar dados para envio
        const content = JSON.stringify(productsData, null, 2);
        const encodedContent = btoa(unescape(encodeURIComponent(content)));
        
        const payload = {
            message: `Atualização automática dos produtos - ${new Date().toLocaleString('pt-BR')}`,
            content: encodedContent,
            branch: GITHUB_CONFIG.branch
        };
        
        // Se o arquivo já existe, incluir o SHA
        if (sha) {
            payload.sha = sha;
        }
        
        const response = await fetch(getApiUrl(`/contents/${GITHUB_CONFIG.filePath}`), {
            method: 'PUT',
            headers: getApiHeaders(),
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Dados salvos no GitHub com sucesso');
            console.log('🔗 Commit:', result.commit.html_url);
            return { success: true, commit: result.commit.html_url };
        } else {
            const error = await response.json();
            console.error('❌ Erro ao salvar no GitHub:', error);
            return { success: false, error: error.message };
        }
    } catch (error) {
        console.error('❌ Erro na requisição para GitHub:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Verifica se o repositório está configurado corretamente
 */
async function checkGitHubConfig() {
    try {
        const response = await fetch(getApiUrl(), {
            headers: getApiHeaders()
        });
        
        if (response.ok) {
            const repo = await response.json();
            console.log('✅ Repositório GitHub configurado corretamente');
            console.log('📁 Repositório:', repo.full_name);
            console.log('🌿 Branch padrão:', repo.default_branch);
            return true;
        } else {
            console.error('❌ Erro ao acessar repositório GitHub:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ Erro na verificação do GitHub:', error);
        return false;
    }
}

/**
 * Dados padrão dos produtos
 */
function getDefaultProductsData() {
    return {
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
}

// Exportar funções
window.loadProductsFromGitHub = loadProductsFromGitHub;
window.saveProductsToGitHub = saveProductsToGitHub;
window.checkGitHubConfig = checkGitHubConfig;
window.getDefaultProductsData = getDefaultProductsData;
