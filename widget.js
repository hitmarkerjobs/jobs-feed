(function (){
    var element = document.getElementById("hitmarker-jobs-feed");

    var normalizeStyles = document.createElement("link");
    var hitmarkerStyles = document.createElement("link");
    hitmarkerStyles.rel = "stylesheet";
    hitmarkerStyles.type = "text/css";
    hitmarkerStyles.href = "https://rawgit.com/craigh44/hitmarker-widget/master/hitmarkerwidget.css";
    hitmarkerStyles.media = "all";
    document.getElementsByTagName("head")[0].appendChild(hitmarkerStyles);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://hitmarkerjobs.com/jobs.json');
    xhr.send(null);

    xhr.onreadystatechange = function () {
      var DONE = 4;
      var OK = 200;

      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          var jobs = JSON.parse(xhr.responseText).data;

          appendJobs(jobs);
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }
    }
      function appendJobs (jobs) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://raw.githubusercontent.com/craigh44/hitmarker-widget/master/index.html');
        xhr.send(null);

        xhr.onreadystatechange = function () {
          var DONE = 4;
          var OK = 200;

          if (xhr.readyState === DONE) {
            if (xhr.status === OK) {

              var xmlString = xhr.responseText,
              parser = new DOMParser(),
              doc = parser.parseFromString(xmlString, "text/html");

              element.appendChild(doc.documentElement);

              addJobs();

            } else {
              console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
          }
        }

        function addJobs () {


        for (var i = 0; i < jobs.length; i++) {

          //create link wrapper
          var jobWrapper = document.createElement("a");
          jobWrapper.target = "_blank";
          jobWrapper.href = jobs[i].url + ( jobs[i].url.indexOf("?") >= 0 ? "&" : "?") + 'ref=' + encodeURIComponent(window.location.href);;
          jobWrapper.classList.add('job');

          var logoWrapper = document.createElement("div");
          logoWrapper.classList.add('logo');

          var logoImg = document.createElement("img");
          logoImg.src = jobs[i].imageUrl;
          logoImg.width = '32';
          logoImg.height = '32';

          logoWrapper.appendChild(logoImg);
          jobWrapper.appendChild(logoWrapper);

          var jobInfoWrapper = document.createElement("div");
          jobInfoWrapper.classList.add('info');

          var jobCompany = document.createElement("div");
          jobCompany.classList.add('company');

          var jobTitle = document.createElement("div");
          jobTitle.classList.add('role');

          jobCompany.innerHTML = jobs[i].company;
          jobTitle.innerHTML = jobs[i].title;

          jobInfoWrapper.appendChild(jobCompany);
          jobInfoWrapper.appendChild(jobTitle);

          jobWrapper.appendChild(jobInfoWrapper);

          var jobsWrapper = document.getElementById('inner-wrapper');
          jobsWrapper.appendChild(jobWrapper);
        }
      }
    }
  })();
