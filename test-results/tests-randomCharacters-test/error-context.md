# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\randomCharacters.spec.ts >> test
- Location: tests\randomCharacters.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: '—', description: 'Insira o tamanho da sua coleção de personagens Mudae' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]: ✓
        - generic [ref=e8]: "2"
        - generic [ref=e11]: "3"
        - generic [ref=e14]: "4"
      - generic [ref=e17]:
        - generic [ref=e18]:
          - paragraph [ref=e19]: ETAPA 2 DE 4
          - heading "Dados dos jogadores" [level=1] [ref=e20]
          - paragraph [ref=e21]: Cada jogador precisa de uma coleção com no mínimo 8 personagems.
        - generic [ref=e22]:
          - generic [ref=e23]:
            - generic [ref=e24]:
              - generic [ref=e25]: JOGADOR 1
              - textbox "Nome" [ref=e26]: Alexandre
            - generic [ref=e27]:
              - generic [ref=e28]: COLEÇÃO
              - textbox [active] [ref=e29]
          - generic [ref=e30]:
            - generic [ref=e31]:
              - generic [ref=e32]: JOGADOR 2
              - textbox "Nome" [ref=e33]
            - generic [ref=e34]:
              - generic [ref=e35]: COLEÇÃO
              - textbox "—" [ref=e36]
        - generic [ref=e37]:
          - button "← Voltar" [ref=e38] [cursor=pointer]
          - button "Confirmar →" [disabled] [ref=e39]
  - button "Open Next.js Dev Tools" [ref=e45] [cursor=pointer]
  - alert [ref=e49]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | test("test", async ({ page }) => {
  4   |   await page.goto("http://localhost:3000/");
  5   |   await page.getByRole("button", { name: "— Selecione —" }).click();
  6   |   await page
  7   |     .getByRole("button", { name: "jogadores — 8 personagens cada" })
  8   |     .click();
  9   |   await page.getByRole("button", { name: "Continuar →" }).click();
  10  |   await page.getByRole("textbox", { name: "Nome" }).first().click();
  11  |   await page.getByRole("textbox", { name: "Nome" }).first().press("CapsLock");
  12  |   await page.getByRole("textbox", { name: "Nome" }).first().fill("A");
  13  |   await page.getByRole("textbox", { name: "Nome" }).first().press("CapsLock");
  14  |   await page.getByRole("textbox", { name: "Nome" }).first().fill("Alexandre");
  15  |   await page
  16  |     .getByRole("textbox", {
  17  |       name: "—",
  18  |       description: "Insira o tamanho da sua coleção de personagens Mudae",
  19  |     })
  20  |     .click();
  21  |   await page
  22  |     .getByRole("textbox", {
  23  |       name: "—",
  24  |       description: "Insira o tamanho da sua coleção de personagens Mudae",
  25  |     })
> 26  |     .fill("8");
      |      ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  27  |   await page.getByRole("textbox", { name: "Nome" }).nth(1).click();
  28  |   await page.getByRole("textbox", { name: "Nome" }).nth(1).press("CapsLock");
  29  |   await page.getByRole("textbox", { name: "Nome" }).nth(1).fill("P");
  30  |   await page.getByRole("textbox", { name: "Nome" }).nth(1).press("CapsLock");
  31  |   await page.getByRole("textbox", { name: "Nome" }).nth(1).fill("Pedro");
  32  |   await page
  33  |     .getByRole("textbox", {
  34  |       name: "—",
  35  |       description: "Insira o tamanho da sua coleção de personagens Mudae",
  36  |     })
  37  |     .click();
  38  |   await page
  39  |     .getByRole("textbox", {
  40  |       name: "—",
  41  |       description: "Insira o tamanho da sua coleção de personagens Mudae",
  42  |     })
  43  |     .fill("8");
  44  |   await page.getByRole("button", { name: "Confirmar →" }).click();
  45  |   await page.getByRole("button", { name: "Informar nomes →" }).click();
  46  |   await page
  47  |     .getByRole("textbox", { name: "Nome do personagem" })
  48  |     .first()
  49  |     .click();
  50  |   await page
  51  |     .getByRole("textbox", { name: "Nome do personagem" })
  52  |     .first()
  53  |     .press("CapsLock");
  54  |   await page
  55  |     .getByRole("textbox", { name: "Nome do personagem" })
  56  |     .first()
  57  |     .fill("L");
  58  |   await page
  59  |     .getByRole("textbox", { name: "Nome do personagem" })
  60  |     .first()
  61  |     .press("CapsLock");
  62  |   await page
  63  |     .getByRole("textbox", { name: "Nome do personagem" })
  64  |     .first()
  65  |     .fill("Luiz");
  66  |   await page
  67  |     .getByRole("textbox", { name: "Nome do personagem" })
  68  |     .nth(1)
  69  |     .click();
  70  |   await page
  71  |     .getByRole("textbox", { name: "Nome do personagem" })
  72  |     .nth(1)
  73  |     .press("CapsLock");
  74  |   await page
  75  |     .getByRole("textbox", { name: "Nome do personagem" })
  76  |     .nth(1)
  77  |     .fill("A");
  78  |   await page
  79  |     .getByRole("textbox", { name: "Nome do personagem" })
  80  |     .nth(1)
  81  |     .press("CapsLock");
  82  |   await page
  83  |     .getByRole("textbox", { name: "Nome do personagem" })
  84  |     .nth(1)
  85  |     .fill("Alfredo");
  86  |   await page
  87  |     .getByRole("textbox", { name: "Nome do personagem" })
  88  |     .nth(2)
  89  |     .click();
  90  |   await page
  91  |     .getByRole("textbox", { name: "Nome do personagem" })
  92  |     .nth(2)
  93  |     .press("CapsLock");
  94  |   await page
  95  |     .getByRole("textbox", { name: "Nome do personagem" })
  96  |     .nth(2)
  97  |     .fill("P");
  98  |   await page
  99  |     .getByRole("textbox", { name: "Nome do personagem" })
  100 |     .nth(2)
  101 |     .press("CapsLock");
  102 |   await page
  103 |     .getByRole("textbox", { name: "Nome do personagem" })
  104 |     .nth(2)
  105 |     .fill("Priscila");
  106 |   await page
  107 |     .getByRole("textbox", { name: "Nome do personagem" })
  108 |     .nth(3)
  109 |     .click();
  110 |   await page
  111 |     .getByRole("textbox", { name: "Nome do personagem" })
  112 |     .nth(3)
  113 |     .press("CapsLock");
  114 |   await page
  115 |     .getByRole("textbox", { name: "Nome do personagem" })
  116 |     .nth(3)
  117 |     .fill("M");
  118 |   await page
  119 |     .getByRole("textbox", { name: "Nome do personagem" })
  120 |     .nth(3)
  121 |     .press("CapsLock");
  122 |   await page
  123 |     .getByRole("textbox", { name: "Nome do personagem" })
  124 |     .nth(3)
  125 |     .fill("Maria");
  126 |   await page
```