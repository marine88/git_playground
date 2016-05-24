$(document).ready(function () {

    // VARIABLES
    var url;
    // Here will be shown the output info:
    var showData = $('.show-data');
    var carsURL = 'http://m.mobile.de/svc/s/?s=Car&mk=1900&con=USED';
    //var carsURL = 'json/cars.json'; // Local testing file

    // Unfortunately I haven't saved during the interview two other links (with Motorbike and Motorhome JSON files),
    // but I have created two JSON files with dummy info and connected them here locally, in order to ullustrate that
    // an own JSON file is parsed for every single tab:
    var motorbikesURL = 'json/motorbike.json';
    var motorhomeURL = 'json/motorhome.json';

    // Get info from the "Cars" JSON on load - the first tab is opened from the beginnig by default: 
    $.ajax({
        type: 'GET'
        , url: 'http://m.mobile.de/svc/s/?s=Car&mk=1900&con=USED'
        , crossDomain: true
        , dataType: 'json'
        , cache: 'true'
        , success: function (json) {
            var result = json;
            console.log(result);
        }
    }); // End of  $.ajax request

    // Finding out which tab is selected, according to that choosing the right JSON URL    
    $("ul[class*=tabs] li").click(function () {
        var selected = $(this).attr('id');

        switch (selected) {
        case 'li1':
            url = carsURL;
            break;
        case 'li2':
            url = motorbikesURL;
            break;
        case 'li3':
            url = motorhomeURL;
            break;
        default:
            break;
        }

        //Parsing JSON object and showing the info on index.html page: gitting titles, links, prices, the first images for every item (if exists):
        $.getJSON(url, function (data) {

            console.log(url);
            var items = data.items.map(function (item) {
                if (item.numImages > 0) { // If an item has images

                    for (var i = 0; i < item.numImages; i++) {
                        imgObj = item.images[i];
                        imgObj = "http://" + imgObj.uri + "_1.jpg"; // Image path
                        return '<a href=" ' + item.url + ' ">' + item.title + '</a><br><b> ' + item.p + '</b> ' + '<img src=  ' + imgObj + ' >';
                    }

                } else { // If an item has no images
                    return '<a href=" ' + item.url + ' ">' + item.title + '</a><br><b> ' + item.p + '</b> ' + 'There are no images for this item';
                }
            });
            showData.empty();

            if (data.items.length) {
                var content = '<li>' + items.join('</li> <li>') + '</li>';
                var list = $('<ul />').html(content);
                showData.append(list);
            }

        }); // End of  $.getJSON

        showData.text('Loading the JSON file...');

    });
}); // End of $(document).ready