# 🛡️ Área Administrativa - Bemvirá

Sistema completo de gerenciamento de produtos para a loja Bemvirá.

## 📋 Funcionalidades

### 🔐 Autenticação
- **Login seguro** com usuário e senha
- **Sessão com timeout** (1 hora)
- **Proteção contra acesso não autorizado**

### 📦 Gerenciamento de Produtos
- ✅ **Adicionar** novos produtos
- ✏️ **Editar** produtos existentes
- 🗑️ **Excluir** produtos
- 📊 **Controle de estoque**
- 🏷️ **Categorização** de produtos
- 🖼️ **Upload de imagens**

### 🏷️ Gerenciamento de Categorias
- ✅ **Criar** novas categorias
- ✏️ **Editar** categorias existentes
- 🗑️ **Excluir** categorias (apenas se não tiver produtos)
- 📝 **Descrições** e emojis personalizados

### ⚙️ Configurações
- 🏪 **Informações da loja**
- 📞 **Dados de contato**
- 💾 **Backup e restauração** de dados

## 🚀 Como Usar

### 1. Acesso
1. Navegue para `/admin/` no seu site
2. Use as credenciais:
   - **Usuário:** `admin`
   - **Senha:** `admin123`

### 2. Gerenciar Produtos
1. Clique na aba **"Produtos"**
2. Use o botão **"Adicionar Produto"** para criar novos
3. Clique nos ícones de **editar** ou **excluir** nos cards dos produtos

### 3. Gerenciar Categorias
1. Clique na aba **"Categorias"**
2. Crie novas categorias ou edite as existentes
3. As categorias são usadas para organizar os produtos

### 4. Configurações
1. Clique na aba **"Configurações"**
2. Atualize as informações da loja
3. Use **"Exportar Dados"** para backup
4. Use **"Importar Dados"** para restaurar

## 🔧 Configuração de Segurança

### ⚠️ IMPORTANTE - Alterar Credenciais
Para maior segurança, altere as credenciais padrão:

1. Abra o arquivo `admin/config.js`
2. Modifique as linhas:
```javascript
const ADMIN_CONFIG = {
    username: 'SEU_USUARIO_AQUI',
    password: 'SUA_SENHA_FORTE_AQUI',
    // ... resto das configurações
};
```

### 🔒 Recomendações de Segurança
- Use uma **senha forte** (mínimo 8 caracteres, com números e símbolos)
- **Não compartilhe** as credenciais
- **Faça backup** regular dos dados
- Considere usar **HTTPS** em produção

## 📁 Estrutura de Arquivos

```
admin/
├── index.html          # Interface principal
├── admin.css           # Estilos da área admin
├── admin.js            # Lógica JavaScript
├── config.js           # Configurações e dados padrão
└── README.md           # Esta documentação
```

## 💾 Armazenamento de Dados

Os dados são salvos no **localStorage** do navegador:

- `bemvira_products` - Lista de produtos
- `bemvira_categories` - Lista de categorias
- `bemvira_settings` - Configurações da loja
- `bemvira_admin_session` - Sessão do administrador
- `bemvira_products_data` - Dados sincronizados com o site principal

## 🔄 Sincronização com Site Principal

O sistema admin se sincroniza automaticamente com o site principal:

1. **Mudanças no admin** são salvas no localStorage
2. **Site principal** verifica atualizações a cada 5 segundos
3. **Produtos atualizados** aparecem automaticamente no site

## ⌨️ Atalhos de Teclado

- **ESC** - Fechar modais
- **Ctrl + N** - Novo produto (na aba de produtos)
- **Ctrl + S** - Salvar formulário ativo

## 🚨 Solução de Problemas

### Problema: Não consigo fazer login
- Verifique se as credenciais estão corretas
- Limpe o cache do navegador
- Verifique se o JavaScript está habilitado

### Problema: Produtos não aparecem no site principal
- Verifique se os dados foram salvos no localStorage
- Recarregue a página principal
- Verifique o console do navegador para erros

### Problema: Dados perdidos
- Use a função **"Exportar Dados"** regularmente
- Mantenha backups dos arquivos JSON
- Verifique se o localStorage não foi limpo

## 🔄 Backup e Restauração

### Exportar Dados
1. Vá para **Configurações**
2. Clique em **"Exportar Dados"**
3. Um arquivo JSON será baixado com todos os dados

### Importar Dados
1. Vá para **Configurações**
2. Clique em **"Importar Dados"**
3. Selecione o arquivo JSON de backup
4. Confirme a importação

## 📱 Responsividade

A área admin é totalmente responsiva e funciona em:
- 💻 **Desktop** (1200px+)
- 📱 **Tablet** (768px - 1199px)
- 📱 **Mobile** (até 767px)

## 🎨 Personalização

### Cores e Estilo
Edite o arquivo `admin.css` para personalizar:
- Cores da interface
- Tipografia
- Espaçamentos
- Animações

### Funcionalidades
Edite o arquivo `admin.js` para adicionar:
- Novos campos de produto
- Validações customizadas
- Integrações externas

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique esta documentação
2. Consulte o console do navegador para erros
3. Teste em diferentes navegadores
4. Verifique se todos os arquivos estão carregando corretamente

---

**Desenvolvido para Bemvirá** 💎
*Transformando cada história em algo único e especial.*
