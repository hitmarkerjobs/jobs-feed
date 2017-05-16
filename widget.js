(function (){
    var element = document.getElementById("hitmarker-jobs-feed");
    		var stringContainingXMLSource = "<svg id='hitmarker-spinner' width='80px' height='80px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-default'><rect x='0' y='0' width='100' height='100' fill='none' class='bk'></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-1s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.9166666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.75s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.5s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.25s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#000000' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='-0.08333333333333333s' repeatCount='indefinite'/></rect></svg>"

    var parser = new DOMParser();
    var spinner = parser.parseFromString(stringContainingXMLSource, "image/svg+xml");

    element.appendChild(spinner.firstChild);

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
        var spinner = document.getElementById('hitmarker-spinner');
        spinner.style.display = 'none';

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
