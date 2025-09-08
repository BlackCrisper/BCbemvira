/* ========================================
   BEMVIRÁ - CONFIGURAÇÕES GITHUB API
   ======================================== */

// Configurações do GitHub
const GITHUB_CONFIG = {
    // 🔐 CONFIGURE SEU REPOSITÓRIO GITHUB
    owner: 'BlackCrisper',           // ← Seu usuário do GitHub
    repo: 'BCbemvira',                     // ← Nome do repositório
    branch: 'main',                        // ← Branch principal
    filePath: 'data/products.json',        // ← Caminho do arquivo no repo
    
    // Token de acesso pessoal (opcional, para mais requests)
    // Crie em: https://github.com/settings/tokens
    token: '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',                             // ← Seu token pessoal (opcional)
    
    // Configurações da API
    apiBase: 'https://api.github.com',
    rawBase: 'https://raw.githubusercontent.com'
};

// Função para obter URL da API
function getApiUrl(endpoint = '') {
    return `${GITHUB_CONFIG.apiBase}/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}${endpoint}`;
}

// Função para obter URL do arquivo raw
function getRawUrl() {
    return `${GITHUB_CONFIG.rawBase}/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.filePath}`;
}

// Função para obter headers da API
function getApiHeaders() {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    };
    
    if (GITHUB_CONFIG.token) {
        headers['Authorization'] = `token ${GITHUB_CONFIG.token}`;
    }
    
    return headers;
}

// Exportar configurações
window.GITHUB_CONFIG = GITHUB_CONFIG;
window.getApiUrl = getApiUrl;
window.getRawUrl = getRawUrl;
window.getApiHeaders = getApiHeaders;
