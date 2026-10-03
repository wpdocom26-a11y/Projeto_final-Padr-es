/**
 * Gerador de PDF puro em Node.js (sem dependências externas)
 * Gera o documento README.pdf da aplicação Missão dos Agrupamentos
 */

const fs = require('fs');
const path = require('path');

class SimplePdfBuilder {
  constructor() {
    this.objects = [];
    this.pages = [];
    this.currentPageStreams = [];
  }

  addObject(content) {
    this.objects.push(content);
    return this.objects.length; // 1-based index
  }

  startPage() {
    const stream = [];
    this.currentPageStreams.push(stream);
    return stream;
  }

  build() {
    // Objeto 1: Catalog
    // Objeto 2: Outlines
    // Objeto 3: Pages
    // Objeto 4: Font Regular (Helvetica)
    // Objeto 5: Font Bold (Helvetica-Bold)
    // Objeto 6: Font Oblique (Helvetica-Oblique)
    
    const fontRegObj = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);
    const fontBoldObj = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);
    const fontItalicObj = this.addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`);

    const pageObjectIds = [];

    this.currentPageStreams.forEach((streamLines) => {
      const streamContent = streamLines.join('\n');
      const streamLen = Buffer.byteLength(streamContent, 'latin1');
      const contentObjId = this.addObject(`<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream`);
      
      const pageObjId = this.addObject(`<< /Type /Page /Parent 3 0 R /MediaBox [0 0 595.28 841.89] /Contents ${contentObjId} 0 R /Resources << /Font << /F1 ${fontRegObj} 0 R /F2 ${fontBoldObj} 0 R /F3 ${fontItalicObj} 0 R >> >> >>`);
      pageObjectIds.push(`${pageObjId} 0 R`);
    });

    const pagesObj = `<< /Type /Pages /Kids [${pageObjectIds.join(' ')}] /Count ${pageObjectIds.length} >>`;
    const catalogObj = `<< /Type /Catalog /Pages 3 0 R >>`;

    // Reorganiza os primeiros objetos para manter a ordem padrão
    const finalObjs = [
      catalogObj,                     // 1 0 R
      `<< /Type /Outlines /Count 0 >>`, // 2 0 R
      pagesObj,                       // 3 0 R
      ...this.objects
    ];

    let body = '%PDF-1.4\n%âãÏÓ\n';
    const xrefOffsets = [0];

    finalObjs.forEach((objContent, idx) => {
      xrefOffsets.push(Buffer.byteLength(body, 'latin1'));
      body += `${idx + 1} 0 obj\n${objContent}\nendobj\n`;
    });

    const xrefStart = Buffer.byteLength(body, 'latin1');
    body += `xref\n0 ${finalObjs.length + 1}\n0000000000 65535 f \n`;

    for (let i = 1; i <= finalObjs.length; i++) {
      const off = String(xrefOffsets[i]).padStart(10, '0');
      body += `${off} 00000 n \n`;
    }

    body += `trailer\n<< /Size ${finalObjs.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
    return Buffer.from(body, 'latin1');
  }
}

