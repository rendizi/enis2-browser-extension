city = localStorage.getItem('city');
year = sessionStorage.getItem('yearId')
apiUrl = `https://api.enis2.ml/dashboard/terms/${year}?city=${city}`;



fetch(apiUrl,{
    method: "GET",
    headers: {
        'accept': 'application/json',
        'authorization': `${authToken}`,
    }
}) .then((responce) => {
    if (!responce.ok) {
        throw new Error("Something went wrong...");
    }
    return responce.json();
}) .then((data) => {
    data.forEach((item) => {
        if (item.isActual){
            sessionStorage.setItem("termId",item.Id);
            window.location.href = "js/main.html"
        }
    })
})