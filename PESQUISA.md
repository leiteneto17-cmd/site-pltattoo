# Pesquisa e decisões — 23/10/2026

## Referências visuais

- [Awwwards — Photography](https://www.awwwards.com/websites/photography/): coleção consultada para referências contemporâneas de portfólio e protagonismo da imagem. Decisão própria para Leite: composição editorial, contraste entre serifas expressivas e texto simples, margens generosas, navegação curta e contato pelo Instagram. Nenhum layout ou código de outro portfólio foi copiado.
- [The Met — escultura romana](https://www.metmuseum.org/art/collection/search/257640): fonte pública da fotografia demonstrativa. O catálogo marca a imagem como Public Domain. A referência é pertinente ao interesse em estátuas e volume, sem retratos realistas de pessoas.

## Componentes open-source avaliados

| Componente | Fonte | Aplicação | Decisão nesta versão |
| --- | --- | --- | --- |
| PhotoSwipe | https://photoswipe.com/getting-started/ e https://github.com/dimsemenov/PhotoSwipe | Galeria com ampliação e navegação por imagens | Candidato para uma coleção real maior. V1 usa dialog nativo para três exemplos. |
| img-comparison-slider | https://github.com/sneas/img-comparison-slider | Comparação de imagens antes/depois; projeto MIT | Referência de interação; V1 implementa o caso simples com range nativo e recorte CSS, sem copiar código. |
| Tiptap | https://tiptap.dev/open-source-to-platform | Núcleo de editor rico open-source MIT | Adiado até existir necessidade de texto formatado e CMS. V1 usa texto simples, renderizado com textContent. |

Não foram incorporados esses pacotes. A pesquisa orientou o escopo e evita adicionar infraestrutura antes de haver material autoral. Antes de uma futura integração, fixar versão, conferir a licença dessa versão e preservar avisos; recursos pagos de uma plataforma não se tornam livres por o núcleo ser open-source.

## REA

Não utilizado: não há binário, runtime fechado ou funcionalidade sem documentação que precise ser investigada. Para esta entrega, documentação oficial e implementação própria resolvem o problema. Reavaliar somente para um alvo identificado e autorizado, com finalidade concreta; não extrair código proprietário, contornar acesso ou clonar obras de terceiros.

## Prioridades seguintes

1. Substituir demonstrações por estudos reais, preservando datas e créditos das referências.
2. Acrescentar fotografia pessoal autorizada, se desejado.
3. Separar os dados da galeria em JSON e permitir rascunhos com mídia.
4. Adotar autenticação, banco e armazenamento antes de um painel que publique alterações.
