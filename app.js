const yargs = require('yargs');

const note = require('./note.js');

yargs.version('1.0.0');

yargs.command({
    command: 'add',
    describe: 'Add a new note, --title="제목", --body="내용", --author(option)',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
        author: {
            describe: 'Note author',
            type: 'string'
        }
    },
    handler: (argv) => {
        note.addNote(argv);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    handler: () => {
        note.removeNote();
    }
})
yargs.command({
    command: 'list',
    describe: 'Show note list',
    handler: () => {
        note.getNoteList();
    }
})

yargs.parse();