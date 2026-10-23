# Paulo Leite — portfólio

Repositório: https://github.com/leiteneto17-cmd/site-pltattoo

## Publicação no GitHub Pages

GitHub Pages já foi ativado com **GitHub Actions**. O fluxo `.github/workflows/pages.yml` instala as dependências, gera o cliente do Supabase, verifica o JavaScript e publica somente a pasta `dist` após cada envio para `main`.

Site publicado: https://leiteneto17-cmd.github.io/site-pltattoo/

Os endereços de imagens, CSS e scripts são relativos e funcionam sob `/site-pltattoo/` ou em um domínio próprio. Quando comprar o domínio, configure-o em **Settings → Pages → Custom domain**, verifique a propriedade e configure o DNS conforme a documentação do GitHub. Não há domínio próprio configurado nesta versão.

## Supabase: painel online

O projeto usa a URL e a chave publicável informadas por Paulo. A string de conexão com `[YOUR-PASSWORD]` é apenas um modelo e não foi usada. Nenhuma senha ou chave secreta foi incluída no repositório.

`supabase/schema.sql` foi aplicado ao projeto. O arquivo cria `portfolio_entries`, libera leitura pública somente de itens publicados e limita escrita à conta autenticada `leiteneto17@gmail.com`. Guarde-o no repositório para repetir a estrutura em outro ambiente quando necessário.

Em **Authentication → URL Configuration**, o endereço principal foi definido como `https://leiteneto17-cmd.github.io/site-pltattoo/` e o redirecionamento permitido como `https://leiteneto17-cmd.github.io/site-pltattoo/admin.html`. Se usar um domínio próprio futuramente, adicione também o novo endereço à lista.

Após a migração, abra `/admin.html`, clique em **Enviar link de acesso**, siga o link recebido e publique um item de teste. Artigos publicados aparecem em **Anotações**; estudos publicados aparecem na galeria. Imagens dos estudos são endereços HTTPS com descrição e crédito informados no painel. O armazenamento de arquivos ainda não foi integrado.

Se o banco ficar temporariamente indisponível, o site público mostra as demonstrações locais e o painel mantém seus rascunhos locais. Não importe conteúdo demonstrativo como trabalho autoral.

A proteção das edições é aplicada no próprio banco por Row Level Security (RLS), além de o painel mostrar os controles apenas para o e-mail autorizado. Nunca inclua chave secreta ou `service_role` no GitHub ou no JavaScript público.

Site responsivo em português, com assinatura visual Leite. Paulo é apresentado como aprendiz de mini realismo black & grey. Não existe agenda, orçamento, promessa de experiência profissional ou trabalho autoral inventado.

## Executar

Requer Node.js 20 ou superior. Abra um terminal nesta pasta e execute:

```sh
npm ci
npm run build
npm start
```

Abra http://127.0.0.1:4173. Para parar, pressione Ctrl+C no terminal. O projeto usa o cliente JavaScript do Supabase e esbuild. Não abra index.html diretamente: os artigos são carregados de um arquivo JSON e precisam de servidor HTTP.

## O que funciona

- Navegação por seções, Instagram real informado na conversa e layout responsivo.
- Galeria com filtros e detalhes em janela acessível, fechamento por Escape e retorno de foco nativo.
- Comparador de contorno/volume por controle deslizante, inclusive pelo teclado.
- Leitura dos artigos demonstrativos.
- Painel em /admin.html: rascunhos locais com exportação JSON; após configurar o Supabase, autenticação por e-mail e publicação de artigos ou estudos online.

Os rascunhos locais continuam restritos ao navegador onde foram escritos. Limpar seus dados apaga esses rascunhos; exporte cópias. Os itens salvos no Supabase ficam disponíveis ao entrar com a conta autorizada. Apenas itens marcados como publicados aparecem no site.

## Atualizar conteúdo

1. Entre em `/admin.html` com o link enviado ao e-mail autorizado. Crie um artigo ou estudo, revise a marcação de demonstração e marque **Publicar no site**.
2. Para publicar um estudo, informe o endereço HTTPS de uma imagem autorizada, uma descrição e o crédito. O site mostra o conteúdo salvo no banco quando a página é atualizada.
3. Para alterar a comparação demonstrativa ou o texto de apresentação, edite os arquivos em `dist/`, execute `npm run check` e envie o commit para `main`. O GitHub Pages publica a mudança.
4. Os rascunhos locais podem ser exportados e copiados manualmente para o formulário online; a importação JSON do caderno local não cria registros no Supabase.

## Estrutura

- dist/index.html: página principal e textos de apresentação.
- dist/style.css: identidade visual e regras responsivas.
- dist/app.js: galeria, artigos e comparação.
- dist/content.json: artigos demonstrativos que funcionam como reserva visual.
- dist/admin.html, admin.js e online-admin.js: editor local e painel online.
- src/db.js e dist/db.js: integração Supabase e sua versão para navegador.
- supabase/schema.sql: tabela e políticas de acesso.
- dist/assets: fotografia de referência e ilustrações vetoriais de demonstração.
- server.mjs: servidor de desenvolvimento limitado ao computador local.
- PESQUISA.md: referências, componentes avaliados e decisões.
- CREDITOS.md: origem e direitos dos recursos visuais.

## Limitações conscientes

O painel aceita endereço de imagem, mas ainda não faz upload. Não há formulário de e-mail nem analytics. Fontes Google Fonts precisam de internet; Georgia/Arial são alternativas locais.

As próximas evoluções possíveis são upload em Supabase Storage, uma galeria maior com PhotoSwipe e um editor de artigos com formatação.

## Verificação

Build e sintaxe JavaScript conferidos. O fallback dos artigos e estudos foi verificado em navegador. A publicação no GitHub Pages passou; leitura pública da tabela e envio do link de acesso foram confirmados. Criação e edição autenticadas dependem da conclusão do acesso por e-mail.
