# Paulo Leite — portfólio v1

Repositório: https://github.com/leiteneto17-cmd/site-pltattoo

## Publicação no GitHub Pages

Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions** uma única vez. O fluxo `.github/workflows/pages.yml` verifica o JavaScript e publica somente a pasta `dist` após cada envio para `main`. Não há instalação de dependências nem compilação.

Endereço previsto após a primeira publicação bem-sucedida: https://leiteneto17-cmd.github.io/site-pltattoo/

Os endereços de imagens, CSS e scripts são relativos e funcionam sob `/site-pltattoo/` ou em um domínio próprio. Quando comprar o domínio, configure-o em **Settings → Pages → Custom domain**, verifique a propriedade e configure o DNS conforme a documentação do GitHub. Não há domínio próprio configurado nesta versão.

## Supabase: próxima etapa opcional

O site atual usa arquivos locais e pode ser publicado sem banco. Supabase será útil para transformar o painel de rascunhos em um painel online: Auth para o acesso de Paulo, Postgres para artigos/estudos e Storage para imagens.

Para integrar depois: permitir ao público apenas ler registros publicados; reservar criação/edição/exclusão ao usuário administrador autenticado; configurar Row Level Security (RLS) nas tabelas e políticas nos arquivos. No navegador, usar somente URL do projeto e chave publicável. Nunca incluir chave secreta ou `service_role` no GitHub ou no JavaScript público. Não há conexão, banco ou conta Supabase configurados nesta versão.

Site responsivo em português, com assinatura visual Leite. Paulo é apresentado como aprendiz de mini realismo black & grey. Não existe agenda, orçamento, promessa de experiência profissional ou trabalho autoral inventado.

## Executar

Requer Node.js 20 ou superior. Abra um terminal nesta pasta e execute:

```sh
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
