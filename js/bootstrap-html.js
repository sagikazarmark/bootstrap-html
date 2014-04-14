(function($) {
  $(document).ready(function($) {
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="switch"]').bootstrapSwitch();
    $('[data-toggle="tag"]').tagsinput();
    $('.select').selectpicker();
  });
})(jQuery);
