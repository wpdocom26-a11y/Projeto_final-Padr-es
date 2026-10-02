# Quickstart & Local Validation Guide: Missão dos Agrupamentos

**Feature**: Missão dos Agrupamentos  
**Target Environment**: Web Estática / GitHub Pages  

---

## 1. Execução Local Rápida

Como a aplicação é 100% estática (HTML5/CSS3/JS puro), não é necessário instalar Node.js, compilar pacotes ou rodar servidores complexos.

### Opção A: Abrir Diretamente no Navegador
- Dê um duplo clique no arquivo `index.html` ou arraste-o para uma aba do Google Chrome, Microsoft Edge, Firefox ou Safari.

### Opção B: Usar um Servidor Estático Local (Opcional)
```bash
# Com Python 3 nativo
python -m http.server 8000

# Ou com a extensão Live Server do VS Code / Antigravity
# Acesse: http://localhost:8000
```

---

## 2. Roteiro de Validação das 5 Missões (Passo a Passo)

| Etapa | Ação de Teste | Resultado Esperado |
| :--- | :--- | :--- |
| **1. Tela Inicial** | Clicar em "Começar" e no botão de áudio. | O mascote apresenta a instrução e a Missão 1 é carregada suavemente. |
| **2. Missão 1 (Cores)** | Selecionar os 3 itens amarelos (Banana, Sol, Pato) e clicar em "Verificar". | Feedback positivo comemorando o agrupamento por cor amarela. |
| **3. Teste de Dica** | Na Missão 2 (Formas), selecionar 1 item quadrado e 1 redondo e clicar em "Verificar". | Mensagem acolhedora de dica sem exibir "errado" ou penalizar. |
| **4. Missão 2 (Formas)** | Selecionar os 3 itens redondos e verificar. | Sucesso e avanço para a Missão 3. |
| **5. Missão 3 (Categorias)** | Selecionar os 3 animais e verificar. | Sucesso e avanço para a Missão 4. |
| **6. Missão 4 (Regra Secreta)** | Analisar o grupo de objetos vermelhos e escolher a alternativa "Todos possuem a cor vermelha". | Feedback validando o raciocínio indutivo. |
| **7. Missão Final (Meu Grupo)** | Escolher o critério "Coisas de Comer" e selecionar os alimentos correspondentes. | Validação dinâmica e direcionamento para a Tela de Conclusão. |
| **8. Conclusão** | Visualizar as 5 medalhas e a síntese da BNCC EF01CO01. | Botão "Jogar Novamente" reinicia a experiência sem falhas. |

---

## 3. Publicação no GitHub Pages

1. Faça o commit e push dos arquivos para o repositório no GitHub:
   ```bash
   git add .
   git commit -m "feat: implementacao da aplicacao Missao dos Agrupamentos"
   git push origin main
   ```
2. No repositório GitHub:
   - Acesse **Settings** > **Pages**.
   - Em **Branch**, selecione `main` e a pasta `/ (root)`.
   - Clique em **Save**.
3. Em cerca de 1 minuto, a aplicação estará publicada e acessível em `https://<usuario>.github.io/<repositorio>/`.
