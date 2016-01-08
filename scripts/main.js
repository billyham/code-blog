
// Initialize an arry of project objects
var projects = [];

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

// Delete the template project
$('article#template').remove();

// Populate the Category filter with categories as options
populateFilters();

// Add an event responder function for when the cateogry filter changes
$('#categoryFilter').on('change', filterHandler);
