(function(module){

  function initProjectsPage(projectDataArray){

    // Remove any existing project elements before loading view
    $('#home-section').empty();

    // Initialize an arry of project objects
    var projects = [];

    // Sort the array of projectData based on the dateOfCreation
    projectDataArray.sort(function(date1,date2){
      return (new Date(date2.dateOfCreation) - new Date(date1.dateOfCreation));
    });

    projectDataArray.forEach(function(element){
      projects.push(new Project(element));
    });

    projects.forEach(function(element){
      element.toHtml();
    });

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
  module.initProjectsPage = initProjectsPage;
}(window));
