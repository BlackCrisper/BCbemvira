# 🔧 Troubleshooting GitHub API - Bemvirá

## 🚨 **Problema Identificado:**

**Erro 404 - Repository Not Found**

O repositório `BlackCrisper/BCbemvira` não foi encontrado ou não está acessível.

## 🔍 **Diagnóstico:**

### **1. Verificar se o repositório existe:**
Acesse: https://github.com/BlackCrisper/BCbemvira

### **2. Verificar configurações:**
```javascript
// No console do admin ou site principal
checkGitHubConfig()
```

## 🛠️ **Soluções:**

### **Solução 1: Criar o Repositório**

Se o repositório não existe:

1. **Acesse:** https://github.com/BlackCrisper
2. **Clique em:** "New repository"
3. **Configure:**
   - **Repository name:** `BCbemvira`
   - **Description:** `Site da loja Bemvirá`
   - **Visibility:** Public (recomendado)
   - **Initialize:** Marque "Add a README file"
4. **Clique em:** "Create repository"

### **Solução 2: Verificar Nome do Usuário**

Se o usuário está incorreto:

1. **Edite** `github-config.js`
2. **Verifique** se `owner` está correto
3. **Teste** com o comando: `checkGitHubConfig()`

### **Solução 3: Verificar Permissões do Token**

Se o token não tem permissões:

1. **Acesse:** https://github.com/settings/tokens
2. **Edite** o token existente
3. **Marque:** "repo" (acesso completo ao repositório)
4. **Salve** as alterações

### **Solução 4: Usar Repositório Existente**

Se você já tem um repositório:

1. **Edite** `github-config.js`
2. **Altere** `owner` e `repo` para o repositório correto
3. **Teste** com: `checkGitHubConfig()`

## 🚀 **Teste Após Configuração:**

### **1. Verificar Repositório:**
```javascript
checkGitHubConfig()
```

### **2. Criar Estrutura (se necessário):**
```javascript
createRepositoryStructure()
```

### **3. Testar Sincronização:**
```javascript
// No admin
forceSyncWithMainSite()
```

## 📋 **Checklist de Verificação:**

- [ ] Repositório existe no GitHub
- [ ] Nome do usuário está correto (`BlackCrisper`)
- [ ] Nome do repositório está correto
- [ ] Token tem permissão "repo"
- [ ] Repositório é público ou você tem acesso
- [ ] Branch "main" existe

## 🔗 **Links Úteis:**

- **Seu perfil:** https://github.com/BlackCrisper
- **Criar repositório:** https://github.com/new
- **Configurar token:** https://github.com/settings/tokens
- **Repositório atual:** https://github.com/BlackCrisper/BCbemvira

## 💡 **Dicas:**

### **Para Repositório Público:**
- Não precisa de token para leitura
- Token é necessário apenas para escrita

### **Para Repositório Privado:**
- Token é obrigatório
- Deve ter permissão "repo"

### **Estrutura Recomendada:**
```
BCbemvira/
├── data/
│   └── products.json
├── admin/
├── index.html
└── README.md
```

## 🎯 **Próximos Passos:**

1. **Verifique** se o repositório existe
2. **Crie** o repositório se necessário
3. **Teste** com `checkGitHubConfig()`
4. **Crie estrutura** com `createRepositoryStructure()`
5. **Teste sincronização** no admin

---

**🔧 Resolva o problema seguindo as soluções acima e o sistema funcionará perfeitamente!**
