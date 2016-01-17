
// Set to true for testing Ajax
var ignoreLocalData = false;

// Initialize an arry of project objects
var projects = [];

// Initially hide the about section
$('#about-section').hide();

// Add an event responder function for when a nav item is clicked
$('#mainNav').on('click', 'ul', navHandler);

// Load project data from source into an array
retrieveETagFromSource();
