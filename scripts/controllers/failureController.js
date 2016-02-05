(function(module){
  var failureController = {};

  failureController.index = function(){
    $('#filter_wrapper').hide();
    $('.tab-content').hide();
    $('#failure_section').show();
  };

  module.failureController = failureController;
})(window);
