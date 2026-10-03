/**
 * Missão dos Agrupamentos - Banco de Dados Local & Configuração das Missões
 * Alinhado à BNCC Computação EF01CO01 (8 Missões Educativas Progressivas)
 */

const OBJECTS_CATALOG = {
  // --- Objetos Amarelos / Frutas / Redondos / Variados ---
  banana: {
    id: 'banana',
    name: 'Banana',
    color: 'amarelo',
    shape: 'alongado',
    category: 'alimento',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <path d="M25,20 C45,25 75,50 70,80 C60,82 50,75 40,65 C30,50 20,35 25,20 Z" fill="#FDD835" stroke="#F57F17" stroke-width="3" stroke-linecap="round"/>
      <path d="M24,20 C22,15 26,10 28,12 L30,16" stroke="#5D4037" stroke-width="4" stroke-linecap="round"/>
      <path d="M68,78 C70,82 72,85 70,86 C68,87 66,84 65,81" stroke="#5D4037" stroke-width="3"/>
      <path d="M35,32 C48,42 62,58 60,74" stroke="#FFEE58" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`,
    hint: 'A banana tem a casca bem amarela e é uma fruta gostosa!'
  },
  sol: {
    id: 'sol',
    name: 'Sol',
    color: 'amarelo',
    shape: 'redondo',
    category: 'natureza',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <circle cx="50" cy="50" r="24" fill="#FFEB3B" stroke="#F57F17" stroke-width="3"/>
      <g stroke="#F57F17" stroke-width="3" stroke-linecap="round">
        <line x1="50" y1="12" x2="50" y2="20" />
        <line x1="50" y1="80" x2="50" y2="88" />
        <line x1="12" y1="50" x2="20" y2="50" />
        <line x1="80" y1="50" x2="88" y2="50" />
        <line x1="23" y1="23" x2="29" y2="29" />
        <line x1="71" y1="71" x2="77" y2="77" />
        <line x1="23" y1="77" x2="29" y2="71" />
        <line x1="71" y1="29" x2="77" y2="23" />
      </g>
      <circle cx="43" cy="46" r="3" fill="#E65100"/>
      <circle cx="57" cy="46" r="3" fill="#E65100"/>
      <path d="M43,56 Q50,63 57,56" stroke="#E65100" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>`,
    hint: 'O sol brilha lá no céu com sua cor amarela e formato redondinho!'
  },
  pato: {
    id: 'pato',
    name: 'Patinho',
    color: 'amarelo',
    shape: 'organico',
    category: 'brinquedo',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <path d="M30,55 C30,40 50,40 60,48 C70,48 85,55 80,75 C75,85 45,88 35,80 C30,75 30,65 30,55 Z" fill="#FDD835" stroke="#F57F17" stroke-width="3"/>
      <circle cx="42" cy="38" r="16" fill="#FDD835" stroke="#F57F17" stroke-width="3"/>
      <path d="M30,38 Q20,40 26,46 Q32,46 34,42 Z" fill="#FF7043" stroke="#D84315" stroke-width="2"/>
      <circle cx="40" cy="34" r="3" fill="#212121"/>
      <circle cx="41" cy="33" r="1" fill="#FFFFFF"/>
    </svg>`,
    hint: 'O patinho de borracha é um brinquedo amarelo para a hora do banho!'
  },

  // --- Objetos Vermelhos / Formas / Alimentos ---
  maca: {
    id: 'maca',
    name: 'Maçã',
    color: 'vermelho',
    shape: 'redondo',
    category: 'alimento',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <path d="M50,32 C40,18 20,25 22,50 C24,75 42,86 50,86 C58,86 76,75 78,50 C80,25 60,18 50,32 Z" fill="#E53935" stroke="#B71C1C" stroke-width="3"/>
      <path d="M50,32 C49,20 54,14 58,12" stroke="#5D4037" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M56,18 C64,16 70,20 68,25 C60,26 56,22 56,18 Z" fill="#4CAF50" stroke="#2E7D32" stroke-width="1.5"/>
      <path d="M32,40 Q28,55 35,68" stroke="#FF8A80" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`,
    hint: 'A maçã é uma fruta vermelhinha e redonda!'
  },
  morango: {
    id: 'morango',
    name: 'Morango',
    color: 'vermelho',
    shape: 'organico',
    category: 'alimento',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <path d="M30,35 C20,50 35,80 50,88 C65,80 80,50 70,35 C60,25 40,25 30,35 Z" fill="#E53935" stroke="#B71C1C" stroke-width="3"/>
      <path d="M50,32 L42,22 L48,28 L50,18 L52,28 L58,22 L50,32" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>
      <circle cx="40" cy="45" r="1.5" fill="#FFE082"/>
      <circle cx="50" cy="48" r="1.5" fill="#FFE082"/>
      <circle cx="60" cy="45" r="1.5" fill="#FFE082"/>
      <circle cx="45" cy="60" r="1.5" fill="#FFE082"/>
      <circle cx="55" cy="60" r="1.5" fill="#FFE082"/>
      <circle cx="50" cy="72" r="1.5" fill="#FFE082"/>
    </svg>`,
    hint: 'O morango é uma fruta vermelha muito saborosa!'
  },
  coracao: {
    id: 'coracao',
    name: 'Coração',
    color: 'vermelho',
    shape: 'organico',
    category: 'simbolo',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <path d="M50,82 C20,62 14,40 25,26 C36,12 48,22 50,30 C52,22 64,12 75,26 C86,40 80,62 50,82 Z" fill="#E53935" stroke="#B71C1C" stroke-width="3"/>
      <path d="M30,30 Q25,38 28,46" stroke="#FF8A80" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>`,
    hint: 'O coração tem uma linda cor vermelha brilhante!'
  },
  carro_bombeiro: {
    id: 'carro_bombeiro',
    name: 'Carro de Bombeiro',
    color: 'vermelho',
    shape: 'retangular',
    category: 'transporte',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <rect x="18" y="38" width="55" height="32" rx="4" fill="#E53935" stroke="#B71C1C" stroke-width="3"/>
      <rect x="55" y="44" width="16" height="14" rx="2" fill="#E0F7FA" stroke="#00838F" stroke-width="1.5"/>
      <line x1="22" y1="32" x2="55" y2="32" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round"/>
      <line x1="28" y1="28" x2="28" y2="36" stroke="#78909C" stroke-width="2"/>
      <line x1="38" y1="28" x2="38" y2="36" stroke="#78909C" stroke-width="2"/>
      <line x1="48" y1="28" x2="48" y2="36" stroke="#78909C" stroke-width="2"/>
      <rect x="60" y="32" width="6" height="6" rx="2" fill="#00E5FF"/>
      <circle cx="32" cy="72" r="10" fill="#424242" stroke="#212121" stroke-width="2"/>
      <circle cx="32" cy="72" r="4" fill="#B0BEC5"/>
      <circle cx="62" cy="72" r="10" fill="#424242" stroke="#212121" stroke-width="2"/>
      <circle cx="62" cy="72" r="4" fill="#B0BEC5"/>
    </svg>`,
    hint: 'O carro de bombeiro é um veículo de socorro bem vermelho!'
  },

  // --- Objetos Redondos (Formas) ---
  moeda: {
    id: 'moeda',
    name: 'Moeda',
    color: 'amarelo',
    shape: 'redondo',
    category: 'objeto',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <circle cx="50" cy="50" r="34" fill="#FFD54F" stroke="#FFA000" stroke-width="3"/>
      <circle cx="50" cy="50" r="27" fill="none" stroke="#FFA000" stroke-width="2" stroke-dasharray="4,3"/>
      <text x="50" y="58" font-size="24" font-weight="bold" fill="#E65100" text-anchor="middle" font-family="sans-serif">\$</text>
    </svg>`,
    hint: 'A moeda é bem redondinha como um círculo!'
  },
  relogio: {
    id: 'relogio',
    name: 'Relógio Redondo',
    color: 'azul',
    shape: 'redondo',
    category: 'objeto',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <circle cx="50" cy="50" r="34" fill="#E1F5FE" stroke="#0288D1" stroke-width="4"/>
      <circle cx="50" cy="50" r="4" fill="#0277BD"/>
      <line x1="50" y1="50" x2="50" y2="28" stroke="#01579B" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="50" x2="66" y2="50" stroke="#01579B" stroke-width="3" stroke-linecap="round"/>
      <circle cx="50" cy="22" r="2" fill="#0288D1"/>
      <circle cx="78" cy="50" r="2" fill="#0288D1"/>
      <circle cx="50" cy="78" r="2" fill="#0288D1"/>
      <circle cx="22" cy="50" r="2" fill="#0288D1"/>
    </svg>`,
    hint: 'Este relógio de parede tem o formato perfeitamente redondo e cor azul!'
  },
  botao: {
    id: 'botao',
    name: 'Botão de Roupa',
    color: 'azul',
    shape: 'redondo',
    category: 'objeto',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <circle cx="50" cy="50" r="32" fill="#42A5F5" stroke="#1565C0" stroke-width="3"/>
      <circle cx="50" cy="50" r="24" fill="#64B5F6"/>
      <circle cx="42" cy="42" r="3" fill="#0D47A1"/>
      <circle cx="58" cy="42" r="3" fill="#0D47A1"/>
      <circle cx="42" cy="58" r="3" fill="#0D47A1"/>
      <circle cx="58" cy="58" r="3" fill="#0D47A1"/>
      <line x1="42" y1="42" x2="58" y2="58" stroke="#E3F2FD" stroke-width="1.5"/>
      <line x1="58" y1="42" x2="42" y2="58" stroke="#E3F2FD" stroke-width="1.5"/>
    </svg>`,
    hint: 'O botão de camisa tem a cor azul e o contorno redondo!'
  },

  // --- Objetos Quadrados / Retangulares ---
  livro: {
    id: 'livro',
    name: 'Livro',
    color: 'azul',
    shape: 'retangular',
    category: 'objeto',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <rect x="22" y="24" width="56" height="52" rx="3" fill="#29B6F6" stroke="#0288D1" stroke-width="3"/>
      <rect x="22" y="24" width="10" height="52" fill="#0277BD"/>
      <line x1="38" y1="40" x2="68" y2="40" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <line x1="38" y1="50" x2="62" y2="50" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      <line x1="38" y1="60" x2="55" y2="60" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
    hint: 'O livro tem linhas retas e formato retangular!'
  },
  caixa_presente: {
    id: 'caixa_presente',
    name: 'Caixa de Presente',
    color: 'verde',
    shape: 'quadrado',
    category: 'brinquedo',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <rect x="22" y="34" width="56" height="48" rx="2" fill="#66BB6A" stroke="#2E7D32" stroke-width="3"/>
      <rect x="18" y="26" width="64" height="12" rx="2" fill="#81C784" stroke="#2E7D32" stroke-width="3"/>
      <rect x="46" y="26" width="8" height="56" fill="#FFCA28"/>
      <path d="M42,22 C34,14 42,6 48,22 Z" fill="#FFCA28" stroke="#FFA000" stroke-width="1.5"/>
      <path d="M58,22 C66,14 58,6 52,22 Z" fill="#FFCA28" stroke="#FFA000" stroke-width="1.5"/>
    </svg>`,
    hint: 'A caixa de presente tem lados retos e formato quadrado!'
  },
  janela: {
    id: 'janela',
    name: 'Janela Quadrada',
    color: 'marrom',
    shape: 'quadrado',
    category: 'objeto',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <rect x="20" y="20" width="60" height="60" rx="3" fill="#8D6E63" stroke="#4E342E" stroke-width="4"/>
      <rect x="26" y="26" width="22" height="22" fill="#B3E5FC"/>
      <rect x="52" y="26" width="22" height="22" fill="#B3E5FC"/>
      <rect x="26" y="52" width="22" height="22" fill="#B3E5FC"/>
      <rect x="52" y="52" width="22" height="22" fill="#B3E5FC"/>
    </svg>`,
    hint: 'A janela é quadrada e tem quatro lados iguaizinhos!'
  },

  // --- Animais (Categorias) ---
  cachorro: {
    id: 'cachorro',
    name: 'Cachorrinho',
    color: 'marrom',
    shape: 'organico',
    category: 'animal',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <ellipse cx="26" cy="46" rx="8" ry="16" fill="#6D4C41" stroke="#4E342E" stroke-width="2"/>
      <ellipse cx="74" cy="46" rx="8" ry="16" fill="#6D4C41" stroke="#4E342E" stroke-width="2"/>
      <circle cx="50" cy="50" r="26" fill="#8D6E63" stroke="#4E342E" stroke-width="3"/>
      <ellipse cx="50" cy="60" rx="14" ry="10" fill="#D7CCC8"/>
      <polygon points="50,56 44,52 56,52" fill="#212121"/>
      <path d="M46,62 Q50,67 54,62" stroke="#212121" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="40" cy="46" r="3.5" fill="#212121"/>
      <circle cx="60" cy="46" r="3.5" fill="#212121"/>
      <circle cx="41" cy="45" r="1" fill="#FFFFFF"/>
      <circle cx="61" cy="45" r="1" fill="#FFFFFF"/>
    </svg>`,
    hint: 'O cachorrinho é um animal de quatro patas que late: au au!'
  },
  gato: {
    id: 'gato',
    name: 'Gatinho',
    color: 'laranja',
    shape: 'organico',
    category: 'animal',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <polygon points="28,26 40,40 24,44" fill="#FB8C00" stroke="#E65100" stroke-width="2"/>
      <polygon points="72,26 60,40 76,44" fill="#FB8C00" stroke="#E65100" stroke-width="2"/>
      <circle cx="50" cy="52" r="25" fill="#FFA726" stroke="#E65100" stroke-width="3"/>
      <polygon points="50,56 46,52 54,52" fill="#E91E63"/>
      <path d="M47,58 Q50,62 53,58" stroke="#212121" stroke-width="2" fill="none"/>
      <line x1="26" y1="56" x2="40" y2="58" stroke="#5D4037" stroke-width="1.5"/>
      <line x1="26" y1="62" x2="40" y2="60" stroke="#5D4037" stroke-width="1.5"/>
      <line x1="74" y1="56" x2="60" y2="58" stroke="#5D4037" stroke-width="1.5"/>
      <line x1="74" y1="62" x2="60" y2="60" stroke="#5D4037" stroke-width="1.5"/>
      <ellipse cx="38" cy="48" rx="3.5" ry="5" fill="#2E7D32"/>
      <ellipse cx="62" cy="48" rx="3.5" ry="5" fill="#2E7D32"/>
    </svg>`,
    hint: 'O gatinho é um animal fofinho que faz miau!'
  },
  elefante: {
    id: 'elefante',
    name: 'Elefante',
    color: 'cinza',
    shape: 'organico',
    category: 'animal',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <ellipse cx="28" cy="48" rx="14" ry="18" fill="#B0BEC5" stroke="#78909C" stroke-width="2.5"/>
      <ellipse cx="72" cy="48" rx="14" ry="18" fill="#B0BEC5" stroke="#78909C" stroke-width="2.5"/>
      <circle cx="50" cy="50" r="22" fill="#CFD8DC" stroke="#78909C" stroke-width="3"/>
      <path d="M46,55 Q50,75 62,72" stroke="#78909C" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="42" cy="46" r="3" fill="#212121"/>
      <circle cx="58" cy="46" r="3" fill="#212121"/>
    </svg>`,
    hint: 'O elefante é um animal grande que tem uma tromba comprida!'
  },

  // --- Novos Objetos para as Novas Missões ---
  cenoura: {
    id: 'cenoura',
    name: 'Cenoura',
    color: 'laranja',
    shape: 'alongado',
    category: 'alimento',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <polygon points="50,85 36,32 64,32" fill="#FF7043" stroke="#D84315" stroke-width="3"/>
      <line x1="42" y1="44" x2="54" y2="44" stroke="#D84315" stroke-width="2"/>
      <line x1="44" y1="58" x2="52" y2="58" stroke="#D84315" stroke-width="2"/>
      <!-- Folhas da rama -->
      <path d="M50,32 L40,16 L48,24 L50,12 L52,24 L60,16 L50,32" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>
    </svg>`,
    hint: 'A cenoura é um alimento vegetal muito crocante e saudável!'
  },
  passarinho: {
    id: 'passarinho',
    name: 'Passarinho Azul',
    color: 'azul',
    shape: 'organico',
    category: 'animal',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <circle cx="56" cy="42" r="16" fill="#42A5F5" stroke="#1565C0" stroke-width="2.5"/>
      <ellipse cx="46" cy="58" rx="22" ry="16" fill="#29B6F6" stroke="#1565C0" stroke-width="3"/>
      <polygon points="70,42 84,46 70,50" fill="#FFA000" stroke="#E65100" stroke-width="1.5"/>
      <circle cx="60" cy="38" r="2.5" fill="#212121"/>
      <!-- Asa -->
      <path d="M36,54 Q48,46 54,60 Q42,66 36,54 Z" fill="#1E88E5"/>
      <!-- Rabinho -->
      <polygon points="26,60 14,54 18,66" fill="#1565C0"/>
    </svg>`,
    hint: 'O passarinho é um animal de penas azuis que canta e voa!'
  },

  // --- Meios de Transporte / Brinquedos extras ---
  carro_azul: {
    id: 'carro_azul',
    name: 'Carro Azul',
    color: 'azul',
    shape: 'retangular',
    category: 'transporte',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <path d="M20,60 L32,42 L68,42 L80,60 L80,72 L20,72 Z" fill="#1E88E5" stroke="#0D47A1" stroke-width="3"/>
      <rect x="36" y="46" width="12" height="12" rx="2" fill="#E1F5FE"/>
      <rect x="52" y="46" width="12" height="12" rx="2" fill="#E1F5FE"/>
      <circle cx="34" cy="74" r="8" fill="#424242" stroke="#212121" stroke-width="2"/>
      <circle cx="66" cy="74" r="8" fill="#424242" stroke="#212121" stroke-width="2"/>
    </svg>`,
    hint: 'O carro é um meio de transporte azul que anda sobre rodas na rua!'
  },
  piao: {
    id: 'piao',
    name: 'Pião',
    color: 'verde',
    shape: 'triangular',
    category: 'brinquedo',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <polygon points="50,78 26,40 74,40" fill="#43A047" stroke="#1B5E20" stroke-width="3"/>
      <rect x="46" y="24" width="8" height="16" rx="2" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
      <circle cx="50" cy="84" r="3" fill="#757575"/>
      <line x1="34" y1="52" x2="66" y2="52" stroke="#FFD54F" stroke-width="3"/>
    </svg>`,
    hint: 'O pião é um brinquedo divertido que gira no chão!'
  },
  bola_azul: {
    id: 'bola_azul',
    name: 'Bola Azul',
    color: 'azul',
    shape: 'redondo',
    category: 'brinquedo',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <circle cx="50" cy="50" r="32" fill="#29B6F6" stroke="#0288D1" stroke-width="3"/>
      <path d="M26,35 C40,40 60,60 74,65" stroke="#FFFFFF" stroke-width="3" fill="none"/>
      <path d="M35,74 C40,60 60,40 65,26" stroke="#E1F5FE" stroke-width="2.5" fill="none"/>
    </svg>`,
    hint: 'A bola é azul, redondinha e serve para brincar!'
  },
  sapo: {
    id: 'sapo',
    name: 'Sapo Verde',
    color: 'verde',
    shape: 'organico',
    category: 'animal',
    svg: `<svg viewBox="0 0 100 100" class="obj-svg" aria-hidden="true">
      <circle cx="34" cy="36" r="10" fill="#81C784" stroke="#2E7D32" stroke-width="2"/>
      <circle cx="66" cy="36" r="10" fill="#81C784" stroke="#2E7D32" stroke-width="2"/>
      <circle cx="34" cy="36" r="4" fill="#212121"/>
      <circle cx="66" cy="36" r="4" fill="#212121"/>
      <ellipse cx="50" cy="56" rx="30" ry="22" fill="#4CAF50" stroke="#2E7D32" stroke-width="3"/>
      <path d="M36,60 Q50,70 64,60" stroke="#1B5E20" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="38" cy="52" r="3" fill="#C8E6C9"/>
      <circle cx="62" cy="52" r="3" fill="#C8E6C9"/>
    </svg>`,
    hint: 'O sapinho é verde e é um animal que pula!'
  }
};

