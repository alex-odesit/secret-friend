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

receiveBtn.addEventListener('click', e =>{
    receiveReceiver(e, 'click');
});
passwordInput.addEventListener('keydown', e =>{
    receiveReceiver(e, 'keydown')
});

async function receiveReceiver(e, type){
    if(type === 'keydown' && e.code !== 'Enter') return;
    let players = await fetch('https://secret-friend-5c88b-default-rtdb.firebaseio.com/users.json');
     players = await players.json();
    let password = passwordInput.value.trim().toLowerCase();
    let finalPlayer = null;
    Object.values(players).forEach(groupPlayers =>{
        JSON.parse(decryptSubstitution(groupPlayers.players)).forEach(player => {
            if(password === player.password) finalPlayer = player
        })
    })

    if(!finalPlayer){
        input_wrapper.classList.add('red')
        return;
    }
    input_wrapper.classList.remove('red');
    receiveBtn.classList.add('opacityHide');
    result.classList.add('d-flex');
    moreInformation.classList.add('d-block');
    sender.textContent = finalPlayer.fullName;
    receiver.textContent = finalPlayer.targetPlayerName;
    const wish = finalPlayer.targetWish;
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

function decryptSubstitution(str) {
    // Пример дешифра подстановки
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const encryptedChars = 'xyzabcdefghijklmnopqrstuvw';

    return str.replace(/[a-z]/g, (char) => {
        const index = encryptedChars.indexOf(char);
        return index >= 0 ? alphabet[index] : char;
    });
}