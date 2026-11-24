# Portfólio João Vitor

Portfólio pessoal em HTML, CSS e JavaScript, com identidade escura e violeta, projetos em grade e navegação responsiva com suporte a teclado.

## Executar

Abra `index.html` em um navegador. Não há dependências para instalar nem etapa de compilação. Também é possível usar o Live Server do VS Code para visualizar por HTTP.

## Estrutura

```text
meu-portifolio/
├── index.html          # Conteúdo, seções e cartões dos projetos
├── style.css           # Tokens visuais, componentes e responsividade
├── script.js           # Menu móvel, seção ativa e ano do rodapé
├── imagens/
│   ├── portfolio.png   # Captura real da página inicial
│   └── kanban.png      # Captura real da demonstração pública
├── favicon.svg
└── README.md
```

## Conteúdo e projetos

A ordem da página é: apresentação, projetos, sobre, tecnologias, trajetória e contato. O menu segue a mesma sequência.

Os três projetos estão disponíveis diretamente na grade, inclusive quando o JavaScript está desativado:

- **Portfólio pessoal:** o próprio site, com captura da apresentação inicial e link para o código.
- **Kanban de tarefas:** frontend em React e API em Node.js/Express/PostgreSQL. A demonstração publicada funciona no modo local e salva dados no navegador; os recursos multiusuário pertencem à versão com API.
- **Identificador de palavras-chave:** projeto acadêmico em Python, Streamlit e NLTK, com análise de textos em português, agrupamento pelo radical, frequência de termos e exportação em CSV. A arte do cartão é identificada como representação ilustrativa; não é uma captura da aplicação.

As informações dos projetos foram conferidas nos repositórios públicos. Os cartões possuem título, objetivo, recursos, tecnologias e links específicos. Novos projetos podem reutilizar `.project-card`, `.project-preview` e `.project-info` sem alterar o JavaScript.

## Navegação e acessibilidade

- O menu móvel direciona o foco ao primeiro link e mantém Tab/Shift+Tab entre seus controles.
- Escape, o botão de fechar e o clique na área escura fecham o menu e devolvem o foco ao botão.
- O conteúdo de fundo fica `inert` enquanto o painel está aberto; o estado anterior é restaurado ao fechar.
- Selecionar uma seção fecha o painel e direciona o foco ao destino.
- A navegação identifica a seção atual visualmente e com `aria-current="location"`.
- O deslocamento das âncoras usa apenas `scroll-padding-top`, com altura do cabeçalho e margem de respiro.
- Sem JavaScript, os links de navegação permanecem visíveis e todos os projetos continuam disponíveis.
- Há link para pular conteúdo, foco visível e respeito a `prefers-reduced-motion`.

## Personalizar

Edite o `index.html` para atualizar dados pessoais, experiências e projetos. Preserve os IDs das seções e os destinos do menu.

As cores, famílias tipográficas e espaçamentos principais ficam em `:root` no `style.css`. A tipografia utiliza Space Grotesk e DM Sans, com alternativas locais quando o Google Fonts estiver indisponível.

Ao mudar a apresentação inicial ou a demonstração do Kanban, atualize também as respectivas capturas em `imagens/`. Elas são arquivos locais e não dependem da disponibilidade dos outros sites para carregar.

## Publicação

Publique os arquivos e a pasta `imagens/` juntos no GitHub Pages. Confira os links, o endereço `og:url` e as informações pessoais antes da publicação. A imagem de compartilhamento `og:image` ainda pode ser adicionada quando houver uma arte própria para essa finalidade.