// --- Configuração das 8 Missões Progressivas ---
const MISSIONS_DATA = [
  {
    id: 1,
    badgeIcon: '🎨',
    title: 'Missão 1 — O Desafio do Amarelo',
    instruction: 'Olá, pequeno detetive! Toque em todos os objetos que possuem a cor AMARELA para colocá-los no grupo!',
    speechText: 'Toque em todos os objetos que possuem a cor amarela!',
    type: 'color',
    targetValue: 'amarelo',
    itemIds: ['banana', 'sol', 'pato', 'maca', 'sapo', 'bola_azul'],
    correctIds: ['banana', 'sol', 'pato'],
    feedback: {
      success: 'Sensacional! A banana, o sol e o patinho são todos AMARELOS! Você formou o grupo das cores!',
      hint: 'Olhe com atenção para as cores de cada objeto: procure apenas os que têm a cor do sol (amarelo)!'
    }
  },
  {
    id: 2,
    badgeIcon: '📐',
    title: 'Missão 2 — O Enigma das Formas Redondas',
    instruction: 'Agora vamos observar o contorno! Encontre e selecione todos os objetos com formato REDONDO (círculo)!',
    speechText: 'Encontre e selecione todos os objetos que têm o formato redondo!',
    type: 'shape',
    targetValue: 'redondo',
    itemIds: ['moeda', 'relogio', 'botao', 'livro', 'caixa_presente', 'janela'],
    correctIds: ['moeda', 'relogio', 'botao'],
    feedback: {
      success: 'Muito bem! A moeda, o relógio e o botão têm a mesma forma: todos eles são REDONDOS!',
      hint: 'Passe o dedinho no contorno dos objetos. Procure os que não têm cantos retos e são redondinhos!'
    }
  },
  {
    id: 3,
    badgeIcon: '💙',
    title: 'Missão 3 — O Mar e o Céu Azul',
    instruction: 'Vamos mergulhar nas cores! Toque em todos os objetos que possuem a cor AZUL!',
    speechText: 'Selecione todos os objetos que possuem a cor azul!',
    type: 'color',
    targetValue: 'azul',
    itemIds: ['relogio', 'botao', 'bola_azul', 'carro_azul', 'maca', 'sol'],
    correctIds: ['relogio', 'botao', 'bola_azul', 'carro_azul'],
    feedback: {
      success: 'Incrível! O relógio, o botão, a bola e o carro compartilham a mesma cor: todos são AZUIS!',
      hint: 'Procure apenas os objetos com a cor azul, como o mar e o céu!'
    }
  },
  {
    id: 4,
    badgeIcon: '🐾',
    title: 'Missão 4 — O Baú dos Bichinhos',
    instruction: 'Vamos organizar o baú! Toque apenas nas figuras que representam ANIMAIS vivos!',
    speechText: 'Coloque no baú apenas as figuras de animais!',
    type: 'category',
    targetValue: 'animal',
    itemIds: ['cachorro', 'gato', 'elefante', 'passarinho', 'maca', 'piao'],
    correctIds: ['cachorro', 'gato', 'elefante', 'passarinho'],
    feedback: {
      success: 'Excelente! O cachorrinho, o gatinho, o elefante e o passarinho são todos ANIMAIS VIVOS!',
      hint: 'Veja com cuidado: algum dos itens é brinquedo ou fruta? Procure apenas os bichinhos!'
    }
  },
  {
    id: 5,
    badgeIcon: '🍎',
    title: 'Missão 5 — A Cesta dos Alimentos',
    instruction: 'Hora do lanche! Selecione todos os objetos que nós podemos COMER (Alimentos saudáveis)!',
    speechText: 'Selecione todos os objetos que são coisas de comer!',
    type: 'category',
    targetValue: 'alimento',
    itemIds: ['banana', 'maca', 'morango', 'cenoura', 'relogio', 'moeda'],
    correctIds: ['banana', 'maca', 'morango', 'cenoura'],
    feedback: {
      success: 'Que delícia! A banana, a maçã, o morango e a cenoura são todos ALIMENTOS saudáveis!',
      hint: 'Pense para que serve cada item: nós comemos relógio ou moeda? Escolha só as comidinhas!'
    }
  },
  {
    id: 6,
    badgeIcon: '📦',
    title: 'Missão 6 — O Desafio dos Cantinhos Retos',
    instruction: 'Observe as pontas e retas! Selecione os objetos que possuem formato QUADRADO ou RETANGULAR!',
    speechText: 'Encontre os objetos que têm formato quadrado ou retangular com lados retos!',
    type: 'shape_rect',
    targetValue: 'retos',
    itemIds: ['livro', 'caixa_presente', 'janela', 'moeda', 'bola_azul', 'sol'],
    correctIds: ['livro', 'caixa_presente', 'janela'],
    feedback: {
      success: 'Parabéns! O livro, a caixa de presente e a janela têm lados retos e cantinhos (quadrados e retângulos)!',
      hint: 'Procure os objetos que têm pontinhas e lados retos, e não os que são redondos!'
    }
  },
  {
    id: 7,
    badgeIcon: '🔍',
    title: 'Missão 7 — Descubra a Regra Secreta',
    instruction: 'Olhe bem para este grupo já formado. Qual é a característica comum que une todos eles?',
    speechText: 'Observe os objetos do grupo. O que todos eles têm em comum?',
    type: 'deduce_rule',
    groupItems: ['carro_bombeiro', 'morango', 'maca', 'coracao'],
    options: [
      { id: 'opt_food', text: '🍎 Todos são coisas de comer', isCorrect: false, hint: 'O carro de bombeiro e o coração não são coisas de comer! Pense no que todos têm igual.' },
      { id: 'opt_red', text: '🔴 Todos possuem a cor VERMELHA', isCorrect: true, hint: '' },
      { id: 'opt_transp', text: '🚗 Todos são meios de transporte', isCorrect: false, hint: 'A maçã e o morango são frutas, não são carros! O que todos têm igual?' }
    ],
    feedback: {
      success: 'Você é um verdadeiro detetive! Embora sejam de categorias diferentes, TODOS compartilham a cor VERMELHA!',
      hint: 'Observe a cor de cada um deles. Será que todos têm a mesma cor?'
    }
  },
  {
    id: 8,
    badgeIcon: '⭐',
    title: 'Missão Final — Meu Agrupamento Criativo',
    instruction: 'Agora é a sua vez! Escolha primeiro qual regra você quer criar e depois selecione os objetos do seu grupo!',
    speechText: 'Escolha uma regra para o seu grupo e depois selecione os objetos que combinam com ela!',
    type: 'custom_group',
    availableCriteria: [
      { id: 'crit_red', label: '🔴 Grupo dos Vermelhos (Cor)', attribute: 'color', target: 'vermelho' },
      { id: 'crit_food', label: '🍎 Grupo das Comidas (Categoria)', attribute: 'category', target: 'alimento' },
      { id: 'crit_round', label: '⭕ Grupo dos Redondos (Forma)', attribute: 'shape', target: 'redondo' }
    ],
    itemPool: ['maca', 'morango', 'banana', 'sol', 'moeda', 'carro_bombeiro', 'caixa_presente', 'cachorro'],
    feedback: {
      success: 'Espetacular! Você criou seu próprio agrupamento com muito sucesso!',
      hint: 'Verifique se todos os objetos marcados combinam com a regra que você escolheu!'
    }
  }
];

