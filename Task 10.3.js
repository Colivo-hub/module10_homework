// Task 10.3
/* Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.
Добавить в чат механизм отправки гео-локации.
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить. */


const output = document.querySelector('.output')
const btnSend = document.querySelector('.req')
const btnGeo = document.querySelector('.geo')
const wsUri = "wss://echo-ws-service.herokuapp.com";
const input = document.querySelector('.input')


let websocket;
let linkMap = document.createElement("a");

document.addEventListener('DOMContentLoaded', function() {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt){
      writeToScreen(
        `<div class="box_style_con">
          <span class="msg" style="color: blue;">Connected</span>
        </div>`);
      }

    websocket.onclose = function(evt) {
      writeToScreen(
        `<div class="box_style_con">
          <span class="msg" style="color: blue;">Disconnected</span>
        </div>`);
      }

    websocket.onmessage = function(evt) {
      writeToScreen(
        `<div class="box_style">
          <span class="msg">${evt.data}</span>
        </div>`);
      }

    websocket.onerror = function(evt) {
      writeToScreen(
        `<div class="box_style_con">
            <span class="msg" style="color: red;">Error</span>
        </div>`);
      }

  btnSend.addEventListener('click', () => {
      let message = input.value;
      writeToScreen(
          `<div class="box_style_sent">
            <span class="msg">${message}</span>
          </div>`);
      websocket.send(message);
  })

  function writeToScreen(message) {
      let pre = document.createElement("div");
      pre.style.wordwrap = "break-word";
      pre.innerHTML = message;
      output.appendChild(pre);
  }

  function writeGeo(msgGeo) {
      linkMap.style.wordwrap = "break-word";
      linkMap.innerHTML = msgGeo;
      output.appendChild(linkMap);
  }


  btnGeo.addEventListener('click', () => {
    linkMap.href = '';
    linkMap.textContent = '';
    
    if (!navigator.geolocation) {
      writeToScreen(
        `<div class="box_style_sent">
          <span class="msg">Geolocation не поддерживается вашим браузером</span>
        </div>`);
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
  })

  const error = () => {
    linkMap.textContent = writeToScreen(
      `<div class="box_style_sent">
        <span class="msg">Невозможно получить ваше местоположение</span>
      </div>`);
    };

  const success = (position) => {
      console.log('position', position);
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
        
      linkMap.href = `https://www.openstreetmap.org/#map=12/${latitude}/${longitude}`;
      
      writeGeo(
        `<div class="box_style_sent">
            <span class="msg">${linkMap.textContent = 'Геолокация'}</span>
        </div>`);
      websocket.send(msgGeo);
    };
})

