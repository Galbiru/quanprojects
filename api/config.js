import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const configPath = path.join('/tmp', 'config.json');
    const defaultConfigPath = path.join(process.cwd(), 'config.json');

    if (!fs.existsSync(configPath)) {
        fs.copyFileSync(defaultConfigPath, configPath);
    }

    if (req.method === 'GET') {
        try {
            const json = fs.readFileSync(configPath, 'utf8');
            res.status(200).json(JSON.parse(json));
        } catch (e) {
            res.status(500).json({ error: 'Gagal membaca config.' });
        }
        return;
    }

    if (req.method === 'POST') {
        try {
            const body = req.body;

            if (!body) return res.status(400).json({ error: 'Tidak ada data.' });

            fs.writeFileSync(configPath, JSON.stringify(body, null, 2));
            res.status(200).json({ success: true });
        } catch (e) {
            res.status(500).json({ error: 'Gagal menyimpan config.' });
        }
        return;
    }

    res.status(405).json({ error: 'Method not allowed.' });
}