var youtubeApp = angular.module('YoutubeExt', []);

youtubeApp.controller('SidebarCtrl', ['$scope', function($scope) {
    $scope.videos = [];

    var $searchButton = document.getElementById('y_search');
    var $searchField  = document.getElementById('y_query');

    (function addHandlers() {
        $searchButton.addEventListener('click', function(event) {
            event.preventDefault();

            addon.port.emit("userInput", $searchField.value);
        });

        addon.port.on("searchResults", function(items) {
            $scope.$apply(function(){
                $scope.videos = items;
            });
        });

        addon.port.on("initSuggest", function(queries) {
            new Awesomplete($searchField, {
                list: queries
            });
        });
    })();
}]);