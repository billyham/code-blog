(function(module){
  var projectController = {};

  var projects = [];
  retrieveETagFromSource();

  projectController.index = function(){
    $('#filter_wrapper').show();
    $('.tab-content').hide();
    $('#home_section').show();

    // Fetch github projects and display them
    // Provide a repoView function as a callback
    gitHubProjects.fetchGitHubProjects(githubProjectsView.displayGHProjectsInHome);
  };

  module.projectController = projectController;
})(window);
