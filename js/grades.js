authToken = sessionStorage.getItem('authToken')
cit = localStorage.getItem('city')
function loadScript(scriptUrl) {
    var script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
}

fetch(`https://api.enis2.ml/dashboard/years?city=${cit}`, {
  method: 'GET',
  headers: {
      'accept': 'application/json',
      'authorization': `${authToken}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Bad internet connection");
    }
    return response.json();
  })
  .then((data) => {
    if (data && data.length > 0) {
      const item = data[0];
      sessionStorage.setItem('yearId', data[0].Id);
      console.log(`Status code: 200, year id: ${data[0].Id}`);
      loadScript('js/terms.js');
    }
  })
  .catch((error) => {
    console.log(error);
  });
