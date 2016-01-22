var youtubeApp = angular.module('YoutubeExt', []);

youtubeApp.controller('VideosListCtrl', ['$scope', function($scope) {
    $scope.videos = [];

    var $searchButton = document.getElementById('y_search');
    var $searchField  = document.getElementById('y_query');

    function addHandlers() {
        $searchButton.addEventListener('click', function(event) {
            event.preventDefault();

            var query = $searchField.value;
            addon.port.emit("userInput", query);
        });

        addon.port.on("searchResults", function(items) {
            $scope.$apply(function(){
                $scope.videos = items;
            });
        });
    }

    addHandlers();
}]);