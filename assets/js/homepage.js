
function getUserRepos(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

   fetch(apiUrl).then(function(responce) {
       responce.json().then(function(data) {
        console.log(data);
       });
   });
}

getUserRepos("ryma1738");