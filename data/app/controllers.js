var youtubeApp = angular.module('YoutubeExt', []);

youtubeApp.controller('VideosListCtrl', function ($scope) {
    $scope.videos = [
        {url: "http://frexin.ru", title : "one kitten"},
        {url: "http://frexin.ru", title : "two kitten"}
    ];
});