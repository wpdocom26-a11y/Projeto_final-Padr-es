# Implementation Plan: Missão dos Agrupamentos

**Branch**: `001-missao-agrupamentos` | **Date**: 2026-10-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-missao-agrupamentos/spec.md`

---

## Summary

Implementação de uma aplicação web educativa estática ("Missão dos Agrupamentos") desenvolvida especificamente para alunos do 1º ano do Ensino Fundamental (BNCC Computação **EF01CO01**). A aplicação utiliza arquitetura 100% *client-side* em HTML5, CSS3 moderno e JavaScript puro, sem dependências externas, sem banco de dados e sem backend, pronta para hospedagem no GitHub Pages.

---

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript ES6+ (Vanilla JS)

**Primary Dependencies**: Nenhuma dependência de terceiros (Zero dependencies). Utiliza Web Speech API e Web Audio API nativas do navegador.

**Storage**: N/A (Estado em memória de sessão via `AppState` em JavaScript).

**Testing**: Validação manual e automatizada por cenários no navegador (documentada em `quickstart.md`).

**Target Platform**: GitHub Pages / Navegadores modernos (Google Chrome, Microsoft Edge, Safari, Firefox) em Desktop, Tablets e Smartphones.

**Project Type**: Web Application Estática (Single Page Application).

**Performance Goals**: Carregamento instantâneo (< 1.5s), tamanho total dos assets < 300 KB, taxa de quadros a 60 fps em transições CSS.

**Constraints**: Funcionamento 100% offline após carregamento inicial; áreas de toque com no mínimo 56px para crianças; feedbacks sempre formativos e sem mensagens punitivas.

**Scale/Scope**: 1 Tela Inicial, 5 Missões progressivas, 1 Tela de Conclusão e ~15 objetos vetoriais SVG catalogados.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Princípio da Simplicidade (YAGNI / Zero Overhead)**: ✅ Passou. Sem frameworks pesados ou ferramentas de build desnecessárias.
- **Princípio da Acessibilidade Infantil**: ✅ Passou. Interface com fontes legíveis (alfabetização), alto contraste, botões grandes e narração auditiva.
- **Princípio da Arquitetura Estática**: ✅ Passou. Estrutura de arquivos direta (`index.html`, `css/style.css`, `js/app.js`, `js/data.js`, `assets/images/`) executável no GitHub Pages.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-missao-agrupamentos/
├── spec.md              # Especificação funcional refinada
├── plan.md              # Este plano de implementação
├── research.md          # Decisões arquiteturais e pedagógicas
├── data-model.md        # Modelo de dados e máquina de estados
├── quickstart.md        # Guia de execução e testes
├── contracts/
│   └── ui-contracts.md  # Contratos de componentes e eventos de UI
└── checklists/
    └── requirements.md  # Checklist de qualidade da especificação
```

### Source Code (repository root)

```text
Projeto-final-Padrões/
├── index.html           # Estrutura semântica SPA (Single Page Application)
├── css/
│   └── style.css        # Estilos responsivos, variáveis de cores, animações e layout
├── js/
│   ├── data.js          # Catálogo de objetos com atributos e configuração das 5 missões
│   └── app.js           # Controlador de estado, renderização, validação e fala (Web Speech)
└── assets/
    └── images/          # SVGs vetoriais (mascote Lino, objetos e ícones)
```

**Structure Decision**: A organização em arquivos planos nativos (`index.html`, `css/style.css`, `js/data.js`, `js/app.js`) garante compatibilidade imediata com o GitHub Pages sem necessidade de etapas de transpile/bundling, permitindo manutenção rápida e carregamento ultra-rápido.

---

## Detalhamento das Fases de Implementação

### 1. Estrutura Semântica (`index.html`)
- Header com controle de som e título do jogo.
- Área principal (`#app`) contendo as seções:
  - `#screen-home`: Apresentação do mascote e botão "Começar".
  - `#screen-mission`: Barra de progresso (5 etapas), banner com balão de fala do mascote, grid responsivo de 6 cartões de objetos e botão de ação ("Verificar").
  - `#screen-conclusion`: Efeito de confetes, estrelas de medalhas e mensagem de consolidação da BNCC EF01CO01.
- Painel modal/card de feedback formativo acolhedor.

### 2. Design Visual e Responsividade (`css/style.css`)
- Paleta de cores vibrantes com alto contraste (azul suave, amarelo amigável, verde positivo, laranja).
- Tipografia arredondada e legível voltada para a fase de alfabetização.
- Grid de objetos com CSS Grid:
  - Celular: 2 colunas com cartões de tamanho mínimo de 140px.
  - Tablet: 3 colunas com cartões de 160px.
  - Desktop: 3 colunas com cartões de 180px e centralização confortável.
- Efeitos visuais de seleção (`.selected`) com borda verde iluminada e badge de verificação.

### 3. Modelo de Dados e Catálogo (`js/data.js`)
- Catálogo de objetos com atributos completos: `cor`, `forma`, `categoria`, `nome`, `svg` e `dica`.
- Configuração detalhada das 5 missões com textos, locuções, IDs dos objetos corretos e regras de validação.

### 4. Lógica de Interação e Feedback (`js/app.js`)
- Gerenciamento reativo do objeto `AppState`.
- Funções de renderização de telas e missões.
- Mecânica de toque/clique simples com controle de seleção.
- Validação formativa pedagógica com dicas personalizadas por missão.
- Integração da Web Speech API para leitura em áudio das falas do Lino.

---

## Complexity Tracking

| Decisão | Por que é necessária? | Alternativa mais simples rejeitada por quê? |
| :--- | :--- | :--- |
| **Uso de Web Speech API nativa** | Permite autonomia a crianças em fase de alfabetização. | Apenas texto escrito: Rejeitado por excluir crianças não alfabetizadas do 1º ano. |
| **Grid de Toque com Confirmação** | Evita submissões acidentais enquanto a criança explora os itens. | Validação automática no primeiro toque: Rejeitado por impedir a seleção de múltiplos itens em conjunto. |
