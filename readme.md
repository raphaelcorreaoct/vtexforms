# VtexFormMasterData

VtexFormMasterData é uma lib para manipular formuários que interagem com o master data da vtex.

![Badge](https://img.shields.io/badge/Autor-Raphael%20Corr%C3%AAa-blue)
![Badge](https://img.shields.io/badge/Version-1.0.0-green)
![Badge](https://img.shields.io/badge/PRs-welcome-green)

## Como usar?

Faça o download do arquivo `vtex-form.js` e coloque a chamado no corpo do HTML.

```HTML
<script src="/arquivos/vtex-form.js"></script>
```

Em seguida, faça a seleção do formulário que deseja manipular e em seguida chame o método `vtexMasterDataForm`.

```JavaScript
$("#meu-form").vtexMasterDataForm({
  success: function () {
    alert("DEU TUDO CERTO!");
  },
  error: function () {
    alert("Ops!!!");
  },
});
```

## Opções

```JavaScript
{
  // Executa quando um campo não passa na validação
  onValidateError: null,

  // Executa quando finaliza a requisição Ajaxa com sucesso
  success: function (response) {},

  // Executa quando finaliza a requisição Ajaxa com error
  error: function (error) {},

  // Função opcional para fazer verificações de campos específicos. Deve retornar um boolean
  validate: function () {
    return true;
  },

  // Caso seja necessário ignorar a validação em algum formulário
  ignoreValidates: false
}
```
