var keyTwit = "5uI3RXnpgBLU9n7oIpH9qSrYF";
var keySecretTwit = "M9p2kWvx8ZW6MfZwRr3zh8CHe28dEU0deddSDew516DX3cDsC7";
var tokenTwit = "815294331758247936-s8tSg42X1FJ6ee6y7R2w97yLgCxJBrn";
var tokenSecretTwit = "atGt6rr4OqGpMO0tjDwZREKaSbbIP843k2kie3kLHovo3";
var keyNews = "9a10143c1b854d049e4fe290871f584b";

var ytApiKey = "AIzaSyApEUTt6_GudoTmkUnlEXGiD3MtRmh_8Ug";

console.log(ytApiKey);

var searchSomeone = document.getElementById("search-someone");

var inputSearch = searchSomeone.addEventListener('submit', function(event) {
  event.preventDefault();
  var input = document.getElementById("description").value;/*the search value*/+
  console.log(input);
  document.getElementById("search-someone").reset();
  return input;
});

//YOUTUBE

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var ytResponse = JSON.parse(response);
    console.log(ytResponse);
}

//append to youtube src

function onYouTubeApiLoad() {
  console.log(ytApiKey);
  gapi.client.setApiKey(ytApiKey);
  console.log(gapi.client);
  youtubeSearch();
}

function youtubeSearch() {
  //Prepare the request
  console.log(searchSomeone);
  gapi.client.setApiKey(ytApiKey);
  console.log(gapi.client.setApiKey);
  var request = gapi.client.youtube.search.list({
    part: "snippet",
    type: "video",
    maxResults: 5,
    order: "viewCount",
    q: inputSearch, /*input from search form*/
  });
  console.log(request);
  // Send the request to the API server,
  // and invoke onSearchRepsonse() with the response.
  request.execute(onSearchResponse);
}

function init() {
  gapi.client.load("youtube", "v3", onYouTubeApiLoad);
  //youtube api is ready
  console.log(gapi.client.load);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
    console.log(response);

}

//  getResults(inputSearch);



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
