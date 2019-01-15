// Create the XMLHttpRequest.
const xmlhttp = new XMLHttpRequest();

// Get elements from DOM.
const bucketListDom = document.getElementById('js-bucket-event-list');

// Add event listener.
// Function will run as page Loads.
xmlhttp.addEventListener ('load', function(event) {

  // Save the response elements.
  const response = xmlhttp.response.events;
  response.forEach(element => {

    const eventHardCodedDate = element.hardcoded;
    const eventName = element.name.text;
    const eventLocation = element.venue.name;
    const eventTicketsURL = element.url;

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
  });
});

// Response the system is waiting.
xmlhttp.responseType = 'json';

// Request GET from the API Key.
xmlhttp.open("GET", "../event-api.json");
// Sent the Request.
xmlhttp.send();
