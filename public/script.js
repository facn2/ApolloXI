var wikiTitle = document.querySelector("#wikiTitle");
var submit = document.querySelector("#submit");
var form = document.getElementById("search-something");
var wikiCall = new XMLHttpRequest();
var youTubeDiv = document.querySelector(".youTube");
var userInput = document.querySelector("#description");
userInput.focus();

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
    var userSearch = userInput.value;
    form.reset();
    wikiRequest(userSearch);
    youtubeSearch(userSearch);
});

function wikiRequest(userSearch) {
  var urlWiki = "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro=&explaintext=&titles=" + userSearch +"";
  wikiCall.open("GET", urlWiki, true);
  wikiCall.send();
}

//YOUTUBE

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
  console.log(response)
  var videoList = document.createElement('ul');
  response.items.forEach(function(element){
    console.log(element);
    videoList.appendChild(createIframe(element));
  })
  console.log(youTubeDiv);
  youTubeDiv.appendChild(videoList);
}

//append to youtube src
function init() {
  gapi.client.load("youtube", "v3", onYouTubeApiLoad)
  //youtube api is ready
}

function onYouTubeApiLoad() {
  gapi.client.setApiKey(ytApiKey);
  // youtubeSearch();
}

function youtubeSearch(userSearch) {
  //Prepare the request
  console.log("inputSearch: ", userSearch);

  var request = gapi.client.youtube.search.list({
    part: "snippet",
    type: "video",
    maxResults: 5,
    // order: "viewCount",
    q: userSearch, /*input from search form*/
  });

  // Send the request to the API server,
  // and invoke onSearchRepsonse() with the response.
  request.execute(showResponse);
}

var createIframe = function(element) {
  console.log(element);
  var videoNode = document.createElement('li');
  videoNode.setAttribute("class", "iframe");
  //return element;
  // var ytPlace = document.querySelector(".youTube");
  var videoId = element.id.videoId;
  console.log(videoId);
  console.log(videoNode);
  var ytIframe = document.createElement("iframe");
  ytIframe.src = "https://www.youtube.com/embed/" + videoId;
  videoNode.appendChild(ytIframe);
  console.log(videoNode);
  // var urlId = ite
  // ytIframe.src = "https://www.youtube.com/embed/" +
  return videoNode;
}
