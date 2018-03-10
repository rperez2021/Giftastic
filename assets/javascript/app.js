var topics = ["arnold achwarzenegger", "sylvester stallone", "dolph lundgren", "jean-claude van damme"];

for (i = 0; i < topics.length; i++) {
  var button = $("<button></button>").text(topics[i])
  button.attr("data-person", topics[i])
  button.addClass("actionhero")
  button.addClass("btn")
  button.addClass("btn-danger")
  button.addClass("m-1")
  $("#buttons").append(button)
}

function runQuery(queryURL) {
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-still", results[i].images.fixed_height_still.url);
        personImage.attr("data-animate", results[i].images.fixed_height.url)
        personImage.attr("data-state", "still")
        personImage.attr("class", "gif")

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-appear-here").prepend(gifDiv);
      }
    })
}

$('#buttons').on('click', '.actionhero',function() {
  event.preventDefault();
  var person = $(this).attr("data-person");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=dc6zaTOxFJmzC&limit=10";
  runQuery(queryURL)
});

$(".subbtn").on("click", function () {
  event.preventDefault();
  var searchTerm = $("#search-term").val().trim();
  console.log(searchTerm);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";
  runQuery(queryURL)
  $("#buttons").empty();
  topics.push($("#search-term").val().trim())
  for (i = 0; i < topics.length; i++) {
    var button = $("<button></button>").text(topics[i])
    button.attr("data-person", topics[i])
    button.addClass("actionhero")
    button.addClass("btn")
    button.addClass("btn-danger")
    button.addClass("m-1")
    $("#buttons").append(button)
  }
});

$("#gifs-appear-here").on("click", '.gif', function() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});