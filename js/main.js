const receiveBtn = document.getElementById('receive_btn');
const result = document.getElementById('result');
const sender = document.getElementById('sender');
const receiver = document.getElementById('receiver');
const passwordInput = document.getElementById('password');
const input_wrapper = document.getElementById('input_wrapper');
const PromisePlayers = fetch('./js/result.json').then(res => res.json());

// let test = window.btoa('alex');
// console.log(test)
// console.log(window.atob('QW55YQ=='))

receiveBtn.addEventListener('click', receiveReceiver)

async function receiveReceiver(e){
    if(!passwordInput.value) return;
    let players = await PromisePlayers;
    let player = players[passwordInput.value];
    if(!player){
        input_wrapper.classList.add('red')
        return;
    }

    receiveBtn.classList.add('opacityHide');
    result.classList.add('d-flex');
    sender.textContent = window.atob(player.gives);
    receiver.textContent = player.receives;

    setTimeout(()=>{
        receiveBtn.classList.add('visibilityHidden');
        result.classList.add('opacityShow');
    }, 1300)
}