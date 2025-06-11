

let scriptLines = [
    {   type: 'scene', text: '1 int. office'},
    {   type: 'action', text: 'a man walks to his desk'},
    {   type: 'charachter', text: 'jon'},
    {   type: 'dialogue', text: 'where is my phone'}
];
let editIndex = null;

const STORAGE_KEY = 'screnplayScript';
const historyIndex = [];

window.onload = () => {
    loadScript();
    generateEventlisteners();
};

const loadScript = () => {
    const savedScript = localStorage.getItem(STORAGE_KEY);
    if (savedScript) {
        try {
            scriptLines = JSON.parse(savedScript);
            renderScript();
        }   catch (e) {
            console.error('Load Script Failed');
        }
    }   else {
        renderScript();
    }
};

const generateEventlisteners = () => {
    const btnContainer = document.getElementById('inputBtns');
    btnContainer.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            console.log(button.dataset);
        });
    });
}




const renderScript = () => {
    const output = document.getElementById('scriptOutput');
    output.innerHTML = scriptLines.map((line, index) => {
        let content = '';

        switch (line.type) {
            case 'scene':
                content = `<div class="scene-heading">${line.text}</div>`;
                break;
            case 'subheading':
                content = `<div class="subheading">${line.text}</div>`;
                break;
            case 'action':
                content = `<div class="action">${line.text}</div>`;
                break;
            case 'character':
                content = `<div class="character">${line.text}</div>`;
                break;
            case 'dialogue':
                content = `<div class="dialogue">${line.text}</div>`;
                break;
            case 'transition':
                content = `<div class="transition">${line.text}</div>`;
                break;
            default:
                content = `<div>${line.text}</div>`;
        }

        return `<div class="line">${content}</div>`;
    }).join('');
}