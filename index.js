const express = require('express')
const app = express()
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my-database.db'
})

const TaskModel = require('./models/task')

const tasks = TaskModel(sequelize , DataTypes)

app.get('/tarefas', async (req, res) => {
    const allTasks = await sequelize.query('SELECT * FROM Tasks')
        res.json({allTasks})
})

app.post('/tarefas', async (req, res) => {
     await tasks.create({name: "daysi estelita del llano" }) 
    res.status(201).send("Boa! tarefa adicionada com exito!!")
})

app.get('/tarefa/:id', async (req, res) => {
    const tarefaId = req.params.id
    const tarefa = await tasks.findByPk(tarefaId)
    res.json({id: tarefa.id, name: tarefa.name
    })

})

app.put('/tarefa/:id', async (req, res) => {
    const tarefaId = req.params.id
    const tarefa = await tasks.findByPk(tarefaId)

    tarefa.update({name: 'luz amelie hernandez'})
    res.send("tarefa atualizada!" )
})

app.delete('/tarefa/:id', async (req, res) => {
    const tarefaId = req.params.id
    await tasks.destroy({where: {id: tarefaId}})
    res.send("tarefa deletada!")
})

app.listen(6000, () => {
    console.log('Servidor express funcionando. Acesse: http://localhost:6000')
})
