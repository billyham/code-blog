(function(module){
  // Function for populating the nav filter
  function populateFilters(){
    $('article.projectArticle').each(function(){
      var categoryValue = $(this).find('p.projectCategory').data('category');

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
        // Add it the select form object
        $('#categoryFilter').append(optionValue);
        // And add it to the sidebar list
        $('#category_filter_list').append('<li><a>' + categoryValue + '</a></li');
      }
    });
  };

  // Select form element Responder for filtering Projects based on the Select form value
  function filterHandler(e){
    var selectionString = $(e.target).val();
    // Contine with method below...
    continueFilterSelection(selectionString);
  }

  // Sidebar List element for responding to filtering projet by category
  function listFilterHandler(e){
    var selectionString = $(e.target).text();
    // Update the selection in the drop down list
    $('#categoryFilter').val(selectionString);
    // Contine with method below...
    continueFilterSelection(selectionString);
  }

  function continueFilterSelection(selectionString){
    // Update selection in side filter list
    $('#category_filter_list li:has(a)').each(function(){
      $(this).removeClass('is_selected');
      if ($(this).text() === selectionString){
        $(this).addClass('is_selected');
      }
    });

    if (selectionString === 'All'){
      page('/');
    }else{
      page('/category/' + selectionString);
    }
    return;
  }

  // Responder for taps on the nav menu to show and hide the links as a menu
  function dropDownMenuHandler(e) {
    // Hide the menu icon
    $('#navigation_bar_menu').hide();
    // Show the drop down menu
    $('#drop_down_menu').show();
  }

  function dismissDropDownMenuHandler() {
    // Hide the menu icon
    $('#drop_down_menu').hide();
    // Show the drop down menu
    $('#navigation_bar_menu').show();
  }

  // Add an event reponder for when the drop down menu is tapped
  $('#navigation_bar_menu').on('click', dropDownMenuHandler);

  // Add event responder for when the drop down menu is dimissed
  $('#close_menu_link').on('click', dismissDropDownMenuHandler);

  // Start with menu hidden
  dismissDropDownMenuHandler();

  // module.navHandler = navHandler;
  module.dropDownMenuHandler = dropDownMenuHandler;
  module.dismissDropDownMenuHandler = dismissDropDownMenuHandler;
  module.populateFilters = populateFilters;
  module.filterHandler = filterHandler;
  module.listFilterHandler = listFilterHandler;
}(window));
