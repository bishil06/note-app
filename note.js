const fs = require('fs');
const fsPromises = fs.promises;

const notesFileName = 'notes.json'

function addNote(argv) {
    console.log('노트 추가하기');
    const notes = loadNotes();

    notes.then(notes => {
        // 노트를 불러오면 새로운 내용을 추가
        notes.push({
            title: argv.title,
            body: argv.body,
            author: (argv.author? argv.author: '') // 옵션임
        })
        console.log(notes);

        return notes;
    }).then(notes => {
        // 추가된 노트를 저장장치에 저장
        return saveNotes(notes);
    })
}

function getNoteList() {
    console.log('리스트 불러오기');

    const notes = loadNotes();
    notes.then(notes => {
        // 불러온 노트를 콘솔에 출력
        console.log(notes);
    })
}

function removeNote() {
    console.log('노트 지우기');

    return fsPromises.unlink(notesFileName).then(() => {
        // 저장장치에 있는 노트 파일을 삭제
        console.log('노트 삭제 완료');
    })
}

function loadNotes() {
    console.log('저장장치에서 노트불러오기');

    return fsPromises.readFile(notesFileName).then((notes) => {
        // 노트를 불러옴
        const strJson = notes.toString();
        return JSON.parse(strJson);
    }).catch((err) => {
        console.log('노트를 저장장치에서 불러오는데 실패하였습니다. 새로운 노트를 생성하여 반환합니다.\n', err);
        return [];
    });
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