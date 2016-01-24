
var ProjectView = (function(){

  return {

    initProjectsPage: function(projectDataArray){

      // Remove any existing project elements before loading view
      $('#home-section').empty();

      // Initialize an arry of project objects
      var projects = [];

      // Sort the array of projectData based on the dateOfCreation
      projectDataArray.sort(function(date1,date2){
        return (new Date(date2.dateOfCreation) - new Date(date1.dateOfCreation));
      });

      // Iterate through array of raw data and push a new project object in the array of projects
      for (i=0; i<projectDataArray.length; i++){
        projects.push(new Project(projectDataArray[i]));
      }

      // Iterate through the projects array and create HTML text using the object data
      for (var i in projects){
        // And adding a block of HTML for each project object
        projects[i].toHtml();
      };

      // Add event responders to the show more tags
      $('.showMore').on('click', showMoreHandler);

      // Delete the template project
      // $('article#template').remove();

      // Update the background colors on the Projects
      determineBackgroundColor($('article.projectArticle'));

      // Populate the Category filter with categories as options
      populateFilters();

      // Add an event responder function for when the cateogry filter changes
      $('#categoryFilter').on('change', filterHandler);
      $('#category_filter_list').on('click', 'a', listFilterHandler);

      // Add an event responder function for when a nav item is clicked
      $('#mainNav').on('click', 'ul', navHandler);
    }
  };
})();