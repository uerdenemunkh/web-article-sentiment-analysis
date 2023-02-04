async function predictURL(data: string) {
    try {
        const response = await fetch('http://localhost:5000/predict-url', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({url: data})
        })
        return response.json();
    }
    catch {
        return false;
    }
}

async function getURL(query: string) {
    let url = 'http://localhost:5000/search?query=' + query;
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        return false;
    }
}

export { predictURL, getURL }