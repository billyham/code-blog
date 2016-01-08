
// Project constructor
function Project(dataObject){
  this.title = dataObject.title;
  this.category = dataObject.category;
  this.body = dataObject.body;
  this.dateOfCreation = dataObject.dateOfCreation;
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

  return $newProject;
};
