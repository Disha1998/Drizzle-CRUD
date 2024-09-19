import express from 'express';
import { db } from './drizzle/db';
import { TasksTable } from './drizzle/schema';
import { eq } from 'drizzle-orm';
import cors from 'cors';
import { z } from 'zod';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware to parse JSON requests
app.use(express.json());

//   Zod Schema for Task Validation
const taskSchema = z.object({
    task: z.string().min(1, 'Task is required'),  // Task must be a non-empty string
});

// Fetch all tasks

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await db.select().from(TasksTable);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks', details: error });
    }
});

//  Add a new task

app.post('/api/tasks', async (req, res) => {
    // Parse and validate incoming request using Zod
    const parseResult = taskSchema.safeParse(req.body);

    if (!parseResult.success) {
        // Validation failed
        return res.status(400).json({ error: parseResult.error.errors });
    }

    const { task } = parseResult.data;

    try {
        const result = await db.insert(TasksTable).values({ task });
        res.status(201).json({ message: 'Task added', task: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add task', details: error });
    }
});

//  Update a task

app.put('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;

    // Parse and validate incoming request using Zod
    const parseResult = taskSchema.safeParse(req.body);

    if (!parseResult.success) {
        // Validation failed
        return res.status(400).json({ error: parseResult.error.errors });
    }

    const { task } = parseResult.data;

    try {
        // Update the task in the database
        const result = await db.update(TasksTable)
            .set({ task })
            .where(eq(TasksTable.id, Number(id)));

        if (result.count === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task', details: error });
    }
});

//  Remove a task

app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.delete(TasksTable).where(eq(TasksTable.id, Number(id)));

        res.status(200).json({ message: 'Task deleted', task: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task', details: error });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
