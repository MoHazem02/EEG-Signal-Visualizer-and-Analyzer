# 🧠 EEG Signal Analyzer & Visualizer

<div align="center">

![EEG Analyzer Banner](https://img.shields.io/badge/EEG-Signal%20Analyzer-blue?style=for-the-badge&logo=react&logoColor=white)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

**A powerful web-based tool for real-time EEG signal visualization, analysis, and frequency domain conversion.**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Demo](#-demo) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Usage](#-usage)
- [CSV File Format](#-csv-file-format)
- [Technical Details](#-technical-details)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

The **EEG Signal Analyzer** is a comprehensive web application designed for neuroscience students, researchers, and enthusiasts to visualize and analyze electroencephalography (EEG) signals. Whether you're working with real brain activity data or simulated signals, this tool provides an intuitive interface for signal processing and frequency analysis.

### Why This Tool?

- 🚀 **No Hardware Required**: Generate realistic EEG-like signals for testing and learning
- 📊 **Real-Time Visualization**: See your data come to life with interactive charts
- 🔬 **FFT Analysis**: Convert time-domain signals to frequency domain instantly
- 💾 **Data Management**: Upload existing CSV files or export your processed data
- ⚡ **Performance Optimized**: Smooth rendering even with large datasets

---

## ✨ Features

### 🎨 Dual Data Source Modes

#### 1. **Generated Signal Mode**
- Simulates realistic EEG patterns with multiple frequency components
- Includes Alpha (8-13 Hz), Beta (13-30 Hz), and Theta (4-8 Hz) waves
- Adds realistic noise for authentic signal appearance
- Perfect for demonstrations and learning

#### 2. **CSV Upload Mode**
- Load your own EEG recordings from CSV files
- Supports standard CSV format (Time, Value)
- Automatic data validation and parsing
- Real-time playback with position tracking

### 🎛️ Interactive Controls

| Control | Description | Range |
|---------|-------------|-------|
| **Speed** | Adjusts signal generation/playback speed | 1% - 100% |
| **Amplitude** | Scales signal strength up or down | 0.1x - 3.0x |
| **Play/Pause** | Start or stop signal visualization | Toggle |
| **Reset** | Clear current data and restart | Button |

### 📈 Visualization Features

#### Time Domain Display
- Real-time signal plotting with smooth animations
- Auto-scaling axes for optimal viewing
- Displays last 200 data points for clarity
- Time (seconds) vs Amplitude (µV) graph

#### Frequency Domain Analysis
- Fast Fourier Transform (FFT) implementation
- Frequency spectrum up to 50 Hz
- Magnitude visualization for each frequency component
- Brain wave band reference guide:
  - **Delta**: 0.5-4 Hz (Deep sleep)
  - **Theta**: 4-8 Hz (Meditation, creativity)
  - **Alpha**: 8-13 Hz (Relaxation, calmness)
  - **Beta**: 13-30 Hz (Active thinking, focus)

### 💾 Data Management

- **Export to CSV**: Download all recorded data points with timestamps
- **Automatic Recording**: Every displayed point is automatically saved
- **File Upload**: Drag and drop or click to upload existing CSV files
- **Data Counter**: Real-time display of recorded sample count

---

## 🖼️ Demo

### Main Interface
<img width="1390" height="960" alt="EEG Signal Analyzer Main Interface" src="https://github.com/user-attachments/assets/7ea5c3c1-2e6e-432b-ac6b-fef32eeaa63f" />

*The main dashboard showing real-time signal generation with control panel*

### Frequency Analysis
<img width="1300" height="504" alt="FFT Frequency Domain Analysis" src="https://github.com/user-attachments/assets/fe380c75-75d6-4197-801a-048b0ab091e0" />

*Frequency domain visualization showing brain wave components*

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eeg-signal-analyzer.git
   cd eeg-signal-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Or using yarn:
   ```bash
   yarn dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Quick Start (One-Line Install)

```bash
git clone https://github.com/MoHazem02/EEG-Signal-Visualizer-and-Analyzer.git && cd eeg-signal-analyzer && npm install && npm run dev
```

---

## 📖 Usage

### Getting Started

#### Option 1: Using Generated Signals

1. Launch the application
2. Ensure "Generated Signal" is selected (default)
3. Click the **Play** button to start signal generation
4. Adjust **Speed** and **Amplitude** sliders to modify the signal
5. Observe both time and frequency domain visualizations
6. Click **Download CSV** to export your data

#### Option 2: Uploading Your Own Data

1. Click on **"Upload CSV File"** button
2. Select your CSV file (must follow the format below)
3. Click **Play** to visualize your uploaded data
4. Use controls to adjust playback speed and signal amplitude
5. Monitor the progress indicator showing current position

### Control Guide

```
🎮 Controls Overview:

▶️  Play/Pause    : Start or stop the signal visualization
🔄  Reset         : Clear all data and restart from beginning
⚡  Speed Slider  : Control generation/playback speed (1-100%)
📊  Amplitude     : Scale signal strength (0.1x - 3.0x)
💾  Download CSV  : Export all recorded data points
📁  Upload CSV    : Load existing EEG data from file
```

### Keyboard Shortcuts (Future Feature)

- `Space` - Play/Pause
- `R` - Reset
- `↑/↓` - Adjust amplitude
- `←/→` - Adjust speed

---

## 📄 CSV File Format

Your CSV file should follow this format for successful upload:

### With Header (Recommended)
```csv
Time,Value
0.00,245.5
0.01,289.3
0.02,320.1
0.03,230.8
0.04,250.2
```

### Without Header
```csv
0.00,245.5
0.01,289.3
0.02,320.1
0.03,230.8
0.04,250.2
```

### Format Requirements

- **Two columns**: Time and Signal Value
- **Time column**: Numeric values in seconds (float or integer)
- **Value column**: Signal amplitude (typically in microvolts)
- **Separator**: Comma (`,`)
- **File extension**: `.csv`
- **Encoding**: UTF-8

### Example Data

Sample CSV files are available in the `/sample-data` directory:
- `sample_alpha_waves.csv` - Alpha wave dominant signal
- `sample_mixed_waves.csv` - Mixed frequency components
- `sample_noisy_signal.csv` - Signal with realistic noise

---

## 🔬 Technical Details

### Signal Generation Algorithm

The generated EEG signal is composed of multiple sine waves representing different brain wave frequencies:

```javascript
Signal(t) = Base + Amplitude × (Alpha + Beta + Theta + Noise)

Where:
- Alpha = 30 × sin(2π × 10 × t)    // 10 Hz
- Beta  = 15 × sin(2π × 20 × t)    // 20 Hz
- Theta = 20 × sin(2π × 6 × t)     // 6 Hz
- Noise = Random(-5, 5)             // Gaussian noise
- Base  = 250 (baseline value)
```

### FFT Implementation

The application uses Discrete Fourier Transform (DFT) for frequency analysis:

- **Sample Size**: Last 128 data points
- **Frequency Resolution**: ~0.78 Hz
- **Frequency Range**: 0-50 Hz
- **Algorithm**: Optimized DFT with complex number arithmetic

### Performance Optimization

- **Windowing**: Displays only last 200 points to maintain smooth rendering
- **Efficient Updates**: Uses React's state management for optimal re-renders
- **Memory Management**: Automatic cleanup of old data points
- **Lazy Loading**: Charts render only when visible

---

## 📁 Project Structure

```
eeg-analyzer/
├── public/                  # Static assets
├── src/
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # React entry point
│   └── index.css           # Global styles
├── sample-data/            # Example CSV files
│   ├── sample_alpha_waves.csv
│   ├── sample_mixed_waves.csv
│   └── sample_noisy_signal.csv
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config (if using)
└── README.md               # This file
```

---

## 🛠️ Technologies Used

### Core Framework
- **React 18.2.0** - UI component library
- **Vite 5.0** - Next-generation frontend tooling

### Visualization
- **Recharts 2.10.3** - Composable charting library
- **Lucide React 0.263.1** - Beautiful icon set

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Additional styling for charts

### Build Tools
- **@vitejs/plugin-react** - React plugin for Vite
- **PostCSS** - CSS transformations
- **Autoprefixer** - CSS vendor prefixing

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. 🐛 **Report Bugs** - Found a bug? Open an issue
2. 💡 **Suggest Features** - Have an idea? We'd love to hear it
3. 📝 **Improve Documentation** - Help make our docs better
4. 🔧 **Submit Pull Requests** - Fix bugs or add features

### Development Workflow

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Code Style Guidelines

- Use **ESLint** for JavaScript linting
- Follow **React best practices**
- Write **descriptive commit messages**
- Add **comments** for complex logic
- Include **tests** for new features

---

---

## 🐛 Known Issues

- Large CSV files (>10,000 points) may cause slight performance lag
- FFT analysis limited to last 128 samples for performance
- Browser storage not used (intentionally) for privacy

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 EEG Signal Analyzer Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

- **Recharts Team** - For the excellent charting library
- **React Community** - For the amazing ecosystem
- **Vite Team** - For blazing fast build tools
- **Contributors** - Thank you to all who have contributed!

---

## 📚 References & Resources

### EEG & Neuroscience
- [Introduction to EEG](https://en.wikipedia.org/wiki/Electroencephalography)
- [Brain Wave Frequencies](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4741268/)
- [FFT in Signal Processing](https://www.dspguide.com/ch8.htm)

### Development Resources
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Recharts Examples](https://recharts.org/en-US/examples)

---

<div align="center">


**Made with ❤️**

</div>