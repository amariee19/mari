# mari. — AR Virtual Try-On Engine for Uploaded Photos

This document details the architecture and feature set of **mari.**, an e-commerce platform offering augmented reality (AR) virtual try-ons on uploaded user images for cosmetics directly in the browser.

---

## 1. System Overview

mari. is a client-side virtual try-on system designed for seamless cosmetic exploration. By utilizing edge-based facial landmark tracking, the system overlays realistic cosmetic textures (e.g., lipsticks, lip glosses, and makeup shades) directly onto uploaded photos.

* **Frontend**: Next.js 16 (TypeScript) + Tailwind CSS
* **Engine**: MediaPipe Vision AI (Face Landmarker Model)
* **State Management**: Redux Toolkit + URL Search Parameter State
* **Rendering**: HTML5 Canvas 2D Context API

---

## 2. Detection & Overlay Pipeline

The virtual try-on system processes uploaded images through a lightweight, multi-stage client pipeline:

### The Logic Flow:

1. **Extraction**: MediaPipe Face Landmarker identifies 3D facial coordinates directly from the uploaded photo.
2. **Segmentation**: Specific index regions (e.g., upper and lower lip contours) are mapped into closed polygonal paths.
3. **Canvas Blending**: Selected product colors are dynamically blended over target coordinates using composite alpha channels and canvas fill operations.
4. **State Synchronization**: Selected shades and product metadata sync across the application via Redux Toolkit and URL search params.

---

## 3. Feature Matrix

The engine uses targeted rendering modes to deliver accurate cosmetic overlays on static photos:

| Feature | Description | Performance / Precision |
| --- | --- | --- |
| **Lip Contour Segmentation** | Tracks inner and outer lip boundaries using MediaPipe Face Landmarker points. | High Precision |
| **Color & Opacity Blending** | Applies custom RGB shades with dynamic alpha masking onto the canvas layer. | Instant Rendering |
| **Lighting & Tone Adjustments** | Adjusts color intensity based on photo lighting parameters. | High |

---

## 4. Development Status & Roadmap

* [x] MediaPipe Face Landmarker Integration for Static Photo Uploads
* [x] HTML5 Canvas Overlay & Blending Logic
* [x] Redux Toolkit Setup for Global Application State
* [x] Responsive Product Catalog & Collections Page (`/collections`)
* [x] Interactive Shade Selection & Cart Management
* [] Suspense-Wrapped Dynamic URL Routing for SSR Compatibility
* [ ] **WebGL Shader Engine**: WebGL integration to simulate complex light reflections, high-gloss, and specular shine finishes.
* [ ] **User Authentication (Supabase)**: Implement Supabase Auth for user accounts, saved try-on sessions, and user profiles.
* [ ] **State Persistence (Redux Persist / Supabase)**: Persist shopping cart and try-on state across page refreshes and user sessions.

---

## 5. Setup

```bash
git clone https://github.com/amariee19/mari.git
cd mari
npm install
npm run dev

```

Open `http://localhost:3000` with your browser to see the result.

---

## 6. Demo

[https://github.com/user-attachments/assets/ae8a69f7-4a1e-4098-bbee-f51ebc8c16c9](https://github.com/user-attachments/assets/ae8a69f7-4a1e-4098-bbee-f51ebc8c16c9)
