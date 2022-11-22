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

const passwordLS = localStorage.getItem('password');
if(passwordLS){
    passwordInput.value = passwordLS;
    receiveReceiver();
}

receiveBtn.addEventListener('click', e =>{
    receiveReceiver(e, 'click');
});
passwordInput.addEventListener('keydown', e =>{
    receiveReceiver(e, 'keydown')
});

async function receiveReceiver(e, type){
    if(!passwordInput.value || type === 'keydown' && e.code !== 'Enter') return;
    let players = await PromisePlayers;
    let password = passwordInput.value.trim().toLowerCase();
    let player = players[password];
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
    const wish = Object.values(players).find(item => item.gives === receiver.textContent).givesWish;
    moreInformation.textContent = wish|| 'Пока нету особых предпочтений';

    if(wish){
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

    localStorage.setItem('password', password)
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