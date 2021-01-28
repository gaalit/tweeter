//function to prevent Cross-Site Scripting
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(() => {

//to hide the error box by default
$("#error-box").hide();

//to hide the error box once user starts typing again
$("#tweet-text").on("input", function () {
  $("#error-box").hide();
})

 $(".send-tweet").on("submit", event => {
  event.preventDefault();
  const text = $("#tweet-text").val();
  
  if (text.length > 140) {
    $("#error-box").slideDown().prepend($("<div>").addClass("error-message")).text("Your tweet is too long, please remove some text!")

  } else if (text.length === 0) {
    $("#error-box").slideDown().prepend($("<div>").addClass("error-message")).text("Your tweet is empty, please enter text!")

  } else {
    $
    .ajax({
      url: "/tweets",
      method: "POST",
      data: $("form").serialize()
    })
    .then(res => {
      loadTweets();
    });
  }
 })

const createTweetElement = function (tweetData) {
  let $tweet = $("<article>").addClass("tweet")
  
  let html = 
  `<header>
    <div class="user-info">
      <img src=${tweetData.user.avatars}> 
      <h1>${tweetData.user.name}</h1>
     </div>
     <div>
      <h2>${tweetData.user.handle}</h2>
     </div>
  </header>
   <div class="tweet-text">
    <p>
      ${escape(tweetData.content.text)}
    </p>
  </div>
  <footer>
    <p>
      ${tweetData.created_at}
      </p>
  </footer>
  `
  let result = $tweet.append(html);
  return result;
}

const renderTweets = function(tweets) {
  
  const container = $(".tweet-container").html("");
  tweets.forEach((tweet) => {
    const tweetElement = createTweetElement(tweet)
    container.prepend(tweetElement);
  })
}

 const loadTweets = function () {
  
    $
    .ajax({
      url: "/tweets",
      method: "GET",
      dataType: "JSON"
    })
    
    .then(results => {console.log(results);
     renderTweets(results)})
     $("#tweet-text").val("");
    }

  loadTweets()
});

