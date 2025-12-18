# Changelog
All notable changes to this project will be documented in this file.

The format is based on **Keep a Changelog**,  
and this project adheres to **Semantic Versioning**.

---

## [1.0.0] - 2025-01-01
### 🎉 Initial Release — Talkify v1.0.0

The first stable release of **Talkify**, a modern messaging platform with real‑time chat, channels, reactions, admin tools, and a polished UI/UX.

---

### ✅ Added
- Real‑time private chat system  
- Channel system with verification badges  
- Admin panel with:
  - Channel management  
  - Broadcast messaging  
  - History logs  
- Message features:
  - Edit message  
  - Delete message  
  - Reactions (emoji)  
  - Message status tracking (`sent`, `delivered`, `seen`)  
- File & media messaging:
  - Image preview with blur overlay  
  - Video placeholder with download button  
  - Tooltip with file name & size  
- System chat for support communication  
- Global broadcast messaging to all non-admin users  
- Clean, modular backend architecture  
- English‑translated UI for production use  
- Secure access control for all chat operations  

---

### 🔄 Changed
- Improved error handling with `formatError`  
- Enhanced UI consistency using ShadCN + Tailwind  
- Updated backend message model to support reactions & status  

---

### 🐞 Fixed
- Message status not updating to `seen` in some cases  
- Incorrect permission checks for system chat  
- Minor UI alignment issues in chat and admin panel  

---

### 🔐 Security
- Users can only access chats they participate in  
- Users can only edit/delete their own messages  
- Deleted messages cannot be edited  
- System chat protected from unauthorized messages  

---

## 📌 Notes
This release marks the first production‑ready version of Talkify, designed as a flagship portfolio project demonstrating real‑world system architecture, UI/UX polish, and secure backend engineering.