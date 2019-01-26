(function () {

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

    // Initilialized elements internally in main function.
    // This variables will be use on several functions.
    let mainEventDate;
    let mainEventName;
    let mainEventLocation;
    let mainEventURL;
    let mainEventImg;
    let current;

    // Create the XMLHttpRequest.
    const xmlhttp = new XMLHttpRequest();

    // Add event listener.
    // Function will run as page Loads.
    xmlhttp.addEventListener('load', function() {
        // Save the response elements.
        const response = xmlhttp.response.events;
        console.log(response);

        // Event Information.
        // Event name,location and url.

        let eventName = null;
        let eventLocation = null;
        let eventTicketsURL = null;

        // Event hardCoded time and full format.
        let eventHardCodedDate = null;
        let eventStarts = null;
        let eventEnds = null;

        let endEventDateFormated = null;

        function loadEvents() {
            for (let e = 0; e < response.length; e++) {
                eventName = response[e].name.text;
                eventLocation = response[e].venue.name;
                eventTicketsURL = response[e].url;

                // Event hardCoded time and full format.
                eventHardCodedDate = response[e].hardcoded;
                eventStarts = response[e].start.utc;
                eventEnds = response[e].end.utc;

                endEventDateFormated = eventStarts.slice(0, 10).split('-').reverse().join('.');
                eventsHardCodeArrayDates.push(eventHardCodedDate);

                createBucketElement (endEventDateFormated, eventName, eventLocation, eventTicketsURL);
            };

            const $currentMainEvent = eventsArray[0];
            createMainEvent($currentMainEvent, [0]);
            $currentMainEvent.attr('class', 'activeStateEvent');
        };

        function createMainEvent(element, elementImgIndex){

            const $newListMainItem = $('<li>')
                .addClass('listItemDelete')
                .addClass('mainEventListItem')
                .append($('<h2>').append(element[0].children[0].innerHTML))
                .append($('<h3>').append(element[0].children[1].innerHTML))
                .append($('<h4>').append(element[0].children[2].innerHTML))
            ;

            const $listMainImg = $('<img>')
                .addClass('listItemDelete')
                .attr('src', bgImgArray[elementImgIndex])
                .attr('class', 'event-backgroung-img')
                .attr('alt', 'main event photo')
            ;

            const $listURL = $('<a>')
                .addClass('listItemDelete')
                .append('Get Events Details')
                .attr('href', element[0].children[3].href)
                .attr('target', 'bank')
            ;

            // Add element with completed information into DOM element.
            $('#js-main-event').append($newListMainItem);
            $('#js-img-wrapper').append($listMainImg);
            $('#js-main-event-btn').append($listURL);
        };

        loadEvents();

        function createBucketElement (endEventDateFormated, eventName, eventLocation, eventTicketsURL) {
            const $newListItem = $('<li>')
                .attr('class', 'bucket-event-inf-module')
                .append($('<h2>').append(endEventDateFormated))
                .append($('<h3>').append(eventName))
                .append($('<h4>').append(eventLocation))
                .append($('<a>').append('Get Events Details').attr('href', eventTicketsURL).attr('target', 'bank'))
            ;

            // Create an array of elements all ready created.
            // Push elements into array to create iterations and change element's styles and info.
            eventsArray.push($newListItem);

            // Add element with completed information into DOM element.
            $('#js-bucket-event-list').append($newListItem);
            // EventListener will clear array elements's style.
            // And set new information on main event banner.
            $newListItem.click(function() {

                $('.listItemDelete').remove();

                $('.event-backgroung-img').remove();

                $('#js-bucket-event-list li').attr('class', 'deactivateStateEvent');

                $newListItem.attr('class', 'activeStateEvent');

                // Every click function will get the index of the clickable event.
                // And will change photo.
                const clickIndex = eventsArray.indexOf($newListItem);

                createMainEvent(eventsArray[clickIndex], clickIndex);

                // Current element clicked will change to generate.
                // A different order in slide show.
                current = clickIndex;
            });
        };

    });

    // Response the system is waiting.
    xmlhttp.responseType = 'json';

    // Request GET from the API Key.
    xmlhttp.open('GET', 'event-api.json');
    // Sent the Request.
    xmlhttp.send();

}());
