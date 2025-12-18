// scripts/create-system-account.js

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_ACCOUNT = {
  email: 'support@talkify.com',
  username: 'Talkify',
  password: 'TalkifySupport@2025',
};

async function createSystemAccount() {
  try {
    const usersPath = path.join(__dirname, '../data/users.json');

    let users = [];
    try {
      const data = await fs.readFile(usersPath, 'utf-8');
      users = JSON.parse(data);
    } catch (error) {
      users = [];
    }

    const existingSystem = users.find((u) => u.isSystemAccount === true);
    if (existingSystem) {
      console.log('❌ System account already exists!');
      console.log('📧 Email:', existingSystem.email);
      console.log('👤 Username:', existingSystem.username);
      console.log('🆔 ID:', existingSystem.id);
      return;
    }

    const hashedPassword = await bcrypt.hash(SYSTEM_ACCOUNT.password, 12);

    const systemAccount = {
      id: 'system-support-account',
      username: SYSTEM_ACCOUNT.username,
      email: SYSTEM_ACCOUNT.email,
      password: hashedPassword,
      avatar: '/uploads/avatars/system-avatar.png',
      bio: 'Official Talkify Support Account',
      isOnline: true,
      lastSeen: new Date().toISOString(),
      isVerified: true,
      verifiedAt: new Date().toISOString(),
      verifiedBy: 'system',
      role: 'system',
      isSystemAccount: true,
      createdAt: new Date().toISOString(),
    };
    
    users.push(systemAccount);
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

    console.log('✅ System account created!');
    console.log('📧 Email:', SYSTEM_ACCOUNT.email);
    console.log('🔑 Password:', SYSTEM_ACCOUNT.password);
    console.log('🆔 ID:', systemAccount.id);
    console.log('');
    console.log('⚠️  Make sure to change the password!');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createSystemAccount();