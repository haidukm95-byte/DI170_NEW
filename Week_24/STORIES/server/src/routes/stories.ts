import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import * as Stories from '../controllers/storiesController.js';

const router = Router();

router.get('/feed',                   verifyJWT, Stories.getFeed);
router.get('/user/:userId',           verifyJWT, Stories.getStoriesByUser);
router.post('/',                      verifyJWT, Stories.createStory);
router.put('/:story_id',              verifyJWT, Stories.editStory);
router.delete('/:story_id/latest',    verifyJWT, Stories.deleteLatestVersion);
router.delete('/:story_id',           verifyJWT, Stories.deleteStory);
router.post('/:id/like',              verifyJWT, Stories.likeStory);
router.post('/:id/dislike',           verifyJWT, Stories.dislikeStory);
router.post('/:id/collab-request',    verifyJWT, Stories.sendCollabRequest);
router.post('/:id/report',            verifyJWT, Stories.reportStory);

export default router;
