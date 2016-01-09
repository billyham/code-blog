
// Project constructor
function Project(dataObject){
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.body = dataObject.body;
  this.dateOfCreation = dataObject.dateOfCreation;
  this.additionalText = dataObject.additionalText;
};

Project.prototype.toHtml = function(){
  // Make a copy of the template projet text
  var $newProject = $('article#template').clone();

  // Console log for caveman debugging
  // console.log('I\'m alive');

  // Remove the id attribute
  $newProject.removeAttr('id');

  // Add the title
  $newProject.find('.projectTitle').text(this.title);

  // Add the category
  $newProject.find('.projectCategory').text(this.category);

  // Add the relative Date
  var stringDate = ((new Date() - new Date(this.dateOfCreation))/60/60/24/1000);
  var intDate = parseInt(stringDate);

  if (intDate < 1){
    $newProject.find('.projectDate').text('New! Just posted');
  }else{
    $newProject.find('.projectDate').text('Posted ' + intDate + ' days ago');
  }

  // Add the body text
  $newProject.find('.projectBody').text(this.body);

  // Determine if additional text exists
  if (this.additionalText){
    // Save the additional text as data
    $newProject.attr('data-additionalText', this.additionalText);

    // Add the event handler when show more is tapped
    $newProject.find('a').on('click', showMoreHandler);
  }else{
    // No additional text, so hide the show more anchor
    $newProject.find('a').remove();
  }
  
  return $newProject;
};

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
