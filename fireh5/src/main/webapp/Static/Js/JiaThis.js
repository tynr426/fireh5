JiaThis = {
    SetJiaThisConfig: function (data_track_clickback, url, summary, title, pic, shortUrl, hideMore) {
        jiathis_config.data_track_clickback = (data_track_clickback == undefined ? "" : data_track_clickback);
        jiathis_config.url = (url == undefined ? "" : url);
        jiathis_config.summary = (summary == undefined ? "" : summary);
        jiathis_config.title = (title == undefined ? "" : title);
        jiathis_config.pic = (pic == undefined ? "" : pic + $e('#qr').attr('src'));
        jiathis_config.shortUrl = (shortUrl == undefined ? false : shortUrl);
        jiathis_config.hideMore = (hideMore == undefined ? false : hideMore);
    }
}

var jiathis_config = {
    data_track_clickback: true,
    url: "",
    summary: "",
    title: "",
    pic: "",
    shortUrl: false,
    hideMore: false
};