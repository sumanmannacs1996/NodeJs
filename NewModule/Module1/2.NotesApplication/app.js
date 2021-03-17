const yargs = require('yargs');

const notes = require('./notes.js');

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function (argv) {
        notes.addNotes(argv.title,argv.body);
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: (argv)=> {
        notes.removeNotes(argv.title);
    }
})

// Show Note list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: ()=> {
        notes.showList();
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: (argv)=> {
        notes.readNote(argv.title);
    }
})

yargs.command({
    command: 'clear',
    describe: 'clear all the note',
    handler: ()=> {
        notes.clearNotes();
    }
})

yargs.parse();