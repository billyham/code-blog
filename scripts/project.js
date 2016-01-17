
// Project constructor
function Project(dataObject){
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.body = dataObject.body;
  this.imageMain = dataObject.imageMain;
  this.dateOfCreation = dataObject.dateOfCreation;
  this.additionalText = dataObject.additionalText;
  this.key = dataObject.key;
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

  // Get the project template
  var projectTemplateScript = $('#project-template').html();
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
        projectDate: stringDate,
        key: this.key
      }
    ]
  };

  // Add the data to the template
  var theCompiledHtml = compiledTemplate(context);

  // Add the HTML to the package
  $('#home-section').append(theCompiledHtml);
};


function retrieveDataFromSource(){

  var pullRemoteDataBool = false;
  var eTagValue = null;

  // Always get the remote ETag
  $.ajax({url:'data/projectData.json'}, {method:'HEAD'}).done(function(data, message , xhr){
    eTagValue = xhr.getResponseHeader('ETag');
  });

  // Check if rawData and eTag exists locally
  var localDataExistBool = false;
  var localETagExistBool = false;
  if (localStorage.rawData){localDataExistBool = true;}
  if (localStorage.etag){ localETagExistBool = true;}


  // If no local eTag exists, get it and save it
  if (!localETagExistBool){
    // Save eTag in cache
    localStorage.setItem('eTag', eTagValue);
  }


  // Compare HEAD of data source with local storage

  // Could be from local storage or server
  if (localStorage.rawData && !ignoreLocalData){



    // Load fresh data if local is older than data source

    // Otherwise, use local data



    console.log('using local data');

    // Objectify the localStorage string
    var dataObject = JSON.parse(localStorage.rawData);

    arrayToReturn = [];
    for (var thisItem in dataObject){
      arrayToReturn.push(dataObject[thisItem]);
    }
    initProjectsPage(arrayToReturn);

  }else{

    $.ajax({url:'data/projectData.json'})
    .done(function(thisItem){downloadSuccessful(thisItem);})
    .fail(function(thisItem){downloadFailure(thisItem);});
  }
}

function downloadSuccessful (dataObject){
  // Save data to localStorage
  localStorage.setItem('rawData', JSON.stringify(dataObject));

  // Save the data in an array and refresh the page
  arrayToReturn = [];
  for (var thisItem in dataObject){
    arrayToReturn.push(dataObject[thisItem]);
  }
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
    // The additional text
    var additionalText = $parentElement.attr('data-additionalText');
    // Add additional text to the preceding element
    $(e.target).prev().after('<p>' + additionalText) + '</p>';
    // Change the <a> tag to show less
    $(e.target).text('show less');
  }else{
    // Remove the additional text
    $(e.target).prev().remove();
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
