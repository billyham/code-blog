(function(module){
  var githubProjectsView = {};

  var renderToList = function(gitHubProject){
    return '<li><a href=' + gitHubProject.url + '>' + gitHubProject.name + '</a> -- <em>' + gitHubProject.desc + '</em></li>';
  };

  var renderToTag = function(gitHubProject){
    $('.projectArticle').each(function(index){
      if ($(this).attr('data-gitHubName') === gitHubProject.name){
        // Add a gitHub icon after the 1h tag
        if (!$(this).find('h1').children().last().is('a')){
          $(this).find('h1').append('<a href="' + gitHubProject.url + '"><img class="icon-inline" src="styles/icons/433-github.svg"></a>');
        }
      }
    }
    );
  };

  githubProjectsView.displayGHProjectsInAbout = function(arrayParameter){
    // Remove any existing li elements
    $('#github_projects').empty();
    // Append HTML to the id, append can take an array
    $('#github_projects').append(arrayParameter.map(function(element){
      return renderToList(element);
    }));
  };

  githubProjectsView.displayGHProjectsInHome = function(arrayParameter) {
    arrayParameter.forEach(function(element){
      renderToTag(element);
    });
  };

  module.githubProjectsView = githubProjectsView;
})(window);
