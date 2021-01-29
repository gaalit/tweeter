//function to prevent Cross-Site Scripting
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(() => {

  //to bring user to new-tweet form
  $("#scroll-button").click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#new-tweet").offset().top
    }, 0);
  });

  //to hide the error box by default
  $("#error-box").hide();

  //to hide the error box once user starts typing again
  $("#tweet-text").on("input", function() {
    $("#error-box").hide();
  });

  //to create new tweets
  $(".send-tweet").on("submit", event => {
    event.preventDefault();

    const text = $("#tweet-text").val();
    if (text.length > 140) {
      $("#error-box").slideDown().text("Your tweet is too long, please remove some text!");

    } else if (text.length === 0) {
      $("#error-box").slideDown().text("Your tweet is empty, please enter text!");

    //error case when user inputs all spaces
    } else if (!text.trim()) {
      $("#error-box").slideDown().text("Your tweet must be actual characters!");

    } else {
      $
        .ajax({
          url: "/tweets",
          method: "POST",
          data: $("form").serialize()
        })
        .then(res => {
          loadTweets();
          $(".counter").val("140");
        });
    }
  });

  //to display tweets once created
  const createTweetElement = function(tweetData) {
    let $tweet = $("<article>").addClass("tweet");
    const time = timeago.format(tweetData.created_at);
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
  <footer id="tweet-footer">
    <p>
    ${time}
    <span class="icons">
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    <span>
      </p>
  </footer>
  `;
    let result = $tweet.append(html);
    return result;
  };

  const renderTweets = function(tweets) {
  
    const container = $(".tweet-container").html("");
    tweets.forEach((tweet) => {
      const tweetElement = createTweetElement(tweet);
      container.prepend(tweetElement);
    });
  };

  const loadTweets = function() {
  
    $
      .ajax({
        url: "/tweets",
        method: "GET",
        dataType: "JSON"
      })
      .then(results => {console.log(results);
        renderTweets(results);});
        $("#tweet-text").val("");
  };

  loadTweets();
});

