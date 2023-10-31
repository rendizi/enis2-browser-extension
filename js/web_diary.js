authToken = sessionStorage.getItem('authToken');
city = localStorage.getItem('city');
term = sessionStorage.getItem('termId');
apiUrl = `https://api.enis2.ml/dashboard/diary/${term}?city=${city}`;
function addTableRow(subject, percentage, grade) {
    const table = document.querySelector("table");
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = subject + " - " + percentage + "%";
    cell2.innerHTML = grade;
    const lineClass = getLineClass(grade);
    if (lineClass) {
        row.classList.add("line", lineClass);
    }
}

function getLineClass(grade) {
    switch (grade) {
        case 5:
            return "line-green";
        case 4:
        case 3:
            return "line-yellow";
        default:
            return "line-red";
    }
}


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
        if (data && data.data && data.data.length > 0) {
            for (const item of data.data) {
                // Adjust the property names to match your response structure
                addTableRow(item.Name, item.Score, item.Mark);
            }
        }
    })
    .catch((error) => {
        console.error('Error fetching data: ', error);
    });
