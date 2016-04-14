(function(module){
  var aboutController = {};

  aboutController.index = function(ctx) {
    githubProjectsView.displayGHProjectsInAbout(ctx.arrayOfGHProjects);

    $('#filter_wrapper').hide();
    $('.tab-content').hide();
    $('#about_section').show();

    // Fetch github projects and display them
    // Provide a repoView function as a callback
    // gitHubProjects.fetchGitHubProjects(githubProjectsView.displayGHProjectsInAbout);
  };

  aboutController.loadGHProjects = function(ctx, next){
    gitHubProjects.fetchGitHubProjects(function(returnedArray){
      ctx.arrayOfGHProjects = returnedArray;
      next();
    });
  };
  
  module.aboutController = aboutController;
})(window);
