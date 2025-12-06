const textBox = document.getElementById('textBox');
const copyBtn = document.getElementById('copyBtn');
const pasteBtn = document.getElementById('pasteBtn');
const statusMsg = document.getElementById('statusMsg');

function showStatus(message, isError = false) {
    statusMsg.textContent = message;
    statusMsg.classList.remove('error');
    
    if (isError) {
        statusMsg.classList.add('error');
    }

    statusMsg.classList.add('visible');

    setTimeout(() => {
        statusMsg.classList.remove('visible');
    }, 2000);
}

copyBtn.addEventListener('click', async () => {
    const textToCopy = textBox.value;

    if (!textToCopy) {
        showStatus("Nothing to copy!", true);
        return;
    }

    try {
        await navigator.clipboard.writeText(textToCopy);
        showStatus("Copied!");
    } catch (err) {
        console.error('Failed to copy: ', err);
        showStatus("Failed to copy", true);
    }
});

pasteBtn.addEventListener('click', async () => {
    try {
        const textFromClipboard = await navigator.clipboard.readText();
        textBox.value = textFromClipboard;
        showStatus("Pasted!");
    } catch (err) {
        console.error('Failed to paste: ', err);
        showStatus("Permission denied", true);
    }
});
