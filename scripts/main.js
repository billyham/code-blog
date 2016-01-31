(function(){
  // Set to true for testing Ajax
  // var ignoreLocalData = false;

  // Initialize an arry of project objects
  var projects = [];

  // Initially hide the about section
  $('#about-section').hide();

  // Add an event responder function for when a nav item is clicked
  $('#navigation_bar_links').on('click', 'ul', navHandler);

  // Add an event reponder for when the drop down menu is tapped
  $('#navigation_bar_menu').on('click', dropDownMenuHandler);

  // Add event responder for when teh drop down menu is dimissed
  $('#close_menu_link').on('click', dismissDropDownMenuHandler);

  // Start with menu hidden
  dismissDropDownMenuHandler();

  // Load project data from source into an array
  retrieveETagFromSource();

}(window));
