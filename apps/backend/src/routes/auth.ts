import { Router } from 'express';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const router = Router();

const neynarClient = new NeynarAPIClient({
  apiKey: process.env.NEYNAR_API_KEY || '',
});

// Verify Farcaster signature
router.post('/verify', async (req, res) => {
  try {
    const { message, signature, fid } = req.body;

    // Verify signature with Neynar
    // This is a placeholder - implement actual verification
    const isValid = true; // await neynarClient.verifySignature(...)

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    res.json({ verified: true, fid });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get user profile
router.get('/user/:fid', async (req, res) => {
  try {
    const { fid } = req.params;

    // Fetch user from Neynar
    const user = await neynarClient.fetchBulkUsers([parseInt(fid)]);

    res.json(user.users[0]);
  } catch (error) {
    console.error('User fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export { router as authRouter };
