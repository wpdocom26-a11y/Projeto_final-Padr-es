# Phase 0 Research & Technical Decisions: Missão dos Agrupamentos

**Feature**: Missão dos Agrupamentos  
**Target Platform**: GitHub Pages (Navegadores Modernos: Chrome, Edge, Safari, Firefox)  
**Stack**: HTML5 semântico, CSS3 moderno (Flexbox/Grid, Variáveis CSS), JavaScript Puro (Vanilla ES6+).  

---

## 1. Decisões Arquiteturais e Justificativas

### Decisão 1: Arquitetura 100% Estática (Client-Side SPA)
- **Escolha**: Single Page Application (SPA) sem dependências externas, bibliotecas de build (Webpack/Vite) ou frameworks pesados.
- **Racional**: A aplicação é um recurso educacional para alunos do 1º ano hospedada no GitHub Pages. Não requer autenticação, persistência de longo prazo em servidor ou operações de banco de dados. Uma estrutura nativa em HTML5/CSS3/JavaScript puro carrega em milissegundos, opera sem falhas de conexão após o download inicial e tem manutenção simplificada.
- **Alternativas consideradas**:
  - *React/Vue com build bundler*: Rejeitado devido ao overhead de build, maior consumo de memória em tablets escolares antigos e dependências desnecessárias.

### Decisão 2: Representação Visual dos Objetos e Mascote
- **Escolha**: Ilustrações vetoriais SVG inline ou em arquivos `.svg` externos na pasta `assets/images/`, com cores primárias contrastantes e contornos nítidos.
- **Racional**: SVGs são leves (< 2 KB cada), garantem nitidez perfeita em qualquer escala (desde telas pequenas de smartphone a projetores escolares 4K) e permitem estilização dinâmica via CSS (animações, bordas de seleção, brilhos de destaque).
- **Alternativas consideradas**:
  - *Imagens PNG/JPG rasterizadas*: Rejeitadas pelo peso de rede, perda de nitidez no redimensionamento e falta de controle programático sobre contornos e efeitos.

### Decisão 3: Mecanismo de Interação e Seleção de Objetos
- **Escolha**: Toque/Clique simples nos cartões com ativação de estado visual de seleção (`.card.selected` com borda de 4px, escala e sombra iluminada) e botão centralizado de confirmação.
- **Racional**: Crianças de 6 a 7 anos possuem coordenação motora fina em desenvolvimento; drag-and-drop em telas touch pequenas frequentemente gera erros de soltura acidental fora do alvo ("drop miss"). O clique/toque simples com confirmação intencional reduz a frustração e dá controle total à criança.
- **Alternativas consideradas**:
  - *Drag and Drop com HTML5 Drag & Drop API*: Rejeitado pela baixa usabilidade infantil em dispositivos móveis e inconsistência do drag nativo em navegadores mobile.

### Decisão 4: Síntese de Áudio e Acessibilidade Auditiva
- **Escolha**: Web Speech API nativa (`window.speechSynthesis`) com configuração de voz em português brasileiro (`pt-BR`, velocidade 0.9 e tom amigável), complementada por feedback sonoro sintético leve via Web Audio API (tons harmônicos para acerto/dica) sem necessidade de baixar arquivos MP3 externos.
- **Racional**: Permite narração imediata das instruções para crianças em processo de alfabetização sem consumir largura de banda com arquivos de áudio gravados, garantindo funcionamento 100% offline.
- **Alternativas consideradas**:
  - *Arquivos de áudio MP3 gravados*: Exigiria dezenas de megabytes adicionais de áudio no repositório.

### Decisão 5: Gerenciamento de Estado e Ciclo de Vida das Missões
- **Escolha**: Objeto de estado reativo simples em memória (`AppState`), renderizando as telas dinamicamente na `div#app` ou alternando a visibilidade de seções com classes CSS (`.screen-active`).
- **Racional**: Mantém o código conciso (< 350 linhas no total), legível, previsível e sem efeito colateral.

---

## 2. Padrões de Feedback Pedagógico (Formulação Não Punitiva)

| Evento | Princípio Pedagógico | Resposta do Sistema |
| :--- | :--- | :--- |
| **Agrupamento Correto** | Reforço Positivo & Abstração | Parabenização + explicação verbal/textual da regra comum identificada. |
| **Item Divergente Selecionado** | Mediação Formativa | Dica incentivando a re-observação do atributo alvo (cor/forma/categoria). Sem mensagens de "Erro!". |
| **Tentativa Repetida com Dúvida** | Andaime de Aprendizagem (Scaffolding) | Pista visual luminosa sutil nos itens pertinentes para manter a auto-eficácia e engajamento da criança. |
