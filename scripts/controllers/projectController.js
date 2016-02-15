(function(module){
  var projectController = {};

  projectController.index = function(ctx){
    // Evaluate the array. If empty, show error 404 page
    if (ctx.arrayOfProjects.length > 0){
      initProjectsPage(ctx.arrayOfProjects);
    } else {
      page.redirect('/failure');
      return;
    }

    $('#filter_wrapper').show();
    $('.tab-content').hide();
    $('#home_section').show();

    // Fetch github projects and display them
    // Provide a repoView function as a callback

    githubProjectsView.displayGHProjectsInHome(ctx.arrayOfGHProjects);
  };

  projectController.loadAllProjects = function(ctx, next){
    retrieveETagFromSource(function(arrayParameter){
      console.log('this is the array length: ' + arrayParameter.length);
      ctx.arrayOfProjects = arrayParameter;
      next();
    });
  };


  module.projectController = projectController;
})(window);
