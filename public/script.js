var wikiTitle = document.querySelector("#wikiTitle");
var submit = document.querySelector("#submit");
var form = document.querySelector("#search-something");
var wikiCall = new XMLHttpRequest();
var youTubeDiv = document.querySelector(".youTube");
var userInput = document.querySelector("#description");
userInput.focus();

wikiCall.onreadystatechange = function() {
  if (wikiCall.readyState == 4 && wikiCall.status == 200) {
    var wikiObj = JSON.parse(wikiCall.responseText);
    showWikiResults(wikiObj);
  }
  else {
    wikiAbstract.innerText = "Waiting for response. If the request takes too long, click <a href='https://facn2.github.io/ApolloXI/public/'>here</a>."
  }
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

function showWikiResults(wikiObj) {
  wikiTitle.innerText = wikiObj.query.pages[Object.keys(wikiObj.query.pages)[0]].title;
  var abstract = wikiObj.query.pages[Object.keys(wikiObj.query.pages)[0]].extract;
  if (abstract === undefined || abstract === null) {
    wikiAbstract.innerText = "I'm sorry, what you searched for is not available. Please try something else.";
  }
  else {
    wikiAbstract.innerText = abstract;
  }
}

//YOUTUBE

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
  var videoList = document.createElement('ul');
  response.items.forEach(function(element){
    videoList.appendChild(createIframe(element));
  })
  youTubeDiv.replaceChild(videoList, youTubeDiv.firstChild);
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
  var request = gapi.client.youtube.search.list({
    part: "snippet",
    type: "video",
    maxResults: 5,
    // order: "relevance",    /*default value is relevance*/
    q: userSearch, /*input from search form*/
  });

  // Send the request to the API server,
  // and invoke showRepsonse() with the response.
  request.execute(showResponse);
}

var createIframe = function(element) {
  var videoNode = document.createElement('li');
  videoNode.setAttribute("class", "iframe");
  var videoId = element.id.videoId;
  var ytIframe = document.createElement("iframe");
  ytIframe.src = "https://www.youtube.com/embed/" + videoId;
  videoNode.appendChild(ytIframe);
  return videoNode;
}
