$(document).ready(function() {

    function CreateGiphyImages() {
        // Save HTML elements in variables to use later
        var $buttonsContainer = $('#buttons-container');
        var $gifsContainer = $('#gifs-container');
        var $newBtnInput = $('#new-btn-input');

        // Get topic in array
        // to output later as buttons
        var topics = [
            'curling',
            'rugby',
            'running',
            'tennis',
            'soccer'
        ];

        // Create buttons on page load of from the
        // array above
        this.createButtons = function() {
            topics.map(function(btn) {
                $buttonsContainer.append('<button data-gif=' + btn + ' class="btn btn-success">' + btn + '</button>');
            });
        };
        
        // clickBtns method that adds 
        // giphy images to $gifsContainer
        this.clickBtns = function(btn) {
            $(document).on('click', btn, function() {
                var sport = $(this).attr('data-gif');
                var $buttons = $('button');
                $buttons
                    .removeClass('btn-warning')
                    .addClass('btn-success');

                $(this)
                    .removeClass('btn-success')
                    .addClass('btn-warning');

                // Giphy API key
                var apiKey = 'LCb1JsqOsoUxBDkNU3BL8xN709losvDO';

                // Query URL which queries giphy API, including
                // topic (sport) of button clicked on,
                // limit of 10 topics per button clicked,
                // and limiting rating to g to avoid
                // nasty searches              
                var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
                sport + '&api_key=' + apiKey + '&limit=10&rating=g';

                // AJAX call to to get queryURL
                // with a method of "GET"
                $.ajax({
                    url: queryURL,
                    method: "GET"
                // done method on $.ajax call which only
                // shows a success response when $.ajax
                // is queried successfully in 1st callback
                // and in 2nd callback shows failure note
                // when AJAX query fails     
                }).done(function(response) {
                    // Empty $gifsContainer in case
                    // error messages are present
                    $gifsContainer.empty();
                    // Assign results variable to response.data
                    // which is an object
                    var results = response.data;
                    // Use results.map to iterate through 
                    // response.data array
                    results.map(function(item) {
                        // Create a new image and assign
                        // to a variable
                        var giphyImg = $('<img>');
                        /* 
                        Add "data-state" attribute
                        with "still" value as GIF images
                        will first show still images.
                        Add "data-still" attribute with
                        still image value and
                        "data-animate" attribute
                        with animated GIF image value.
                        Add "src" attribute with 
                        still GIF value and finally
                        add "alt" attribute with
                        text describing image.
                        */ 
                        giphyImg
                            .attr({
                                'data-state': 'still',
                                'data-still': item.images.fixed_height_still.url,
                                'data-animate': item.images.fixed_height.url,
                                src: item.images.fixed_height_still.url,
                                alt: item.title
                            });
                        // Create paragraph tag then
                        // append item.rating to it at top
                        // of paragraph tag
                        // and append giphyImg at button
                        // of paragraph tag     
                        var imageAndParagraph = $('<p>')
                            .append(item.rating)
                            .append('<br />')
                            .append(giphyImg);
                        // Prepend imageAndParagraph variable
                        // to $gifsContainer    
                        $gifsContainer.prepend(imageAndParagraph);
                    });
                // Failure callback below    
                }).fail(function(response) {
                    $gifsContainer.append('<h2 class="h4 font-italic">Something went wrong and your GIF image search failed.<br />Please try again!</h2>');
                });
            });
        }

        // When clicking on still GIF images
        // show animated GIF images and then
        // vice versa when clicking on animated GIF images
        this.clickImages = function(img)  {
            $(document).on('click', img, function() {
                var state = $(this).attr('data-state');
                if(state === 'still') {
                    $(this)
                      .attr('data-state', 'animate')
                      .attr('src', $(this).attr('data-animate'));
                }
                else if(state === 'animate') {
                    $(this)
                      .attr('data-state', 'still')
                      .attr('src', $(this).attr('data-still'));
                }
            });
        };

        // Create new buttons when clicking on
        // input#add-btn element
        this.createNewButtons = function(submit) {
            $(document).on('click', submit, function() {
                var newBtn = $('<button>');
                newBtn
                    .attr('data-gif', $newBtnInput.val())
                    .text($newBtnInput.val())
                    .addClass('btn btn-success');
                
                $buttonsContainer.append(newBtn);    
                $newBtnInput.val('');    
            });
        }

        // Reset everything, including
        // adding initial buttons when clicking
        // on input#reset-btn element
        this.resetBtn = function(resetBtn) {
            // Assign variable that to this
            // because if I use this inside
            // of a function that's inside
            // a method, then this will
            // refer to the window object, instead
            // of the CreateGiphyImages object
            var that = this;

            $(document).on('click', resetBtn, function() {
                $buttonsContainer.empty();
                $gifsContainer.empty();
                that.createButtons();
                $newBtnInput.val('');   
            });
        }
    } 

    // Create new createGiphyImagesObj object
    // from CreateGiphyImages constructor function
    var createGiphyImagesObj = new CreateGiphyImages();

    // Call object methods, and sometimes
    // pass in HTML elements to be used
    // as jQuery objects inside said methods
    createGiphyImagesObj.createButtons();
    createGiphyImagesObj.clickBtns('button');
    createGiphyImagesObj.clickImages('img');
    createGiphyImagesObj.createNewButtons('#add-btn');
    createGiphyImagesObj.resetBtn('#reset-btn');
});