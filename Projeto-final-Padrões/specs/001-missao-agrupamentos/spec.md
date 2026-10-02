# Feature Specification: Missão dos Agrupamentos

**Feature Branch**: `001-missao-agrupamentos`

**Created**: 2026-10-02

**Status**: Draft

**Input**: User description: "Desenvolva a especificação funcional de uma aplicação educacional chamada 'Missão dos Agrupamentos'. Público: Alunos do 1º ano do Ensino Fundamental. Habilidade: BNCC Computação EF01CO01. Problema: As crianças precisam aprender a perceber características dos objetos e reconhecer que eles podem ser agrupados de diferentes maneiras dependendo do critério observado. A aplicação deverá possuir: Tela Inicial, Missão 1 — Cores, Missão 2 — Formas, Missão 3 — Categorias, Missão 4 — Descubra a Regra, Missão Final — Meu Agrupamento, Feedback formativo com dicas acolhedoras, Conclusão conceitual. Requisitos: interface responsiva (desktop, tablet e celular), sem login, sem banco de dados, funcionamento estático no GitHub Pages, linguagem apropriada ao 1º ano, interação predominantemente visual."

---

## Clarifications

### Session 2026-10-02

- Q: Qual deve ser o mecanismo principal de interação para as crianças agruparem os objetos nas missões? → A: Toque/Clique simples com realce visual (borda/brilho destacado) e botão de confirmação, garantindo acessibilidade em dispositivos móveis, tablets e desktop para a faixa etária do 1º ano.
- Q: Como deve funcionar a reprodução do áudio das instruções e dicas para garantir acessibilidade sem onerar o carregamento? → A: Síntese de voz nativa do navegador (Web Speech API) com voz em pt-BR, garantindo execução 100% offline, leve e sem dependência de arquivos de áudio externos.
- Q: Como devem ser representados graficamente os objetos e o mascote na aplicação? → A: Ilustrações vetoriais SVG / pictogramas coloridos de alto contraste com estilo lúdico e amigável, garantindo resolução nítida em qualquer tela e carregamento instantâneo.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Acolhimento e Início da Aventura (Priority: P1)

Como aluno do 1º ano do Ensino Fundamental, quero acessar a aplicação, ser recebido por um personagem guia amigável e iniciar a atividade com facilidade, para que eu compreenda o objetivo do jogo sem depender de leitura complexa.

**Why this priority**: É a porta de entrada da experiência infantil. Sem uma introdução clara, visual e acessível, a criança perde o engajamento inicial.

**Independent Test**: Pode ser testado abrindo a página inicial, visualizando o personagem orientador, ouvindo/lendo a instrução básica e clicando no botão de início para carregar a primeira missão.

**Acceptance Scenarios**:

1. **Given** que o aluno acessa a página inicial da aplicação, **When** a tela é carregada, **Then** ele visualiza o título "Missão dos Agrupamentos", a ilustração do personagem guia e o botão proeminente "Começar".
2. **Given** que o aluno está na tela inicial, **When** ele clica ou toca no botão "Começar", **Then** a aplicação faz uma transição suave e exibe a Missão 1.
3. **Given** que o aluno prefere suporte auditivo, **When** ele clica no botão de áudio/locução, **Then** a instrução inicial é narrada em português claro.

---

### User Story 2 - Agrupamento por Atributos Primários: Cores e Formas (Priority: P1)

Como aluno em fase de letramento, quero identificar e agrupar objetos que compartilham a mesma cor (Missão 1) e depois objetos com formatos semelhantes (Missão 2), para exercitar o isolamento de atributos visuais específicos.

**Why this priority**: Representa a base do pensamento computacional e da habilidade EF01CO01 (identificação de padrões em atributos visuais elementares).

**Independent Test**: Pode ser testado apresentando um grid com 6 objetos mistos, permitindo a seleção de múltiplos itens e validando se os itens pertencentes ao critério (ex.: cor amarela ou formato redondo) são reconhecidos com feedback formativo.

**Acceptance Scenarios**:

1. **Given** que o aluno está na Missão 1 (Cores), **When** ele observa 6 objetos e seleciona todos os 3 objetos amarelos e confirma, **Then** o sistema exibe uma mensagem positiva explicando que todos aqueles objetos formam o grupo do amarelo e avança para a próxima missão.
2. **Given** que o aluno seleciona um objeto de cor incorreta ou deixa de selecionar algum objeto amarelo, **When** ele clica em verificar, **Then** o sistema exibe uma dica acolhedora incentivando a observar as cores novamente sem usar termos punitivos.
3. **Given** que o aluno avança para a Missão 2 (Formas), **When** ele seleciona os 3 objetos com contorno redondo e confirma, **Then** o sistema valida o sucesso explicando a semelhança de forma.

