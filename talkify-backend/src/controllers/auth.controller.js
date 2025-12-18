// src/controllers/auth.controller.js

import * as authService from '../services/auth.service.js';
import { formatResponse } from '../utils/helpers.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json(
        formatResponse(false, null, 'All fields are required')
      );
    }

    const result = await authService.register({ username, email, password });
    res.status(201).json(formatResponse(true, result, 'Registration successful'));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(
        formatResponse(false, null, 'Email and password are required')
      );
    }

    const result = await authService.login({ email, password });
    console.log('✅ Login successful for:', email);
    res.json(formatResponse(true, result, 'Login successful'));
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await authService.logout(req.userId);
    res.json(formatResponse(true, null, 'Logout successful'));
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.userId);
    res.json(formatResponse(true, user));
  } catch (error) {
    next(error);
  }
};