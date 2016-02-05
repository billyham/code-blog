(function(module){
  // Project constructor
  function Project(dataObject){
    Object.keys(dataObject).forEach(function(e, index, array){
      this[e]=dataObject[e];
    }, this);
  };

  Project.prototype.toHtml = function(){
    // Createa a readable date
    var creationDate = new Date(this.dateOfCreation);
    var readableDate = creationDate.toDateString();
    // Create a relative Date
    var stringDate = ((new Date() - new Date(this.dateOfCreation))/60/60/24/1000);
    var intDate = parseInt(stringDate);
    if (intDate < 1){
      stringDate = 'New! Just posted';
    }else{
      stringDate = 'Posted ' + intDate + ' days ago';
    }
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
          projectDate: stringDate,
          readableDate: readableDate,
          gitHubName: this.gitHubName
        }
      ]
    };
    // Add the data to the template
    var theCompiledHtml = compiledTemplate(context);
    this.wordCount();
    return theCompiledHtml;
  };

  // Calculate total number of words in Project body and additionalText
  Project.prototype.wordCount = function(){
    var wordBodyCount = this.body.split(' ');
    var wordAdditionalCount = this.additionalText.split(' ');
    return wordBodyCount.length + wordAdditionalCount.length;
  };

  Project.prototype.charCount = function(){
    return this.body.length + this.additionalText.length;
  };

  function tallyWordCount(arrayOfProjects){
    var total = arrayOfProjects.map(function(element){
      return element.wordCount();
    })
    .reduce(function(a,b){
      return a + b;
    },0);
    return total;
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
    // Dump the ETag in local storage or it will cache the failure!!!
    // __ But this causes some strange errors...
    // localStorage.setItem('etag', 'badData');

    window.location.replace('/failure');

  }

  module.tallyWordCount = tallyWordCount;
  module.retrieveETagFromSource = retrieveETagFromSource;
  module.Project = Project;
}(window));
