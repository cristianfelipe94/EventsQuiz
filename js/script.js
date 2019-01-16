// Create the XMLHttpRequest.
const xmlhttp = new XMLHttpRequest();

// Get elements from DOM.
const bucketListDom = document.getElementById('js-bucket-event-list');
const mainEventDom = document.getElementById('js-main-event');
const mainEventBtn = document.getElementById('js-main-event-btn');
const mainEventImgWrapper = document.getElementById('js-img-wrapper');

// Add event listener.
// Function will run as page Loads.
xmlhttp.addEventListener ('load', function() {

  // Save the response elements.
  const response = xmlhttp.response.events;
  for (let e = 0; e < response.length; e++) {

    const eventHardCodedDate = response[e].hardcoded;
    const eventName = response[e].name.text;
    const eventLocation = response[e].venue.name;
    const eventTicketsURL = response[e].url;

    const listItemEvent = document.createElement('li');
    listItemEvent.setAttribute('class', 'bucket-event-inf-module');

    const listItemEventDate = document.createElement('h2');
    listItemEventDate.innerHTML = eventHardCodedDate;

    const listItemEventName = document.createElement('h3');
    listItemEventName.innerHTML = eventName;

    const listItemEventLocation = document.createElement('h4');
    listItemEventLocation.innerHTML = eventLocation;

    const listItemEventURL = document.createElement('a');
    listItemEventURL.setAttribute('href', eventTicketsURL);
    listItemEventURL.setAttribute('target', 'bank');
    listItemEventURL.innerHTML = 'Get Events Details';

    listItemEvent.appendChild(listItemEventDate);
    listItemEvent.appendChild(listItemEventName);
    listItemEvent.appendChild(listItemEventLocation);
    listItemEvent.appendChild(listItemEventURL);

    bucketListDom.appendChild(listItemEvent);

    if (e === 0) {

      listItemEvent.setAttribute('class', 'activeStateEvent');

      const mainEventDate = document.createElement('h2');
      mainEventDate.innerHTML = eventHardCodedDate;

      const mainEventName = document.createElement('h3');
      mainEventName.innerHTML = eventName;

      const mainEventLocation = document.createElement('h4');
      mainEventLocation.innerHTML = eventLocation;

      const mainEventURL = document.createElement('a');
      mainEventURL.setAttribute('href', eventTicketsURL);
      mainEventURL.setAttribute('target', 'bank');
      mainEventURL.innerHTML = 'Get Events Details';

      const mainEventImg = document.createElement('img');
      mainEventImg.setAttribute('class', 'event-backgroung-img');
      mainEventImg.setAttribute('src', 'img/bg-event-1-optimized.jpg')
      mainEventImg.setAttribute('alt', 'main event photo');

      mainEventDom.appendChild(mainEventDate);
      mainEventDom.appendChild(mainEventName);
      mainEventDom.appendChild(mainEventLocation);
      mainEventBtn.appendChild(mainEventURL);
      mainEventImgWrapper.appendChild(mainEventImg);
    }
  };
});

// Response the system is waiting.
xmlhttp.responseType = 'json';

// Request GET from the API Key.
xmlhttp.open("GET", "../event-api.json");
// Sent the Request.
xmlhttp.send();
