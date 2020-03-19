const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const fetchMessage = document.querySelector('#fetch-message')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    errorMessage.textContent = 'Loading...'
    fetchMessage.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error
            }
            else {
                errorMessage.textContent = data.location
                fetchMessage.textContent = data.forecast.summary + ' It is currently ' + data.forecast.currentTemp + ' degrees out. There is a ' + data.forecast.precipProbability + '% chance of rain'
            }
        })
    })
})