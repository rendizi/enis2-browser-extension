function loadScript(scriptUrl) {
    var script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
}
function displayErrorMessage(message) {
    const errorWindow = document.getElementById('error-window');
    const errorMessage = document.getElementById('error-message');
    const closeErrorButton = document.getElementById('close-error-button');

    errorMessage.textContent = message;

    // Show the error window
    errorWindow.style.display = 'block';

    // Close the error window when the close button is clicked
    closeErrorButton.addEventListener('click', function () {
        errorWindow.style.display = 'none';
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            login = document.getElementById("login-input").value;
            password = document.getElementById("password-input").value;
            cit = document.getElementById("school-select").value;

            fetch('https://api.enis2.ml/login?city=' + cit, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'authorization': '1', 
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors',
                body: JSON.stringify({
                    login: login,
                    password: password,
                    captchaInput: ' '
                })
            })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                    .then(data => {
                        localStorage.setItem('login', login);
                        localStorage.setItem('password', password);
                        localStorage.setItem('city',cit)
                        sessionStorage.setItem('authToken', data.token)
                        loadScript('js/grades.js')
                    });
                }else{
                    if (response.status === 401){
                        displayErrorMessage("Invalid login or password");}
                    else{
                        if (response.status === 400){
                            displayErrorMessage("An error has occurred. Log in to the sms and return");}
                        }
                    }
            })



        });


    }

    console.log("Test1");
});

