# 🚀 Sistema de Arquivo JSON - Bemvirá

## 📋 **O que foi implementado:**

### ✅ **Sistema de Persistência em Arquivo JSON**
- **Arquivo de dados**: `data/products.json` - Contém todos os produtos e categorias
- **API PHP**: `api/products.php` - Gerencia leitura e escrita do arquivo JSON
- **Sincronização automática** - Dados são salvos automaticamente no arquivo
- **Funciona em qualquer dispositivo** - Não depende mais do localStorage

### 🔧 **Como funciona:**

1. **Admin salva dados** → Arquivo JSON é atualizado
2. **Site principal carrega** → Dados vêm do arquivo JSON
3. **Qualquer dispositivo** → Acessa os mesmos dados do arquivo

## 🚀 **Como usar:**

### **1. Configuração do Servidor**
Certifique-se de que seu servidor suporta PHP (XAMPP, WAMP, ou servidor web com PHP).

### **2. Estrutura de Arquivos**
```
BCbemvira/
├── data/
│   └── products.json          ← Dados dos produtos
├── api/
│   └── products.php           ← API para gerenciar dados
├── admin/
│   ├── index.html
│   ├── admin.js
│   └── admin.css
├── index.html
├── script.js
└── style.css
```

### **3. Testando o Sistema**

#### **No Admin:**
1. Acesse `/admin/`
2. Crie/edite produtos
3. Os dados são salvos automaticamente no arquivo JSON

#### **No Site Principal:**
1. Acesse a página principal
2. Os dados são carregados do arquivo JSON
3. Atualizações aparecem automaticamente

#### **Em Outro Dispositivo:**
1. Acesse o site de qualquer dispositivo
2. Os dados são os mesmos (vêm do arquivo JSON)

## 🔍 **Debug e Testes:**

### **Comandos úteis no console:**

#### **No Admin:**
```javascript
// Ver todos os dados
debugData()

// Forçar sincronização
forceSyncWithMainSite()
```

#### **No Site Principal:**
```javascript
// Recarregar produtos
forceReloadProducts()

// Debug da interface
debugInterface()
```

## 📊 **Vantagens do Sistema JSON:**

### ✅ **Funciona em qualquer dispositivo**
- Não depende do localStorage do navegador
- Dados centralizados no servidor

### ✅ **Sincronização automática**
- Mudanças no admin aparecem imediatamente no site
- Atualização a cada 5 segundos

### ✅ **Backup automático**
- Dados salvos em arquivo físico
- Fácil de fazer backup

### ✅ **Sem banco de dados**
- Usa apenas arquivo JSON
- Simples de configurar

## 🛠️ **Troubleshooting:**

### **Problema: Dados não aparecem**
1. Verifique se o PHP está funcionando
2. Verifique se o arquivo `data/products.json` existe
3. Verifique as permissões da pasta `data/`

### **Problema: Erro 404 na API**
1. Verifique se o arquivo `api/products.php` existe
2. Verifique se o servidor suporta PHP
3. Teste acessando `http://seusite.com/api/products.php`

### **Problema: Dados não salvam**
1. Verifique as permissões da pasta `data/`
2. Verifique se o PHP tem permissão de escrita
3. Verifique o console do navegador para erros

## 📁 **Estrutura do Arquivo JSON:**

```json
{
  "categoria_id": {
    "title": "Nome da Categoria",
    "emoji": "💍",
    "products": [
      {
        "id": 1,
        "name": "Nome do Produto",
        "price": "R$ 199,90",
        "image": "url_da_imagem"
      }
    ]
  }
}
```

## 🎯 **Próximos Passos:**

1. **Teste o sistema** criando produtos no admin
2. **Verifique** se aparecem no site principal
3. **Teste em outro dispositivo** para confirmar sincronização
4. **Faça backup** do arquivo `data/products.json`

---

**🎉 Sistema implementado com sucesso! Agora seus dados funcionam em qualquer dispositivo!**
