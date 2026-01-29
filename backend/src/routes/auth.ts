import { Router } from 'express';\nconst router = Router();\nrouter.post('/login', (req, res) => res.json({ token: 'mock-token' }));\nexport default router;
