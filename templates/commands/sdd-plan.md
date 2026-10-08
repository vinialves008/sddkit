# /sdd-plan

Você está executando a etapa de planejamento do SDD.

Leia primeiro:

```text
.sdd/sdd.md
```

Depois leia:

```text
req.md
status.md
```

---

# Pré-condição

O estado deve ser:

```text
REQ_COMPLETED
```

E:

```text
Dúvidas pendentes = 0
```

Caso contrário, bloquear a execução.

---

# Objetivo

Criar:

```text
plan.md
```

contendo:

- requisitos funcionais;
- critérios de aceite;
- matriz de rastreabilidade.

---

# Requisitos funcionais

Cada requisito deve possuir:

```text
RF-XXX
Nome
Descrição
Origem
```

Exemplo:

```text
RF-001 — Exibição do Hero

Descrição:
A Landing Page deve apresentar uma seção Hero contendo título,
descrição e CTA.

Origem:
RNF-001
```

---

# Critérios de aceite

Cada RF deve possuir pelo menos um critério.

Formato:

```text
CA-XXX

Relacionado a:
RF-XXX

Dado:
...

Quando:
...

Então:
...
```

Os critérios devem ser:

- objetivos;
- verificáveis;
- testáveis;
- independentes de implementação quando possível.

---

# Matriz de rastreabilidade

Criar:

```text
RNF → RF → CA
```

Nenhum RF pode ficar sem CA.

---

# Conclusão

Quando o plano estiver completo:

```text
CURRENT_STATE: PLAN_COMPLETED
```

Atualizar `status.md`.

Informar:

```text
Etapa de planejamento concluída.

Próxima etapa:
 /sdd-tasks
```

Não executar `/sdd-tasks` automaticamente.
