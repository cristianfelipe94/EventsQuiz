// IIFE function.

(function () { // eslint-disable-line

    // Arrays.
    const eventsArray = [];
    const eventsHardCodeArrayDates = [];

    // Image Src arrays.
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
    xmlhttp.addEventListener('load', function() { // eslint-disable-line
        // Save the response elements.
        const response = xmlhttp.response.events;

        // Event Information.
        // Event name,location and url.
        // Initialized variables from response.
        let eventName = null;
        let eventLocation = null;
        let eventTicketsURL = null;
        let eventHardCodedDate = null;
        let eventStarts = null;
        let eventEnds = null;
        let endEventDateFormated = null;

        // This function will create all the elements from the response.
        function loadEvents() {
            for (let e = 0; e < response.length; e++) {
                // Basic Events information.
                eventName = response[e].name.text;
                eventLocation = response[e].venue.name;
                eventTicketsURL = response[e].url;

                // Event hardCoded time and full format.
                eventHardCodedDate = response[e].hardcoded;
                eventStarts = response[e].start.utc;
                eventEnds = response[e].end.utc;

                // Event date formated.
                endEventDateFormated = eventStarts.slice(0, 10).split('-').reverse().join('.');
                eventsHardCodeArrayDates.push(eventHardCodedDate);

                // Passed values on this function to create elements on Bucket List.
                createBucketElement (endEventDateFormated, eventName, eventLocation, eventTicketsURL);
            };

            // Get the first element on array.
            // Set background image of First Element.
            // Passed Element and Index number on to function.
            // Create an event on Main Event Block.
            const $currentMainEvent = eventsArray[0];
            createMainEvent($currentMainEvent, [0]);
            $currentMainEvent.attr('class', 'activeStateEvent');
        };

        // Run function to create elements from response.
        loadEvents();

        // Function will create elements on Main Event Block.
        // Arguments: Element and Index, used to get Background Image from Event.
        function createMainEvent(element, elementImgIndex) {

            // Create Li.
            // Get basic information from main event.
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

        // Function will create elements on Bucket Events Block.
        // Arguments: Basic Event information to create events.
        function createBucketElement(endEventDateFormatedKey, eventNameKey, eventLocationKey, eventTicketsURLKey) {

            // Create Li.
            // Get basic information from main event.
            const $newListItem = $('<li>')
                .attr('class', 'bucket-event-inf-module')
                .append($('<h2>').append(endEventDateFormatedKey))
                .append($('<h3>').append(eventNameKey))
                .append($('<h4>').append(eventLocationKey))
                .append($('<a>').append('Get Events Details').attr('href', eventTicketsURLKey).attr('target', 'bank'))
            ;

            // Push elements into array to create iterations and change element's styles and info.
            eventsArray.push($newListItem);

            // Add element with completed information into DOM element.
            $('#js-bucket-event-list').append($newListItem);

            // EventListener will clear array elements's style.
            // And set new information on main event banner.
            $newListItem.click(function() { // eslint-disable-line

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
                return current;
            });

            slider();
            function slider() {

                current = 0;

                //Show preview.
                function slideLeft () {

                    const $imgArrayIndex = $(eventsArray[current - 1][0]);
                    console.log($imgArrayIndex);

                    $('#js-bucket-event-list li').attr('class', 'deactivateStateEvent');

                    $imgArrayIndex.addClass('activeStateEvent');

                    $('.listItemDelete').remove();

                    $('.event-backgroung-img').remove();

                    createMainEvent($imgArrayIndex, [current - 1]);

                    current --;
                }

                //Show preview.
                function slideRight () {

                    const $imgArrayIndex = $(eventsArray[current + 1][0]);
                    console.log($imgArrayIndex);

                    $('#js-bucket-event-list li').attr('class', 'deactivateStateEvent');

                    $imgArrayIndex.addClass('activeStateEvent');

                    $('.listItemDelete').remove();

                    $('.event-backgroung-img').remove();

                    createMainEvent($imgArrayIndex, [current + 1]);

                    current ++;
                }

                // Left Arrow click.
                // Function will run on click.
                $('#js-left-arrow').click(function() {
                    if (current === 0) {
                        current = bgImgArray.length;
                        slideLeft();
                    }
                    slideLeft();
                });

                // Right Arrow click.
                // Function will run on click.
                $('#js-right-arrow').click(function() {
                    if (current === bgImgArray.length - 1) {
                        current =- 1;
                    }
                    slideRight();
                });
            }
        }

    });

    // Response the system is waiting.
    xmlhttp.responseType = 'json';

    // Request GET from the API Key.
    xmlhttp.open('GET', 'event-api.json');
    // Sent the Request.
    xmlhttp.send();

}());
