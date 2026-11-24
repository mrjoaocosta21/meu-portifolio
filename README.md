# Portfólio João Vitor — versão atualizada

Site de portfólio pessoal desenvolvido em **HTML, CSS e JavaScript puros**, com identidade escura e violeta, layout responsivo e slider de projetos acessível.

## 1. Estrutura dos arquivos

```text
portfolio-joao-vitor-atualizado/
├── index.html     # Conteúdo e organização da página
├── style.css      # Visual, cores e responsividade
├── script.js      # Menu móvel, slider e ano atualizado
├── favicon.svg    # Ícone do navegador
└── README.md      # Este guia
```

> Arquivos `preview-desktop.png` e `preview-mobile.png`, quando fornecidos separadamente, servem apenas para demonstrar a aparência. Não são necessários para executar o site.

## 2. Como executar

1. Extraia o arquivo ZIP completo.
2. Mantenha `index.html`, `style.css`, `script.js` e `favicon.svg` **na mesma pasta**.
3. Abra `index.html` com um navegador.

O site não exige Node.js, Python nem servidor. Para simular a publicação local com URLs HTTP, também é possível usar a extensão **Live Server** do VS Code.

## 3. O que mudou

- **Regra 60/30/10:** superfícies escuras dominantes, cartões em roxo profundo e violeta reservado para botões e destaques.
- **Hero em duas colunas:** mensagem principal à esquerda e editor de código ilustrativo à direita.
- **Tipografia:** Space Grotesk (títulos) e DM Sans (textos), com fontes alternativas caso não haja conexão.
- **Sessões reorganizadas:** Sobre, Tecnologias, Trajetória, Projetos e Contato.
- **Cartões e linha do tempo:** melhoria de legibilidade, hierarquia e espaçamento.
- **Projetos:** slider manual com quatro abas, setas, teclado e indicação do projeto selecionado.
- **Menu móvel:** abre e fecha com botão; fecha ao escolher uma seção, ao tocar fora ou ao pressionar Esc.
- **Acessibilidade:** link para pular ao conteúdo, rótulos de controles, foco visível e respeito a redução de movimento.
- **SEO:** descrição da página e metadados de compartilhamento revisados.

## 4. Paleta de cores — 60/30/10

| Função | Cor | Uso principal |
|---|---|---|
| Base — ~60% | `#08060D` | Fundo, áreas amplas e respiro visual |
| Superfícies — ~30% | `#120D1E` | Cards, menu e blocos de conteúdo |
| Acento — ~10% | `#A855F7` | Botões, foco, detalhes e elementos ativos |
| Texto | `#F8F5FC` | Títulos e elementos de destaque |
| Texto de apoio | `#C2B9CF` | Parágrafos e descrições |
| Violeta claro | `#C494FF` | Destaques tipográficos |

Esses percentuais são **referências de percepção visual**, e não uma contagem exata de pixels. Variáveis globais estão no início do `style.css` em `:root`.

## 5. Atualizar informações pessoais

Edite o `index.html` para trocar a apresentação, os textos de Sobre, tecnologias, experiências, idiomas, certificações e links de contato.

Dados de contato presentes na versão original foram preservados. Confirme antes de publicar:

- Endereço do site usado no `og:url` e no link do primeiro projeto.
- E-mail, LinkedIn, GitHub e CodePen.
- Datas, nomes de cargos e descrições profissionais.

**Importante:** as informações de trajetória e formação se baseiam no material fornecido. Não foi realizada validação externa desses dados.

## 6. Inserir seus projetos reais

Na seção `#projects` do `index.html`, existem quatro painéis `.project-slide`, com quatro botões `.slider-tab` correspondentes. O primeiro painel representa o próprio portfólio. **Os três painéis restantes são prévias conceituais, não capturas de projetos concluídos.**

Para substituir uma prévia por um projeto real:

1. Modifique o título e a descrição do painel desejado.
2. Substitua a arte HTML/CSS dentro da `.project-art` por uma imagem real (ex.: `<img src="imagens/meu-projeto.webp" alt="Tela inicial do projeto">`).
3. Atualize o tipo de projeto e o texto de prévia conceitual.
4. Acrescente um link publicado ou do repositório, se existir.
5. Conserve os IDs `project-panel-1` a `project-panel-4` e os respectivos `project-tab-1` a `project-tab-4`, para preservar a acessibilidade e o slider.

Se quiser acrescentar mais projetos, crie um novo `.project-slide` e um `.slider-tab` com IDs e `aria-controls` correspondentes. O JavaScript calcula automaticamente o total de painéis.

## 7. Personalizar a identidade visual

No `style.css`, altere estas variáveis:

```css
:root {
  --bg: #08060d;
  --surface: #120d1e;
  --accent: #a855f7;
  --accent-bright: #c494ff;
  --text: #f8f5fc;
}
```

Evite colocar texto branco pequeno sobre `#A855F7`; o botão principal usa texto escuro para melhorar o contraste.

## 8. Publicar no GitHub Pages

Se seu portfólio já está hospedado no GitHub Pages:

1. Faça uma cópia dos arquivos originais.
2. Substitua `index.html`, `style.css` e `script.js` no repositório correspondente e adicione `favicon.svg`.
3. Envie as alterações para a branch configurada no GitHub Pages.
4. Aguarde a publicação e atualize a página no navegador.

Depois de publicar, confira a URL real do site e atualize a meta `og:url`. Para mostrar uma imagem nas prévias de LinkedIn e WhatsApp, crie um arquivo de imagem próprio e configure `og:image` com seu endereço público absoluto.

## 9. Testes realizados

- Sintaxe JavaScript validada com `node --check`.
- Layout renderizado em larguras **320, 390, 768 e 1440 px**.
- Sem rolagem horizontal indevida nessas larguras.
- Menu móvel verificado (abrir, navegar e fechar).
- Slider verificado (setas, abas e número do projeto ativo).

A verificação visual utilizou fonte alternativa local, porque fontes remotas não foram necessárias para o teste.

---

Versão de referência: novembro de 2026.
