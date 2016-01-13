
// Function for populating the nav filter
function populateFilters(){
  $('article.projectArticle').each(function(){
    var categoryValue = $(this).find('p.projectCategory').text();

    var optionValue = '<option value="' + categoryValue + '">' + categoryValue + '</option>';

    // Only add the new option if it doesn't already exist
    // Method 1:
    // if ($('#categoryFilter option[value="' + categoryValue + '"]').length === 0){
    //   $('#categoryFilter').append(optionValue);
    // }

    // Method 2:
    var hasOption = false;
    $('#categoryFilter option').each(function(){
      if ($(this).text() === categoryValue){
        hasOption = true;
      }
    });
    if (!hasOption){
      $('#categoryFilter').append(optionValue);
    }
  });
};

// Handler for filtering Projects based on the Select form value
function filterHandler(e){
  $catFilter = $(e.target);

  var selectionString = $catFilter.val();

  // If no value exists, show all projects and exit the function
  if (!selectionString){
    $('article.projectArticle').show();
    determineBackgroundColor($('article.projectArticle'));
    return;
  }

  // Start by hiding all projects
  $('article.projectArticle').hide();

  // Integer to keep track of odds and events
  var shouldBeAlternateColor = true;

  // For any project witih a matching cateogry, show it
  $('article.projectArticle').each(function(){

    var thisCategory = $(this).find('.projectCategory').text();

    if (thisCategory === selectionString){

      // Show this project
      $(this).show();

      // Alternate background colors
      if (shouldBeAlternateColor){
        shouldBeAlternateColor= false;
        $(this).addClass('alternateColor');
      }else{
        shouldBeAlternateColor = true;
        $(this).removeClass('alternateColor');
      }
    };
  });
}

// Handler for clicks on the nav links
function navHandler(e){
  $anchor = $(e.target);
  if ($anchor.data('nav') === 'about'){
    e.preventDefault();
    // Show about section and Hide project Section
    $('#projectsSection').hide();
    $('#aboutSection').show();
  }else if($anchor.data('nav') === 'home'){
    e.preventDefault();
    // Show project section and hid about hide section
    $('#aboutSection').hide();
    $('#projectsSection').show();
  }else{
    // For future navigation links
  };
}
