(function(module){
  var aboutController = {};

  aboutController.index = function() {
    $('#filter_wrapper').hide();
    $('.tab-content').hide();
    $('#about_section').show();
  };

  module.aboutController = aboutController;
})(window);