---

### User Story 3 - Agrupamento por Categoria e Função (Priority: P2)

Como aluno, quero classificar figuras de acordo com sua categoria (animais, alimentos, brinquedos ou transportes) na Missão 3, para que eu aprenda a agrupar objetos por critérios conceituais e de utilidade.

**Why this priority**: Eleva o nível de abstração do visual imediato (cor/forma) para o conceitual e semântico (função/natureza do objeto).

**Independent Test**: Pode ser testado exibindo figuras mistas de diferentes categorias e verificando se o usuário consegue isolar a categoria solicitada (ex.: animais).

**Acceptance Scenarios**:

1. **Given** que o aluno está na Missão 3, **When** ele recebe a instrução para colocar no baú apenas as figuras de animais e seleciona os 3 animais entre as 6 figuras exibidas, **Then** o sistema aprova o agrupamento e explica a categoria comum.
2. **Given** que o aluno inclui acidentalmente um brinquedo ou meio de transporte, **When** a verificação é acionada, **Then** o sistema orienta a verificar se todos os itens selecionados são realmente animais vivos.

---

### User Story 4 - Reconhecimento Indutivo da Regra de um Grupo (Priority: P2)

Como aluno, quero observar um conjunto de objetos já reunidos na Missão 4 e descobrir qual é a regra secreta que os une, para desenvolver raciocínio lógico indutivo.

**Why this priority**: Consolida a habilidade de dedução de regras a partir de conjuntos de dados existentes.

**Independent Test**: Pode ser testado apresentando um grupo pré-definido (ex.: maçã, morango, coração, carro de bombeiros) e permitindo à criança selecionar a opção correspondente à característica comum ("Todos são vermelhos").

**Acceptance Scenarios**:

1. **Given** que o aluno observa um grupo pré-formado com objetos vermelhos de diferentes categorias, **When** ele escolhe a alternativa "Todos possuem a cor vermelha", **Then** o sistema parabeniza pela dedução correta e explica o raciocínio.
2. **Given** que o aluno escolhe uma alternativa incorreta (ex.: "Todos são de comer"), **When** a resposta é processada, **Then** o sistema exibe uma dica lembrando que nem todos os itens do grupo são alimentos (ex.: carro de bombeiros).

---

### User Story 5 - Criação Autônoma de Agrupamentos e Síntese de Aprendizagem (Priority: P1)

Como aluno, quero escolher meu próprio critério de agrupamento na Missão Final e depois selecionar os itens que correspondem a ele, concluindo com uma síntese visual que demonstre que os mesmos objetos podem formar grupos diferentes.

**Why this priority**: É o ápice da habilidade BNCC EF01CO01, demonstrando flexibilidade cognitiva e autonomia no pensamento computacional.

**Independent Test**: Pode ser testado permitindo a escolha de um critério (cor, categoria ou forma), selecionando os itens correspondentes a partir de um catálogo misto e verificando a tela final com a mensagem de conclusão.

**Acceptance Scenarios**:

1. **Given** que o aluno entra na Missão Final, **When** ele seleciona o critério "Coisas de Comer", **Then** o sistema ajusta a validação para esperar apenas os itens comestíveis do catálogo.
2. **Given** que o aluno seleciona corretamente os itens do seu critério escolhido, **When** ele finaliza a missão, **Then** o sistema o direciona para a Tela de Conclusão.
3. **Given** que o aluno chega à Tela de Conclusão, **When** a tela é exibida, **Then** o sistema apresenta a celebração com a síntese: "Os mesmos objetos podem formar grupos diferentes dependendo da característica que observamos!" e oferece a opção de jogar novamente.

---

## Edge Cases

