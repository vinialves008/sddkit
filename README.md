# SDDKit

Toolkit de Specification-Driven Development (SDD) para projetos desenvolvidos com agentes de IA. O SDDKit instala instruções, modelos e skills que conduzem o trabalho de uma especificação até sua validação.

O pacote é uma CLI de inicialização: ele prepara os arquivos do fluxo no projeto. As etapas SDD são conduzidas pelo agente de IA usando as skills instaladas; o CLI não implementa funcionalidades nem executa essas etapas por conta própria.

## Requisitos

- Node.js 20 ou superior
- Um ambiente de agente compatível com skills, como VS Code ou Claude Code

## Início rápido

Execute o comando na raiz do projeto que deseja preparar.

Para VS Code:

```sh
npx --yes --package=sddkit-development sddkit init vscode
```

Para Claude Code:

```sh
npx --yes --package=sddkit-development sddkit init claude
```

O comando `init` aceita os adapters `vscode` e `claude`. Para consultar as opções disponíveis:

```sh
npx --yes --package=sddkit-development sddkit --help
```

Também é possível instalar o pacote globalmente e usar o executável `sddkit` diretamente:

```sh
npm install --global sddkit-development
sddkit init vscode
```

## Arquivos instalados

Ambos os adapters instalam os arquivos comuns do SDDKit:

```text
.sdd/
├── commands/       # Instruções detalhadas de cada etapa
├── templates/      # Modelos para os documentos da especificação
└── sdd.md          # Fluxo e regras do SDD
.sddkit/
└── manifest.json   # Versões do SDDKit e do adapter instalado
```

As skills específicas do ambiente são instaladas em:

- VS Code: `.github/skills/`
- Claude Code: `.claude/skills/`

O comando não cria a pasta `specs/` nem uma especificação inicial. A etapa de requisitos cria a próxima especificação quando o agente iniciar o fluxo.

### Sobrescrever arquivos

Se o projeto já tiver um manifesto do SDDKit, uma nova inicialização sem opções não altera os arquivos. Para sobrescrever os arquivos instalados:

```sh
sddkit init vscode --force
```

Com `npx`, use a mesma opção ao final do comando, por exemplo `npx --yes --package=sddkit-development sddkit init vscode --force`. A opção `--force` atualiza os arquivos copiados pelo SDDKit, mas não remove arquivos antigos ou outros arquivos do projeto.

## Fluxo SDD

Após inicializar o projeto, use as skills na ordem abaixo. A forma de acioná-las depende do ambiente; nos ambientes com comandos de skill, os nomes correspondem a `/sdd-req`, `/sdd-plan` e assim por diante.

1. **Requisitos (`sdd-req`)**: definir contexto, escopo, restrições e resolver dúvidas. Não altera o código da aplicação.
2. **Plano (`sdd-plan`)**: definir requisitos funcionais e critérios de aceite. Requer requisitos concluídos.
3. **Tasks (`sdd-tasks`)**: decompor o plano em tarefas ordenadas e dependências. Requer plano concluído.
4. **Execução (`sdd-execute`)**: implementar e testar as tarefas, uma por vez. É a única etapa autorizada a alterar o código da aplicação.
5. **Validação (`sdd-validate`)**: conferir os critérios de aceite e registrar evidências. Requer execução concluída.

As etapas são sequenciais. O arquivo `specs/<numero>-<contexto>/status.md` registra o estado atual, e o agente deve consultá-lo antes de continuar. Em caso de falha na validação, o fluxo retorna à execução.

Uma especificação pode conter:

```text
specs/
└── 001-contexto/
	├── status.md
	├── req.md
	├── plan.md
	├── tasks.md
	└── validate.md
```

## Desenvolvimento

Para trabalhar no próprio pacote:

```sh
npm install
npm run build
npm test
```

O build compila o TypeScript e copia os templates para `dist/`. Para executar o CLI a partir do código-fonte:

```sh
npm run dev -- --help
```

## Licença

Distribuído sob a licença ISC. Consulte [LICENSE](LICENSE).