// Mascote SVG (Lino, o Guaxinim Curioso com lupa)
const MASCOT_SVG = `<svg viewBox="0 0 120 120" class="mascot-img" aria-hidden="true">
  <polygon points="25,20 45,45 20,50" fill="#546E7A" stroke="#37474F" stroke-width="2.5"/>
  <polygon points="28,26 40,42 24,46" fill="#CFD8DC"/>
  <polygon points="95,20 75,45 100,50" fill="#546E7A" stroke="#37474F" stroke-width="2.5"/>
  <polygon points="92,26 80,42 96,46" fill="#CFD8DC"/>
  <ellipse cx="60" cy="62" rx="38" ry="32" fill="#78909C" stroke="#37474F" stroke-width="3"/>
  <path d="M26,56 Q40,48 60,54 Q80,48 94,56 Q98,72 84,72 Q60,66 36,72 Q22,72 26,56 Z" fill="#263238"/>
  <circle cx="44" cy="58" r="8" fill="#FFFFFF"/>
  <circle cx="44" cy="58" r="5" fill="#212121"/>
  <circle cx="46" cy="56" r="2" fill="#FFFFFF"/>
  <circle cx="76" cy="58" r="8" fill="#FFFFFF"/>
  <circle cx="76" cy="58" r="5" fill="#212121"/>
  <circle cx="78" cy="56" r="2" fill="#FFFFFF"/>
  <ellipse cx="60" cy="74" rx="16" ry="11" fill="#ECEFF1"/>
  <ellipse cx="60" cy="69" rx="6" ry="4" fill="#212121"/>
  <path d="M56,76 Q60,80 64,76" stroke="#212121" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="34" cy="70" r="5" fill="#FF8A80" opacity="0.6"/>
  <circle cx="86" cy="70" r="5" fill="#FF8A80" opacity="0.6"/>
  <path d="M38,34 Q60,26 82,34 Q88,38 60,36 Z" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
  <ellipse cx="60" cy="32" rx="24" ry="8" fill="#A1887F"/>
</svg>`;
