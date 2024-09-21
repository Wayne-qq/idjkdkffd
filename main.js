//Made by Flayve


//Firebase API init
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'
import { getFirestore, getDoc, setDoc, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyB_8Ygs2gcWHkFAh1bPp-Kl8_yEwTBUe34",
    authDomain: "bionix-6b069.firebaseapp.com",
    projectId: "bionix-6b069",
    storageBucket: "bionix-6b069.appspot.com",
    messagingSenderId: "744550572895",
    appId: "1:744550572895:web:5c9680138612bc43820cea"
};
  
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//Tg Api init
let WebApp = window.Telegram.WebApp;
const tgUserData = WebApp.initDataUnsafe.user;

//Navigation
document.addEventListener('DOMContentLoaded', function() {
    const sections = {
        home: document.querySelector('.main__home'),
        friend: document.querySelector('.main__friend'),
        wallet: document.querySelector('.main__wallet'),
        reconnect: document.querySelector('.main__wallet-connect'),
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


//User data init
const id = tgUserData ? tgUserData.id : 'test';
const userName = tgUserData ? tgUserData.first_name : 'test';
const docRef = doc(db, "users", `${id}`);

let docSnap = await getDoc(docRef);

if(!docSnap.exists()){

    await setDoc(docRef, {
        balance: 0,
        friends: 0,
        daily: 0,
        lastDaily: 0,
        tasks: ["none"],
        wallet: "",
    })

    docSnap = await getDoc(docRef);
}

//START APP CONFIG 
let balance = docSnap.data().balance;
let friends = docSnap.data().friends;
let daily = docSnap.data().daily;
let lastDaily = docSnap.data().lastDaily;
let tasks = docSnap.data().tasks;
let wallet = docSnap.data().wallet;

function updateBalanceDisplay() {

    document.querySelector('.home__balance').textContent = balance;

}

//DATE TIME
const now = new Date()
const today = Math.floor(now / (1000 * 60 * 60 * 24));


// PRELOADER 
setTimeout(function() {
    // Сховати preloader
    document.querySelector('.main__preloader').style.display = 'none';
    
    
    if((today - lastDaily) == 0) {

        // Показати main__home
        document.querySelector('.main__home').style.display = 'block';
        document.querySelector('.main__daily').style.display = 'none';
        
        // Показати nav
        document.querySelector('nav').style.display = 'block';

    }
    else {
        // Показати main__daily
        document.querySelector('.main__daily').style.display = 'block';
    }

}, 2000); // 2 секунди затримки

//Daily Claim
function updateDailyDisplay() {

    document.querySelector('.daily_info').textContent = daily;

}




let dailyDiff = today - lastDaily;

if (dailyDiff > 1) {

    daily = 0;

}

let day = daily + 1;

let reward = day * 100;
if (reward > 1500) {reward = 1500};

document.querySelector('.daily__day').textContent = `DAY ${day}`;
document.querySelector('.daily__num').textContent = reward; 

document.getElementById('claim').addEventListener('click', async () => {

    balance += reward;
    daily += 1;

    updateBalanceDisplay();
    updateDailyDisplay();

    await updateDoc(docRef, {
        balance: balance,
        daily: daily,
        lastDaily: today
    });


    setTimeout(function() {
        // Показати main__home
        document.querySelector('.main__home').style.display = 'block';
        document.querySelector('.main__daily').style.display = 'none';
        
        // Показати nav
        document.querySelector('nav').style.display = 'block';

    }, 500); // Затримка 0.5 секунди
});



//Friends
function updateFriendsDisplay() {

    document.querySelectorAll('.friends_info').forEach(
        text => {
            text.textContent = friends;
        }
    )

}

updateFriendsDisplay();

const RefLink = `https://t.me/###########?start=${id}`

document.querySelector('.invite__friend').addEventListener('click', () => {

    let text = 'WELCOME TO BIONIX'

    window.open(`https://t.me/share/url?url=${RefLink}&text=${text}`, "_blank");

})

//Tasks
function updateTasksDisplay() {

    let tasksNum = tasks.length;

    document.querySelector('.tasks_info').textContent = tasksNum;

}

const taskBlocks = document.querySelectorAll('.task__block');

taskBlocks.forEach(task => {

    let uncompletedSVG = task.querySelector('.task__arrow');
    let completedSVG = task.querySelector('.task__tick');

    const taskId = task.getAttribute('id');

    if(tasks.includes(taskId)){

        task.disabled = true;

        uncompletedSVG.style.display = 'none';
        completedSVG.style.display = 'block';

    }
    else {

        let loadingSVG = task.querySelector('.task__loading');
        let completed = false;

        task.addEventListener('click', () => {

            task.disabled = true;

            if(task.hasAttribute('link')) {

                completed = true;
                
                window.open(task.getAttribute('link'), "_blank");

            }

            if(task.hasAttribute('reqFriends')) {

                if(friends >= task.getAttribute('reqFriends')) { 
                    completed = true;
                }
                
            }

            uncompletedSVG.style.display = 'none';
            loadingSVG.style.display = 'block';
    
        })
    
        loadingSVG.addEventListener('animationend', async () => {
            
            loadingSVG.style.display = 'none';

            if (completed){

                completedSVG.style.display = 'block';
                
                const price = parseInt(task.getAttribute('price'));

                balance += price;
                tasks.push(taskId);

                updateBalanceDisplay();

                await updateDoc(docRef, {
                    balance: balance,
                    tasks: tasks
                }); 
            }
            else {

                uncompletedSVG.style.display = 'block';
                task.disabled = false;
            }
    
        })

    }
})



//Wallet
const navWalletBtn = document.querySelector('.nav__wallet-btn');
navWalletBtn.setAttribute('data-target', 'reconnect');

const mainWallet = document.querySelector('.main__wallet');
const mainConnect = document.querySelector('.main__wallet-connect');

const walletInput = document.querySelector('.input__wallet');

const walletText = document.querySelector('.main__wallet-connect .wallet__num p');
walletText.textContent = `${wallet.slice(0,4)}...${wallet.slice(-2)}`;

function checkWallet(adress) {

    if (
        (adress == '') ||
        (adress.length != 48)
    ) {return false;}

    return true;
}

function updateWalletDisplay() {

    if (checkWallet(wallet)) {


        navWalletBtn.setAttribute('data-target', 'reconnect');

        mainWallet.style.display = 'none';
        mainConnect.style.display = 'block';

    }
    else {  

        navWalletBtn.setAttribute('data-target', 'wallet');

        mainConnect.style.display = 'none';
        mainWallet.style.display = 'block';
    }

}


document.querySelector('.send__wallet').addEventListener('click', async () => {

    if(checkWallet(walletInput.value)) {

        walletInput.classList.remove('error');

        wallet = walletInput.value;

        walletText.textContent = `${wallet.slice(0,4)}...${wallet.slice(-2)}`;

        updateWalletDisplay();

        await updateDoc(docRef, {
            wallet: wallet
        });

    }
    else {

        walletInput.classList.add('error');

    }

})

document.querySelector('.reconnect').addEventListener('click', () => {

    mainConnect.style.display = 'none';
    mainWallet.style.display = 'block';

})


//STARTUP FUNCTIONS
updateBalanceDisplay();
updateDailyDisplay();
updateTasksDisplay();
updateWalletDisplay();