// Helper para escapar strings PDF
function escapePdf(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function generateReadmePdf() {
  const pdf = new SimplePdfBuilder();

  // ==========================================
  // PÁGINA 1
  // ==========================================
  const p1 = pdf.startPage();

  // Cabeçalho / Banner Azul
  p1.push(`q 0.098 0.463 0.824 rg 40 730 515 75 re f Q`); // Retângulo azul
  p1.push(`BT /F2 20 Tf 1 1 1 rg 55 772 Td (Missao dos Agrupamentos) Tj ET`);
  p1.push(`BT /F1 11 Tf 0.9 0.95 1 rg 55 754 Td (Aplicacao Educacional de Pensamento Computacional - 1o Ano EF) Tj ET`);
  p1.push(`BT /F2 9 Tf 1 1 1 rg 55 738 Td (BNCC EF01CO01  |  Web Estatica  |  GitHub Pages Ready  |  Web Speech API) Tj ET`);

  let y = 705;

  // 1. Visão Geral
  p1.push(`BT /F2 13 Tf 0.05 0.28 0.63 rg 40 ${y} Td (1. Visao Geral e Fundamentacao Pedagogica) Tj ET`);
  y -= 6;
  p1.push(`q 0.1 0.46 0.82 RG 2 w 40 ${y} m 555 ${y} l S Q`); // Linha separadora
  y -= 16;

  p1.push(`BT /F1 9.5 Tf 0.15 0.2 0.22 rg 40 ${y} Td (A "Missao dos Agrupamentos" e um software educativo interativo desenvolvido especificamente) Tj ET`);
  y -= 13;
  p1.push(`BT /F1 9.5 Tf 0.15 0.2 0.22 rg 40 ${y} Td (para criancas de 6 a 7 anos no 1o ano do Ensino Fundamental. O objetivo central e desenvolver) Tj ET`);
  y -= 13;
  p1.push(`BT /F1 9.5 Tf 0.15 0.2 0.22 rg 40 ${y} Td (o pensamento computacional atraves do reconhecimento de atributos e da classificacao logica.) Tj ET`);
  y -= 20;

  // Box Habilidade BNCC
  p1.push(`q 1 0.97 0.88 rg 40 ${y - 28} 515 36 re f Q`); // Fundo amarelo
  p1.push(`q 1 0.63 0 RG 3 w 40 ${y - 28} m 40 ${y + 8} l S Q`); // Barra laranja
  p1.push(`BT /F2 9.5 Tf 0.9 0.35 0 rg 50 ${y} Td (Habilidade BNCC EF01CO01:) Tj ET`);
  y -= 12;
  p1.push(`BT /F3 9 Tf 0.2 0.2 0.2 rg 50 ${y} Td ("Reconhecer que os objetos podem ser agrupados de diferentes maneiras a partir de) Tj ET`);
  y -= 11;
  p1.push(`BT /F3 9 Tf 0.2 0.2 0.2 rg 50 ${y} Td (caracteristicas comuns (cor, forma, categoria/uso) e descrever essas caracteristicas.") Tj ET`);
  y -= 26;

  // 2. As 5 Missões
  p1.push(`BT /F2 13 Tf 0.05 0.28 0.63 rg 40 ${y} Td (2. Estrutura das 5 Missoes Educativas) Tj ET`);
  y -= 6;
  p1.push(`q 0.1 0.46 0.82 RG 2 w 40 ${y} m 555 ${y} l S Q`);
  y -= 18;

  const missions = [
    { num: 'Missao 1: Cores', desc: 'Selecionar objetos amarelos (banana, sol, patinho).', focus: 'Isolamento de cor.' },
    { num: 'Missao 2: Formas', desc: 'Selecionar objetos redondos (moeda, relogio, botao).', focus: 'Padroes geometricos.' },
    { num: 'Missao 3: Categorias', desc: 'Organizar no bau apenas figuras de animais vivos.', focus: 'Abstracao semantica.' },
    { num: 'Missao 4: Regra Secreta', desc: 'Deduzir a regra comum de grupo pronto (todos vermelhos).', focus: 'Raciocinio indutivo.' },
    { num: 'Missao Final: Meu Grupo', desc: 'Escolher a propria regra e selecionar os itens compativeis.', focus: 'Flexibilidade cognitiva.' }
  ];

  missions.forEach(m => {
    p1.push(`q 0.94 0.97 1 rg 40 ${y - 18} 515 24 re f Q`);
    p1.push(`q 0.7 0.85 0.98 RG 1 w 40 ${y - 18} 515 24 re S Q`);
    p1.push(`BT /F2 9.5 Tf 0.05 0.28 0.63 rg 48 ${y - 4} Td (${escapePdf(m.num)}:) Tj ET`);
    p1.push(`BT /F1 9 Tf 0.15 0.2 0.22 rg 170 ${y - 4} Td (${escapePdf(m.desc)}) Tj ET`);
    p1.push(`BT /F2 8.5 Tf 0.2 0.5 0.2 rg 440 ${y - 4} Td ([${escapePdf(m.focus)}]) Tj ET`);
    y -= 29;
  });

  y -= 6;
  // Caixa de Síntese
  p1.push(`q 0.91 0.96 0.91 rg 40 ${y - 20} 515 28 re f Q`);
  p1.push(`q 0.3 0.69 0.31 RG 1.5 w 40 ${y - 20} 515 28 re S Q`);
  p1.push(`BT /F2 9.5 Tf 0.11 0.45 0.13 rg 55 ${y - 3} Td (Sintese Pedagogica Central da Conclusao:) Tj ET`);
  y -= 12;
  p1.push(`BT /F3 9 Tf 0.11 0.45 0.13 rg 55 ${y - 3} Td ("Os mesmos objetos podem formar grupos diferentes dependendo da caracteristica observada!") Tj ET`);
  y -= 28;

  // 3. Feedback Formativo
  p1.push(`BT /F2 13 Tf 0.05 0.28 0.63 rg 40 ${y} Td (3. Diretrizes de Feedback Formativo e Pedagogico) Tj ET`);
  y -= 6;
  p1.push(`q 0.1 0.46 0.82 RG 2 w 40 ${y} m 555 ${y} l S Q`);
  y -= 16;

  p1.push(`BT /F2 9 Tf 0.1 0.5 0.1 rg 40 ${y} Td (*) Tj /F2 9 Tf 0.1 0.1 0.1 rg 50 ${y} Td (Feedback Positivo:) Tj /F1 9 Tf 50 ${y} Td (                                Comemoracao imediata com explicacao verbal da regra comum.) Tj ET`);
  y -= 13;
  p1.push(`BT /F2 9 Tf 0.9 0.4 0 rg 40 ${y} Td (*) Tj /F2 9 Tf 0.1 0.1 0.1 rg 50 ${y} Td (Sem Punicao:) Tj /F1 9 Tf 50 ${y} Td (                          Nunca exibe "errado"; apresenta dica amigavel de observacao.) Tj ET`);
  y -= 13;
  p1.push(`BT /F2 9 Tf 0.5 0.1 0.7 rg 40 ${y} Td (*) Tj /F2 9 Tf 0.1 0.1 0.1 rg 50 ${y} Td (Andaime (Scaffolding):) Tj /F1 9 Tf 50 ${y} Td (                                 Na 2a tentativa, ativa brilho sutil nos itens pertinentes.) Tj ET`);

  // Rodapé Página 1
  p1.push(`q 0.8 0.8 0.8 RG 1 w 40 40 m 555 40 l S Q`);
  p1.push(`BT /F1 8 Tf 0.5 0.5 0.5 rg 40 28 Td (Missao dos Agrupamentos - Documentacao Oficial) Tj ET`);
  p1.push(`BT /F1 8 Tf 0.5 0.5 0.5 rg 520 28 Td (Pagina 1 de 2) Tj ET`);

  // ==========================================
  // PÁGINA 2
  // ==========================================
  const p2 = pdf.startPage();
  y = 790;

  // 4. Acessibilidade e Usabilidade
  p2.push(`BT /F2 13 Tf 0.05 0.28 0.63 rg 40 ${y} Td (4. Acessibilidade e Usabilidade Infantil (1o Ano)) Tj ET`);
  y -= 6;
  p2.push(`q 0.1 0.46 0.82 RG 2 w 40 ${y} m 555 ${y} l S Q`);
  y -= 16;

  const a11yItems = [
    { title: 'Locucao por Sintese de Voz:', desc: 'Uso da Web Speech API (pt-BR) para criancas nao alfabetizadas.' },
    { title: 'Alvos de Toque Confortaveis:', desc: 'Botoes e cartoes com dimensoes >= 56px para telas touch.' },
    { title: 'Ilustracoes Vetoriais SVG:', desc: 'Icones leves, nitidos em qualquer resolucao e com alto contraste.' },
    { title: 'Privacidade Total (LGPD):', desc: 'Zero cadastro, sem senhas e sem coleta de dados pessoais dos alunos.' },
    { title: 'Multiplataforma:', desc: 'Responsivo em celulares (2 colunas), tablets (3 colunas) e computadores.' }
  ];

  a11yItems.forEach(item => {
    p2.push(`BT /F2 9 Tf 0.05 0.28 0.63 rg 40 ${y} Td (*) Tj /F2 9 Tf 0.1 0.1 0.1 rg 52 ${y} Td (${escapePdf(item.title)}) Tj /F1 9 Tf 200 ${y} Td (${escapePdf(item.desc)}) Tj ET`);
    y -= 14;
  });

  y -= 10;
  // 5. Arquitetura Técnica
  p2.push(`BT /F2 13 Tf 0.05 0.28 0.63 rg 40 ${y} Td (5. Arquitetura Tecnica e Estrutura de Arquivos) Tj ET`);
  y -= 6;
  p2.push(`q 0.1 0.46 0.82 RG 2 w 40 ${y} m 555 ${y} l S Q`);
  y -= 16;

  p2.push(`BT /F1 9 Tf 0.15 0.2 0.22 rg 40 ${y} Td (A aplicacao foi projetada para ser 100% estatica, sem backend e sem banco de dados:) Tj ET`);
  y -= 16;

  // Box Estrutura
  p2.push(`q 0.15 0.2 0.22 rg 40 ${y - 64} 515 72 re f Q`);
  p2.push(`BT /F1 8.5 Tf 0.9 0.95 1 rg 50 ${y - 4} Td (Projeto-final/) Tj ET`);
  p2.push(`BT /F1 8.5 Tf 0.9 0.95 1 rg 50 ${y - 16} Td (  |-- index.html        # Estrutura semantica SPA (Telas Inicial, Missoes e Conclusao)) Tj ET`);
  p2.push(`BT /F1 8.5 Tf 0.9 0.95 1 rg 50 ${y - 28} Td (  |-- css/style.css     # CSS Grid, animacoes, variaveis e responsividade) Tj ET`);
  p2.push(`BT /F1 8.5 Tf 0.9 0.95 1 rg 50 ${y - 40} Td (  |-- js/data.js        # Catalogo de objetos com SVGs e configuracao das 5 missoes) Tj ET`);
  p2.push(`BT /F1 8.5 Tf 0.9 0.95 1 rg 50 ${y - 52} Td (  |-- js/app.js         # Estado reativo (AppState), validacao e Web Speech API) Tj ET`);
  y -= 84;

  // 6. Guia de Execução e Publicação
  p2.push(`BT /F2 13 Tf 0.05 0.28 0.63 rg 40 ${y} Td (6. Como Executar e Publicar no GitHub Pages) Tj ET`);
  y -= 6;
  p2.push(`q 0.1 0.46 0.82 RG 2 w 40 ${y} m 555 ${y} l S Q`);
  y -= 16;

  p2.push(`BT /F2 9.5 Tf 0.05 0.28 0.63 rg 40 ${y} Td (A. Execucao Local Simples:) Tj ET`);
  y -= 13;
  p2.push(`BT /F1 9 Tf 0.15 0.2 0.22 rg 52 ${y} Td (1. De um duplo clique no arquivo index.html no navegador (Chrome, Edge, Safari, Firefox).) Tj ET`);
  y -= 12;
  p2.push(`BT /F1 9 Tf 0.15 0.2 0.22 rg 52 ${y} Td (2. Ou rode um servidor local via terminal: python -m http.server 8000) Tj ET`);
  y -= 20;

  p2.push(`BT /F2 9.5 Tf 0.05 0.28 0.63 rg 40 ${y} Td (B. Publicacao no GitHub Pages (Passo a Passo):) Tj ET`);
  y -= 13;
  p2.push(`BT /F1 9 Tf 0.15 0.2 0.22 rg 52 ${y} Td (1. Realize o commit e push dos arquivos: git add . && git commit -m "feat: app" && git push) Tj ET`);
  y -= 12;
  p2.push(`BT /F1 9 Tf 0.15 0.2 0.22 rg 52 ${y} Td (2. No GitHub, acesse Settings > Pages.) Tj ET`);
  y -= 12;
  p2.push(`BT /F1 9 Tf 0.15 0.2 0.22 rg 52 ${y} Td (3. Em "Source", selecione a branch "main" e pasta "/ (root)" e clique em "Save".) Tj ET`);
  y -= 12;
  p2.push(`BT /F1 9 Tf 0.15 0.2 0.22 rg 52 ${y} Td (4. Em instantes, a aplicacao estara disponivel em: https://<usuario>.github.io/<repositorio>/) Tj ET`);
  y -= 26;

  // Box Conclusão
  p2.push(`q 0.95 0.95 0.95 rg 40 ${y - 20} 515 28 re f Q`);
  p2.push(`q 0.8 0.8 0.8 RG 1 w 40 ${y - 20} 515 28 re S Q`);
  p2.push(`BT /F2 9 Tf 0.2 0.2 0.2 rg 50 ${y - 4} Td (Projeto finalizado com total conformidade pedagogica e tecnica.) Tj ET`);
  y -= 12;
  p2.push(`BT /F1 8.5 Tf 0.4 0.4 0.4 rg 50 ${y - 4} Td (Disponivel em formato estatico e documentado segundo as diretrizes do Spec Kit e da BNCC.) Tj ET`);

  // Rodapé Página 2
  p2.push(`q 0.8 0.8 0.8 RG 1 w 40 40 m 555 40 l S Q`);
  p2.push(`BT /F1 8 Tf 0.5 0.5 0.5 rg 40 28 Td (Missao dos Agrupamentos - Documentacao Oficial) Tj ET`);
  p2.push(`BT /F1 8 Tf 0.5 0.5 0.5 rg 520 28 Td (Pagina 2 de 2) Tj ET`);

  const pdfBuffer = pdf.build();
  
  const targetPath = path.resolve(__dirname, 'README.pdf');
  fs.writeFileSync(targetPath, pdfBuffer);
  
  // Salva também dentro de Projeto-final-Padrões
  const subPath = path.resolve(__dirname, 'Projeto-final-Padrões', 'README.pdf');
  fs.writeFileSync(subPath, pdfBuffer);

  console.log(`PDF gerado com sucesso em: ${targetPath} (${pdfBuffer.length} bytes)`);
}

generateReadmePdf();
