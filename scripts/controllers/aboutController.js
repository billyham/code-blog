(function(module){
  var aboutController = {};

  aboutController.index = function() {
    $('#filter_wrapper').hide();
    $('.tab-content').hide();
    $('#about_section').show();

    // Fetch github projects and display them
    // Provide a repoView function as a callback
    gitHubProjects.fetchGitHubProjects(githubProjectsView.displayGHProjectsInAbout);
  };

  module.aboutController = aboutController;
})(window);
