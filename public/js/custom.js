console.log('Client side javascript');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then( (data) => {
        console.log(data)
    })
})

function get_weather(){
    let location = document.getElementById('search').value
    
    fetch('/weather?address='+location).then((response) => {
        response.json().then( (data) => {
            document.getElementById('forecast').innerHTML = data.forecast
            document.getElementById('location').innerHTML = data.location
        })
    })
}