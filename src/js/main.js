import IMask from 'imask';
import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {
    const cardFigure = document.querySelector('.card-figure'),
        cardNumber = document.querySelector('#cardNumber'),
        cardName = document.querySelector('#cardName'),
        cardYear = document.querySelector('#cardYear'),
        cardYearOptions = document.querySelectorAll('#cardYear option'),
        cardMonth = document.querySelector('#cardMonth'),
        cardMonthOptions = document.querySelectorAll('#cardMonth option'),
        CVV = document.querySelector('#CVV'),
        cardTypeImg = document.querySelector('.card-typeImg');

    const numberLabel = document.querySelectorAll('.card-number__numberItem'),
        nameLabel = document.querySelector('.card-name__holder'),
        yearLabel = document.querySelector('label[for = "cardYear"]'),
        monthLabel = document.querySelectorAll('label[for = "cardMonth"]')[1];
    

    const numberMask = {
        mask: '0000 0000 0000 0000'
    },
        CVVMask = {
        mask: /^\d{0,4}$/
    };

    const cardNumberMask = new IMask(cardNumber, numberMask),
        CVVNumberMask = new IMask (CVV, CVVMask);

    function getCardType(value = '4') 
    {
        if (value.match(/^(34|37)/) !== null)
        {
            return "amex";
        }
        else if (value.match(/^5[1-5]/) !== null) {
            return "mastercard";
        }
        else if (value.match(/^6011/) !== null) {
            return "discover";
        }
        else if (value.match(/^9792/) !== null) {
            return "troy";
        }
        else
        {
            return "visa";
        }
    };

    function setCardTypeImg(cardType = "visa")
    {
        cardTypeImg.src = `img/cardTypes/${cardType}.png`;
        cardTypeImg.alt = `${cardType}`;
    }

    let cardType = getCardType();
    setCardTypeImg(cardType);

    cardNumber.addEventListener('input', () => {
        cardType = getCardType(cardNumber.value);
        setCardTypeImg(cardType);
        if (cardType === "amex") 
        {
            cardNumberMask.updateOptions({
                mask: '0000 000000 0000'
            });
        }

        else
        {
            cardNumberMask.updateOptions({
                mask: '0000 0000 0000 0000'
            });
        }

        if (cardType === "amex")
        {
            numberLabel.forEach((sym, i) => {
                if (i != 4 && i != 11 && i < 16) 
                {
                    sym.classList.remove('active');
                    sym.textContent = '#';
                }
                else 
                {
                    sym.classList.add('active');
                    sym.textContent = ' ';
                }
            });
        }
        else
        {
            numberLabel.forEach((sym, i) => {
                if (i != 4 && i != 9 && i != 14) 
                {
                    sym.classList.remove('active');
                    sym.textContent = '#';
                }
                else 
                {
                    sym.classList.add('active');
                    sym.textContent = ' ';
                }
            });
        }

        for (let i = 0; i < 19; i++) {
            if (!numberLabel[i].classList.contains('active') && cardNumber.value[i]) {
                if (i < 4 || i > cardNumberMask.mask.length - 5) {
                    numberLabel[i].textContent = cardNumber.value[i];
                }
                else numberLabel[i].textContent = '*';
            }
            else if (!numberLabel[i].classList.contains('active')) {
                numberLabel[i].textContent = '#';
            }
        }
    });

    cardYearOptions.forEach(item => {
        item.addEventListener('click', () => {
            cardYearOptions.forEach(elem => elem.removeAttribute('selected'));
            item.setAttribute('selected', 'selected');
            if (item.value == '') yearLabel.textContent = 'YY';
            else yearLabel.textContent = item.value;
        });
    });

    cardMonthOptions.forEach(item => {
        item.addEventListener('click', () => {
            cardMonthOptions.forEach(elem => elem.removeAttribute('selected'));
            item.setAttribute('selected', 'selected');
            if (item.value == '') monthLabel.textContent = 'MM';
            else monthLabel.textContent = item.value;
        });
    });

    cardName.addEventListener('input', () => {
        nameLabel.textContent = cardName.value;
        if(cardName.value == '') nameLabel.textContent = 'FULL NAME'
    });

    CVV.addEventListener('focus', () => {
        cardFigure.classList.add('active');
    });
    CVV.addEventListener('blur', () => {
        cardFigure.classList.remove('active');
    });
    CVV.addEventListener('input', () => {
        document.querySelector('.card-cvv__band').innerHTML = '';
        for (let i = 0; i< CVV.value.length; i++) {
            let span = document.createElement('span');
            span.textContent = '*';
            document.querySelector('.card-cvv__band').appendChild(span);
        }
    });
});