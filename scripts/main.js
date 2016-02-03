(function(){
  // Set to true for testing Ajax
  // var ignoreLocalData = false;

  // Add an event reponder for when the drop down menu is tapped
  $('#navigation_bar_menu').on('click', dropDownMenuHandler);

  // Add event responder for when teh drop down menu is dimissed
  $('#close_menu_link').on('click', dismissDropDownMenuHandler);

  // Start with menu hidden
  dismissDropDownMenuHandler();

}(window));
