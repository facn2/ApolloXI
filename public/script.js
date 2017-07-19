var urlYouTube = "";

var wikiTitle = document.querySelector("#wikiTitle");
var submit = document.querySelector("#submit");
var form = document.getElementById("search-something");
var wikiCall = new XMLHttpRequest();
var youTube = document.querySelector("#description");

wikiCall.onreadystatechange = function() {
    if (wikiCall.readyState == 4 && wikiCall.status == 200) {
      var wikiObj = JSON.parse(wikiCall.responseText);
      var title = wikiObj.query.pages[Object.keys(wikiObj.query.pages)[0]].title;
      wikiTitle.innerText = title;
      var abstract = wikiObj.query.pages[Object.keys(wikiObj.query.pages)[0]].extract;
      wikiAbstract.innerText = abstract;
    };
};

form.addEventListener("submit", function(event) {
    event.preventDefault();
    var userSearch = document.querySelector("#description").value;
    form.reset();
    var urlWiki = "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro=&explaintext=&titles=" + userSearch +"";
    wikiCall.open("GET", urlWiki, true);
    wikiCall.send();
});


//YOUTUBE

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var youtubeResponse = JSON.parse(response);
    console.log(youtubeResponse);
}

//append to youtube src
function init() {
  gapi.client.load("youtube", "v3", onYouTubeApiLoad)
  //youtube api is ready
}

function onYoutubeApiLoad() {
  gapi.client.setApiKey(ytApiKey);
  youtubeSearch();
}

function youtubeSearch() {
  //Prepare the request
  var request = gapi.client.youtube.search.list({
    part: "snippet",
    type: "video",
    maxResults: 5,
    order: "viewCount",
    q: inputSearch, /*input from search form*/
  });

  // Send the request to the API server,
  // and invoke onSearchRepsonse() with the response.
  request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
    console.log(response)
}







  //
  //
  //
  //
  // var searchSomeone = document.getElementById('search-someone');
  //
  // var inputSearch = searchSomeone.addEventListener('submit', function(event) {
  //   event.preventDefault();
  //   var input = document.getElementById("description").value;/*something*/
  //   document.getElementById("search-someone").reset();
  //   return input;
  // });
  //
  // function success_wikiDetails(json) {
  //   var response = JSON.parse(json);
  //   console.log(response);
  //   return {
  //     /*wikipedia details*/
  //   }
  // }
  //
  //
  // function request (url, cb) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState === 4 && xhr.status === 200) {
  //       cb(null, xhr.responseText);
  //     } else {
  //       console.log("waiting for response");
  //     }
  //   };
  //   xhr.open("GET", url, true);
  //   xhr.send();
  // }
  //
  // function getResults(inputSearch) {
  //   var url = "https://dbpedia.org" + inputSearch + /*""something*/;
  //   request(url, function(error, result){
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //     success_wikiDetails(result);
  //     return;
  //   });
  // }
  //
  //
  //
  // //YOUTUBE
  //
  // // Helper function to display JavaScript value on HTML page.
  // function showResponse(response) {
  //     var  = JSON.parse(response);
  // }
  //
  // //append to youtube src
  // function init() {
  //   gapi.client.load("youtube", "v3", onYouTubeApiLoad)
  //   //youtube api is ready
  // }
  //
  // function onYoutubeApiLoad() {
  //   gapi.client.setApiKey(ytApiKey);
  //   youtubeSearch();
  // }
  //
  // function youtubeSearch() {
  //   //Prepare the request
  //   var request = gapi.client.youtube.search.list({
  //     part: "snippet",
  //     type: "video",
  //     maxResults: 5,
  //     order: "viewCount",
  //     q: inputSearch, /*input from search form*/
  //   });
  //
  //   // Send the request to the API server,
  //   // and invoke onSearchRepsonse() with the response.
  //   request.execute(onSearchResponse);
  // }
  //
  // // Called automatically with the response of the YouTube API request.
  // function onSearchResponse(response) {
  //     showResponse(response);
  //     console.log(response)
  // }
  //
  // getResults(inputSearch);
