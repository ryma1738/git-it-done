var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

function getRepoIssues(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

   fetch(apiUrl).then(function(responce) {
        if (responce.ok) {
            responce.json().then(function(data) {
                dislplayIssues(data, repo);
                if (responce.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
       }
       else {
           alert("ERROR: There was a problem with your request!")
       }
       
   });
}

function dislplayIssues(issues, repo) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
        } else {
        typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
      }
}

function displayWarning(repo) {
    limitWarningEl.textContent = "To See More than 30 issues, visit ";
    
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);
}

function getRepoName() {
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    if (repoName) {
        document.querySelector("#repo-name").textContent = repoName;
        getRepoIssues(repoName);
    }
    else {
        document.location.replace("./index.html")
    }
}

getRepoName();

