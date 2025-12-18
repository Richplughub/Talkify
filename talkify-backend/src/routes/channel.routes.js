// src/routes/channel.routes.js

import { Router } from 'express';
import * as channelController from '../controllers/channel.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/search', channelController.searchChannels);

router.get('/my', channelController.getMyChannels);

router.post('/', channelController.createChannel);

router.get('/:channelId', channelController.getChannel);

router.put('/:channelId', channelController.updateChannel);

router.post('/:channelId/join', channelController.joinChannel);

router.post('/:channelId/leave', channelController.leaveChannel);

router.get('/:channelId/messages', channelController.getMessages);
router.post('/:channelId/messages', channelController.sendMessage);

router.post('/:channelId/admins', channelController.addAdmin);
router.delete('/:channelId/admins', channelController.removeAdmin);

export default router;