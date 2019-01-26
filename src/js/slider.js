
slider();
function slider() {

    // Initialized index to 0.
    current = 0;

    //Show preview.
    function slideLeft () {

        let imgArrayIndex = bgImgArray[current - 1];
        mainEventImg.setAttribute('src', imgArrayIndex);

        clickIndex.setAttribute('class', 'activeStateEvent');
        $newListItem.attr('class', 'activeStateEvent');

        const clickIndex = eventsArray[current - 1];

        $('#js-bucket-event-list li').attr('class', 'deactivateStateEvent');



        $('.listItemDelete').remove();

        $('.event-backgroung-img').remove();

        createMainEvent(eventsArray[clickIndex], clickIndex);

        current--;
    }

    //Show preview.
    function slideRight () {

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
    $('#js-left-arrow').click(function() {
        if (current === 0){
            current = bgImgArray.length;
        }
        slideLeft();
    });

    // Right Arrow click.
    // Function will run on click.
    $('#js-right-arrow').click(function() {
        if (current === bgImgArray.length - 1){
            current =- 1;
        }
        slideRight();
    });
}
