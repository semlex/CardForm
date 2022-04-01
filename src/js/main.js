import IMask from 'imask';
import '../scss/style.scss';

window.addEventListener('DOMContentLoaded', () => {
    const cardFigure = document.querySelector('.card-figure'),
        cardNumber = document.querySelector('#cardNumber'),
        cardName = document.querySelector('#cardName'),
        cardYearOptions = document.querySelectorAll('#cardYear option'),
        cardMonthOptions = document.querySelectorAll('#cardMonth option'),
        CVV = document.querySelector('#CVV'),
        cardTypeImgs = document.querySelectorAll('.card-type__img');

    const numberLabel = document.querySelectorAll('.number-item'),
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
        else if (value.match(/^2/) !== null) {
            return "mir";
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
    }

    function setCardTypeImg(cardType = "visa")
    {
        cardTypeImgs.forEach(cardTypeImg => {
            switch(cardType) {
                case "visa":
                    cardTypeImg.src = "https://firebasestorage.googleapis.com/v0/b/cardform-f357b.appspot.com/o/visa.png?alt=media&token=5a3bbe1a-dfdd-44a3-9427-56072ba2aa0b";
                    break;
                case "mastercard":
                    cardTypeImg.src = "https://firebasestorage.googleapis.com/v0/b/cardform-f357b.appspot.com/o/mastercard.png?alt=media&token=0bd9be02-92d0-419e-a5ad-69951f36abfd";
                    break;
                case "mir":
                    cardTypeImg.src = "https://firebasestorage.googleapis.com/v0/b/cardform-f357b.appspot.com/o/800px-Mir-logo.SVG.svg.png?alt=media&token=566d7b06-23b4-438f-bcfc-61aee1f43bce";
                    break;
                case "amex":
                    cardTypeImg.src = "https://firebasestorage.googleapis.com/v0/b/cardform-f357b.appspot.com/o/amex.png?alt=media&token=2eac4496-5173-42c2-9c1c-7a6d5df3023f";
                    break;
                case "discover":
                    cardTypeImg.src = "https://firebasestorage.googleapis.com/v0/b/cardform-f357b.appspot.com/o/discover.png?alt=media&token=f18f4d49-739b-462c-808e-6ba292351dfd";
                    break;
                case "troy":
                    cardTypeImg.src = "https://firebasestorage.googleapis.com/v0/b/cardform-f357b.appspot.com/o/troy.png?alt=media&token=b28b4ccd-c4e2-4bcd-b83b-e2914cb9e18c";
                    break;
                default:
                    cardTypeImg.src = "https://firebasestorage.googleapis.com/v0/b/cardform-f357b.appspot.com/o/visa.png?alt=media&token=5a3bbe1a-dfdd-44a3-9427-56072ba2aa0b";
                    break;
            }

            cardTypeImg.alt = cardType;
        });
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
                if (i !== 4 && i !== 11 && i < 16)
                {
                    sym.classList.remove('number-item--active');
                    sym.textContent = '#';
                }
                else 
                {
                    sym.classList.add('number-item--active');
                    sym.textContent = ' ';
                }
            });
        }
        else
        {
            numberLabel.forEach((sym, i) => {
                if (i !== 4 && i !== 9 && i !== 14)
                {
                    sym.classList.remove('number-item--active');
                    sym.textContent = '#';
                }
                else 
                {
                    sym.classList.add('number-item--active');
                    sym.textContent = ' ';
                }
            });
        }

        for (let i = 0; i < 19; i++) {
            if (!numberLabel[i].classList.contains('number-item--active') && cardNumber.value[i]) {
                if (i < 4 || i > cardNumberMask.mask.length - 5) {
                    numberLabel[i].textContent = cardNumber.value[i];
                }
                else numberLabel[i].textContent = '*';
            }
            else if (!numberLabel[i].classList.contains('number-item--active')) {
                numberLabel[i].textContent = '#';
            }
        }
    });

    cardYearOptions.forEach(item => {
        item.addEventListener('click', () => {
            cardYearOptions.forEach(elem => elem.removeAttribute('selected'));
            item.setAttribute('selected', 'selected');
            if (item.value === '') yearLabel.textContent = 'YY';
            else yearLabel.textContent = item.value;
        });
    });

    cardMonthOptions.forEach(item => {
        item.addEventListener('click', () => {
            cardMonthOptions.forEach(elem => elem.removeAttribute('selected'));
            item.setAttribute('selected', 'selected');
            if (item.value === '') monthLabel.textContent = 'MM';
            else monthLabel.textContent = item.value;
        });
    });

    cardName.addEventListener('input', () => {
        nameLabel.textContent = cardName.value;
        if(cardName.value === '') nameLabel.textContent = 'FULL NAME'
    });

    CVV.addEventListener('focus', () => {
        cardFigure.classList.add('card-figure--active');
    });
    CVV.addEventListener('blur', () => {
        cardFigure.classList.remove('card-figure--active');
    });
    CVV.addEventListener('input', () => {
        document.querySelector('.cvv__band').innerHTML = '';
        for (let i = 0; i< CVV.value.length; i++) {
            let span = document.createElement('span');
            span.textContent = '*';
            document.querySelector('.cvv__band').appendChild(span);
        }
    });
});