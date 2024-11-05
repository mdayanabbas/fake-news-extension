document.getElementById('loginBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Login successful!');
        document.getElementById('auth').style.display = 'none';
        document.getElementById('analysis').style.display = 'block';
    } else {
        alert('Login failed!');
    }
});

document.getElementById('registerBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Registration successful! You can now log in.');
    } else {
        alert('Registration failed!');
    }
});

document.getElementById('sendText').addEventListener('click', async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: getSelectedText
        }, async (results) => {
            const selectedText = results[0].result;
            if (selectedText) {
                const model = 'distilbert'; // You can modify to get the selected model from options
                const response = await fetch('http://localhost:5000/detect', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: selectedText, model: model })
                });

                const resultData = await response.json();
                document.getElementById('response').innerText = `Result: ${resultData.label} (Confidence: ${resultData.score.toFixed(2)})`;
            } else {
                alert('Please select some text.');
            }
        });
    });
});

document.getElementById('historyBtn').addEventListener('click', async () => {
    const response = await fetch('http://localhost:5000/history', {
        method: 'GET',
        credentials: 'include' // Include cookies for session management
    });

    if (response.ok) {
        const history = await response.json();
        alert(JSON.stringify(history, null, 2));
    } else {
        alert('Failed to fetch history!');
    }
});

function getSelectedText() {
    return window.getSelection().toString();
}