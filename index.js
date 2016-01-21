var self = require('sdk/self');
var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');
var sidebar = require('sdk/ui/sidebar');

var sidebarWorker;
var pageWorker;

var sidebar = sidebar.Sidebar({
    id: 'youtube-sidebar',
    title: 'YouTube Search',
    url: './sidebar.html',
    onReady: function (worker) {
        sidebarWorker = worker;

        sidebarWorker.port.on("userInput", function (query) {
            pageWorker.port.emit("searchVideos", query);
        });
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

        pageWorker.on("searchResults", function(results) {
            console.log(results);
        });
    });

    tabs.open({
        url: "http://www.youtube.com/results?search_query=kitten",
        inNewWindow: false
    });
}

