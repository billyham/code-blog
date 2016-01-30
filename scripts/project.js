(function(module){
  // Project constructor
  function Project(dataObject){
    Object.keys(dataObject).forEach(function(e, index, array){
      this[e]=dataObject[e];
    }, this);
  };

  Project.prototype.toHtml = function(){

    // Determine the relative Date
    var stringDate = ((new Date() - new Date(this.dateOfCreation))/60/60/24/1000);
    var intDate = parseInt(stringDate);
    if (intDate < 1){
      stringDate = 'New! Just posted';
    }else{
      stringDate = 'Posted ' + intDate + ' days ago';
    }
    console.log('inside the template');
    // Get the project template
    var projectTemplateScript = $('#project_template').html();
    // Compile the template
    var compiledTemplate = Handlebars.compile(projectTemplateScript);
    // Define the context
    var context = {
      project: [
        {
          title: this.title,
          category: this.category,
          body: this.body,
          imageMain: this.imageMain,
          additionalText: this.additionalText,
          projectDate: stringDate
        }
      ]
    };

    // Add the data to the template
    var theCompiledHtml = compiledTemplate(context);

    // Add the HTML to the package
    $('#home-section').append(theCompiledHtml);
  };

  // If local data exists, load it immediately
  // Get remote ETag
  function retrieveETagFromSource(){

    if (localStorage.rawData){
      // Objectify the localStorage string
      var dataObject = JSON.parse(localStorage.rawData);

      arrayToReturn = [];
      dataObject.forEach(function(element){
        arrayToReturn.push(element);
      });
      initProjectsPage(arrayToReturn);
    }

    // Always get the remote ETag
    $.ajax({url:'data/projectData.json'}, {method:'HEAD'}).done(function(data, message , xhr){
      eTagValue = xhr.getResponseHeader('ETag');
      retrieveDataFromSource(eTagValue);
    });
  }

  // If (local ETag exists)
  //   If (remote Etag does NOT match local ETag),
  //     Get remote rawData, save ETag to local
  //   Else (if local data does NOT exist)
  //     Get remote rawData
  //   Otherwise exit with no action
  // Otherwise, get remote rawData, save ETag to local
  function retrieveDataFromSource(eTagValue){
    if (localStorage.etag){
      if (JSON.parse(localStorage.etag) !== eTagValue){
        // Save the new eTag value into Local Storage
        localStorage.setItem('etag', JSON.stringify(eTagValue));

        // Download thew new Data, save it and display it
        $.ajax({url:'data/projectData.json'})
        .done(function(thisItem){downloadSuccessful(thisItem);})
        .fail(function(thisItem){downloadFailure(thisItem);});

      }else if (!localStorage.rawData){
        // Download thew new Data, save it and display it
        $.ajax({url:'data/projectData.json'})
        .done(function(thisItem){downloadSuccessful(thisItem);})
        .fail(function(thisItem){downloadFailure(thisItem);});

      }else{
        return;
      }
    }else{
      // Save the new eTag value into Local Storage
      localStorage.setItem('etag', JSON.stringify(eTagValue));

      // Download thew new Data, save it and display it
      $.ajax({url:'data/projectData.json'})
      .done(function(thisItem){downloadSuccessful(thisItem);})
      .fail(function(thisItem){downloadFailure(thisItem);});
    }
  }

  function downloadSuccessful (dataObject){
    console.log('retrieveDateFromSource gets data from the source');
    // Save data to localStorage
    localStorage.setItem('rawData', JSON.stringify(dataObject));

    // Save the data in an array and refresh the page
    arrayToReturn = [];
    dataObject.forEach(function(element){
      arrayToReturn.push(element);
    });
    initProjectsPage(arrayToReturn);
  }

  function downloadFailure (dataObject){
    $('#home-section').append('Total Failure');
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
  module.retrieveETagFromSource = retrieveETagFromSource;
  module.Project = Project;
  module.showMoreHandler = showMoreHandler;
  module.determineBackgroundColor = determineBackgroundColor;
}(window));
