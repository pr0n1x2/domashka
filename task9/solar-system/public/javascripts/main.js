const planet = document.querySelector('.ratio');

// planet.addEventListener('click', (event) => {
//     if (event.currentTarget.classList.contains('scale-down')) {
//         event.currentTarget.classList.remove('scale-down');
//         event.currentTarget.classList.add('scale-up');
//     } else {
//         event.currentTarget.classList.remove('scale-up');
//         event.currentTarget.classList.add('scale-down');
//     }
// });

// const amin = new Promise((resolve, reject) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             planet.classList.remove('scale-down');
//             planet.classList.add('scale-up');
//         }, 2000);
//     });
// }).then(() => {
//     console.log('YES');
// })

const delay = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

delay(2000)
    .then(() => {
        planet.classList.remove('scale-down');
        planet.classList.add('scale-up');
        return delay(7000);
    })
    .then(() => {
        planet.classList.add('gravity');
        return delay(4000);
    })
    .then(() => {
        planet.classList.add('equilibrium');
        return delay(2000);
    })
    .then(() => {
        // planet.classList.remove('scale-up');
        planet.classList.add('scale-down');

        console.log('YES');
    });