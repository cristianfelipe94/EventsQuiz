
// Create the XMLHttpRequest.
const xmlhttp = new XMLHttpRequest();

// Get elements from DOM.
const bucketListDom = document.getElementById('js-bucket-event-list');
const mainEventDom = document.getElementById('js-main-event');
const mainEventBtn = document.getElementById('js-main-event-btn');
const mainEventImgWrapper = document.getElementById('js-img-wrapper');
const leftArrowDom = document.getElementById('js-left-arrow');
const rightArrowDom = document.getElementById('js-right-arrow');
const svg = document.getElementById('svg');

// Add event listener.
// Function will run as page Loads.
xmlhttp.addEventListener('load', function(){

    // Initilialized elements internally in main function.
    // This variables will be use on several functions.
    let mainEventDate;
    let mainEventName;
    let mainEventLocation;
    let mainEventURL;
    let mainEventImg;
    let current;

    // Arrays.
    const eventsArray = [];
    const eventsHardCodeArrayDates = [];

    const bgImgArray = [
        '../img/bg-event-1-optimized.jpg',
        '../img/bg-event-2-optimized.jpg',
        '../img/bg-event-3-optimized.jpg',
        '../img/bg-event-4-optimized.jpg',
        '../img/bg-event-5-optimized.jpg',
    ];

    // Save the response elements.
    const response = xmlhttp.response.events;

    // Iterate response elements.
    // Create DOM elements for each JSON's element.
    for (let e = 0; e < response.length; e++) {

        // Event Information.
        // Event name,location and url.
        const eventName = response[e].name.text;
        const eventLocation = response[e].venue.name;
        const eventTicketsURL = response[e].url;

        // Event hardCoded time and full format.
        const eventHardCodedDate = response[e].hardcoded;
        const eventStarts = response[e].start.utc;
        const eventEnds = response[e].end.utc;

        const listItemEvent = document.createElement('li');
        listItemEvent.setAttribute('class', 'bucket-event-inf-module');

        const listItemEventDate = document.createElement('h2');
        const endEventDateFormated = eventStarts.slice(0,10).split('-').reverse().join('.');
        eventsHardCodeArrayDates.push(eventHardCodedDate);
        listItemEventDate.innerHTML = endEventDateFormated;

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

        // Create an array of elements all ready created.
        // Push elements into array to create iterations and change element's styles and info.
        eventsArray.push(listItemEvent);

        // Add element with completed information into DOM element.
        bucketListDom.appendChild(listItemEvent);

        // If the element is 0 Index.
        // Element and information will be set in the main Event Banner.
        if (e === 0) {

        listItemEvent.setAttribute('class', 'activeStateEvent');

        mainEventDate = document.createElement('h2');
        mainEventDate.innerHTML = eventHardCodedDate;

        mainEventName = document.createElement('h3');
        mainEventName.innerHTML = eventName;

        mainEventLocation = document.createElement('h4');
        mainEventLocation.innerHTML = eventLocation;

        mainEventURL = document.createElement('a');
        mainEventURL.setAttribute('href', eventTicketsURL);
        mainEventURL.setAttribute('target', 'bank');
        mainEventURL.innerHTML = 'Get Events Details';

        mainEventImg = document.createElement('img');
        mainEventImg.setAttribute('class', 'event-backgroung-img');
        mainEventImg.setAttribute('src', 'img/bg-event-1-optimized.jpg')
        mainEventImg.setAttribute('alt', 'main event photo');

        mainEventDom.appendChild(mainEventDate);
        mainEventDom.appendChild(mainEventName);
        mainEventDom.appendChild(mainEventLocation);
        mainEventBtn.appendChild(mainEventURL);
        mainEventImgWrapper.appendChild(mainEventImg);
        }

        // EventListener will clear array elements's style.
        // And set new information on main event banner.
        listItemEvent.addEventListener('click', function() {

        // This function will clear styles from array's elements.
        // And will set new styles for the one clicked.
        eventsArray.forEach(element => {
            element.setAttribute('class', 'deactivateStateEvent');
        });
        listItemEvent.setAttribute('class', 'activeStateEvent');

        mainEventDate.innerHTML = '';
        mainEventName.innerHTML = '';
        mainEventLocation.innerHTML = '';

        mainEventDate.innerHTML = eventHardCodedDate;
        mainEventName.innerHTML = eventName;
        mainEventLocation.innerHTML = eventLocation;
        mainEventURL.setAttribute('href', listItemEventURL);

        // Every click function will get the index of the clickable event.
        // And will change photo.
        let clickIndex = eventsArray.indexOf(listItemEvent);
        let imgArrayIndex = bgImgArray[clickIndex];
        mainEventImg.setAttribute('src', imgArrayIndex);

        // Current element clicked will change to generate.
        // A different order in slide show.
        current = clickIndex;
        });
    };

    slider();
    function slider() {

        // Initialized index to 0.
        current = 0;

        //Show preview.
        function slideLeft (){

        let imgArrayIndex = bgImgArray[current - 1];
        mainEventImg.setAttribute('src', imgArrayIndex);

        eventsArray.forEach(element => {
            element.setAttribute('class', 'deactivateStateEvent');
        });

        let clickIndex = eventsArray[current - 1];
        clickIndex.setAttribute('class', 'activeStateEvent');

        mainEventDate.innerHTML = '';
        mainEventName.innerHTML = '';
        mainEventLocation.innerHTML = '';

        mainEventDate.innerHTML = eventsHardCodeArrayDates[current - 1];
        mainEventName.innerHTML = clickIndex.children["1"].firstChild.data;
        mainEventLocation.innerHTML = clickIndex.children["2"].firstChild.data;
        let listItemEventURL = clickIndex.children["3"].href;
        mainEventURL.setAttribute('href', listItemEventURL);

        current--;
        }

        //Show preview.
        function slideRight (){

        let imgArrayIndex = bgImgArray[current + 1];
        mainEventImg.setAttribute('src', imgArrayIndex);

        eventsArray.forEach(element => {
            element.setAttribute('class', 'deactivateStateEvent');
        });

        let clickIndex = eventsArray[current + 1];
        clickIndex.setAttribute('class', 'activeStateEvent');

        mainEventDate.innerHTML = '';
        mainEventName.innerHTML = '';
        mainEventLocation.innerHTML = '';

        mainEventDate.innerHTML = eventsHardCodeArrayDates[current + 1];
        mainEventName.innerHTML = clickIndex.children["1"].firstChild.data;
        mainEventLocation.innerHTML = clickIndex.children["2"].firstChild.data;
        let listItemEventURL = clickIndex.children["3"].href;
        mainEventURL.setAttribute('href', listItemEventURL);

        current++;
        }

        // Left Arrow click.
        // Function will run on click.
        leftArrowDom.addEventListener('click', function (){
        if (current === 0){
            current = bgImgArray.length;
        }
        slideLeft();
        });

        // Right Arrow click.
        // Function will run on click.
        rightArrowDom.addEventListener('click', function (){
        if (current === bgImgArray.length - 1){
            current =- 1;
        }
        slideRight();
        });
    }
});

// Response the system is waiting.
xmlhttp.responseType = 'json';

// Request GET from the API Key.
xmlhttp.open('GET', 'event-api.json');
// Sent the Request.
xmlhttp.send();
