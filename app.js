// localStorage.removeItem('screnplayScript');

let scriptLines = [];
let editIndex = null;

const STORAGE_KEY = 'screnplayScript';
// const historyIndex = [];

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
            console.error('Load Script Failed', e);
        }
    }   else {
        renderScript();
    }
};

const generateEventlisteners = () => {
    const btnContainer = document.getElementById('inputBtns');
    btnContainer.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
           addLine(button.dataset.type);
           console.log(button.dataset.type);
        });
    });

    document.getElementById('clearBtn').addEventListener('click', clearScript);
    // const undoButton = document.getElementById('undoBtn');

    

    const output = document.getElementById('scriptOutput');
    output.addEventListener('click', event => {
        const target = event.target;
            const index = +target.dataset.index;
        
            if (target.classList.contains('upBtn')) {
                moveLineUp(index);
            }   else if (target.classList.contains('downBtn')) {
                moveLineDown(index);
            }   else if (target.classList.contains('editBtn')) {
                editLine(index);
            }   else if (target.classList.contains('deleteBtn')) {
                deleteLine(index);
            }
    });
};

// const saveToHistory = () => {
//     historyIndex.push(JSON.stringify(scriptLines));
// };

const addLine = type => {
    const input = document.getElementById('screenInput');
    let text = input.value.trim();
    if (!text) return;

    // saveToHistory();

    if (editIndex !== null) {
        scriptLines[editIndex] = {type, text};
        editIndex = null;
    }   else {
        scriptLines.push({type, text});
    }


    input.value = '';
    saveScript();
    renderScript();
}

const editLine = index => {
    const input = document.getElementById('screenInput');
    input.value = scriptLines[index].text;
    editIndex = index;
}

const deleteLine = index => {
    scriptLines.splice(index, 1);
    saveScript();
    renderScript();
}

const saveScript = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scriptLines));
};

const moveLineUp = index => {
    if (index <= 0) return;

    [scriptLines[index - 1], scriptLines[index]] = 
    [scriptLines[index], scriptLines[index - 1]];

    saveScript();
    renderScript();
};

const moveLineDown = index => {
    if (index >= scriptLines.length - 1) return;

    [scriptLines[index + 1], scriptLines[index]] = 
    [scriptLines[index], scriptLines[index + 1]];

    saveScript();
    renderScript();
};

const clearScript = () => {
    if (confirm('Permanently remove entire script?')) {
        scriptLines = [];
        localStorage.removeItem(STORAGE_KEY);
        renderScript();
    }
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

        return `<div class="line">
                    ${content}
                    <div class='line-buttons ${line.type === 'character' ? 'character' : ''}'>
                        <button class="upBtn" data-index="${index}">🔼</button>
                        <button class="downBtn" data-index="${index}">🔽</button>
                        <button class="editBtn" data-index="${index}">✏️</button>
                        <button class="deleteBtn" data-index="${index}">❌</button>
                    </div>
                </div>`;
    }).join('');
}



