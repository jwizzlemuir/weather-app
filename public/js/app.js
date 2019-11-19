const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const sourceOfDissapointment = 'Joel'

weatherForm.addEventListener('submit' , (e) =>{
    e.preventDefault()

const location = search.value
    
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if (data.error){          
            messageOne.textContent = 'Error, no a valid input'
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
        }
    })
})
})