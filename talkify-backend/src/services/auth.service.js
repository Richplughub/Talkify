// src/services/auth.service.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import * as db from './db.service.js';
import { formatError } from '../utils/helpers.js';
import { SYSTEM_ROLES } from '../utils/constants.js';
import * as systemService from './system.service.js';

export const register = async ({ username, email, password }) => {
  const existingEmail = await db.getUserByEmail(email);
  if (existingEmail) {
    throw formatError('This email is already registered', 400);
  }

  const existingUsername = await db.getUserByUsername(username);
  if (existingUsername) {
    throw formatError('This username is already taken', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    id: uuidv4(),
    username,
    email,
    password: hashedPassword,
    avatar: null,
    bio: null,
    phone: null,
    isOnline: true,
    lastSeen: new Date().toISOString(),
    isVerified: false,
    isSystemAccount: false,
    role: SYSTEM_ROLES.USER,
    createdAt: new Date().toISOString(),
  };

  await db.createUser(newUser);

  try {
    await systemService.sendWelcomeMessage(newUser.id, newUser.username);
  } catch (error) {
    console.error('Failed to send welcome message:', error);
  }

  const token = generateToken(newUser.id);
  const { password: _, ...userWithoutPassword } = newUser;

  return { user: userWithoutPassword, token };
};

export const login = async ({ email, password }) => {
  const user = await db.getUserByEmail(email);
  if (!user) {
    throw formatError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw formatError('Invalid email or password', 401);
  }

  await db.updateUser(user.id, {
    isOnline: true,
    lastSeen: new Date().toISOString(),
  });

  const token = generateToken(user.id);
  const { password: _, ...userWithoutPassword } = user;

  return { user: { ...userWithoutPassword, isOnline: true }, token };
};

export const logout = async (userId) => {
  await db.updateUser(userId, {
    isOnline: false,
    lastSeen: new Date().toISOString(),
  });
};

export const getProfile = async (userId) => {
  const user = await db.getUserById(userId);
  if (!user) {
    throw formatError('User not found', 404);
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw formatError('Invalid token', 401);
  }
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};