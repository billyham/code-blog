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
          additionalText: marked(this.additionalText),
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

  // ____This is what happens in the following methods____
  // If (local data exists): load it immediately
  // Get the remote ETag
  // If (local ETag exists)
  //   If (remote Etag does NOT match local ETag),
  //     Get remote rawData, save ETag to local
  //   Else If (local data does NOT exist)
  //     Get remote rawData
  //   Else: exit with no action
  // Else (i.e., no local ETag exists): get remote rawData, save ETag to local
  function retrieveETagFromSource(callback){

    if (localStorage.rawData){
      // Objectify the localStorage string
      var dataObject = JSON.parse(localStorage.rawData);
      var newArray = [];
      dataObject.forEach(function(element){
        newArray.push(element);
      });
      callback(newArray);
    }

    // Always get the remote ETag
    $.ajax({url:'/data/projectData.json'}, {method:'HEAD'}).done(function(data, message , xhr){
      eTagValue = xhr.getResponseHeader('ETag');
      retrieveDataFromSource(eTagValue, callback);
    });
  }

  function retrieveDataFromSource(eTagValue, callback){
    if (localStorage.etag){
      if (JSON.parse(localStorage.etag) !== eTagValue){
        // Save the new eTag value into Local Storage
        localStorage.setItem('etag', JSON.stringify(eTagValue));

        // Download thew new Data, save it and display it
        $.ajax({url:'/data/projectData.json'})
        .done(function(thisItem){downloadSuccessful(thisItem, callback);})
        .fail(function(thisItem){downloadFailure(thisItem, callback);});

      }else if (!localStorage.rawData){
        // Download thew new Data, save it and display it
        $.ajax({url:'/data/projectData.json'})
        .done(function(thisItem){downloadSuccessful(thisItem, callback);})
        .fail(function(thisItem){downloadFailure(thisItem, callback);});

      }else{
        return;
      }
    }else{
      // Save the new eTag value into Local Storage
      localStorage.setItem('etag', JSON.stringify(eTagValue));
      // Download thew new Data, save it and display it
      $.ajax({
        url:'/data/projectData.json',
        success:function(data){
          downloadSuccessful(data, callback);
        },
        error:function(xhr, textStatus, errorThrown){
          downloadFailure(textStatus, callback);
        }});
    }
  }

  function downloadSuccessful (dataObject, callback){
    console.log('retrieveDateFromSource gets data from the source');
    // Save data to localStorage
    localStorage.setItem('rawData', JSON.stringify(dataObject));
    var newArray = [];
    dataObject.forEach(function(element){
      newArray.push(element);
    });
    callback(newArray);
  }

  function downloadFailure (dataObject, callback){
    // Dump the ETag in local storage or it will cache the failure!!!
    var failObject = {badData: 'Bad Data'};
    localStorage.setItem('etag', JSON.stringify(failObject));

    console.log('downloadFailure fires');
    var emptyArray = [];
    callback(emptyArray);
  }

  function retrieveDataFilteredByCategory(category, callback){
    retrieveETagFromSource(function(rawArray){
      var newArray = rawArray.filter(function(element){
        return element.category === category;
      });
      callback(newArray);
    });

  }

  module.tallyWordCount = tallyWordCount;
  module.retrieveETagFromSource = retrieveETagFromSource;
  module.retrieveDataFilteredByCategory = retrieveDataFilteredByCategory;
  module.Project = Project;
}(window));
