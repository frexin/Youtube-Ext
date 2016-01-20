function searchVideos() {
    var query = searchInput.getAttribute('value');
    addon.port.emit("userInput", query);
}



var searchBtn = document.getElementById('y_search');
var searchInput = document.getElementById('y_query');

searchBtn.addEventListener('click', searchVideos);