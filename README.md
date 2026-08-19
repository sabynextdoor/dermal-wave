# 🌊 Dermal Wave — AI Skin Analysis Platform

![Node.js Version](https://img.shields.io/badge/Node.js-18+-green) ![Next.js Version](https://img.shields.io/badge/Next.js-14-black) ![License](https://img.shields.io/badge/License-MIT-blue) ![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

Real-time AI Skin Condition Detection System with Dashboard Integration for modern healthcare by saby

TO INSTALL THIS DOWNLOAD THE REPO, INSTALL DEPENDENCIES IN BOTH `backend` AND `frontend` FOLDERS, AND LAUNCH IN VSCODE

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [System Architecture](#-system-architecture)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Detailed Usage](#-detailed-usage)
- [API Integration](#-api-integration)
- [UI Controls & Navigation](#-ui-controls--navigation)
- [Technical Details](#-technical-details)
- [Performance Optimization](#-performance-optimization)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

##  Overview
The Dermal Wave platform is a high-performance, full-stack AI system designed for real-time skin condition detection, mapping, and tracking. Developed to bridge the gap between patients and dermatological care, this system provides:

- Ultra-fast AI analysis with sub-second response times
- Automatic severity grading with visual overlay feedback
- Seamless frontend-to-backend integration for real-time data syncing
- Multi-angle image processing for accurate condition mapping
- Auto-calibration for different lighting conditions and camera qualities

Whether you're tracking chronic skin conditions, guiding preliminary self-diagnosis, or building a telemedicine intake system, Dermal Wave provides the reliability, security, and performance you need.

## ✨ Features

### Core Capabilities
| Feature | Description |
| :--- | :--- |
| 🚀 Real-time Analysis | Sub-500ms processing with optimized Node.js backend |
| 🎯 Multi-Model Detection | Ensemble AI strategies for robust detection across skin tones |
| 🔄 Progress Tracking | Compares current scans against historical "seed" images |
| 📐 Severity Grading | Calculates confidence scores with clear visual indicators |
| 🎨 Visual Overlay | Colored bounding boxes and heatmaps on analyzed regions |
| 🔊 Terminal Feedback | Clear API logs with confidence scores and processing time |
| 🚁 Dashboard Sync | Real-time updates to the user's health dashboard |
| 💻 Cross-Platform | Works with laptop webcams, phone cameras, and file uploads |

### Detection Strategies
The system uses multiple preprocessing techniques to ensure maximum detection accuracy:

1. **Standard RGB** - Fastest analysis for well-lit, clear images
2. **Contrast Enhancement** - Improved feature extraction for poor lighting
3. **Noise Reduction** - Smoothing filters for low-quality camera inputs
4. **Multi-Scale Processing** - Better detection for both close-up and distant shots

### Visual Feedback System
-  **Green Border** - Condition matched, healthy or improving ✓
- 🟧 **Orange Border** - Condition detected, requires monitoring ⚠️
-  **Red Border** - Severe condition detected, professional consultation recommended ❌
- ⬜ **Grey Border** - Processing or analyzing...

## 🎬 Demo
 Dermal_Wave_saby_installation_demo.mp4 

## 📋 Requirements
- Node.js 18.0+
- npm or yarn package manager
- Git
- VSCode (Recommended for development)

## 🔧 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/sabynextdoor/dermalweave.git
cd dermalweave
