self.port.on("searchVideos", searchVideosByQuery);

var lastVideosList = [];
var lastQuery;

function searchVideosByQuery(query) {
    lastQuery = query;
    var videos = getVideosByKeywords(query.split(' '));

    resetBorders();

    videos.forEach(function(item) {
        item.node.style.border = "5px solid red";
    });

    self.port.emit("searchResults", videos);
}

function resetBorders() {
    var nodes = document.querySelectorAll('#results a.yt-uix-tile-link');

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.style.border = 'none';
    }
}

function getAllVideos() {
    var videos = [];
    var nodes = document.querySelectorAll('#results a.yt-uix-tile-link');

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var videoItem = {
            node : node,
            title : node.text,
            url : node.href
        };

        videos.push(videoItem);
    }

    lastVideosList = videos;

    return videos;
}

function getVideosByKeywords(keywords) {
    var sorted_nodes = [];
    var videos = getAllVideos();

    videos.forEach(function(videoItem) {
        videoItem.score = getTitleScore(keywords, videoItem.title);

        if (videoItem.score) {
            sorted_nodes.push([videoItem, videoItem.score]);
        }
    });

    sorted_nodes.sort(function(a, b) {return a[1] - b[1]});

    var videoItems = [];
    sorted_nodes.forEach(function(elem) {
        videoItems.push(elem[0]);
    });

    return videoItems;
}

function getTitleScore(keywords, title) {
    var score = 0;
    var title_words = title.split(' ');

    for (var i = 0; i < title_words.length; i++) {
        var word = title_words[i];

        if (-1 !== keywords.indexOf(word)) {
            score++;
        }
    }

    return score;
}

window.setInterval(function() {
    var lastVideosCollection = JSON.stringify(lastVideosList);
    var currentVideosCollection = JSON.stringify(getAllVideos());

    if (lastVideosCollection !== currentVideosCollection) {
        console.log('new col');
        searchVideosByQuery(lastQuery);
    }
}, 500);