- **Nenhum item selecionado ao clicar em verificar**: O botão de confirmação permanece desabilitado ou emite uma dica visual suave indicando para tocar em um objeto primeiro.
- **Deseleção de itens**: O aluno deve conseguir tocar em um item já selecionado para removê-lo do grupo antes de confirmar.
- **Tentativas repetidas incorretas**: Se a criança receber 2 feedbacks de ajuste na mesma missão, uma pista visual adicional (como um leve brilho no contorno dos itens corretos) é ativada para evitar frustração.
- **Redimensionamento de tela ou rotação de dispositivo**: A interface deve reorganizar o grid de objetos sem perder o estado da missão em andamento nem desmarcar itens já selecionados.
- **Dispositivo sem suporte a áudio / mudo**: Todas as instruções e dicas possuem representação textual e visual equivalente para que a experiência não dependa exclusivamente do áudio.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer uma Tela Inicial com título "Missão dos Agrupamentos", mascote infantil orientador, botão "Começar" e instrução simples.
- **FR-002**: O sistema DEVE oferecer recurso de narração/áudio para todas as instruções e feedbacks apresentados nas telas utilizando a Web Speech API nativa (voz pt-BR), funcionando sem dependências externas e de forma leve.
- **FR-003**: O sistema DEVE implementar a Missão 1 com 6 objetos ilustrados em vetor SVG, permitindo selecionar objetos com base em cor através de toque/clique simples com destaque visual de seleção e botão de confirmação.
- **FR-004**: O sistema DEVE implementar a Missão 2 com 6 objetos ilustrados em vetor SVG, permitindo selecionar objetos com base em formato geométrico através de toque/clique simples.
- **FR-005**: O sistema DEVE implementar a Missão 3 com 6 objetos variados (animais, alimentos, brinquedos, transportes), permitindo agrupá-los por categoria funcional por meio de toque/clique simples.
- **FR-006**: O sistema DEVE implementar a Missão 4 exibindo um grupo já montado e permitindo ao aluno deduzir e selecionar a regra comum entre opções ilustradas.
- **FR-007**: O sistema DEVE implementar a Missão Final permitindo que o aluno escolha primeiro o critério de agrupamento e em seguida selecione os objetos correspondentes com toque/clique simples.
- **FR-008**: O sistema DEVE fornecer feedback positivo imediato com explicação da característica comum quando o agrupamento estiver correto.
- **FR-009**: O sistema DEVE fornecer feedback formativo com dicas acolhedoras de observação quando o agrupamento necessitar de revisão, sem utilizar termos punitivos ou mensagens secas de "errado".
- **FR-010**: O sistema DEVE exibir uma Tela de Conclusão ao término das missões, comemorando o progresso e reforçando a síntese pedagógica: *"Os mesmos objetos podem formar grupos diferentes dependendo da característica que observamos."*
- **FR-011**: O sistema DEVE permitir reiniciar o jogo ou refazer agrupamentos a partir da tela de conclusão.
- **FR-012**: O sistema DEVE ser totalmente funcional em arquitetura web estática (sem backend e sem banco de dados), operando de forma autônoma no GitHub Pages.
- **FR-013**: O sistema DEVE ser responsivo e adaptável a telas de smartphones, tablets e computadores desktop.
- **FR-014**: O sistema NÃO DEVE exigir login, cadastro ou coleta de informações pessoais dos alunos.

---

### Key Entities

- **ObjetoEducacional**: Representa cada item manipulável na aplicação.
  - *Atributos*: `id`, `nome`, `imagemUrl`, `cor` (ex.: vermelho, amarelo, azul), `forma` (ex.: redondo, quadrado, retangular), `categoria` (ex.: animal, alimento, brinquedo, transporte), `dicaObservacao`.
- **Missao**: Representa a etapa pedagógica ativa.
  - *Atributos*: `numero`, `titulo`, `tipoCriterio` (cor, forma, categoria, deducao, livre), `instrucaoTexto`, `instrucaoAudio`, `itensDisponiveis`, `criterioAlvo`, `regraEsperada`.
- **FeedbackPedagogico**: Mensagem estruturada emitida após cada ação da criança.
  - *Atributos*: `tipo` (sucesso, dica_revisao), `textoExplicativo`, `audioExplicativo`, `destaqueVisual`.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Crianças de 6 a 7 anos conseguem iniciar uma missão na tela inicial em até 5 segundos com apenas 1 toque/clique.
- **SC-002**: 100% dos feedbacks de erro são formulados como dicas pedagógicas construtivas de observação, sem nenhuma menção a "erro", "falha" ou "perda de pontos".
- **SC-003**: A aplicação é 100% utilizável em telas touch de 4.7 polegadas a 12.9 polegadas e em monitores desktop sem rolagem horizontal indesejada.
- **SC-004**: O tempo de carregamento inicial da aplicação em conexões padrão 3G/4G é inferior a 2.5 segundos.
- **SC-005**: Ao final da experiência, 100% dos usuários que concluem as 5 missões passam pela mensagem de síntese da BNCC EF01CO01.

---

## Assumptions

- Os alunos do 1º ano possuem níveis heterogêneos de alfabetização; portanto, a interface prioriza elementos visuais, ícones intuitivos e suporte auditivo opcional.
- A aplicação será executada em navegadores modernos compatíveis com padrões HTML5 (Chrome, Safari, Edge, Firefox) sem necessidade de plugins adicionais.
- A persistência do progresso entre missões durante a sessão ocorre localmente no navegador (estado em memória/local), não necessitando de conectividade persistente após o carregamento.
