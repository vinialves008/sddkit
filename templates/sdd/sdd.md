# SDD — Specification-Driven Development

## Objetivo

Este projeto utiliza um fluxo de Specification-Driven Development (SDD) para controlar o desenvolvimento de funcionalidades.

O fluxo possui cinco etapas obrigatórias:

1. `/sdd-req`
2. `/sdd-plan`
3. `/sdd-tasks`
4. `/sdd-execute`
5. `/sdd-validate`

As etapas são sequenciais e possuem dependências.

Nenhuma etapa pode ser ignorada.

---

# Estrutura

As especificações ficam em:

```text
specs/
```

Cada especificação possui uma pasta própria:

```text
specs/
└── 001-contexto/
    ├── status.md
    ├── req.md
    ├── plan.md
    ├── tasks.md
    └── validate.md
```

O número da spec deve ser sequencial.

---

# Máquina de estados

Estados válidos:

```text
REQ_IN_PROGRESS
REQ_COMPLETED

PLAN_IN_PROGRESS
PLAN_COMPLETED

TASKS_IN_PROGRESS
TASKS_COMPLETED

EXECUTION_IN_PROGRESS
EXECUTION_COMPLETED

VALIDATION_IN_PROGRESS
VALIDATION_FAILED
VALIDATED
```

Fluxo oficial:

```text
REQ_IN_PROGRESS
    ↓
REQ_COMPLETED
    ↓
PLAN_IN_PROGRESS
    ↓
PLAN_COMPLETED
    ↓
TASKS_IN_PROGRESS
    ↓
TASKS_COMPLETED
    ↓
EXECUTION_IN_PROGRESS
    ↓
EXECUTION_COMPLETED
    ↓
VALIDATION_IN_PROGRESS
    ↓
VALIDATED
```

Em caso de falha:

```text
VALIDATION_FAILED
    ↓
EXECUTION_IN_PROGRESS
```

---

# Regra principal

O agente deve sempre consultar:

```text
specs/*/status.md
```

antes de executar qualquer comando.

O estado definido em `status.md` é a fonte de verdade para determinar a etapa atual.

---

# Responsabilidade de cada etapa

## /sdd-req

Responsável por:

- criar uma nova spec;
- definir contexto;
- definir escopo;
- identificar requisitos não funcionais;
- identificar restrições;
- identificar dúvidas;
- resolver dúvidas.

Não pode:

- definir implementação;
- criar tasks;
- alterar código.

A etapa só pode terminar quando:

```text
Dúvidas pendentes = 0
```

---

## /sdd-plan

Responsável por:

- definir requisitos funcionais;
- definir critérios de aceite;
- criar rastreabilidade entre requisitos e critérios.

Pré-condição:

```text
REQ_COMPLETED
```

Não pode:

- criar tasks;
- alterar código.

---

## /sdd-tasks

Responsável por:

- decompor requisitos em tasks;
- criar dependências;
- ordenar tasks;
- definir definição de pronto.

Pré-condição:

```text
PLAN_COMPLETED
```

Não pode:

- alterar código.

---

## /sdd-execute

Responsável por:

- executar as tasks;
- alterar código;
- testar implementação;
- marcar tasks como concluídas.

Pré-condição:

```text
TASKS_COMPLETED
```

Esta é a única etapa autorizada a alterar o código da aplicação.

As tasks devem ser executadas uma por vez.

---

## /sdd-validate

Responsável por:

- validar os critérios de aceite;
- verificar a implementação;
- produzir evidências;
- identificar falhas.

Pré-condição:

```text
EXECUTION_COMPLETED
```

Resultado:

```text
VALIDATED
```

ou:

```text
VALIDATION_FAILED
```

---

# Regra de bloqueio

Se o comando solicitado não for compatível com o estado atual, o agente deve bloquear a operação.

Nunca deve executar uma etapa anterior ou posterior automaticamente.

Exemplo:

```text
Estado atual:
REQ_IN_PROGRESS

Comando:
 /sdd-execute
```

Resultado:

```text
COMANDO BLOQUEADO

Estado atual:
REQ_IN_PROGRESS

Etapa necessária:
 /sdd-req

Motivo:
A especificação ainda não concluiu os requisitos.
```

---

# Regra de não invenção

Quando uma informação necessária para continuar não estiver disponível, o agente deve criar uma dúvida.

Nunca deve inventar:

- regras de negócio;
- endpoints;
- credenciais;
- contratos de API;
- comportamento;
- textos obrigatórios;
- integrações;
- decisões de UX;
- requisitos técnicos importantes.

---

# Regra de rastreabilidade

Utilizar identificadores únicos:

```text
RNF-001
RF-001
CA-001
TASK-001
```

A rastreabilidade deve seguir:

```text
RNF
 ↓
RF
 ↓
CA
 ↓
TASK
 ↓
IMPLEMENTAÇÃO
```

---

# Regra de idempotência

Executar um comando novamente não deve apagar trabalho existente.

Antes de criar ou alterar um artefato:

1. verificar se existe;
2. ler seu conteúdo;
3. identificar o estado atual;
4. preservar informações válidas;
5. atualizar somente o necessário.

---

# Recuperação

Caso o trabalho seja interrompido, o agente deve:

1. localizar a spec em andamento;
2. ler `status.md`;
3. identificar `CURRENT_STATE`;
4. identificar `Task atual`, quando aplicável;
5. continuar a partir desse ponto.

Nunca reiniciar uma etapa já concluída.

---

# Alteração de código

Somente:

```text
/sdd-execute
```

pode alterar arquivos da aplicação.

Os demais comandos são exclusivamente de análise e especificação.

---

# Definição de spec concluída

Uma spec só está concluída quando:

```text
status.md = VALIDATED
```

e:

```text
todos os critérios de aceite = PASSOU
```