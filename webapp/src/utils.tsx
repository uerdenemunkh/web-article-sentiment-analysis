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
        if (response.status !== 200) return Promise.reject(response.status);
        return response.json();
    }
    catch {
        return Promise.reject('Error');
    }
}

export async function getURL(query: string) {
    let url = 'http://localhost:5000/search?news=true&query=' + query;
    try {
        const response = await fetch(url);
        if (response.status !== 200) return Promise.reject(response.status);
        return response.json();
    } catch (error) {
        return Promise.reject('Error');
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
        if (response.status !== 200) return Promise.reject(response.status);
        return response.json();
    }
    catch {
        return Promise.reject('Error');
    }
}

export async function predictText(data: string) {
    try {
        const response = await fetch('http://localhost:5000/predict-text', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({text: data})
        })
        if (response.status !== 200) return Promise.reject(response.status);
        return response.json();
    }
    catch {
        return Promise.reject('Error');
    }
}