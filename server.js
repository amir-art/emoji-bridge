const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/emojis', async (req, res) => {
    try {
        const { category } = req.query;
        const url = category === 'all' 
            ? 'https://emojihub.yurace.pro/api/all' 
            : `https://emojihub.yurace.pro/api/all/category/${category}`;
        
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch emojis' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});