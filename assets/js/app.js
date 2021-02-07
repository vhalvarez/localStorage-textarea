// Variables
const listaTweets = document.getElementById('lista-tweets')

// Event listeners
const eventListeners = () => {
    // Cuando se envia el formulario
    document
        .querySelector('#formulario')
        .addEventListener('submit', agregarTweet)

    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet)

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo)
}

//Funciones

// Añadir tweet del formulario
const agregarTweet = (e) => {
    e.preventDefault()

    // leer el valor del textarea
    const tweet = document.getElementById('tweet').value

    // crear boton de eliminar
    const botonBorrar = document.createElement('a')
    botonBorrar.classList = 'borrar-tweet'
    botonBorrar.innerText = 'X'

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li')
    li.innerText = tweet
    // Añade el boton de borrar al tweet
    li.appendChild(botonBorrar)
    // Añade el tweet a la lista
    listaTweets.appendChild(li)

    // Añadir a Local Storage
    agregarTweetLocalStorage(tweet)
}
// Elimina el tweet del DOM
const borrarTweet = (e) => {
    e.preventDefault()

    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove()
        borrarTweetLocalStorage(e.target.parentElement.innerText)
    }
}

// Mostrar datos del localStorage en la lista
const localStorageListo = () => {
    let tweets

    tweets = obtenerTweetsLocalStorage()

    tweets.forEach(function (tweet) {
        // crear boton de eliminar
        const botonBorrar = document.createElement('a')
        botonBorrar.classList = 'borrar-tweet'
        botonBorrar.innerText = 'X'

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li')
        li.innerText = tweet
        // Añade el boton de borrar al tweet
        li.appendChild(botonBorrar)
        // Añade el tweet a la lista
        listaTweets.appendChild(li)
    })
}

// Agregar tweet a local storage
const agregarTweetLocalStorage = (tweet) => {
    let tweets
    tweets = obtenerTweetsLocalStorage()
    // Añadr el nuevo tweet
    tweets.push(tweet)
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Comprobar que haya elementos en localStorage, retorna un arreglo
const obtenerTweetsLocalStorage = () => {
    let tweets
    // Revisamos los valores del local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = []
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'))
    }

    return tweets
}
// Eliminar tweet local storage
const borrarTweetLocalStorage = (tweet) => {
    let tweets, tweetBorrar
    // elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1)

    tweets = obtenerTweetsLocalStorage()

    tweets.forEach(function (tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1)
        }
    })

    localStorage.setItem('tweets', JSON.stringify(tweets))
}

eventListeners()
