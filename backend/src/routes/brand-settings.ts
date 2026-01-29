import { Router } from 'express';\nconst router = Router();\nrouter.get('/', (req, res) => res.json({ brandName: 'Goniaa Fashion' }));\nexport default router;
