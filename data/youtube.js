self.port.on("searchVideos", function(query) {
    var videos = getVideosByKeywords(query.split(' '));
    resetBorders();

    videos.forEach(function(item) {
        var videoItem = item[0];
        videoItem.node.style.border = "5px solid red";
    });

    self.port.emit("searchResults", videos);
});

function resetBorders() {
    var nodes = document.querySelectorAll('#results a.yt-uix-tile-link');

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.style.border = 'none';
    }
}

function getVideosByKeywords(keywords) {
    var nodes = document.querySelectorAll('#results a.yt-uix-tile-link');
    var sorted_nodes = [];

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var videoItem = {
            node : node,
            title : node.text,
            url : node.href
        };
        videoItem.score = getTitleScore(keywords, videoItem.title);

        if (videoItem.score) {
            sorted_nodes.push([videoItem, videoItem.score]);
        }
    }

    sorted_nodes.sort(function(a, b) {return a[1] - b[1]});

    return sorted_nodes;
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