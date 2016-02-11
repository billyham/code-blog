(function(module){
  var gitHubProjects = {};
  gitHubProjects.array = [];
  gitHubProjects.fetchGitHubProjects = function(callback){
    // Ajax REST call
    // Returns an array of objects
    // Save to an array
    // run callback (a repoView method that displays the array data)


    // Empty out the array
    gitHubProjects.array = [];

    $.ajax({
      url: 'github/users/billyham/repos' +
            '?per_page=100' +
            '&sort=updated',
      success:function(data){
        gitHubProjects.array = data
        .filter(function(element){
          return !element.fork;
        })
        .map(function(dataElement){
          return {name: dataElement.name, url: dataElement.html_url, desc: dataElement.description};
        });
        // console.log('ajax calls success with data ' + data);
        callback();
      },
      error:function(){
        // console.log('ajax throws an error');
      },
      complete:function(){
        // console.log('ajax calls complete');
      }
    });
  };

  module.gitHubProjects = gitHubProjects;
})(window);
