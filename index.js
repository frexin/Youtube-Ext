var self = require('sdk/self');
var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var ss = require('sdk/ui/sidebar');
var storage = require('./data/src/stringstorage');

var sidebarWorker;
var pageWorker;

var sidebar = ss.Sidebar({
    id: 'youtube-sidebar',
    title: 'YouTube Search',
    url: './views/sidebar.html',

    onReady: function (worker) {
        sidebarWorker = worker;

        sidebarWorker.port.on("userInput", function (query) {
            pageWorker.port.emit("searchVideos", query);
            storage.save(query);
        });

        sidebarWorker.port.emit("initSuggest", storage.getList());
    }
});

var button = buttons.ActionButton({
    id: "youtube-link",
    label: "Open YouTube",
    icon: {
        "16": "./icons/icon-16.png",
        "32": "./icons/icon-32.png",
        "64": "./icons/icon-64.png"
    },
    onClick: initAddon
});

function initAddon() {
    sidebar.show();

    tabs.on("ready", function (tab) {
        pageWorker = tab.attach({
            contentScriptFile: [
                self.data.url("./src/modules/PageItemsCollection.js"),
                self.data.url("./src/modules/PageItemsHighliter.js"),
                self.data.url("./src/actions/youtube.js")
            ]
        });

        pageWorker.port.on("searchResults", function (results) {
            sidebarWorker.port.emit("searchResults", results);
        });
    });

    tabs.open({
        url: "http://www.youtube.com/results?search_query=firefox",
        inNewWindow: false
    });
}