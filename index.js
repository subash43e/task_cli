#!/usr/bin/env node

const { writeFileSync, readFileSync, readdirSync } = require('fs');
const { join } = require('path');


const args = process.argv.slice(2);


try {
    const files = readdirSync(__dirname, { withFileTypes: true });
    const checkingStoregeFile = files.find(file => file.name === 'db.json');
    if (!checkingStoregeFile?.isFile) {
        writeFileSync(
            join(__dirname, 'db.json'),
            "[]", 'utf8'
        )
        console.log("File its not exist, Creating new file.")

    }
} catch (err) {
    console.error('Error reading directory:', err);
}

const helpNote = `Command not found: "${args[0]}"
Usage: taskcli [arg]
Args:
  add [task]       Add a new task
  list            List all tasks
  complete [id]   Mark a task as completed
  delete [id]     Delete a task
  help            Show this help message`;



if (args.length === 0 || args[0] === 'help') {
    console.log(helpNote);
    process.exit(0);
}

const argsList = ["add", "list", "delete", "complete", "update", "mark-in-progress", "mark-done"];


if (args.length > 0) {
    const findArg = argsList.find(data => { return args[0] === data });
    if (findArg === undefined) {
        console.log(helpNote);
    }

    switch (args[0]) {
        case "add":
            try {
                let readedData = readFileSync("db.json", "utf8");
                if (!readedData) {
                    readedData = "[]";
                    writeFileSync('db.json', readedData, 'utf8');
                }
                const data = JSON.parse(readedData);
                const taskId = 1 + data.length;
                const time = Date.now();
                const newTask = {
                    id: taskId,
                    description: args[1],
                    status: "todo",
                    createdAt: `${time}`,
                    updatedAt: `${time}`,
                }
                const newData = [...data, newTask];
                writeFileSync("db.json", JSON.stringify(newData), 'utf-8');
                console.log(`task is created ID:${taskId}`)
            } catch (err) {
                console.log("Error ", err);
            }
            break;

        case "list":
            try {
                const readedData = readFileSync("db.json", "utf8");
                const data = readedData ? JSON.parse(readedData) : [];
                console.log("ID\tStatus\t\tDescription");
                console.log("======================================================================================");
                data.map((d) => {
                    console.log(`${d.id}\t${d.status}\t\t${d.description}`);
                });
                console.log("======================================================================================");
                console.log(`* You can view the task by sorting cmd: taskcli list [arguments]\nArguments list: todo,done, in-progress`)
            } catch (err) {
                console.log("Error ", err);
            }
            break;


        case "delete":
            try {
                if (!args[1]) {
                    console.log(`!Id not found.\nCommand: taskcli delete [Your taskid]`)
                    return
                }
                const readedData = readFileSync("db.json", "utf8");
                const data = readedData ? JSON.parse(readedData) : null;
                const isTaskAvailable = data.find(d => d.id == args[1]);
                if (isTaskAvailable) {
                    const newdata = data.filter(d => d.id != args[1]);
                    writeFileSync("db.json", JSON.stringify(newdata), "utf8");
                    console.log(` Deleted task id:${args[1]}`)
                } else { console.log(`Its already deleted ID:${args[1]}`) }
            } catch (err) {
                console.log("Error ", err);
            }
            break;

        case "update":
            try {
                if (!args[1] && !args[2]) {
                    console.log(`Your task "Id" and "Description" not found.`)
                    return
                } else if (!args[1]) {
                    console.log(`Your task "Id" not found.`)
                    return
                } else if (!args[2]) {
                    console.log(`Your task "Description" not found.`)
                    return
                }

                const readedData = readFileSync("db.json", "utf8");
                const data = readedData ? JSON.parse(readedData) : null;
                const isTaskAvailable = data.find(d => d.id == args[1])
                if (isTaskAvailable) {
                    const time = Date.now();
                    const newdata = data.map(d => {
                        if (d.id == args[1]) {
                            d.description = args[2];
                            d.updatedAt = time;
                        }
                        return d
                    })
                    writeFileSync("db.json", JSON.stringify(newdata), 'utf8');
                    console.log(`Your task description is updated ID:${args[1]}`)
                }
            } catch (err) {
                console.log("Error ", err);
            }
            break

        case "mark-in-progress":
            try {
                if (!args[1]) {
                    console.log(`Your task "Id" not found.`)
                    return
                }

                const readedData = readFileSync("db.json", "utf8");
                const data = readedData ? JSON.parse(readedData) : null;
                const isTaskAvailable = data.find(d => d.id == args[1])
                if (isTaskAvailable) {
                    const time = Date.now();
                    const newdata = data.map(d => {
                        if (d.id == args[1]) {
                            d.status = "in-progress";
                            d.updatedAt = time;
                        }
                        return d
                    })
                    writeFileSync("db.json", JSON.stringify(newdata), 'utf8');
                    console.log(`Your task ID${args[1]} is marked as "in-progress"`);
                }
            } catch (err) {
                console.log("Error ", err);
            }
            break;
        case "mark-done":
            try {
                if (!args[1]) {
                    console.log(`Your task "Id" not found.`)
                    return
                }
                const readedData = readFileSync("db.json", "utf8");
                const data = readedData ? JSON.parse(readedData) : null;
                const isTaskAvailable = data.find(d => d.id == args[1])
                if (isTaskAvailable) {
                    const time = Date.now();
                    const newdata = data.map(d => {
                        if (d.id == args[1]) {
                            d.status = "done";
                            d.updatedAt = time;
                        }
                        return d
                    })
                    writeFileSync("db.json", JSON.stringify(newdata), 'utf8');
                    console.log(`Your task ID${args[1]} is marked as "done"`)
                }


            } catch (err) {
                console.log("Error ", err);
            }

    }
}