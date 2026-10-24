# Paulo Leite — portfólio

Site: https://leiteneto17-cmd.github.io/site-pltattoo/

O site é a apresentação de Paulo Leite e da assinatura visual Leite. Ele mostra a direção artística em estudo, referências e exemplos claramente identificados. Paulo ainda está aprendendo mini realismo em preto e cinza; o site não oferece agendamento nem orçamento.

A identidade visual atual usa uma direção neoclássica de ateliê: carvão, papel, detalhes em bronze, tipografia expressiva e referências à escultura. A galeria demonstra como estudos futuros serão apresentados, sem atribuir exemplos a Paulo.

## Publicações

O Instagram [@pauloleitesoaresneto](https://www.instagram.com/pauloleitesoaresneto/) é o canal principal para novos estudos e bastidores. O site encaminha visitantes para lá. Não é preciso usar o caderno de rascunhos para publicar no Instagram.

A sincronização automática de publicações ainda **não está ativa**. A conta do Instagram é profissional, mas ainda não há um aplicativo Meta for Developers criado e autorizado. A API oficial com Instagram Login permite obter mídia de contas profissionais e não exige Página do Facebook vinculada. Para ativá-la, será necessário criar o aplicativo Meta, autorizar a conta e guardar o token fora do GitHub Pages, por exemplo em uma Supabase Edge Function. Nunca inclua tokens da Meta no HTML, JavaScript público ou neste repositório.

Documentação oficial da Meta: https://www.postman.com/meta/instagram/folder/6raa77c/instagram-api-with-instagram-login

## Publicação do site

Cada envio para `main` aciona `.github/workflows/pages.yml` e publica a pasta `dist` no GitHub Pages. Os caminhos são relativos para também funcionar sob um domínio próprio. Quando comprar o domínio, configure-o em **Settings → Pages → Custom domain** e ajuste o DNS conforme as instruções do GitHub.

## Executar localmente

Requer Node.js 20 ou superior:

```sh
npm ci
npm run build
npm start
```

Abra http://127.0.0.1:4173/. Para parar, pressione Ctrl+C.

## Arquivos principais

- `dist/index.html`: estrutura e textos do site.
- `dist/style.css`: estilos gerais do site e do painel.
- `dist/neo.css`: identidade visual neoclássica e responsividade da página pública.
- `dist/app.js`: galeria demonstrativa e comparador de contorno/volume.
- `dist/assets/`: fotografia de referência e ilustrações demonstrativas.
- `CREDITOS.md`: origem e direitos dos recursos visuais.
- `PESQUISA.md`: referências de design e componentes avaliados.

O painel `/admin.html` e a tabela `portfolio_entries` do Supabase continuam disponíveis para eventuais textos exclusivos do site. São opcionais e não participam das postagens do Instagram. A tabela possui Row Level Security para que apenas a conta autorizada edite seus dados; visitantes só podem ler itens marcados como publicados.

## Verificação

Execute `npm run check` para conferir a sintaxe do JavaScript. O GitHub Pages confirma a publicação na aba **Actions** do repositório. Imagens e textos de demonstração não representam obras concluídas de Paulo.
