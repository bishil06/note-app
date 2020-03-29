const fs = require('fs');
const fsPromises = fs.promises;

const notesFileName = 'notes.json'

function addNote(argv) {
    console.log('노트 추가하기');
    const notes = loadNotes();

    notes.then(notes => {
        notes.push({
            title: argv.title,
            body: argv.body,
            author: (argv.author? argv.author: '')
        })
        console.log(notes);

        return notes;
    }).then(notes => {
        return saveNotes(notes);
    })
}

function getNoteList() {
    console.log('리스트 불러오기');

    const notes = loadNotes();
    notes.then(notes => {
        console.log(notes);
    })
}

function removeNote() {
    console.log('노트 지우기');

    return fsPromises.unlink(notesFileName).then(() => {
        console.log('노트 삭제 완료');
    })
}

function loadNotes() {
    console.log('저장장치에서 노트불러오기');

    return fsPromises.readFile(notesFileName).then((notes) => {
        const strJson = notes.toString();
        return JSON.parse(strJson);
    }).catch(() => []);
}

function saveNotes(notes) {
    console.log('저장장치에 노트저장하기');

    const strJson = JSON.stringify(notes);
    return fsPromises.writeFile(notesFileName, strJson).then(() => {
        console.log('저장 완료');
    })
}

module.exports = {
    getNoteList,
    addNote,
    removeNote
}