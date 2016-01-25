(function (window) {

    var itemsSelector = '#results a.yt-uix-tile-link';
    var lastSearchResults = [];
    var lastQuery = "";

    var pageItemsCollection = new PageItemsCollection(itemsSelector);
    var pageItemsHighliter = new PageItemsHighliter(itemsSelector);

    var searchCallback = function (query) {
        var words = query.split(' ');

        var itemsCollection = pageItemsCollection.getItemsCollection();
        var filteredCollection = pageItemsCollection.filterCollectionByKeywords(itemsCollection, words);

        pageItemsHighliter.highliteItems(filteredCollection);

        self.port.emit("searchResults", filteredCollection);

        lastQuery = query;
        lastSearchResults = itemsCollection;
    };

    self.port.on("searchVideos", searchCallback);

    window.setInterval(function () {
        if (lastQuery && !pageItemsCollection.isCollectionsEqual(lastSearchResults, pageItemsCollection.getItemsCollection())) {
            searchCallback(lastQuery);
        }
    }, 500);
})(window);