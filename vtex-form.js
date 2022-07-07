(function ($) {
  $.fn.extend({
    vtexMasterDataForm: function (options) {
      const $form = $(this);
      const dataEntity = $form.attr("entity");
      const URL = `/api/dataentities/${dataEntity}/documents/`;
      let dataForm = {};

      if (!dataEntity) throw "Erro: Atributo 'entity' é undefined";

      $form.on("submit", function (event) {
        event.preventDefault();

        if (!options.getFields) {
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
        } else {
          dataForm = options.getFields();
        }

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
