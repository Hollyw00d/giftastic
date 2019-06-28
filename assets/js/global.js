$(document).ready(function() {

    function CreateGiphyImages() {
        var $buttonsContainer = $('#buttons-container');
        var $gifsContainer = $('#gifs-container');

        var topics = [
            'basketball',
            'rugby',
            'running',
            'tennis',
            'soccer'
        ];

        this.createButtons = function() {
            topics.map(function(btn) {
                $buttonsContainer.append('<button data-gif=' + btn + '>' + btn + '</button>');
            });
        };
        
        this.clickBtns = function(btn) {
            $(document).on('click', btn, function() {
                var sport = $(this).attr('data-gif');

                var apiKey = 'LCb1JsqOsoUxBDkNU3BL8xN709losvDO';

                var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
                sport + '&api_key=' + apiKey + '&limit=10&rating=g';

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    var results = response.data;

                    results.map(function(item) {
                        console.log(item);
                        var giphyImg = $('<img>');
                        giphyImg
                            .attr({
                                'data-state': 'still',
                                'data-still': item.images.fixed_height_still.url,
                                'data-animate': item.images.fixed_height.url,
                                src: item.images.fixed_height_still.url
                                
                            });
                        var imageAndParagraph = $('<p>').append(giphyImg);
    
                        $gifsContainer.append(imageAndParagraph);
                    });

                });

            });
        }

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

    } 


    var createGiphyImagesObj = new CreateGiphyImages();

    createGiphyImagesObj.createButtons();

    createGiphyImagesObj.clickBtns('button');

    createGiphyImagesObj.clickImages('img');



});