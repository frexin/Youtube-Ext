var PageItemsHighliter = function (selector) {

    var itemsSelector = selector;

    return {
        highliteItems: function (items) {
            this.resetHighlite();

            items.forEach(function (item) {
                item.node.style.border = "5px solid red";
            });
        },

        resetHighlite: function () {
            var nodes = document.querySelectorAll(itemsSelector);

            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                node.style.border = 'none';
            }
        }
    };
};