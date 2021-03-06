(function (){
  var element = document.getElementById("hitmarker-jobs-feed");
  var countries = element.getAttribute('countries');
  var cities = element.getAttribute('cities');
  var companies = element.getAttribute('companies');
  var volunteer = element.getAttribute('volunteer');

  var url;

  var normalizeStyles = document.createElement("link");
  var hitmarkerStyles = document.createElement("link");
  hitmarkerStyles.rel = "stylesheet";
  hitmarkerStyles.type = "text/css";
  hitmarkerStyles.href = "https://hitmarkerjobs.github.io/jobs-feed/style.css";
  hitmarkerStyles.media = "all";
  document.getElementsByTagName("head")[0].appendChild(hitmarkerStyles);

url = 'https://hitmarkerjobs.com/jobs.json';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  if (countries) {
    xhr.setRequestHeader('countries', countries);
  }

  if (cities) {
    xhr.setRequestHeader('cities', cities);
  }

  if (companies) {
    xhr.setRequestHeader('companies', companies);
  }

  if (volunteer) {
    xhr.setRequestHeader('volunteer', volunteer);
  }

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
      xhr.open('GET', 'https://hitmarkerjobs.github.io/jobs-feed/index.html');
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
        logoImg.width = '50';
        logoImg.height = '50';
        logoImg.classList.add("job-logo");

        logoWrapper.appendChild(logoImg);
        jobWrapper.appendChild(logoWrapper);

        var jobInfoWrapper = document.createElement("div");
        jobInfoWrapper.classList.add('info');
        
        var jobTitle = document.createElement("div");
        jobTitle.classList.add('role');

        var jobCompany = document.createElement("span");
        jobCompany.classList.add('company');

        var jobLocation = document.createElement("div");
        jobLocation.classList.add('location');
        jobLocation.innerHTML = jobs[i].location + ' &bull; ' + jobs[i].contract;
        
        jobCompany.innerHTML = jobs[i].company;
        jobTitle.innerHTML = jobs[i].title;

        jobInfoWrapper.appendChild(jobTitle);
        jobInfoWrapper.appendChild(jobCompany);
        jobInfoWrapper.appendChild(jobLocation);

        jobWrapper.appendChild(jobInfoWrapper);

        var jobsWrapper = document.getElementById('inner-wrapper');
        jobsWrapper.appendChild(jobWrapper);
      }
    }
  }
})();
