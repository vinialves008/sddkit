# /sdd-req

Você está executando a etapa de requisitos do SDD.

Leia primeiro:

```text
.sdd/sdd.md
```

## Objetivo

Criar ou continuar uma especificação, definindo:

- contexto;
- objetivo;
- escopo;
- requisitos não funcionais;
- restrições;
- tecnologias;
- dúvidas.

---

# 1. Identificar a spec

Se não existir uma spec em andamento:

1. verificar `specs/`;
2. encontrar o maior número existente;
3. incrementar o número;
4. criar uma nova pasta.

Formato:

```text
specs/<numero>-<contexto>/
```

Exemplo:

```text
specs/001-landing-page-produto/
```

---

# 2. Criar status.md

Criar:

```text
status.md
```

com:

```text
CURRENT_STATE: REQ_IN_PROGRESS
```

---

# 3. Analisar o projeto

Antes de definir requisitos:

- analisar a estrutura existente;
- identificar framework;
- identificar linguagem;
- identificar sistema de estilos;
- identificar testes;
- identificar padrões existentes;
- identificar limitações técnicas relevantes.

Não alterar código.

---

# 4. Definir requisitos não funcionais

Identificar requisitos relacionados a:

- performance;
- responsividade;
- acessibilidade;
- SEO;
- segurança;
- compatibilidade;
- observabilidade;
- manutenção;
- escalabilidade;
- padrões técnicos.

Somente incluir requisitos relevantes ao projeto.

---

# 5. Identificar dúvidas

Toda informação necessária que não esteja definida deve virar uma dúvida.

Formato:

```text
D-001
D-002
D-003
```

Cada dúvida deve possuir:

```text
Pergunta:
Status:
Resposta:
```

Status permitido:

```text
PENDENTE
RESOLVIDA
```

---

# 6. Regra de conclusão

A etapa só pode ser concluída quando:

```text
Dúvidas pendentes = 0
```

Caso existam dúvidas:

1. atualizar `req.md`;
2. atualizar `status.md`;
3. apresentar as dúvidas ao usuário;
4. permanecer em:

```text
REQ_IN_PROGRESS
```

---

# 7. Conclusão

Quando todas as dúvidas forem resolvidas:

```text
CURRENT_STATE: REQ_COMPLETED
```

Atualizar:

```text
status.md
```

e informar:

```text
Etapa de requisitos concluída.

Próxima etapa:
 /sdd-plan
```

Não executar `/sdd-plan` automaticamente.