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
    $('#wordCount').empty();
    $('#wordCount').append(totalWordCount);

    // Add event responders to the show more tags
    $('.showMore').on('click', showMoreHandler);

    // Update the background colors on the Projects
    determineBackgroundColor($('article.projectArticle'));

    // Populate the Category filter with categories as options
    populateFilters();

    // Add an event responder function for when the cateogry filter changes
    $('#categoryFilter').one('change', filterHandler);
    $('#category_filter_list').one('click', 'a', listFilterHandler);

    // __ Replaced with routing __
    // $('#mainNav').on('click', 'ul', navHandler);

    // Publish date is an anchor to show a pop up window. Suppress the click action
    $('.tool_tip').on('click', function (e){
      e.preventDefault();
    });
  }

  // Handler function for when a project's "show more" is tapped
  function showMoreHandler(e){
    // Prevent the default action of the anchor tag
    e.preventDefault();

    // Cache the parent element
    $parentElement = $(e.target).parent();

    // Determine if it should show more or less
    if ($(e.target).text() === 'show more'){
      // Make sure body text is visible
      $(e.target).prev().prev().addClass('show_despite_width');
      // The additional text
      var additionalText = $parentElement.attr('data-additionalText');
      // Add additional text to the preceding element
      $(e.target).prev().html('<p>' + additionalText) + '</p>';
      // Change the <a> tag to show less
      $(e.target).text('show less');
    }else{
      // Remove the additional text
      $(e.target).prev().html('<p>...</p>');
      // Allow body text to be invisible
      $(e.target).prev().prev().removeClass('show_despite_width');
      // Change the <a> tag back to show more
      $(e.target).text('show more');
    }
  };

  // Hand this a set of project article elements in order to set background color on them
  function determineBackgroundColor($projectArticle){
    // Integer to keep track of odds and events
    var shouldBeAlternateColor = true;

    $projectArticle.each(function(){
      // Alternate background colors
      if (shouldBeAlternateColor){
        shouldBeAlternateColor= false;
        $(this).addClass('alternateColor');
      }else{
        shouldBeAlternateColor = true;
        $(this).removeClass('alternateColor');
      }
    });
  }

  module.determineBackgroundColor = determineBackgroundColor;
  module.showMoreHandler = showMoreHandler;
  module.initProjectsPage = initProjectsPage;
}(window));
