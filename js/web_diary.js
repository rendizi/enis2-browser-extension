let jsonData;
authToken = sessionStorage.getItem('authToken');
city = localStorage.getItem('city');
term = sessionStorage.getItem('termId');
apiUrl = `https://api.enis2.ml/dashboard/diary/${term}?city=${city}`;

fetch(apiUrl, {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'authorization': authToken,
    }
})
    .then((response) => {
        if (!response.ok) {
            throw new Error('Something went wrong...');
        }
        return response.json();
    })
    .then((data) => {
        let jsonData = data
        const table = document.querySelector("table");
        console.log(jsonData,"there is jsonData")
        jsonData.data.forEach(item => {
            const row = table.insertRow();
            const subjectCell = row.insertCell(0);
            const percentageCell = row.insertCell(1);

            subjectCell.innerHTML = item.Name;
            if (item.Score !== 0) {
                percentageCell.innerHTML = item.Score + "%";
            } else {
                percentageCell.innerHTML = "N/A";
            }
        });
    })
    .catch((error) => {
        console.error('Error fetching data: ', error);
    });
