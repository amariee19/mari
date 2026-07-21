
# TryOnCosmetics — Real-Time AR Virtual Try-On Engine

This document details the architecture and feature set of **TryOnCosmetics**, an e-commerce platform offering real-time augmented reality (AR) virtual try-ons for cosmetics directly in the browser.

---

## 1. System Overview

TryOnCosmetics is a privacy-first, client-side virtual try-on system designed for seamless cosmetic exploration. By utilizing edge-based facial landmark tracking, the system overlays realistic cosmetic textures (e.g., lipsticks, lip glosses, and makeup shades) in real time without transmitting user video feeds to external servers.

* **Frontend**: Next.js 16 (TypeScript) + Tailwind CSS
* **Engine**: MediaPipe Vision AI (Face Landmarker)
* **State & UI**: React Suspense + URL Search Parameter State
* **Optimization**: WebGL / Canvas dynamic texture blending

---

## 2. Detection & Overlay Pipeline

The virtual try-on system processes live video feeds through a lightweight, multi-stage client pipeline:

### The Logic Flow:

1. **Extraction**: MediaPipe tracks precise 3D facial landmarks from the webcam feed in real time.
2. **Segmentation**: Specific index regions (e.g., upper and lower lip contours) are mapped into closed polygonal paths.
3. **Shader Blending**: Selected product colors and finishes (matte, satin, gloss) are dynamically blended over the target coordinates using composite alpha channels.
4. **Lighting Correction**: Relative luminance in the bounding box is calculated to adjust color opacity dynamically under varying room lighting.
5. **State Synchronization**: Selected shades and product metadata sync seamlessly with the e-commerce shopping cart and collections filter via URL search params.

---

## 3. Feature Matrix

The engine uses tailored rendering modes to deliver realistic cosmetic simulations:

| Feature | Description | Performance / Precision |
| --- | --- | --- |
| **Lip Contour Segmentation** | Tracks inner and outer lip boundaries across 40+ dedicated landmark points. | High Precision |
| **Texture & Finish Emulation** | Simulates matte, satin, and high-gloss specular highlights dynamically on the canvas layer. | Real-Time |
| **Lighting Compensation** | Adjusts RGB blending values based on real-time surface ambient light estimation. | High |

---

## 4. Privacy & Performance

### Privacy-by-Design

* **Client-Side Execution**: Camera processing runs entirely inside the user's browser; no image or video data ever leaves the local device.
* **Transient Memory Usage**: Frame buffers are cleared immediately after rendering, ensuring zero persistent photo storage.

### Performance Optimization

* **Turbopack Build Strategy**: Next.js App Router architecture with optimized client components and `<Suspense>` boundaries.
* **Decoupled Render Cycle**: Canvas texture drawing is decoupled from heavy React re-renders to maintain 60 FPS output on desktop and mobile devices.

---

## 5. Development Status

* [x] Initial MediaPipe Face Landmarker Integration
* [x] Real-Time Canvas Overlay & Shader Logic
* [x] Responsive Product Catalog & Collections Page (`/collections`)
* [x] **Suspense-Wrapped Dynamic URL Routing**: SSR build compatibility for stateful search queries.
* [x] Interactive Shade Selection & Cart Integration

---

## 6. Setup

```bash
git clone https://github.com/amariee19/mari.git
cd mari
npm install
npm run dev

```

Open `http://localhost:3000` with your browser to see the result.

---

## 7. Demo
