# Leite — caderno visual de Paulo Leite

Site publicado: https://leiteneto17-cmd.github.io/site-pltattoo/

Esta versão apresenta Paulo como artista em formação. O visual combina tipografia de cartaz, preto e cinza, acento vermelho, marcas gráficas e uma ilustração conceitual de mariposa claramente identificada como demonstração. Não há tatuagens ou estudos de treino falsamente atribuídos a Paulo, nem agendamento ou orçamentos.

A página foi dividida em **treinos**, **curiosidades**, **história da arte**, **tatuagem & arte**, **cronograma de estudos** e **sobre**. Curiosidades e textos de pesquisa trazem links para suas fontes. O cronograma é um roteiro sugerido de quatro etapas, sem datas ou exercícios apresentados como concluídos.

## Treinos e Instagram

O Instagram [@pauloleitesoaresneto](https://www.instagram.com/pauloleitesoaresneto/) é o canal principal para novos registros. O site aponta para o perfil. A área de treinos não exibe miniaturas de posts porque ainda não há publicações selecionadas e verificadas para incorporar. A sincronização automática não está ativa: falta criar e autorizar um aplicativo Meta e guardar o token fora do GitHub Pages. Não inclua tokens no repositório.

O painel em `/admin.html` continua disponível como arquivo experimental de textos e estudos no Supabase, mas o conteúdo dele não aparece automaticamente na página pública e não publica no Instagram. O painel local guarda apenas rascunhos no navegador.

## Executar e publicar

Requer Node.js 20 ou superior:

```sh
npm ci
npm run build
npm start
```

Abra http://127.0.0.1:4173/. `npm run check` verifica os scripts. Cada envio à branch `main` aciona `.github/workflows/pages.yml` e publica `dist` no GitHub Pages. Um domínio próprio pode ser configurado depois em **Settings → Pages → Custom domain**.

## Arquivos

- `dist/index.html`: conteúdo público.
- `dist/ink.css`: identidade visual responsiva do site público.
- `dist/style.css`: base comum e estilos do painel.
- `dist/app.js`: comparador interativo de demonstração.
- `dist/assets/`: ilustrações demonstrativas e fotografia de referência.
- `CREDITOS.md`: origem e uso das imagens.
- `PESQUISA.md`: referências verificadas e decisões visuais.
