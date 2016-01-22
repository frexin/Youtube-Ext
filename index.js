var self = require('sdk/self');
var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var sbar = require('sdk/ui/sidebar');
var ss = require("sdk/simple-storage");

var sidebarWorker;
var pageWorker;

var sidebar = sbar.Sidebar({
    id: 'youtube-sidebar',
    title: 'YouTube Search',
    url: './sidebar.html',
    onReady: function (worker) {
        sidebarWorker = worker;

        sidebarWorker.port.on("userInput", function (query) {
            pageWorker.port.emit("searchVideos", query);
            ss.storage.queries.push(query);
        });

        if (!ss.storage.queries) {
            ss.storage.queries = [];
        }

        sidebarWorker.port.emit("initSuggest", ss.storage.queries);
    }
});

var button = buttons.ActionButton({
    id: "youtube-link",
    label: "Open YouTube",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: initAddon
});

function initAddon(state) {
    sidebar.show();

    tabs.on("ready", function (tab) {
        pageWorker = tab.attach({
            contentScriptFile: self.data.url("youtube.js")
        });

        pageWorker.port.on("searchResults", function(results) {
            sidebarWorker.port.emit("searchResults", results);
        });
    });

    tabs.open({
        url: "http://www.youtube.com/results?search_query=kitten",
        inNewWindow: false
    });
}

