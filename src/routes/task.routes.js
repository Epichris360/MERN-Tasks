const express    = require('express')
const router     = express.Router()
const Task       = require('../models/tasks')

router.get('/', async (req, res) => {
    const tasks = await Task.find()
    res.json({ tasks })
    return
})

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id)
    res.json(task)
    return
})

router.post('/', async (req, res) => {
    const { title, description } = req.body
    const task = new Task({title, description})
    await task.save()
    
    res.json({status: 'Task Saved'})
    return
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body
    const newTask = {title, description}
    const id      = req.params.id
    await Task.findByIdAndUpdate(id, newTask)
    res.json({status:"Task Updated"})
    return
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndRemove(req.params.id)
    res.json({status:"Task Removed"})
    return
})

module.exports = router