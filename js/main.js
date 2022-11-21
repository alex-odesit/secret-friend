const receiveBtn = document.getElementById('receive_btn');
const result = document.getElementById('result');
let sender = document.getElementById('sender');
let receiver = document.getElementById('receiver');

// let test = window.btoa('alex');
// console.log(test)
// console.log(window.atob('QWxleA=='))

receiveBtn.addEventListener('click', receiveReceiver)

function receiveReceiver(e){
    receiveBtn.classList.add('opacityHide');
    result.classList.add('d-flex');
    sender.textContent = 'Alex';
    receiver.textContent = 'Daniel';

    setTimeout(()=>{
        receiveBtn.classList.add('visibilityHidden');
        result.classList.add('opacityShow');
    }, 1300)
}