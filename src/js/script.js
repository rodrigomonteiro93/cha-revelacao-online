const boxInitial = document.querySelector('#box-initial');
const boxQuestions = document.querySelector('#box-questions');
const boxCounter = document.querySelector('#box-counter');
const boxResponse = document.querySelector('#box-response');
const boxResponseName = document.querySelector('#box-response-name');
const buttonsResponse = document.querySelectorAll('.response');
const counterElem = document.querySelector('#box-counter h1');

const buttonsStart = document.querySelector('#box-initial button');
const buttonsShowResponseName = document.querySelector('#box-response button');
const buttonGossip = document.getElementById("gossip");

const timerCounter = 1000;

let c = 10;
let interval = '';
let sexSelected = '';
let dataBaby = {};

buttonsStart.addEventListener('click', handleOpenBoxQuestionsSex);
buttonsShowResponseName.addEventListener('click', handleOpenBoxResponseName);
buttonsResponse.forEach(button => button.addEventListener('click', setSexSelected));

function handleOpenBoxQuestionsSex()
{
    boxInitial.classList.add('closed');
    boxQuestions.classList.remove('closed');
}


function setSexSelected({ target })
{
    sexSelected = target.classList.contains('man') ? 'man' : 'woman';

    handleOpenBoxCounter();
}

function handleOpenBoxCounter()
{
    boxQuestions.classList.add('closed');
    boxCounter.classList.remove('closed');

    starterCounter();
}

function starterCounter()
{
    counterElem.innerHTML = 'Prepare-se';

    interval = setInterval(counter, timerCounter);
}

function counter()
{
    counterElem.innerHTML = c--;

    boxCounter.classList.add('started');

    document.body.classList.remove(...document.body.classList);
    document.body.classList.add(c % 2 == 0 ? 'woman' : 'man');

    if (c === -1) {
        clearInterval(interval);

        handleOpenBoxResponse();
    }
}

function handleOpenBoxResponse()
{
    handleDataBaby();

    boxCounter.classList.add('closed');
    boxResponse.classList.remove('closed');

    document.body.classList.remove(...document.body.classList);
    //document.body.classList.add(dataBaby.class);

    document.querySelector('#box-response h1').innerHTML = getMessageResponse();
}

function handleOpenBoxResponseName()
{
    boxResponse.classList.add('closed');
    boxResponseName.classList.remove('closed');

    document.querySelector('#box-response-name h1').innerHTML = dataBaby.name;
    document.querySelector('#box-response-name .text').innerHTML = dataBaby.description;

    buttonGossip.href = "https://api.whatsapp.com/send?text=" + encodeURIComponent(document.title + " " + window.location.href);
}

function handleDataBaby()
{
    const dataBabyMan =
    {
        class: 'man',
        name: 'Vem ai o "Yan"',
        description: '<p>Significa “Deus é cheio de graça”, “agraciado por Deus” ou “a graça e misericórdia de Deus” e “Deus perdoa”.</p>'
    }

    const dataBabyWoman =
    {
        class: 'woman',
        name: 'Vem ai a "Mayla"',
        description: '<p>Significado “senhora soberana cujo Deus é juramento”, “senhora soberana para quem Deus é juramento”.</p>'
    }

    dataBaby = window.location.hash === '#1' ? dataBabyMan : dataBabyWoman
}

function getMessageResponse()
{
    if (sexSelected === dataBaby.class) {
        if (dataBaby.class === 'man') {
            
        }
        return 'Uhuu... Você acertou o sexo do nosso bebe';
    }

    return 'Vixe, voce errou desta vez... Quem sabe voce acerte no proximo?!';
}