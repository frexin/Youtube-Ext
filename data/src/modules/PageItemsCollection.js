var PageItemsCollection = function (selector) {

    var itemsSelector = selector;

    var module =  {
        getItemsCollection: function () {
            var items = [];
            var nodes = document.querySelectorAll(itemsSelector);

            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];

                var item = {
                    node: node,
                    title: node.text,
                    url: node.href
                };

                items.push(item);
            }

            return items;
        },

        filterCollectionByKeywords: function (collection, words) {
            var filteredItems = [];

            collection.forEach(function (item) {
                item.score = module.getTitleScore(words, item.title);

                if (item.score) {
                    filteredItems.push([item, item.score]);
                }
            });

            filteredItems.sort(function (a, b) {
                return a[1] - b[1]
            });

            var items = [];
            filteredItems.forEach(function (elem) {
                items.push(elem[0]);
            });

            return items;
        },

        isCollectionsEqual: function (first_collection, second_collection) {
            var first = JSON.stringify(first_collection);
            var second = JSON.stringify(second_collection);

            return first == second;
        },

        getTitleScore: function (words, title) {
            var score = 0;
            var titleWords = title.split(' ');

            for (var i = 0; i < titleWords.length; i++) {
                var word = titleWords[i];

                if (-1 !== words.indexOf(word)) {
                    score++;
                }
            }

            return score;
        }
    };

    return module;
};