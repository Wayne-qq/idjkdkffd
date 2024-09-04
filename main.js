document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        home: document.querySelector('.main__home'),
        friend: document.querySelector('.main__friend'),
        wallet: document.querySelector('.main__wallet'),
        task: document.querySelector('.main__task'),
        chat: document.querySelector('.main__chat'),

        
    };

    const buttons = document.querySelectorAll('nav button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');

            // Приховати всі секції
            Object.values(sections).forEach(section => {
                section.style.display = 'none';
            });

            // Показати обрану секцію
            if (sections[target]) {
                sections[target].style.display = 'block';
            }
        });
    });
});




// preloader preloader preloader preloader preloader preloader 
// preloader preloader preloader preloader preloader preloader 
// preloader preloader preloader preloader preloader preloader 
// preloader preloader preloader preloader preloader preloader 
// preloader preloader preloader preloader preloader preloader 
// preloader preloader preloader preloader preloader preloader 


setTimeout(function() {
    // Сховати preloader
    document.querySelector('.main__preloader').style.display = 'none';
    
    
    // Показати main__home
    document.querySelector('.main__daily').style.display = 'block';
}, 2000); // 2 секунди затримки





document.getElementById('claim').addEventListener('click', function() {
    setTimeout(function() {
        // Показати main__home
        document.querySelector('.main__home').style.display = 'block';
        document.querySelector('.main__daily').style.display = 'none';
        
        // Показати nav
        document.querySelector('nav').style.display = 'block';
    }, 500); // Затримка 0.5 секунди
});





document.querySelectorAll('.home__btn').forEach(button => {
    button.addEventListener('click', function() {
        const target = this.getAttribute('data-target');

        // Спочатку приховуємо всі елементи main
        document.querySelectorAll('main').forEach(main => {
            main.style.display = 'none';
        });

        // Потім відображаємо потрібний елемент main
        const mainToShow = document.querySelector(`.main__${target}`);
        if (mainToShow) {
            mainToShow.style.display = 'block';
        }

        // Переконаємося, що інший елемент main (наприклад, main__home) прихований
        const mainHome = document.querySelector('.main__home');
        if (mainHome && target !== 'home') {
            mainHome.style.display = 'none';
        }
    });
});
