$(document).ready(function() {

    function CreateGiphyImages() {
        var $buttonsContainer = $('#buttons-container');
        var $gifsContainer = $('#gifs-container');
        var $newBtnInput = $('#new-btn-input');

        var topics = [
            'curling',
            'rugby',
            'running',
            'tennis',
            'soccer'
        ];

        this.createButtons = function() {
            topics.map(function(btn) {
                $buttonsContainer.append('<button data-gif=' + btn + ' class="btn btn-success">' + btn + '</button>');
            });
        };
        
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

                var apiKey = 'LCb1JsqOsoUxBDkNU3BL8xN709losvDO';

                var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
                sport + '&api_key=' + apiKey + '&limit=10&rating=g';

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    var results = response.data;
                    results.map(function(item) {
                        var giphyImg = $('<img>');
                        giphyImg
                            .attr({
                                'data-state': 'still',
                                'data-still': item.images.fixed_height_still.url,
                                'data-animate': item.images.fixed_height.url,
                                src: item.images.fixed_height_still.url
                                
                            });
                        var imageAndParagraph = $('<p>')
                            .append(item.rating)
                            .append('<br />')
                            .append(giphyImg);
                        $gifsContainer.prepend(imageAndParagraph);
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

        this.resetBtn = function(resetBtn) {
            var that = this;

            $(document).on('click', resetBtn, function() {
                $buttonsContainer.empty();
                $gifsContainer.empty();
                that.createButtons();
                $newBtnInput.val('');   
            });
        }
    } 

    var createGiphyImagesObj = new CreateGiphyImages();

    createGiphyImagesObj.createButtons();
    createGiphyImagesObj.clickBtns('button');
    createGiphyImagesObj.clickImages('img');
    createGiphyImagesObj.createNewButtons('#add-btn');
    createGiphyImagesObj.resetBtn('#reset-btn');
});