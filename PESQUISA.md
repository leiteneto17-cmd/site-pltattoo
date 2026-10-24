# Pesquisa e decisões — 24/10/2026

## Referência para a simulação 2D

- A [página oficial de Ink Studio: Tattoo Artist Simulator](https://store.steampowered.com/app/1496170/Ink_Studio_Tattoo_Artist_Simulator/?cc=us&l=english) foi observada com REA em 24/10/2026 (evidência `ev_bfc4674d353bf011d01ea2e68dc1e6e1e40a5d69ba7d666ea7511e5e75ee840a`). As imagens de divulgação mostram uma mesa de composição, seleção da arte e da posição no corpo, controles em torno de uma visualização 2D e uma cena de estúdio. A página dizia “Coming soon” e não havia avaliações de jogadores; portanto, a análise considera **somente** o material divulgado, sem inferir funcionamento ou qualidade do jogo final.
- A captura fornecida por Paulo mostrou um corpo 2D com uma guia pontilhada, paleta lateral e interação sobre a região das costas. Ela ajudou a definir escala e foco da cena. A imagem não foi reutilizada no site.
- O minijogo próprio usa duas artes geradas para este portfólio, corpo ilustrado e posição controlada por arraste ou sliders. A primeira versão tinha três camadas visuais e um acabamento por pontos; a revisão abaixo trocou esse avanço automático por contorno livre. A obra, a interface e o código da referência externa não foram copiados.

### Revisão da bancada e do controle livre

- O [Photopea](https://www.photopea.com/) foi aberto com REA em 24/10/2026 (evidência `ev_1fd7b795451d7b321b9993c07d9e7db1d4fa9155adefd7d03ad2b133f8b2a850`). A observação confirmou uma área central de trabalho com ferramentas e parâmetros ao redor. O [manual oficial das ferramentas de pincel](https://www.photopea.com/learn/brush-tools) descreve o traço como uma sequência contínua gerada pelo movimento do mouse ou outro dispositivo apontador; o [manual de formas](https://www.photopea.com/learn/vg-creating) diferencia isso da criação de caminhos por nós. São referências de interação, não fontes de código, interface ou recursos visuais.
- A etapa final foi refeita para registrar o percurso real do ponteiro sobre rotas de contorno desenhadas para cada arte. O jogo mede proximidade com a guia, avança somente quando o jogador percorre os trechos na ordem e mostra precisão, pontos e desvios. Há opção de alvo maior e controle por setas com Espaço. A bancada virou uma mesa top-down com seis objetos vetoriais originais, arraste ou toque para encaixar, e escolhas visuais de tinta e máquina. A sequência é cenográfica, sem instruções de procedimento ou biossegurança.
- O percurso inteiro, inclusive três contornos da mariposa, foi concluído em navegador. O arraste de objeto e a penalidade por sair da linha também foram exercitados. Nenhuma biblioteca ou repositório externo foi necessário; a implementação permanece em HTML, CSS, SVG e JavaScript do projeto.

Esta pesquisa começou na versão de cartaz e foi atualizada para **Arquivo do Traço**. A auditoria das mudanças está em [AUDITORIA-4-PASSAGENS.md](AUDITORIA-4-PASSAGENS.md).

## Portfólios e linguagem visual

- [JARC. Tattoo](https://jarctattoo.com/) — inspecionado com REA (evidência ev_8a200dee6b4a445d00b0e8486985ae88737f5b665489ba0cfaea6f929e88ac69). O site usa fundo preto, título sans muito grande e poucos caminhos de navegação. Foi referência para presença tipográfica, não para conteúdo profissional.
- [donker.](https://donkerartist.com/) — inspecionado com REA (evidência ev_72a14603cfd06bebdda3def785749f9bbfb94d1017fd341e5f0528dcd625bea0). O portfólio usa identidade curta e forte, preto, luz e cor de contraste. A versão de Leite usa composição e cores próprias.
- [Art by Lobo](https://artbylobo.com/) — inspecionado com REA (evidência ev_64e5d133557abfa0f96db6fd7f1f3dfeaf047e67e40733bd8f9f304f7dd83ff9). A página dá escala à marca e à imagem; também ajudou a identificar o que evitar para Paulo: fotografias de tatuagens de terceiros e chamadas de agendamento.
- [Tattoodo — artigos](https://www.tattoodo.com/articles/) — referência de separação editorial por temas de tatuagem, entrevistas e guias. Nenhum texto ou imagem foi copiado.

A solução para Leite combina um cartaz contemporâneo com sinais de folha de flash: tipografia condensada, preto e cinza, vermelho de marcação, pequenos números de arquivo e uma mariposa vetorial demonstrativa criada para o projeto. A escultura deixou de ocupar a capa e foi para história da arte. A página separa claramente treinos reais, pesquisa e roteiro futuro.

## Fontes dos textos públicos

- [British Museum — pesquisa sobre as múmias de Gebelein](https://www.britishmuseum.org/sites/default/files/2020-06/British-Museum_Egypt_Sudan_Newsletter6_2019_0.pdf): curadores descrevem os motivos animais revelados por infravermelho e a datação aproximada. A nota do site é um resumo curto, com link direto para a fonte.
- [The Henry Ford — Percy Waters e folhas de flash](https://www.thehenryford.org/collections/explore/articles/tatoo-history-at-thf): acervo e explicação do papel das folhas de desenhos.
- [Wellcome Collection — história da tatuagem](https://wellcomecollection.org/stories/a-brief-history-of-tattoos): diversidade de práticas e sentidos culturais. A nota do site evita atribuir uma origem única.
- [The Met — escultura romana](https://www.metmuseum.org/art/collection/search/257640): fotografia identificada pelo museu como domínio público; crédito preservado no site e em CREDITOS.md.
- [The Met — Caravaggio](https://www.metmuseum.org/toah/hd/crvg/hd_crvg.htm): texto sobre uso dramático da luz e proximidade das figuras.
- [Tattoodo — black & grey](https://www.tattoodo.com/tattoos/ideas/black-and-grey-tattoos): exemplos da linguagem visual; nenhuma imagem desses artistas foi reproduzida.
- [Smithsonian National Air and Space Museum — acervo de flash](https://www.smithsonianmag.com/blogs/air-space-museum/2020/10/05/body-art-during-world-war-ii-lyle-tuttle-tattoo-art-collection/): discussão de folhas de flash como documentos de estilo e época.

## Treinos e publicação

O perfil público foi consultado em 24/10/2026, mas mostrou uma janela de cadastro/login no lugar das publicações. Não havia links individuais de treinos verificados para incorporação. O perfil foi ligado diretamente como canal principal; nenhuma imagem de exemplo aparece como treino concluído. O cronograma é um roteiro sugerido, sem datas ou atividades falsamente concluídas. A integração automática com Instagram continua dependente de um aplicativo Meta autorizado e armazenamento seguro do token fora do site estático.

O painel Supabase permanece separado. A página pública lê os registros reais marcados como publicados, filtra demonstrações e exibe um estado vazio quando não há estudos. Isso foi testado sem criar uma postagem fictícia como se fosse progresso de Paulo.

## Direitos e implementação

O SVG da capa e o comparador foram criados para este projeto e rotulados como demonstração. Não se copiou código, fotografias nem trabalhos dos portfólios observados. A nova página foi revista em desktop e celular; menu, seções, links e comparador foram testados. O arquivo original de pesquisa de 23/10/2026 foi substituído porque descrevia a direção neoclássica anterior.
