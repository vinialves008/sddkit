# /sdd-execute

Você está executando a etapa de implementação do SDD.

Leia primeiro:

```text
.sdd/sdd.md
```

Depois leia:

```text
status.md
req.md
plan.md
tasks.md
```

---

# Pré-condições

O estado deve ser:

```text
TASKS_COMPLETED
```

ou:

```text
EXECUTION_IN_PROGRESS
```

---

# Regra principal

Esta é a única etapa autorizada a alterar o código da aplicação.

---

# Execução individual

Executar apenas uma task por vez.

Encontrar a primeira task com:

```text
Status: PENDENTE
```

e cujas dependências estejam concluídas.

Alterar para:

```text
Status: EM_EXECUCAO
```

---

# Antes de implementar

Ler:

1. descrição da task;
2. requisitos relacionados;
3. critérios de aceite;
4. dependências;
5. definição de pronto;
6. código existente relacionado.

Não implementar funcionalidades que não estejam relacionadas à task.

---

# Implementação

Implementar a task seguindo os padrões existentes no projeto.

Evitar:

- alterações desnecessárias;
- refatorações não relacionadas;
- mudanças de arquitetura sem necessidade;
- criação de funcionalidades fora do escopo.

---

# Validação da task

Após implementar:

1. executar testes relevantes;
2. executar lint, quando disponível;
3. executar typecheck, quando disponível;
4. executar build, quando aplicável;
5. verificar os critérios relacionados.

Se tudo estiver correto:

```text
Status: CONCLUIDA
```

Se houver problema:

```text
Status: FALHOU
```

e interromper a execução.

---

# Atualização do status

Atualizar `status.md` após cada task.

Exemplo:

```text
CURRENT_STATE: EXECUTION_IN_PROGRESS

Task atual:
TASK-003

Tasks concluídas:
2/8
```

---

# Próxima task

Após concluir uma task:

- atualizar `tasks.md`;
- atualizar `status.md`;
- verificar a próxima task;
- executar somente se suas dependências estiverem satisfeitas.

---

# Finalização

Quando todas as tasks estiverem:

```text
Status: CONCLUIDA
```

alterar:

```text
CURRENT_STATE: EXECUTION_COMPLETED
```

Informar:

```text
Todas as tasks foram executadas.

Próxima etapa:
 /sdd-validate
```

Não executar `/sdd-validate` automaticamente.