// An arry of project objects
var projects = [];

function Project(dataObject){
  this.title = dataObject.title;
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

// Sort the array of projectData based on the dateOfCreation
projectData.sort(function(date1,date2){
  return (new Date(date2.dateOfCreation) - new Date(date1.dateOfCreation));
});

// Iterate through array of raw data and push a new project object in the array of projects
for (i=0; i<projectData.length; i++){
  projects.push(new Project(projectData[i]));
}

// Iterate through the projects array and create HTML text using the object data
for (var i in projects){
  // Using jQuery to identify the HTML section of projects
  // And adding a block of HTML for each project object
  $('#projectsSection').append(projects[i].toHtml());
};

// Finally, delete the template project
$('article#template').remove();
