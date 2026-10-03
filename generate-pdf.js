const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const htmlPath = path.resolve(__dirname, 'README.html');
const pdfPath = path.resolve(__dirname, 'README.pdf');

console.log('Convertendo:', htmlPath);
console.log('Destino:', pdfPath);

const args = [
  '--headless=new',
  '--disable-gpu',
  '--allow-file-access-from-files',
  '--no-pdf-header-footer',
  `--print-to-pdf=${pdfPath}`,
  `file:///${htmlPath.replace(/\\/g, '/')}`
];

execFile(edgePath, args, (error, stdout, stderr) => {
  if (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
  console.log('Sucesso!');
  if (fs.existsSync(pdfPath)) {
    const stats = fs.statSync(pdfPath);
    console.log(`PDF gerado com sucesso! Tamanho: ${stats.size} bytes`);
  } else {
    console.error('Arquivo PDF não foi encontrado após execução.');
  }
});
