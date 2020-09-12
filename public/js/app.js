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
                result.innerHTML = `
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${data.weather_descriptions}
                    <img alt="icon" src="${data.weather_icons}" />
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">${data.observation_time} at ${data.location}</h6>
                  <p class="card-text">It is ${data.temperature} degrees and it feels like ${data.feelslike} degrees.</p>
                </div>
                </div>
                `;
            }
        });
    })
    .catch((err) => {
        search.value = "";
        result.innerHTML = `<div class="alert alert-danger" id="error" role="alert">${err}</div>`;
    });
});