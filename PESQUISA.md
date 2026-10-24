# Pesquisa e decisões — 23/10/2026

## Referências visuais

- [Awwwards — Photography](https://www.awwwards.com/websites/photography/): coleção consultada para referências contemporâneas de portfólio e protagonismo da imagem. Decisão própria para Leite: composição editorial, contraste entre serifas expressivas e texto simples, margens generosas, navegação curta e contato pelo Instagram. Nenhum layout ou código de outro portfólio foi copiado.
- [The Met — escultura romana](https://www.metmuseum.org/art/collection/search/257640): fonte pública da fotografia demonstrativa. O catálogo marca a imagem como Public Domain. A referência é pertinente ao interesse em estátuas e volume, sem retratos realistas de pessoas.
- [Vasa Tattoo — portfolio](https://www.glennvasaturo.com/tattoo-portfolio): observado com REA em 23/10/2026 (evidência `ev_eb00e939fdd7b253b7a6553e1fc5eb4f66b78477311bc167bdbd8a18d86a2ee0`). A hierarquia dá protagonismo às imagens black & grey e oferece ampliação das peças.
- [Dragoness Tattoo — portfolio](https://dragoness.ink/portfolio): observado com REA em 23/10/2026 (evidência `ev_e988828187a1f07be029632a213d83a3ef908d80679ef01975907a4200bf078a`). Títulos grandes, fundo escuro, pequenos metadados e galeria organizada foram pistas úteis para definir ritmo visual. A captura de tela estava encoberta por um estado de carregamento, então a observação desta página se baseou principalmente na árvore de acessibilidade.

A revisão visual adotou uma direção própria de ateliê neoclássico: fundo carvão, papel antigo, bronze discreto, tipografia monumental e moldura inspirada em acervos. Não foram copiados fotografias, obras, código ou afirmações profissionais dos portfólios de referência.

## Componentes open-source avaliados

| Componente | Fonte | Aplicação | Decisão nesta versão |
| --- | --- | --- | --- |
| PhotoSwipe | https://photoswipe.com/getting-started/ e https://github.com/dimsemenov/PhotoSwipe | Galeria com ampliação e navegação por imagens | Candidato para uma coleção real maior. V1 usa dialog nativo para três exemplos. |
| img-comparison-slider | https://github.com/sneas/img-comparison-slider | Comparação de imagens antes/depois; projeto MIT | Referência de interação; V1 implementa o caso simples com range nativo e recorte CSS, sem copiar código. |
| Tiptap | https://tiptap.dev/open-source-to-platform | Núcleo de editor rico open-source MIT | Adiado até existir necessidade de texto formatado e CMS. V1 usa texto simples, renderizado com textContent. |

Não foram incorporados esses pacotes. A pesquisa orientou o escopo e evita adicionar infraestrutura antes de haver material autoral. Antes de uma futura integração, fixar versão, conferir a licença dessa versão e preservar avisos; recursos pagos de uma plataforma não se tornam livres por o núcleo ser open-source.

## REA

Usado para observar o comportamento e a organização pública dos dois portfólios acima, a pedido de Paulo. Os resultados são evidência de referência visual, não licença para reutilizar conteúdo. A nova versão local foi conferida no navegador em telas móvel e desktop (evidência `ev_2b7df319d2ff2339a8ab3180e412d46f8896f0e71f3ef86fe0462e63173117bc`).

## Prioridades seguintes

1. Substituir demonstrações por estudos reais, preservando datas e créditos das referências.
2. Acrescentar fotografia pessoal autorizada, se desejado.
3. Integrar publicações do Instagram pela API oficial somente depois da criação e autorização do aplicativo Meta, mantendo credenciais fora do site público.
