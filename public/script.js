var urlYouTube = "";
// var urlWiki = "https://en.wikipedia.org/w/api.php?action=opensearch&search=israel&limit=1&format=json" + userSearch + "&format=json&callback=?";
var youTube = document.querySelector("#description");
var Wiki = document.querySelector("#");

var wikiCall = new XMLHttpRequest();
  wikiCall.onreadystatechange = function() {
      if (wikiCall.readyState == 4 && wikiCall.status == 200) {
        var wikiObj = JSON.parse(wikiCall.responseText);

        // var
        // linkSpace.href = userLink;
        // nameSapce.innerText = name;
      };
  };
  wikiCall.open("GET", urlWiki, true);
  wikiCall.send();
