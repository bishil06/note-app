const yargs = require('yargs')

yargs.version('1.0.0');

yargs.command({
    command: 'add',
    describe: 'Add a new note',
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
        console.log(`새로운 노트가 추가되었어요.\n Title:${argv.title}, Body:${argv.body}`);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    handler: () => {
        console.log('노트를 지웠습니다.');
    }
})
yargs.command({
    command: 'list',
    describe: 'Show note list',
    handler: () => {
        console.log('노트 리스트를 출력합니다.');
    }
})

yargs.parse();