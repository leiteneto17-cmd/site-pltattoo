# Paulo Leite — portfólio v1

Repositório: https://github.com/leiteneto17-cmd/site-pltattoo

## Publicação no GitHub Pages

GitHub Pages já foi ativado com **GitHub Actions**. O fluxo `.github/workflows/pages.yml` instala as dependências, gera o cliente do Supabase, verifica o JavaScript e publica somente a pasta `dist` após cada envio para `main`.

Endereço previsto após a primeira publicação bem-sucedida: https://leiteneto17-cmd.github.io/site-pltattoo/

Os endereços de imagens, CSS e scripts são relativos e funcionam sob `/site-pltattoo/` ou em um domínio próprio. Quando comprar o domínio, configure-o em **Settings → Pages → Custom domain**, verifique a propriedade e configure o DNS conforme a documentação do GitHub. Não há domínio próprio configurado nesta versão.

## Supabase: painel online

O projeto usa a URL e a chave publicável informadas por Paulo. A string de conexão com `[YOUR-PASSWORD]` é apenas um modelo e não foi usada. Nenhuma senha ou chave secreta foi incluída no repositório.

Para ativar o banco, abra o [SQL Editor do projeto](https://supabase.com/dashboard/project/yxgzsrvpvzpsxgzqxpsj/sql/new) e execute `supabase/schema.sql`. O arquivo cria `portfolio_entries`, libera leitura pública somente de itens publicados e limita escrita à conta autenticada `leiteneto17@gmail.com`.

Em **Authentication → URL Configuration**, defina o endereço do site como `https://leiteneto17-cmd.github.io/site-pltattoo/` e permita como redirecionamento `https://leiteneto17-cmd.github.io/site-pltattoo/admin.html`. Assim o link de acesso enviado por e-mail retorna ao painel. Se usar um domínio próprio futuramente, adicione também o novo endereço à lista.

Após a migração, abra `/admin.html`, clique em **Enviar link de acesso**, siga o link recebido e publique um item de teste. Artigos publicados aparecem em **Anotações**; estudos publicados aparecem na galeria. Imagens dos estudos são endereços HTTPS com descrição e crédito informados no painel. O armazenamento de arquivos ainda não foi integrado.

Enquanto a tabela não estiver configurada, o site público mostra as demonstrações locais e o painel mantém seus rascunhos locais. Não importe conteúdo demonstrativo como trabalho autoral.

A proteção das edições é aplicada no próprio banco por Row Level Security (RLS), além de o painel mostrar os controles apenas para o e-mail autorizado. Nunca inclua chave secreta ou `service_role` no GitHub ou no JavaScript público.

Site responsivo em português, com assinatura visual Leite. Paulo é apresentado como aprendiz de mini realismo black & grey. Não existe agenda, orçamento, promessa de experiência profissional ou trabalho autoral inventado.

## Executar

Requer Node.js 20 ou superior. Abra um terminal nesta pasta e execute:

```sh
npm ci
npm run build
npm start
```

Abra http://127.0.0.1:4173. Para parar, pressione Ctrl+C no terminal. Nenhuma instalação de dependências é necessária. Não abra index.html diretamente: os artigos são carregados de um arquivo JSON e precisam de servidor HTTP.

## O que funciona

- Navegação por seções, Instagram real informado na conversa e layout responsivo.
- Galeria com filtros e detalhes em janela acessível, fechamento por Escape e retorno de foco nativo.
- Comparador de contorno/volume por controle deslizante, inclusive pelo teclado.
- Leitura dos artigos demonstrativos.
- Painel em /admin.html: criar, editar, excluir e visualizar rascunhos, salvar no navegador e importar/exportar JSON.

O painel é uma ferramenta local, não um CMS autenticado. Cada navegador possui seus próprios rascunhos. Ele não altera o site publicado nem envia textos ao servidor. Limpar dados do navegador apaga rascunhos; exporte cópias. Não guarde informações sensíveis nele.

## Atualizar conteúdo

1. Abra o painel e importe dist/content.json para editar os textos existentes, ou comece seus próprios rascunhos.
2. Salve e exporte. A exportação contém todos os registros da lista do painel; importar adiciona registros, não substitui os existentes.
3. Substitua dist/content.json pelo arquivo exportado. Revise a marcação de demonstração: só retire quando houver conteúdo autoral real.
4. Para atualizar a galeria, copie fotos autorizadas para dist/assets e edite a lista `studies` em dist/app.js (título, categoria, imagem, legenda e descrição). Atualize também o contador de obras autorais e os avisos conforme a realidade do material publicado.
5. Para comparar dois estudos reais, substitua os arquivos da comparação e altere rótulos, textos alternativos e explicação em dist/index.html.
6. Execute `npm run check`, confira no navegador e publique novamente a pasta dist no serviço de hospedagem escolhido. O painel não faz esse último passo automaticamente.

## Estrutura

- dist/index.html: página principal e textos de apresentação.
- dist/style.css: identidade visual e regras responsivas.
- dist/app.js: galeria, artigos e comparação.
- dist/content.json: conteúdo dos artigos.
- dist/admin.html e admin.js: editor local em texto simples.
- dist/assets: fotografia de referência e ilustrações vetoriais de demonstração.
- server.mjs: servidor de desenvolvimento limitado ao computador local.
- PESQUISA.md: referências, componentes avaliados e decisões.
- CREDITOS.md: origem e direitos dos recursos visuais.

## Limitações conscientes

Sem backend, login, upload de imagens pelo painel, sincronização entre dispositivos, formulário de e-mail, analytics ou publicação automática. Fontes Google Fonts precisam de internet; Georgia/Arial são alternativas locais. Imagens e funções principais são locais. Não há dependências JavaScript de terceiros nesta versão.

As próximas evoluções possíveis são centralizar a galeria em JSON, adotar PhotoSwipe se houver muitas imagens, integrar Tiptap para artigos com formatação e adicionar um CMS com autenticação e armazenamento antes de permitir alterações públicas pelo painel.

## Verificação

Sintaxe JavaScript conferida por `npm run check`. Navegação, filtros, detalhe de estudo, controle de comparação e painel verificados em navegador. A documentação de entrega registra o escopo real; não há alegação de auditoria completa de acessibilidade ou testes em todos os navegadores.
