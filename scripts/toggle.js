document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const audioState = document.getElementById('audio-state');

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            audioState.innerHTML = 'Audio ON';
        } else {
            audioState.innerHTML = 'Audio OFF';
        }
    })
})