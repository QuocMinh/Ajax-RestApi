window.onload = function() {
    callFptAiApi();
    // makeCorsRequest();
    testAjax();
}

function callFptAiApi() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://api.openfpt.vn/text2speech/v4", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.setRequestHeader("api_key", "12465e7295b646a8b81288e9c8e4d62c");
    xhttp.setRequestHeader("speed", -1);
    xhttp.setRequestHeader("voice", "hatieumai");
    xhttp.send("Mời khách hàng mang số 15 đến quầy số 4");

    var response = JSON.parse(xhttp.responseText);
    console.log(response);
    console.log(response.async);

    document.getElementById("audio").innerHTML = `
        <audio controls="true" autoplay="false" oncontextmenu="return false;" 
                controlslist="nodownload" src="${response.async}"></audio>
    `;
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
    return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'http://10.32.11.17:8080/api/goiso/mincskhrow';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function () {
        var text = xhr.responseText;
        var title = getTitle(text);
        alert('Response from CORS request to ' + url + ': ' + title);
    };

    xhr.onerror = function () {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}

function testAjax() {
    $.get('http://10.32.11.17:8080/api/goiso/mincskhrow',
        (data, status) => alert(data + " - " + status)
    );
}