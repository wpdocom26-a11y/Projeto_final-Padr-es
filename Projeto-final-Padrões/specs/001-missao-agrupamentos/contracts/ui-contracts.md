# Phase 1 UI Component & Interface Contracts

**Feature**: Missão dos Agrupamentos  
**Architecture**: Vanilla Web Components / Semantic DOM Contracts  

---

## 1. Contratos de Componentes de Interface

### 1.1 Cartão de Objeto Interativo (`.object-card`)
- **Papel**: Representar um elemento gráfico selecionável pela criança.
- **Estrutura DOM**:
  ```html
  <button class="object-card" data-id="banana" aria-label="Banana, amarela e alimento" aria-pressed="false">
    <div class="card-icon-wrapper">
      <svg class="object-svg">...</svg>
    </div>
    <span class="card-label">Banana</span>
    <div class="selection-badge" aria-hidden="true">✔</div>
  </button>
  ```
- **Estados Visuais (CSS)**:
  - `.object-card:hover / :focus-visible`: Leve elevação (`transform: translateY(-4px)`) e contorno suave.
  - `.object-card.selected`: Borda de `4px solid #4CAF50`, fundo iluminado, sombra dourada/verde e badge com ícone de confirmação.
  - `.object-card.guided-hint`: Animação de pulso sutil ativada quando o aluno necessita de pista de observação.

---

### 1.2 Painel do Mascote Orientador (`.mascot-banner`)
- **Papel**: Apresentar instruções contextuais e fornecer suporte auditivo contínuo.
- **Estrutura DOM**:
  ```html
  <section class="mascot-banner">
    <div class="mascot-avatar">
      <svg class="mascot-svg">...</svg>
    </div>
    <div class="speech-bubble">
      <p id="instruction-text" class="speech-text">Ajude o Lino a encontrar todos os objetos da cor AMARELA!</p>
      <button id="btn-speak" class="btn-audio" aria-label="Ouvir instrução">
        <svg class="audio-icon">...</svg> Ouvir
      </button>
    </div>
  </section>
  ```

---

### 1.3 Barra de Progresso Lúdica (`.mission-tracker`)
- **Papel**: Fornecer senso de conquista linear e clareza de avanço (5 etapas).
- **Estrutura DOM**:
  ```html
  <nav class="mission-tracker" aria-label="Progresso das Missões">
    <div class="step-indicator completed" title="Missão 1: Cores">🎨</div>
    <div class="step-indicator active" title="Missão 2: Formas">📐</div>
    <div class="step-indicator" title="Missão 3: Categorias">📦</div>
    <div class="step-indicator" title="Missão 4: Descubra a Regra">🔍</div>
    <div class="step-indicator" title="Missão Final: Meu Agrupamento">⭐</div>
  </nav>
  ```

---

### 1.4 Modal / Painel de Feedback Formativo (`.feedback-card`)
- **Papel**: Exibir a devolutiva explicativa sem punição.
- **Estrutura DOM**:
  ```html
  <aside class="feedback-card feedback-success" role="alert">
    <div class="feedback-icon">🎉</div>
    <div class="feedback-content">
      <h3 class="feedback-title">Muito Bem!</h3>
      <p class="feedback-message">A banana, o sol e o patinho são todos amarelos! Eles formam o grupo do amarelo!</p>
    </div>
    <button class="btn-primary btn-next-mission">Continuar ➔</button>
  </aside>
  ```

---

## 2. Contratos de Eventos e Manipulação de Estado (`js/app.js`)

| Evento | Origem | Ação no Estado (`AppState`) | Renderização / Efeito |
| :--- | :--- | :--- | :--- |
| `click` | `#btn-start` | Muda `currentScreen` para `'mission'`, `currentMissionIndex` = 0 | Renderiza Missão 1 e aciona locução inicial |
| `click` | `.object-card` | Alterna o `id` no `selectedItemIds` (adiciona/remove) | Atualiza classe `.selected` e `aria-pressed` |
| `click` | `#btn-check` | Executa validação `validateCurrentMission()` | Exibe feedback formativo (sucesso ou dica acolhedora) |
| `click` | `.btn-next-mission` | Incrementa `currentMissionIndex` ou abre `conclusion` | Limpa seleções e carrega nova missão com animação |
| `click` | `#btn-speak` | N/A | Invoca `window.speechSynthesis.speak()` com o texto atual |
