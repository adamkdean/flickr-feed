var flickr_sizes = {
    'square':       '_s',
    'large_square': '_q',
    'thumbnail':    '_t',
    'small':        '_m',
    'small_320':    '_n',
    'medium':       '',
    'medium_640':   '_z',
    'medium_800':   '_c',
    'large':        '_b',
    'large_1600':   '_h',
    'large_2048':   '_k',
    'original':     '_o'
};

function jsonFlickrApi(data) {
    var photos, photo, url, html, i,
        $container = $('.gallery');

    if (data && data.stat == 'ok' && data.photoset && data.photoset.photo && data.photoset.photo.length > 0) {
        $container.empty();
        photos = data.photoset.photo;
        for (i = 0; i < photos.length; i++) {
            photo = photos[i];
            url = buildFlickrUrl(photo.farm, photo.server, photo.id, photo.secret, flickr_sizes.large_square);
            html = '<img src="' + url + '">';
            $container.append(html);
        }
    }
};

function buildFlickrUrl(farm, server, id, secret, size) {
    return 'http://farm' + farm + '.static.flickr.com/' + server + '/' + id + '_' + secret + size + '.jpg'
};

$(function() {

    var user_id = '77494938@N08';
    var api_key = "102b457a69ada42b718346e4c9432781";
    var photoset_id = '72157644503427401';
    var api_photoset_url = 'http://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=' + photoset_id + '&api_key=' + api_key + '&user_id=' + user_id;        

    $('.load').click(function() {
        $.ajax({
            type: "get",
            dataType: "jsonp",
            url: api_photoset_url
        });
    });

});