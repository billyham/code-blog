(function(module){

  function initProjectsPage(projectDataArray){

    // Remove any existing project elements before loading view
    $('#home_section').empty();

    // Initialize an arry of project objects
    var projects = [];

    // Sort the array of projectData based on the dateOfCreation
    projectDataArray.sort(function(date1,date2){
      return (new Date(date2.dateOfCreation) - new Date(date1.dateOfCreation));
    });

    projectDataArray.forEach(function(element){
      projects.push(new Project(element));
    });

    // Turn the array of project objects into DOM objects
    projects.map(function(element){
      return element.toHtml();
    })
    .forEach(function(currentElement){
      $('#home_section').append(currentElement);
    });

    // Tally of total words and print in footer
    var totalWordCount = tallyWordCount(projects);
    $('#wordCount').append(totalWordCount);

    // Add event responders to the show more tags
    $('.showMore').on('click', showMoreHandler);

    // Update the background colors on the Projects
    determineBackgroundColor($('article.projectArticle'));

    // Populate the Category filter with categories as options
    populateFilters();

    // Add an event responder function for when the cateogry filter changes
    $('#categoryFilter').on('change', filterHandler);
    $('#category_filter_list').on('click', 'a', listFilterHandler);

    // Add an event responder function for when a nav item is clicked
    $('#mainNav').on('click', 'ul', navHandler);

    // Publish date is an anchor to show a pop up window. Suppress the click action
    $('.tool_tip').on('click', function (e){
      e.preventDefault();
    });
  }

  function tallyWordCount(arrayOfProjects){
    var total = arrayOfProjects.map(function(element){
      return element.wordCount();
    })
    .reduce(function(a,b){
      return a + b;
    },0);
    return total;
  };

  module.initProjectsPage = initProjectsPage;
}(window));
