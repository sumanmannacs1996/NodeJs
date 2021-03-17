const fs = require("fs");
const chalk = require('chalk');

const clearNotes =()=>{
    fs.writeFileSync('notes.json','');
    console.log(chalk.green.inverse("All Notes Clear Successfully!!"));
}

const readNote=(title)=>{
    const list = loadNotes();
    debugger
    const filteredData = list.find((p)=>p.title == title);
    if(filteredData == undefined)
    console.log(chalk.red.inverse("Note Not Found!"));
    else
    console.log(chalk.blueBright(filteredData.body));
}

const showList=()=>{
    const list = loadNotes();
    if(list.length == 0){
        console.log(chalk.red.inverse("List is Empty!"));
    }
    else{
        console.log(chalk.green.inverse("List is...."));
        list.forEach((p)=>console.log(chalk.blueBright(`${p.title}: ${p.body}`)));
    }
}

const addNotes=(title,body)=>{
    const list = loadNotes();
    const index = list.findIndex((p)=>p.title == title);
    if(index != -1){
        list[index].body = body;
        console.log(chalk.green.inverse("Note Updated Successfully!!"));
    }
    else{
        list.push({title:title,body:body});
        console.log(chalk.green.inverse("Note Added Successfully!!"));
    }
    saveNotes(list);
    console.log(list);
    
}

const loadNotes =()=>{
    try{
        const bufferData = fs.readFileSync('notes.json');
    const dataJson = bufferData.toString();
    const data = JSON.parse(dataJson);
    return data;
    }catch(error){
        return [];
    }
}

const saveNotes =(list)=>{
    const dataJSON = JSON.stringify(list);
    fs.writeFileSync('notes.json',dataJSON);
}

const removeNotes=(title)=>{
    const list = loadNotes();
    const index = list.findIndex(p=>p.title==title);
    if(index == -1){
        console.log(chalk.red.inverse("Notes Not Found!!"));
    }
    else{
        list.splice(index,1);
        saveNotes(list);
        console.log(chalk.green.inverse(`"${title}" Deleted Successfully`));
    }
    
}

module.exports={
    addNotes:addNotes,
    removeNotes:removeNotes,
    showList:showList,
    readNote:readNote,
    clearNotes:clearNotes
}