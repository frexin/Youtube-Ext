addon.port.emit("ping");

function searchVideos(event) {
    event.preventDefault();

    var searchInput = document.getElementById('y_query');
    var query = searchInput.value;

    addon.port.emit("userInput", query);
}

var searchBtn = document.getElementById('y_search');
searchBtn.addEventListener('click', searchVideos);