# Leite — arquivo do traço

Site pessoal de Paulo Leite: [versão pública](https://leiteneto17-cmd.github.io/site-pltattoo/).

O site apresenta Paulo como artista em formação e acompanha o estudo de desenho, mini realismo preto e cinza e cultura visual. Não afirma que Paulo já tatuou clientes nem oferece orçamento ou agendamento. O minijogo foi retirado a pedido de Paulo; a prioridade agora é publicar trabalho autoral real, com contexto e evolução.

## Conteúdo atual

- Página inicial responsiva com apresentação, diário de evolução, curiosidades com fontes, rota de estudos e perfil.
- Diário público conectado ao Supabase: mostra apenas itens com `is_published=true` e `is_demo=false`. Sem registros reais, mostra um estado vazio honesto.
- Instagram como canal principal das atualizações. A incorporação automática de posts não está ativada; uma eventual integração com a API da Meta exigiria configuração autorizada e um serviço seguro para guardar o token.

## Rodar localmente

Requer Node.js 20+.

```sh
npm ci
npm run build
npm run check
npm start
```

Abra `http://127.0.0.1:4173/`. A branch `main` publica `dist/` no GitHub Pages pela ação em `.github/workflows/pages.yml`.

## Atualizar o diário

Entre em `/admin.html` com o e-mail autorizado. Crie um artigo ou estudo real, deixe **É conteúdo demonstrativo** desmarcado e selecione **Publicar na página inicial**. Para um estudo com imagem, informe URL HTTPS pública, descrição e crédito. Confira o item na home após salvar. Rascunhos locais no fim do painel são apenas cópias neste navegador.

Artigos da home usam trechos de até 350 caracteres; o painel ainda não é um editor de matérias longas públicas. Para registrar um estudo, descreva a data, referência, tentativa, aprendizado e próximo exercício. Não atribua imagens de referência a Paulo.

## Arquivos principais

- `dist/index.html`, `dist/mission.css`, `dist/progress.js`: página inicial.
- `dist/admin.html`, `dist/online-admin.js`, `src/db.js`: painel e dados.
- [AUDITORIA-PREMIUM.md](AUDITORIA-PREMIUM.md): avaliação editorial e prioridades de evolução do site.
- [CREDITOS.md](CREDITOS.md): origem dos recursos visuais e fontes.

O símbolo de mariposa da capa é uma peça gráfica demonstrativa criada para o site, identificada como tal. Não é obra ou tatuagem de Paulo. A apresentação deve ser substituída ou complementada por trabalhos próprios quando existirem.
