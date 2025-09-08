# 🚀 Configuração GitHub API - Bemvirá

## 📋 **Sistema Implementado:**

### ✅ **GitHub como "Banco de Dados"**
- **Sincronização automática** via GitHub API
- **Dados salvos no repositório** em tempo real
- **Funciona em qualquer dispositivo** - Todos acessam o mesmo repositório
- **Histórico de mudanças** - Cada alteração vira um commit

## 🔧 **Como Configurar:**

### **1. Configurar o Repositório GitHub**

#### **Edite o arquivo `github-config.js`:**
```javascript
const GITHUB_CONFIG = {
    owner: 'seu-usuario-github',           // ← Seu usuário do GitHub
    repo: 'BCbemvira',                     // ← Nome do repositório
    branch: 'main',                        // ← Branch principal
    filePath: 'data/products.json',        // ← Caminho do arquivo no repo
    
    // Token de acesso pessoal (opcional, para mais requests)
    token: '',                             // ← Seu token pessoal (opcional)
    
    // Configurações da API
    apiBase: 'https://api.github.com',
    rawBase: 'https://raw.githubusercontent.com'
};
```

### **2. Criar Token de Acesso (Opcional mas Recomendado)**

#### **Para evitar limites de rate limit:**

1. **Acesse:** https://github.com/settings/tokens
2. **Clique em:** "Generate new token" → "Generate new token (classic)"
3. **Configure:**
   - **Note:** "Bemvirá API Access"
   - **Expiration:** "No expiration" (ou escolha um prazo)
   - **Scopes:** Marque apenas "repo" (acesso completo ao repositório)
4. **Clique em:** "Generate token"
5. **Copie o token** e cole em `github-config.js`

### **3. Estrutura do Repositório**

#### **Crie a pasta `data/` no seu repositório:**
```
BCbemvira/
├── data/
│   └── products.json          ← Arquivo dos produtos (será criado automaticamente)
├── admin/
├── index.html
├── script.js
└── github-config.js
```

## 🚀 **Como Funciona:**

### **1. Admin Salva Dados:**
1. Você cria/edita produtos no admin
2. Sistema salva automaticamente no GitHub
3. Cria um commit com as mudanças
4. Mostra link para ver o commit

### **2. Site Principal Carrega:**
1. Site carrega dados do GitHub automaticamente
2. Verifica atualizações a cada 5 segundos
3. Atualiza interface quando há mudanças

### **3. Sincronização Automática:**
1. **Qualquer dispositivo** acessa os mesmos dados
2. **Mudanças aparecem automaticamente** em todos os dispositivos
3. **Histórico completo** de todas as alterações

## 🔍 **Testando o Sistema:**

### **1. Verificar Configuração:**
```javascript
// No console do admin ou site principal
checkGitHubConfig()
```

### **2. Testar Sincronização:**
1. **No admin** → Crie um produto
2. **Verifique** se aparece mensagem de sucesso
3. **Clique no link** para ver o commit no GitHub
4. **No site principal** → Produto deve aparecer automaticamente

### **3. Comandos de Debug:**
```javascript
// No admin
debugData()                    // Ver todos os dados
forceSyncWithMainSite()        // Forçar sincronização

// No site principal
forceReloadProducts()          // Recarregar produtos
debugInterface()               // Debug da interface
```

## 📊 **Vantagens do Sistema GitHub:**

### ✅ **Sincronização Automática**
- Mudanças aparecem em todos os dispositivos
- Não precisa exportar/importar manualmente

### ✅ **Histórico Completo**
- Cada alteração vira um commit
- Pode reverter mudanças se necessário

### ✅ **Backup Automático**
- Dados sempre salvos no GitHub
- Não perde dados se o navegador for limpo

### ✅ **Funciona em Qualquer Lugar**
- Hospedagem estática (Netlify, Vercel, etc.)
- Não precisa de servidor PHP

### ✅ **Colaboração**
- Múltiplas pessoas podem editar
- Controle de versão integrado

## 🛠️ **Limitações:**

### ⚠️ **Rate Limits da GitHub API**
- **Sem token:** 60 requests/hora por IP
- **Com token:** 5000 requests/hora
- **Solução:** Configure um token pessoal

### ⚠️ **Dependência da Internet**
- Precisa de conexão para sincronizar
- Fallback para dados padrão se offline

## 🎯 **Próximos Passos:**

1. **Configure** o `github-config.js` com seus dados
2. **Crie um token** (opcional mas recomendado)
3. **Teste** criando um produto no admin
4. **Verifique** se aparece no site principal
5. **Teste** em outro dispositivo

## 📁 **Arquivos Criados:**

- `github-config.js` - Configurações do GitHub
- `github-api.js` - Funções da API
- `GITHUB_SETUP.md` - Este arquivo de instruções

## 🚨 **Troubleshooting:**

### **Erro: "Repository not found"**
- Verifique se o `owner` e `repo` estão corretos
- Verifique se o repositório é público ou você tem acesso

### **Erro: "API rate limit exceeded"**
- Configure um token pessoal em `github-config.js`
- Aguarde 1 hora para o limite resetar

### **Erro: "File not found"**
- O arquivo será criado automaticamente na primeira sincronização
- Verifique se a pasta `data/` existe no repositório

---

**🎉 Sistema GitHub implementado! Agora você tem sincronização automática entre todos os dispositivos!**
