self.port.on("searchVideos", function(query) {
    var videos = getVideosByKeywords(query.split(' '));

    videos.forEach(function(item) {
        var node = item[1];
        node.style.border = "5px solid red";
    });
});

function getVideosByKeywords(keywords) {
    var nodes = document.querySelectorAll('#results a.yt-uix-tile-link');
    var sorted_nodes = [];

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var title = node.href;
        var score = getTitleScore(title);

        sorted_nodes.push([title, node, score])
    }

    sorted_nodes.sort(function(a, b) {return a[2] - b[2]});

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