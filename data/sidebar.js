addon.port.emit("ping");

function searchVideos() {
    var searchInput = document.getElementById('y_query');
    var query = searchInput.getAttribute('value');
    console.log(query);

    addon.port.emit("userInput", query);
}

var searchBtn = document.getElementById('y_search');
searchBtn.addEventListener('click', searchVideos);