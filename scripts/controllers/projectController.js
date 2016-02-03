(function(module){
  var projectController = {};

  var projects = [];
  retrieveETagFromSource();


  projectController.index = function(){
    $('#filter_wrapper').show();
    $('.tab-content').hide();
    $('#home_section').show();
  };

  module.projectController = projectController;
})(window);
