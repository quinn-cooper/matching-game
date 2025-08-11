const themeBtn = document.getElementById('color-theme');

themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');

    // If theme is dark, set it to light mode and change button text to say Dark Mode
    if(currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        themeBtn.innerHTML = 'Dark Mode';

    // If theme is light, set it to dark mode and change button text to say Light Mode
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = 'Light Mode';
    }
})