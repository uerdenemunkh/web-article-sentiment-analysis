export async function predictURL(data: string) {
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
        return Promise.reject('SERVER DOWN');
    }
}

export async function getURL(query: string) {
    let url = 'http://localhost:5000/search?news=true&query=' + query;
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        return Promise.reject('SERVER DOWN');
    }
}

export async function Load(url: string) {
    try {
        const response = await fetch('http://localhost:5000/load', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({url: url})
        })
        return response.json();
    }
    catch {
        return Promise.reject('SERVER DOWN');
    }
}