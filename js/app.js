/**
 * Missão dos Agrupamentos - Controlador Principal da Aplicação
 * Alinhado à BNCC Computação EF01CO01 (1º Ano do Ensino Fundamental)
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. ESTADO CENTRAL DA APLICAÇÃO (AppState)
  // =========================================================================
  const AppState = {
    currentScreen: 'home',         // 'home' | 'mission' | 'conclusion'
    currentMissionIndex: 0,        // 0 a 4
    selectedItemIds: new Set(),    // IDs dos itens marcados pelo aluno
    selectedRuleOptionId: null,    // Opção escolhida na Missão 4
    customCriterion: null,         // Critério ativo na Missão 5
    attemptsInCurrentMission: 0,   // Contador para ativação de pistas (scaffolding)
    completedMissions: [false, false, false, false, false],
    soundEnabled: true
  };

  // =========================================================================
  // 2. ELEMENTOS DO DOM
  // =========================================================================
  const dom = {
    // Telas
    screenHome: document.getElementById('screen-home'),
    screenMission: document.getElementById('screen-mission'),
    screenConclusion: document.getElementById('screen-conclusion'),
    
    // Slots do Mascote
    homeMascotSlot: document.getElementById('home-mascot-slot'),
    missionMascotSlot: document.getElementById('mission-mascot-slot'),
    
    // Controles Globais
    btnSoundToggle: document.getElementById('btn-sound-toggle'),
    soundIcon: document.getElementById('sound-icon'),
    soundText: document.getElementById('sound-text'),
    
    // Tela Inicial
    btnStart: document.getElementById('btn-start'),
    
    // Tela de Missão
    missionTitleText: document.getElementById('mission-title-text'),
    missionInstructionText: document.getElementById('mission-instruction-text'),
    btnSpeakInstruction: document.getElementById('btn-speak-instruction'),
    missionDynamicArea: document.getElementById('mission-dynamic-area'),
    missionTrackerSteps: document.querySelectorAll('.mission-tracker .step-item'),
    btnVerify: document.getElementById('btn-verify'),
    
    // Modal de Feedback
    feedbackModal: document.getElementById('feedback-modal'),
    feedbackCardContent: document.getElementById('feedback-card-content'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackMessage: document.getElementById('feedback-message'),
    btnFeedbackAction: document.getElementById('btn-feedback-action'),
    
    // Conclusão
    btnRestart: document.getElementById('btn-restart')
  };

  // =========================================================================
  // 3. SISTEMA DE ÁUDIO E SÍNTESE DE VOZ (Web Speech & Web Audio API)
  // =========================================================================
  
  // Contexto de áudio para efeitos sonoros lúdicos leves
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Reproduz sons sintéticos suaves de feedback (sem dependências externas)
  function playSoundEffect(type) {
    if (!AppState.soundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'tap') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        // Melodia alegre de conquista (C5 - E5 - G5 - C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const noteOsc = audioCtx.createOscillator();
          const noteGain = audioCtx.createGain();
          noteOsc.connect(noteGain);
          noteGain.connect(audioCtx.destination);
          
          const start = now + idx * 0.1;
          noteOsc.frequency.setValueAtTime(freq, start);
          noteGain.gain.setValueAtTime(0.15, start);
          noteGain.gain.exponentialRampToValueAtTime(0.01, start + 0.18);
          noteOsc.start(start);
          noteOsc.stop(start + 0.18);
        });
      } else if (type === 'hint') {
        // Tom suave de reflexão/dica
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      console.warn('Áudio não suportado ou bloqueado:', e);
    }
  }

  // Locução por síntese de voz (Web Speech API)
  function speakText(text) {
    if (!AppState.soundEnabled) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Cancela falas anteriores

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.92; // Velocidade confortável para o 1º ano
    utterance.pitch = 1.15; // Tom amigável e acolhedor

    // Tenta encontrar uma voz em pt-BR de boa qualidade
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.startsWith('pt') || v.lang.includes('BR'));
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  // Alternador de Som no Cabeçalho
  dom.btnSoundToggle.addEventListener('click', () => {
    AppState.soundEnabled = !AppState.soundEnabled;
    if (AppState.soundEnabled) {
      dom.btnSoundToggle.classList.add('active-sound');
      dom.soundIcon.textContent = '🔊';
      dom.soundText.textContent = 'Som';
      playSoundEffect('tap');
    } else {
      dom.btnSoundToggle.classList.remove('active-sound');
      dom.soundIcon.textContent = '🔇';
      dom.soundText.textContent = 'Mudo';
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  });

  // =========================================================================
  // 4. GERENCIAMENTO DE TELAS E NAVEGAÇÃO
  // =========================================================================
  function showScreen(screenName) {
    AppState.currentScreen = screenName;
    
    // Oculta todas
    dom.screenHome.classList.remove('screen-active');
    dom.screenMission.classList.remove('screen-active');
    dom.screenConclusion.classList.remove('screen-active');

    // Exibe a tela alvo
    if (screenName === 'home') {
      dom.screenHome.classList.add('screen-active');
    } else if (screenName === 'mission') {
      dom.screenMission.classList.add('screen-active');
    } else if (screenName === 'conclusion') {
      dom.screenConclusion.classList.add('screen-active');
      playSoundEffect('success');
      speakText('Parabéns! Você completou todas as missões dos agrupamentos!');
    }
  }

  // Atualiza os indicadores de progresso na barra superior
  function updateProgressTracker() {
    dom.missionTrackerSteps.forEach((stepEl, idx) => {
      stepEl.classList.remove('active', 'completed');
      if (idx === AppState.currentMissionIndex) {
        stepEl.classList.add('active');
      } else if (AppState.completedMissions[idx]) {
        stepEl.classList.add('completed');
      }
    });
  }

  // =========================================================================
  // 5. CARREGAMENTO E RENDERIZAÇÃO DAS MISSÕES
  // =========================================================================
  function loadMission(index) {
    AppState.currentMissionIndex = index;
    AppState.selectedItemIds.clear();
    AppState.selectedRuleOptionId = null;
    AppState.attemptsInCurrentMission = 0;

    const mission = MISSIONS_DATA[index];
    if (!mission) return;

    // Atualiza cabeçalho e instrução da missão
    dom.missionTitleText.textContent = mission.title;
    dom.missionInstructionText.textContent = mission.instruction;
    updateProgressTracker();

    // Renderiza área dinâmica conforme o tipo da missão
    dom.missionDynamicArea.innerHTML = '';

    if (mission.type === 'color' || mission.type === 'shape' || mission.type === 'category') {
      renderStandardSelectionMission(mission);
    } else if (mission.type === 'deduce_rule') {
      renderDeduceRuleMission(mission);
    } else if (mission.type === 'custom_group') {
      renderCustomGroupMission(mission);
    }

    // Narra a instrução após um breve momento
    setTimeout(() => {
      speakText(mission.speechText || mission.instruction);
    }, 350);
  }

  // Renderizador para Missões 1, 2 e 3 (Grid de 6 Objetos)
  function renderStandardSelectionMission(mission) {
    const grid = document.createElement('div');
    grid.className = 'objects-grid';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', 'Lista de objetos para agrupar');

    mission.itemIds.forEach(itemId => {
      const obj = OBJECTS_CATALOG[itemId];
      if (!obj) return;

      const card = document.createElement('button');
      card.className = 'object-card';
      card.dataset.id = obj.id;
      card.setAttribute('type', 'button');
      card.setAttribute('aria-label', `${obj.name}`);
      card.setAttribute('aria-pressed', 'false');

      card.innerHTML = `
        <div class="selection-badge" aria-hidden="true">✔</div>
        <div class="card-icon-container">
          ${obj.svg}
        </div>
        <span class="card-label">${obj.name}</span>
      `;

      card.addEventListener('click', () => {
        toggleItemSelection(obj.id, card);
      });

      grid.appendChild(card);
    });

    dom.missionDynamicArea.appendChild(grid);
  }

  // Renderizador para Missão 4 (Dedução da Regra Comum)
  function renderDeduceRuleMission(mission) {
    // Grupo pré-formado em exibição
    const showcase = document.createElement('div');
    showcase.className = 'showcase-group';
    showcase.innerHTML = `<h3 class="showcase-title">📦 Grupo de Objetos Reunidos:</h3>`;

    const showcaseGrid = document.createElement('div');
    showcaseGrid.className = 'showcase-grid';

    mission.groupItems.forEach(itemId => {
      const obj = OBJECTS_CATALOG[itemId];
      if (!obj) return;
      const itemEl = document.createElement('div');
      itemEl.className = 'showcase-item';
      itemEl.innerHTML = `
        <div style="width: 50px; height: 50px;">${obj.svg}</div>
        <span style="font-size: 0.8rem; font-weight: 800; margin-top: 4px;">${obj.name}</span>
      `;
      showcaseGrid.appendChild(itemEl);
    });
    showcase.appendChild(showcaseGrid);
    dom.missionDynamicArea.appendChild(showcase);

    // Opções de alternativas
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    optionsContainer.setAttribute('role', 'radiogroup');
    optionsContainer.setAttribute('aria-label', 'Escolha a regra comum');

    mission.options.forEach(opt => {
      const btnOpt = document.createElement('button');
      btnOpt.className = 'btn-rule-option';
      btnOpt.dataset.id = opt.id;
      btnOpt.setAttribute('type', 'button');
      btnOpt.setAttribute('role', 'radio');
      btnOpt.setAttribute('aria-checked', 'false');
      btnOpt.textContent = opt.text;

      btnOpt.addEventListener('click', () => {
        playSoundEffect('tap');
        document.querySelectorAll('.btn-rule-option').forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-checked', 'false');
        });
        btnOpt.classList.add('selected');
        btnOpt.setAttribute('aria-checked', 'true');
        AppState.selectedRuleOptionId = opt.id;
      });

      optionsContainer.appendChild(btnOpt);
    });

    dom.missionDynamicArea.appendChild(optionsContainer);
  }

  // Renderizador para Missão 5 (Meu Agrupamento Livre)
  function renderCustomGroupMission(mission) {
    // 1. Seletor de Critério
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'criteria-selector-container';
    selectorContainer.innerHTML = `<h3 class="criteria-title">1. Escolha a sua regra de agrupamento:</h3>`;

    const btnGroup = document.createElement('div');
    btnGroup.className = 'criteria-buttons';

    // Critério padrão inicial (Grupo dos Vermelhos)
    AppState.customCriterion = mission.availableCriteria[0];

    mission.availableCriteria.forEach((crit, idx) => {
      const btn = document.createElement('button');
      btn.className = `btn-criterion ${idx === 0 ? 'active' : ''}`;
      btn.textContent = crit.label;
      btn.setAttribute('type', 'button');

      btn.addEventListener('click', () => {
        playSoundEffect('tap');
        document.querySelectorAll('.btn-criterion').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        AppState.customCriterion = crit;
        // Limpa seleções anteriores ao trocar de regra para incentivar nova reflexão
        AppState.selectedItemIds.clear();
        document.querySelectorAll('.objects-grid .object-card').forEach(c => {
          c.classList.remove('selected', 'guided-hint');
          c.setAttribute('aria-pressed', 'false');
        });
        speakText(`Regra escolhida: ${crit.label}. Agora selecione os objetos!`);
      });

      btnGroup.appendChild(btn);
    });

    selectorContainer.appendChild(btnGroup);
    dom.missionDynamicArea.appendChild(selectorContainer);

    // 2. Grid com os 8 objetos disponíveis
    const promptTitle = document.createElement('h3');
    promptTitle.className = 'showcase-title';
    promptTitle.style.marginBottom = '14px';
    promptTitle.textContent = '2. Selecione todos os objetos que combinam com a sua regra:';
    dom.missionDynamicArea.appendChild(promptTitle);

    const grid = document.createElement('div');
    grid.className = 'objects-grid';

    mission.itemPool.forEach(itemId => {
      const obj = OBJECTS_CATALOG[itemId];
      if (!obj) return;

      const card = document.createElement('button');
      card.className = 'object-card';
      card.dataset.id = obj.id;
      card.setAttribute('type', 'button');
      card.setAttribute('aria-label', `${obj.name}`);
      card.setAttribute('aria-pressed', 'false');

      card.innerHTML = `
        <div class="selection-badge" aria-hidden="true">✔</div>
        <div class="card-icon-container">
          ${obj.svg}
        </div>
        <span class="card-label">${obj.name}</span>
      `;

      card.addEventListener('click', () => {
        toggleItemSelection(obj.id, card);
      });

      grid.appendChild(card);
    });

    dom.missionDynamicArea.appendChild(grid);
  }

  // Alterna a seleção do cartão (Toque / Clique simples)
  function toggleItemSelection(itemId, cardElement) {
    playSoundEffect('tap');

    if (AppState.selectedItemIds.has(itemId)) {
      AppState.selectedItemIds.delete(itemId);
      cardElement.classList.remove('selected');
      cardElement.setAttribute('aria-pressed', 'false');
    } else {
      AppState.selectedItemIds.add(itemId);
      cardElement.classList.add('selected');
      cardElement.setAttribute('aria-pressed', 'true');
    }
  }

  // =========================================================================
  // 6. VALIDAÇÃO FORMATIVA PEDAGÓGICA (Sem Punição)
  // =========================================================================
  function validateCurrentMission() {
    const mission = MISSIONS_DATA[AppState.currentMissionIndex];
    if (!mission) return;

    AppState.attemptsInCurrentMission++;

    let isSuccess = false;
    let customFeedbackMessage = '';

    // Validação de Missões Padrão (1, 2, 3)
    if (mission.type === 'color' || mission.type === 'shape' || mission.type === 'category') {
      if (AppState.selectedItemIds.size === 0) {
        showFeedbackModal(false, 'Toque nos objetos!', 'Toque em pelo menos um objeto para colocá-lo no grupo antes de verificar!');
        return;
      }

      const correctSet = new Set(mission.correctIds);
      const isExactMatch = (
        AppState.selectedItemIds.size === correctSet.size &&
        [...AppState.selectedItemIds].every(id => correctSet.has(id))
      );

      if (isExactMatch) {
        isSuccess = true;
        customFeedbackMessage = mission.feedback.success;
      } else {
        isSuccess = false;
        customFeedbackMessage = mission.feedback.hint;
        
        // Andaime pedagógico: se for a 2ª tentativa com dúvida, ativa brilho sutil nos corretos
        if (AppState.attemptsInCurrentMission >= 2) {
          mission.correctIds.forEach(id => {
            const card = document.querySelector(`.object-card[data-id="${id}"]`);
            if (card) card.classList.add('guided-hint');
          });
        }
      }
    } 
    // Validação da Missão 4 (Dedução de Regra)
    else if (mission.type === 'deduce_rule') {
      if (!AppState.selectedRuleOptionId) {
        showFeedbackModal(false, 'Escolha uma opção!', 'Toque na opção que você acha que é a regra comum deste grupo!');
        return;
      }

      const selectedOption = mission.options.find(o => o.id === AppState.selectedRuleOptionId);
      if (selectedOption && selectedOption.isCorrect) {
        isSuccess = true;
        customFeedbackMessage = mission.feedback.success;
      } else {
        isSuccess = false;
        customFeedbackMessage = selectedOption?.hint || mission.feedback.hint;
      }
    }
    // Validação da Missão 5 (Meu Agrupamento Livre)
    else if (mission.type === 'custom_group') {
      if (AppState.selectedItemIds.size === 0) {
        showFeedbackModal(false, 'Selecione os objetos!', 'Toque nos objetos que pertencem à regra que você escolheu!');
        return;
      }

      const crit = AppState.customCriterion;
      const matchingIds = mission.itemPool.filter(id => {
        const obj = OBJECTS_CATALOG[id];
        return obj && obj[crit.attribute] === crit.target;
      });

      const matchingSet = new Set(matchingIds);
      const isExactMatch = (
        AppState.selectedItemIds.size === matchingSet.size &&
        [...AppState.selectedItemIds].every(id => matchingSet.has(id))
      );

      if (isExactMatch) {
        isSuccess = true;
        customFeedbackMessage = `Parabéns! Todos os objetos que você escolheu combinam perfeitamente com o seu ${crit.label}!`;
      } else {
        isSuccess = false;
        customFeedbackMessage = `Dica do Lino: Olhe bem para os itens selecionados! Todos eles combinam com o ${crit.label}? Tente ajustar seu grupo!`;
        
        if (AppState.attemptsInCurrentMission >= 2) {
          matchingIds.forEach(id => {
            const card = document.querySelector(`.object-card[data-id="${id}"]`);
            if (card) card.classList.add('guided-hint');
          });
        }
      }
    }

    // Exibe o modal formativo
    if (isSuccess) {
      AppState.completedMissions[AppState.currentMissionIndex] = true;
      playSoundEffect('success');
      showFeedbackModal(true, 'Sensacional!', customFeedbackMessage);
    } else {
      playSoundEffect('hint');
      showFeedbackModal(false, 'Quase lá!', customFeedbackMessage);
    }
  }

  // =========================================================================
  // 7. MODAL DE FEEDBACK FORMATIVO (Sem Punição)
  // =========================================================================
  function showFeedbackModal(isSuccess, title, message) {
    dom.feedbackCardContent.className = 'feedback-card ' + (isSuccess ? 'feedback-success' : 'feedback-hint');
    dom.feedbackIcon.textContent = isSuccess ? '🎉' : '💡';
    dom.feedbackTitle.textContent = title;
    dom.feedbackMessage.textContent = message;

    if (isSuccess) {
      const isLastMission = AppState.currentMissionIndex === MISSIONS_DATA.length - 1;
      dom.btnFeedbackAction.textContent = isLastMission ? 'Ver Conclusão 🏆' : 'Próxima Missão ➔';
      dom.btnFeedbackAction.onclick = () => {
        closeFeedbackModal();
        if (isLastMission) {
          showScreen('conclusion');
        } else {
          loadMission(AppState.currentMissionIndex + 1);
        }
      };
    } else {
      dom.btnFeedbackAction.textContent = 'Tentar Novamente 🔍';
      dom.btnFeedbackAction.onclick = () => {
        closeFeedbackModal();
      };
    }

    dom.feedbackModal.classList.add('active');
    speakText(message);
  }

  function closeFeedbackModal() {
    dom.feedbackModal.classList.remove('active');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // =========================================================================
  // 8. EVENTOS DE ENTRADA & INICIALIZAÇÃO
  // =========================================================================
  
  // Injeta Mascote Lino nos slots
  dom.homeMascotSlot.innerHTML = MASCOT_SVG;
  dom.missionMascotSlot.innerHTML = MASCOT_SVG;

  // Botão Começar da Tela Inicial
  dom.btnStart.addEventListener('click', () => {
    playSoundEffect('tap');
    showScreen('mission');
    loadMission(0);
  });

  // Botão Ouvir Instrução
  dom.btnSpeakInstruction.addEventListener('click', () => {
    const mission = MISSIONS_DATA[AppState.currentMissionIndex];
    if (mission) {
      speakText(mission.speechText || mission.instruction);
    }
  });

  // Botão de Verificar Grupo
  dom.btnVerify.addEventListener('click', () => {
    validateCurrentMission();
  });

  // Botão Jogar Novamente
  dom.btnRestart.addEventListener('click', () => {
    playSoundEffect('tap');
    AppState.completedMissions = [false, false, false, false, false];
    showScreen('mission');
    loadMission(0);
  });

  // Inicializa na Tela Inicial
  showScreen('home');
});
