document.getElementById('saveSettings').addEventListener('click', () => {
    const selectedModel = document.getElementById('modelSelect').value;
    const selectedTheme = document.getElementById('themeSelect').value;

    chrome.storage.sync.set({ model: selectedModel, theme: selectedTheme }, () => {
        alert('Settings saved!');
    });
});

// Load settings on page load
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['model', 'theme'], (data) => {
        document.getElementById('modelSelect').value = data.model || 'distilbert';
        document.getElementById('themeSelect').value = data.theme || 'light';
    });
});