const TIME_LIMIT = 15 * 60 * 1000; 
let endTime = localStorage.getItem('urgency_timer_hotmart_v4');

if (!endTime) {
    endTime = new Date().getTime() + TIME_LIMIT;
    localStorage.setItem('urgency_timer_hotmart_v4', endTime);
}

const timerDisplay = document.getElementById('timer');

function updateTimer() {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance <= 0) {
        timerDisplay.innerHTML = "00:00";
        
        const urgencyBar = document.querySelector('.urgency-bar');
        if(urgencyBar) {
            urgencyBar.innerHTML = "⚠️ LA OFERTA DE BONOS GRATIS HA EXPIRADO. AÚN PUEDES ADQUIRIR EL MANUAL.";
            urgencyBar.style.backgroundColor = "#111111";
        }

        // 1. Ocultamos el texto de los bonos
        const bonusTexts = document.querySelectorAll('.cta-btn span');
        bonusTexts.forEach(text => {
            text.style.display = 'none';
        });

        // 2. LA TRAMPA MORTAL: Cambiamos el link de compra a la oferta SIN BONOS
        const ctaBtns = document.querySelectorAll('.cta-btn');
        ctaBtns.forEach(btn => {
            // Aquí pondrás tu segundo link de Hotmart (el que no tiene bonos)
            btn.href = "https://pay.hotmart.com/LINK_OFERTA_SIN_BONOS"; 
        });

        return; 
    }

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timerDisplay.innerHTML = 
        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
        (seconds < 10 ? "0" + seconds : seconds);
}

setInterval(updateTimer, 1000);
updateTimer();