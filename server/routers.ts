import { Router } from 'express';

const router = Router();

router.post('/', function(req, res) {
     res.send('Birds home page');
});

export default router;