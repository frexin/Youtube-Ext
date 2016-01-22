var ss = require("sdk/simple-storage");

var stringsStorage = (function () {

    if (!ss.storage.strings) {
        ss.storage.strings = [];
    }

    return {
        saveString: function (string) {
            if (-1 == ss.storage.strings.indexOf(string)) {
                ss.storage.strings.push(string);
            }
        },

        getStringsList: function () {

        }
    };

})();

exports.save = stringsStorage.saveString;
exports.getList = stringsStorage.getStringsList;