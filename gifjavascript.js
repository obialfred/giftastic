$(function () {
    populateButtons(searchArray, 'searchButton', '#buttonArea');
    console.log("Page Loaded");
})

var searchArray = ['Dog', 'Cat', 'Bird'];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < searchArray.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function () {
    var type = $(this).data('type');
    console.log(type);
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=AsPoCdGgnPFUdPW2cmfMrzsSHe9MjTmn&limit=20';
    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class= "search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        })
})

$(document).on('click', '.search-item', function () {
    console.log($(this).find('img'));
    var img = $(this).find('img')
    var state = img.attr('data-state');
    if (state == 'still') {
        img.attr('src', img.data('animated'));
        img.attr('data-state', 'animated');
    } else {
        img.attr('src', img.data('still'));
        img.attr('data-state', 'still');
    }
})


$('#addSearch').on('click', function () {
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    return false;

})