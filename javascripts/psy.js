function getJSON(url, callback) {
    if (typeof window.Promise !== undefined) {
        return new Promise(function (resolve, reject) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', url, true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState != 4) return;

                if (xmlhttp.status == 200) {
                    resolve(JSON.parse(xmlhttp.responseText));
                } else {
                    reject(xmlhttp.statusText);
                }
            };

            xmlhttp.send();
        });
    }

    callback = callback || function () { };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState != 4) return;

        if (xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText));
        } else {
            callback(xmlhttp.statusText);
        }
    };

    xmlhttp.send();
}

window.addEventListener('load', function () {
    getJSON('questions.json').then(function (json) {
        document.getElementById('r').innerHTML = "json: " + JSON.stringify(json);
    });
})