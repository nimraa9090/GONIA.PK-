import { Router, Request, Response } from 'express';
import { BrandSettings } from '../db/schema';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get brand settings
router.get('/', async (req: Request, res: Response) => {
  try {
    let result = await BrandSettings.findOne();
    
    if (!result) {
      result = new BrandSettings({
        appName: 'Goniaa Fashion',
        whatsappNumber: '+92 311 5690640',
        instagram: 'goniaa.pk',
        facebook: 'goniaa.pk',
        twitter: 'goniaa.pk',
        pinterest: 'goniaa.pk',
        snapchat: 'goniaa.pk',
        primaryColor: '#000000',
        secondaryColor: '#FFFFFF',
        accentColor: '#D4AF37',
      });
      await result.save();
    }

    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update brand settings (admin only)
router.put('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const settings = req.body;
    
    let result = await BrandSettings.findOne();
    
    if (result) {
      Object.assign(result, settings);
      await result.save();
    } else {
      result = new BrandSettings(settings);
      await result.save();
    }

    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
