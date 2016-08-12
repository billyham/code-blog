(function(module){
  var gitHubProjects = {};
  gitHubProjects.fetchGitHubProjects = function(callback){
    // Ajax REST call
    // Returns an array of objects
    // Save to an array
    // run callback (a repoView method that displays the array data)

    $.ajax({
      url: '/github/user/repos' +
            '?per_page=99' +
            '&sort=url' +
						'&type=all',
      success:function(data){
        var arrayToReturn = data
        .filter(function(element){
          // return !element.fork;
          if (element.name === 'client') return true;
					if (element.name === 'server') return true;
					if (element.name === 'confcon') return true;
					if (element.name === 'cute-bunny-display-widgets') return true;
					if (element.name === 'ArmiesVsSpies') return true;
					if (element.name === 'Events_List') return true;
					return false;
        })
        .map(function(dataElement){
          return {name: dataElement.name, url: dataElement.html_url, desc: dataElement.description};
        });
        // console.log('ajax calls success with data ' + data);
        callback(arrayToReturn);
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
