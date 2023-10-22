import 'dotenv/config'
import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/chat', async (req, res) => {
    const userPrompt = req.body.prompt;

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: userPrompt }],
            model: 'gpt-4',
        });

        const responseData = chatCompletion.choices[0].message.content;
        res.send(JSON.stringify(responseData));
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
