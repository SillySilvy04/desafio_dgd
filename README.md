# DashGit

O **Dash-Git** consiste de um dashboard para visualizar as informações (forks, stars e watchers) do repositório "mais popular" retornado pela API do github após uma busca por uma palavra específica

## Tecnologias Utilizadas

Segue a lista de tecnologias utilizadas para confecção do projeto:

- **[React](https://react.dev/)** (via **[Vite](https://vitejs.dev/)**): Para uma construção de interface.
- **[TypeScript](https://www.typescriptlang.org/)**: Para tipagem do código.
- **[Recharts](https://recharts.org/)**: Biblioteca para criação de gráficos.
- **CSS Modules**: Conceito utilizado para estilização.
- **GitHub REST API**: Para consumo de dados reais dos repositórios.

## Estrutura do Projeto

```bash
dashboard/
├── public/              # arquivos estáticos (favicon, etc)
├── src/
│   ├── assets/          # ícones e imagens (star.png, git.png, etc)
│   ├── components/      # componentes reutilizáveis (Charts, Cards, Sidebar)
│   ├── styles/          # estilos globais e reset
│   ├── App.tsx          # componente principal
│   └── main.tsx         # ponto de entrada
└── ...
```
