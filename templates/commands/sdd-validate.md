# /sdd-validate

Você está executando a etapa final do SDD.

Leia:

```text
.sdd/sdd.md
status.md
req.md
plan.md
tasks.md
```

---

# Pré-condição

O estado deve ser:

```text
EXECUTION_COMPLETED
```

Caso contrário, bloquear.

---

# Objetivo

Validar todos os critérios de aceite.

---

# Processo

Para cada:

```text
CA-XXX
```

verificar:

1. requisito relacionado;
2. implementação relacionada;
3. comportamento esperado;
4. comportamento encontrado;
5. evidência;
6. resultado.

Resultado permitido:

```text
PASSOU
FALHOU
BLOQUEADO
```

---

# Regra de aprovação

A spec só pode ser aprovada quando:

```text
PASSOU = TOTAL DE CRITÉRIOS
```

Ou seja:

```text
0 critérios falhos
0 critérios bloqueados
```

---

# validate.md

Criar:

```text
validate.md
```

contendo:

- resultado;
- resumo;
- validação individual;
- evidências;
- critérios falhos;
- matriz final.

---

# Aprovação

Se todos os critérios passarem:

```text
CURRENT_STATE: VALIDATED
```

Resultado:

```text
APROVADO
```

---

# Falha

Se qualquer critério falhar:

```text
CURRENT_STATE: VALIDATION_FAILED
```

Registrar:

- critério;
- problema;
- evidência;
- comportamento esperado;
- comportamento encontrado.

A correção deve ser realizada através de:

```text
/sdd-execute
```

Não alterar código diretamente nesta etapa.

---

# Finalização

Se aprovado:

```text
Spec concluída.

Todos os critérios de aceite foram atendidos.
```

Se reprovado:

```text
Spec não concluída.

Existem critérios de aceite pendentes.

Próxima ação:
 /sdd-execute
```