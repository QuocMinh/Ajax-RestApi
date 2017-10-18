const api_key = "ab299278905d4c72ae4d401e1cc98858";

function docSo(stt, quay) {
  var audioStt = getSoundStt(stt);

  if(audioStt !== null) {
    var audio1    = new Audio('./voice/read-1.mp3');
    var audio2    = new Audio('./voice/read-2.mp3');
    // var audioStt  = new Audio(linkAudioStt);
    var audioQuay = new Audio('./voice/soquay-' + quay + '.mp3');
  
    audio1.play();
    setTimeout(() => { audioStt.play() }, 1800);
    setTimeout(() => { audio2.play() }, 3000);
    setTimeout(() => { audioQuay.play() }, 4200);
  } else {
    var defaultAudio = new Audio('./voice/default-voice.mp3');
    defaultAudio.play();
  } 

}

function getSoundStt(stt) {
  var xhttp = new XMLHttpRequest();

  xhttp.open("POST", "http://api.openfpt.vn/text2speech/v4", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("api_key", api_key);
  xhttp.setRequestHeader("speed", -2);
  xhttp.setRequestHeader("voice", "hatieumai");
  xhttp.send("Mời khách hàng mang số " + stt);

  var response = JSON.parse(xhttp.responseText);
  console.log(response);
  console.log(response.async);

  return new Audio(response.async);
}

function getSoundStt2(stt) {
  $.ajax({
    url: 'http://api.openfpt.vn/text2speech/v4',
    dataType: 'text',
    type: 'post',
    contentType: 'application/json',
    headers : {
      'api_key': api_key,
      'speed': -2,
      'voice': 'hatieumai'
    },
    data: stt < 10 ? "0, " + stt : stt + ",",
    success: function( data, textStatus ){
      var jsonData = JSON.parse(data);
      console.log(jsonData);
      console.log(jsonData.async);

      var audio = new Audio(jsonData.async);
      audio.play();
    }
  });
}