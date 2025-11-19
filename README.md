---

# 🚗💨 **Speedometer**

A clean, modern, React-powered Speedometer UI for FiveM — built with **Lua**, **React + TypeScript**, and **NUI**.

<p align="center">
  <img src="https://via.placeholder.com/800x350/111/ffffff?text=Speedometer+UI+Preview+%28Replace+Me%29" alt="Speedometer Preview" width="80%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/FiveM-Resource-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/React-UI-61dafb?style=for-the-badge&logo=react&logoColor=000">
  <img src="https://img.shields.io/badge/Lua-Scripting-blue?style=for-the-badge&logo=lua">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge">
</p>

---

## 🎨 **Modern Features**

✨ Clean & minimal UI
⚡ Real-time vehicle speed updates
🧩 Modular React component system
🛠️ Easy to customize (colors, fonts, layout, opacity)
🎯 Lightweight and optimized
🖥️ Works on all aspect ratios

---

## 🖼️ **UI Example**

> Replace with your actual preview image

```md
![Speedometer UI](./docs/example.png)
```

---

## 📦 **Installation**

### 1️⃣ Clone the resource

```bash
git clone https://github.com/RahulOmegalul/speedometer
```

### 2️⃣ Install UI dependencies

```bash
cd speedometer/web
npm install
```

### 3️⃣ Build UI

```bash
npm run build
```

### 4️⃣ Add to server config

```cfg
ensure speedometer
```

---

## ⚙️ **Configuration**

You can easily tweak the UI inside:

```
web/src/components/
```

Change:

* 🎚️ **Scale**
* 🎨 **Colors**
* 🔤 **Fonts**
* 📐 **Layout / Position**
* 🚗 **When to show/hide**

---

## 🧠 **Developer Notes**

### Live Development

```bash
npm start
```

This enables hot-reload for UI.

### Rebuild UI for production

```bash
npm run build
```

---

## 📁 **Project Structure**

```
/speedometer
├── client/          # Lua client logic
├── server/          # Server-side (if needed)
├── web/             # React NUI
│   ├── public/
│   └── src/
├── fxmanifest.lua   # FiveM resource manifest
└── LICENSE
```

---

## 🤝 **Contributing**

PRs welcome! If you want to add:

* Themes
* Extra vehicle data (RPM, fuel, gear, etc.)
* Animations
* Customizable settings menu

Feel free to contribute.

---