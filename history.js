document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get('history', (data) => {
        const historyList = document.getElementById('historyList');
        const history = data.history || [];

        if (history.length === 0) {
            historyList.innerHTML = '<li>No history available.</li>';
        } else {
            history.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.text} - Result: ${item.result} (Confidence: ${item.confidence.toFixed(2)})`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => {
                    deleteHistoryItem(item.text);
                };
                listItem.appendChild(deleteButton);
                historyList.appendChild(listItem);
            });
        }
    });
});

function deleteHistoryItem(text) {
    chrome.storage.sync.get('history', (data) => {
        const history = data.history || [];
        const updatedHistory = history.filter(item => item.text !== text);
        chrome.storage.sync.set({ history: updatedHistory }, () => {
            alert('History item deleted.');
            location.reload(); // Reload to update the list
        });
    });
}