const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// ➤ Create a new todo
router.post("/add", async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➤ Get all todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➤ Update a todo
// Update a todo (Mark as Completed)
router.put("/update/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id, 
            { completed: req.body.completed }, // Only updating completed status
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ➤ Delete a todo
router.delete("/delete/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
