login = localStorage.getItem('login')
if (login != null){
    password = localStorage.getItem('password')
    cit = localStorage.getItem('city')
    fetch('https://api.enis2.ml/login?city=' + cit, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'authorization': '1',
            'Content-Type': 'application/json'
        },
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
}