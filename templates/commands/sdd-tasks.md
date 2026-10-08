# /sdd-tasks

Você está executando a etapa de criação das tasks do SDD.

Leia primeiro:

```text
.sdd/sdd.md
req.md
plan.md
status.md
```

---

# Pré-condição

O estado deve ser:

```text
PLAN_COMPLETED
```

Caso contrário, bloquear.

---

# Objetivo

Criar:

```text
tasks.md
```

decompondo os requisitos funcionais em tasks executáveis.

---

# Estrutura da task

Cada task deve possuir:

```text
TASK-XXX

Título

Status:
PENDENTE

Requisitos:
RF-XXX

Critérios de aceite:
CA-XXX

Descrição:

Arquivos esperados:

Dependências:

Definição de pronto:
```

---

# Ordenação

As tasks devem ser ordenadas considerando:

1. dependências;
2. infraestrutura;
3. estrutura;
4. componentes;
5. funcionalidades;
6. integrações;
7. testes;
8. refinamentos.

Não criar dependências circulares.

---

# Regra de atomicidade

Uma task deve ser suficientemente pequena para ser:

- implementada;
- testada;
- revisada;
- concluída;

sem depender de múltiplas decisões não especificadas.

Se uma task exigir uma decisão de negócio não definida:

```text
não criar a decisão automaticamente.
```

A especificação deve voltar para esclarecimento.

---

# Conclusão

Quando todas as tasks necessárias estiverem definidas:

```text
CURRENT_STATE: TASKS_COMPLETED
```

Atualizar `status.md`.

Informar:

```text
Tasks criadas e ordenadas.

Próxima etapa:
 /sdd-execute
```

Não executar `/sdd-execute` automaticamente.