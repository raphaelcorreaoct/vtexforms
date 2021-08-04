(function ($) {
  $.fn.extend({
    vtexMasterDataForm: function (opt) {
      const options = {
        onValidateError: null,
        success: function () {},
        error: function () {},
        validate: function () {
          return true;
        },
        ignoreValidates: false,
        ...opt,
      };

      const $form = $(this);
      const dataEntity = $form.attr("entity");
      const URL = `/api/dataentities/${dataEntity}/documents/`;
      const dataForm = {};

      if (!dataEntity) throw "Erro: Atributo 'entity' é undefined";

      $form.on("submit", function (event) {
        event.preventDefault();

        $form.find("input, textarea").each(function () {
          const name = $(this).attr("name");
          const value = $(this).val() !== "" ? $(this).val() : null;
          dataForm[name] = value;
        });

        $form.find("input:checked").each(function () {
          const name = $(this).attr("name");
          const value = $(this).val() !== "" ? $(this).val() : null;
          dataForm[name] = value;
        });

        $form.find("select").each(function () {
          const name = $(this).attr("name");
          const value = $(this).find("option:selected").val();
          dataForm[name] = value;
        });

        if (
          (options.validate && options.validate(dataForm)) ||
          options.ignoreValidates
        ) {
          $.ajax({
            headers: {
              Accept: "application/vnd.vtex.ds.v10+json",
              "Content-Type": "application/json",
            },
            data: JSON.stringify(dataForm),
            type: "PATCH",
            url: URL,
            success: options.success,
            error: options.error,
          });
        } else {
          if (options.onValidateError) options.onValidateError();
        }
      });
    },
  });
})(jQuery);
