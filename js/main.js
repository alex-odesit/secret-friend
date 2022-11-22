const receiveBtn = document.getElementById('receive_btn');
const result = document.getElementById('result');
const sender = document.getElementById('sender');
const receiver = document.getElementById('receiver');
const passwordInput = document.getElementById('password');
const input_wrapper = document.getElementById('input_wrapper');
const moreInformation = document.getElementById('moreInformation');
const moreInformationShow = document.getElementById('moreInformationShow');
const moreInformationHide = document.getElementById('moreInformationHide');
const mainBox = document.getElementById('form');
const PromisePlayers = fetch('./js/result.json').then(res => res.json());

console.log('1057|1072|1096|1072|32|1044|1084|1080|1090|1088|1080|1077|1074'.split('|').map(num => String.fromCharCode(num)).join(''))

receiveBtn.addEventListener('click', e =>{
    receiveReceiver(e, 'click');
});
passwordInput.addEventListener('keydown', e =>{
    receiveReceiver(e, 'keydown')
});

async function receiveReceiver(e, type){
    if(!passwordInput.value || type === 'keydown' && e.code !== 'Enter') return;
    let players = await PromisePlayers;
    let player = players[passwordInput.value];
    if(!player){
        input_wrapper.classList.add('red')
        return;
    }

    input_wrapper.classList.remove('red');
    receiveBtn.classList.add('opacityHide');
    result.classList.add('d-flex');
    moreInformation.classList.add('d-block');
    sender.textContent = player.gives;
    receiver.textContent = player.receives.split('|').map(num => String.fromCharCode(num)).join('');
    moreInformation.textContent = player.givesWish || 'Пока нету особых предпочтений'
    if(player.givesWish){
        moreInformationShow.addEventListener('click', showDescription);
        moreInformation.addEventListener('click', showDescription);
        moreInformationHide.addEventListener('click', hideDescription);
        moreInformationShow.classList.add('d-block');
        moreInformationHide.classList.add('d-block');
    }

    setTimeout(()=>{
        receiveBtn.classList.add('visibilityHidden');
        moreInformation.classList.add('opacityShow');
        result.classList.add('opacityShow');
        moreInformationShow.classList.add('opacityShow');
    }, 1300)
}

function showDescription(){
    moreInformation.classList.add('heightMax');
    result.classList.remove('opacityShow');
    result.classList.add('opacityHide');
    mainBox.classList.add('opacityHide');
    moreInformationShow.classList.remove('opacityShow');
    moreInformationShow.classList.add('opacityHide');
    moreInformationHide.classList.add('opacityShow');
    moreInformation.removeEventListener('click', showDescription);
    moreInformation.addEventListener('click', hideDescription);
    setTimeout(()=>{
        moreInformationShow.classList.add('d-none')
    },1000)
}

function hideDescription(){
    moreInformation.classList.remove('heightMax');
    result.classList.remove('opacityHide');
    result.classList.add('opacityShow');
    mainBox.classList.remove('opacityHide');
    moreInformationShow.classList.add('opacityShow');
    moreInformationShow.classList.remove('opacityHide');
    moreInformationHide.classList.remove('opacityShow');
    moreInformationShow.classList.remove('d-none');
    moreInformation.removeEventListener('click', hideDescription);
    moreInformation.addEventListener('click', showDescription);
}