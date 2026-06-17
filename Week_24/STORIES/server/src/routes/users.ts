import { Router } from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import * as Users from '../controllers/usersController.js';

const router = Router();

router.get('/me',                                   verifyJWT, Users.getMe);
router.patch('/me',                                 verifyJWT, Users.updateMe);
router.patch('/me/password',                        verifyJWT, Users.updatePassword);
router.get('/me/friend-requests',                   verifyJWT, Users.getFriendRequests);
router.put('/me/friend-requests/:senderId/accept',  verifyJWT, Users.acceptFriendRequest);
router.put('/me/friend-requests/:senderId/decline', verifyJWT, Users.declineFriendRequest);
router.get('/me/collab-requests',                   verifyJWT, Users.getCollabRequests);
router.put('/me/collab-requests/:id/accept',        verifyJWT, Users.acceptCollabRequest);
router.put('/me/collab-requests/:id/decline',       verifyJWT, Users.declineCollabRequest);
router.get('/search',                               verifyJWT, Users.searchUsers);

router.get('/:id',                 verifyJWT, Users.getUserProfile);
router.get('/:id/stories',         verifyJWT, Users.getUserStories);
router.put('/:id/friends',         verifyJWT, Users.updateFriends);
router.post('/:id/friend-request', verifyJWT, Users.sendFriendRequest);
router.delete('/:id',              verifyJWT, Users.deactivateAccount);

export default router;
