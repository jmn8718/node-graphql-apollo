import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: process.env.NAME,
    environment: process.env.ENV,
    expiresIn: parseInt(process.env.EXPIRES_IN),
  });
});

export default router;
