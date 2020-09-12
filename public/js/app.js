const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const content = document.getElementById('content');
const error = document.getElementById('error');
const result = document.getElementById('result');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    result.innerHTML = `<div class="spinner-border text-dark" role="status"><span class="sr-only">Loading...</span></div>`;

    fetch(`/weather?location=${search.value}`)
    .then((res) => {
        search.value = "";
        res.json().then((data) => {
            if (data.error) {
                result.innerHTML = `<div class="alert alert-danger" id="error" role="alert">${data.error}</div>`;
            } else {
                let returnedData = `This is ${data.location}. It is ${data.temperature} degrees outside and it feels like ${data.feelslike} deegrees`;
                result.innerHTML = `<h2 id="content" class="alert alert-success" role="alert">${returnedData}</h2>`;
            }
        });
    })
    .catch((err) => {
        search.value = "";
        result.innerHTML = `<div class="alert alert-danger" id="error" role="alert">${err}</div>`;
    });
});