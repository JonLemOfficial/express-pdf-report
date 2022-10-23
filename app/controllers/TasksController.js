const fs = require("fs");
const { join } = require("path");
const jsreport = require("../config/jsreport");
const TasksModel = require("../models/TasksModel");

const TasksController = {
    
    async get(req, res) {
        const { id = null } = req.params;

        if ( id ) {
            const task = await TasksModel.findOne({ id });
            return res.json(task);
        }
        
        const tasks = await TasksModel.find();
        return res.json(tasks);
    },

    async getPDF(req, res) {

        const tasks = await TasksModel.find();
        const result = await jsreport.render({
            template: {
                content: fs.readFileSync(
                    join(__dirname, "..", "views", "chart.ejs")
                ).toString(),
                engine: "ejs",
                recipe: "chrome-pdf"
            },
            data: {
                tasks
            }
        });

        await fs.promises.writeFile(
            join(__dirname, "..", "files", "tasks.pdf"),
            result.content
        );
            
        return res.download(
            join(__dirname, "..", "files", "tasks.pdf")
        );

    },

    async create(req, res) {
        const { title, description } = req.body;

        try {
            await TasksModel.create({ title, description });
            // console.log(created);
            res.json({ msg: "Task created succesfully."});
        } catch (err) {
            res.json({ err: "Could not create the task."});
        }
    },
    
    async update(req, res) {
        const { title, description } = req.body;
        const { id = null } = req.params;
        
        try {
            await TasksModel.updateOne({ id }, { title, description });
            res.json({ msg: "Task edited succesfully."});
        } catch (err) {
            res.json({ err: "Could not edit the task."});
        }
    },
    
    async delete(req, res) {
        const { id = null } = req.params;
        
        try {
            await TasksModel.deleteOne({ id })
            res.json({ msg: "Task deleted succesfully."});
        } catch (err) {
            res.json({ err: "Could not delete the task."});
        }
    }
};

module.exports = TasksController;