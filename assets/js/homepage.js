
function getUserRepos(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

   fetch(apiUrl).then(function(responce) {
       if (responce.ok) {
        responce.json().then(function(data) {
            displayRepos(data, user);
            console.log(data)
           }).catch(function(error){
               alert("Unable to connect to GitHub at this time. Please check back later!");
           });
       }
       else {
           alert("ERROR: GitHub User Not Found! Please enter a diffrent username!")
       }
       
   });
}

function displayRepos(repos, searchTerm) {
    if (repos.lenth === 0) {
        $("#repos-container").text("No Repositories Found For User!");
        return;
    }
    $("#repos-container").text("");
    $("#repo-search-term").text(searchTerm);

    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        var divItem = document.createElement("a");
        divItem.classList = "list-item flex-row justify-space-between align-center"
        divItem.setAttribute("href", "./single-repo.html?repo="+ repoName);

        var spanItem = document.createElement("span");
        spanItem.textContent = repoName;

        divItem.appendChild(spanItem);

        var spanItemStatus = document.createElement("span");
        spanItemStatus.classList = "flex-roiw align-center"

        if (repos[i].open_issues_count > 0) {
            spanItemStatus.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)"
        }
        else {
            spanItemStatus.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        divItem.appendChild(spanItemStatus);
        var container = document.querySelector("#repos-container");
        container.appendChild(divItem)
    }
}

$("#user-form").on("submit", function(event){
    event.preventDefault();
    var user = $("#username").val();
    if (user) {
        getUserRepos(user);
        $("#username").val("");
    }
    else {
        alert("Please enter a GitHub username!")
    }
    
});



