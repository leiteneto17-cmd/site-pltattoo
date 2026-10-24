# Leite — arquivo do traço

Site pessoal de Paulo Leite: [versão pública](https://leiteneto17-cmd.github.io/site-pltattoo/) · [minijogo](https://leiteneto17-cmd.github.io/site-pltattoo/game.html).

A identidade combina pôster de tatuagem black & grey, arquivo de investigação e linguagem de jogo. Paulo é apresentado como artista em formação. O site **não** afirma que ele já tatuou alguém e não oferece orçamento ou agenda.

## O que funciona

- **Home responsiva:** apresentação, diário de progresso, minijogo, três linhas de curiosidade, rota de estudos e perfil.
- **Diário público:** mostra itens do Supabase com `is_published=true` e `is_demo=false`. Itens reais publicados no painel `/admin.html` aparecem na home após atualizar a página. Rascunhos e demonstrações não são apresentados. Se não houver registros reais, o espaço mostra um estado vazio honesto. Não marque exemplos como publicados; itens publicados podem ser consultados pela API pública do projeto.
- **Missão Traço Zero:** jogo original de quatro etapas: escolher arte, montar uma bancada cenográfica arrastando ou tocando nos objetos, posicionar a composição sobre corpo adulto ilustrado em 2D e contornar à mão os elementos principais. Na bancada há desenho, cobertura, luvas, tinta, máquina e descarte; as opções de tinta e máquina alteram o objeto ilustrado e seu rótulo. O contorno usa mouse, toque, caneta ou setas com Espaço; pontuação, precisão, desvios e alvo ampliado dão ritmo de arcade. O traço só avança com o movimento do jogador. É uma experiência visual, não treinamento para tatuar ou guia de biossegurança.
- **Instagram:** é o canal principal dos posts; o site liga diretamente ao perfil. A integração automática com a API da Meta continua ausente porque ainda não há aplicativo autorizado. Nenhum token deve entrar no GitHub Pages.

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

Entre em `/admin.html` com o e-mail autorizado. Crie um artigo ou estudo real, deixe **É conteúdo demonstrativo** desmarcado e selecione **Publicar na página inicial**. Para um estudo com imagem, informe URL HTTPS pública, descrição e crédito. Confira o item na home após salvar. Rascunhos locais no fim do painel são apenas cópias no navegador.

Artigos da home usam trechos de até 350 caracteres; o painel ainda não é um editor de matérias longas públicas. Para o registro de evolução, descreva data, referência, tentativa, aprendizado e próximo exercício. Não atribua imagens de referência a Paulo.

## Projeto e referências

- `dist/index.html`, `dist/mission.css`, `dist/progress.js`: página inicial.
- `dist/game.html`, `dist/game.css`, `dist/game.js`: jogo.
- `dist/admin.html`, `dist/online-admin.js`, `src/db.js`: painel e dados.
- [AUDITORIA-4-PASSAGENS.md](AUDITORIA-4-PASSAGENS.md): diagnóstico e limites.
- [PESQUISA.md](PESQUISA.md) e [CREDITOS.md](CREDITOS.md): referências e licença dos recursos.

As imagens do jogo e o símbolo de mariposa da capa são demonstrações originais criadas para este site, identificadas como tal. Não representam obras ou tatuagens realizadas por Paulo. Não foram usados personagens, logos, jogos ou artes de franquias. A cena 2D tomou como referência apenas a apresentação visual da [página oficial de Ink Studio: Tattoo Artist Simulator](https://store.steampowered.com/app/1496170/Ink_Studio_Tattoo_Artist_Simulator/?cc=us&l=english) e a imagem fornecida pelo usuário. O controle livre do mouse foi inspirado no princípio de traço contínuo descrito no [manual do Photopea](https://www.photopea.com/learn/brush-tools). Nenhuma captura, interface, arte ou código desses produtos foi incorporado.
