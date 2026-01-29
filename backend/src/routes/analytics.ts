import { Router } from 'express';\nconst router = Router();\nrouter.get('/summary', (req, res) => res.json({ totalSales: 0, totalOrders: 0 }));\nexport default router;
