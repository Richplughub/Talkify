// src/controllers/channel.controller.js

import * as channelService from '../services/channel.service.js';
import { formatResponse } from '../utils/helpers.js';

export const createChannel = async (req, res, next) => {
  try {
    const { name, username, description, avatar } = req.body;

    if (!name || !username) {
      return res.status(400).json(
        formatResponse(false, null, 'Channel name and username are required')
      );
    }

    const channel = await channelService.createChannel(req.userId, {
      name,
      username,
      description,
      avatar,
    });

    res.status(201).json(formatResponse(true, channel, 'Channel created'));
  } catch (error) {
    next(error);
  }
};

export const getMyChannels = async (req, res, next) => {
  try {
    const channels = await channelService.getUserChannels(req.userId);
    res.json(formatResponse(true, channels));
  } catch (error) {
    next(error);
  }
};

export const getChannel = async (req, res, next) => {
  try {
    const channel = await channelService.getChannelById(
      req.params.channelId,
      req.userId
    );
    res.json(formatResponse(true, channel));
  } catch (error) {
    next(error);
  }
};

export const joinChannel = async (req, res, next) => {
  try {
    const channel = await channelService.joinChannel(
      req.params.channelId,
      req.userId
    );
    res.json(formatResponse(true, channel, 'Joined the channel'));
  } catch (error) {
    next(error);
  }
};

export const leaveChannel = async (req, res, next) => {
  try {
    const channel = await channelService.leaveChannel(
      req.params.channelId,
      req.userId
    );
    res.json(formatResponse(true, channel, 'Left the channel'));
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await channelService.getChannelMessages(
      req.params.channelId,
      req.userId
    );
    res.json(formatResponse(true, messages));
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json(
        formatResponse(false, null, 'Message content is required')
      );
    }

    const message = await channelService.sendChannelMessage(
      req.params.channelId,
      req.userId,
      content
    );

    res.status(201).json(formatResponse(true, message));
  } catch (error) {
    next(error);
  }
};

export const searchChannels = async (req, res, next) => {
  try {
    const { q } = req.query;
    const channels = await channelService.searchChannels(q);
    res.json(formatResponse(true, channels));
  } catch (error) {
    next(error);
  }
};

export const addAdmin = async (req, res, next) => {
  try {
    const { userId: targetUserId } = req.body;
    const channel = await channelService.addAdmin(
      req.params.channelId,
      req.userId,
      targetUserId
    );
    res.json(formatResponse(true, channel, 'Admin added'));
  } catch (error) {
    next(error);
  }
};

export const removeAdmin = async (req, res, next) => {
  try {
    const { userId: targetUserId } = req.body;
    const channel = await channelService.removeAdmin(
      req.params.channelId,
      req.userId,
      targetUserId
    );
    res.json(formatResponse(true, channel, 'Admin removed'));
  } catch (error) {
    next(error);
  }
};

export const updateChannel = async (req, res, next) => {
  try {
    const { name, username, description, avatar } = req.body;
    const channel = await channelService.updateChannel(
      req.params.channelId,
      req.userId,
      { name, username, description, avatar }
    );
    res.json(formatResponse(true, channel, 'Channel updated'));
  } catch (error) {
    next(error);
  }
};