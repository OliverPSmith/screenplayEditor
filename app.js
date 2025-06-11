

let scriptLines = [];
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
           addLine(button.getAttribute('data-type'));
           console.log(button.getAttribute('data-type'));
        });
    });

    const clearButton = document.getElementById('clearBtn');
    const undoButton = document.getElementById('undoBtn');
};

const saveToHistory = () => {
    historyIndex.push(JSON.stringify(scriptLines));
};

const addLine = type => {
    const input = document.getElementById('screenInput');
    let text = input.value.trim();
    if (!text) return;

    saveToHistory();

    // if (editIndex !== null) {
    //     scriptLines[editIndex] = {type, text};
    //     editIndex = null;
    // }   else {
    //     scriptLines.push({type, text});
    // }
    scriptLines.push({type, text});

    input.value = '';
    saveScript();
    renderScript();
}

const saveScript = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scriptLines));
};


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