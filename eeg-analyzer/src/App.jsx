import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, Pause, Download, RotateCcw } from 'lucide-react';

const EEGSignalAnalyzer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [amplitude, setAmplitude] = useState(1.0);
  const [signalData, setSignalData] = useState([]);
  const [fftData, setFftData] = useState([]);
  const [recordedData, setRecordedData] = useState([]);
  const [uploadedData, setUploadedData] = useState([]);
  const [dataSource, setDataSource] = useState('generated'); // 'generated' or 'uploaded'
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeRef = useRef(0);
  const intervalRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const data = [];

      // Skip header row and parse data
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const values = line.split(',');
          if (values.length >= 2) {
            const time = parseFloat(values[0]);
            const value = parseFloat(values[1]);
            if (!isNaN(time) && !isNaN(value)) {
              data.push({ time: time.toFixed(2), value: value });
            }
          }
        }
      }

      if (data.length > 0) {
        setUploadedData(data);
        setDataSource('uploaded');
        setSignalData([]);
        setRecordedData([]);
        setCurrentIndex(0);
        setIsRunning(false);
        alert(`Successfully loaded ${data.length} data points from CSV!`);
      } else {
        alert('No valid data found in CSV. Please ensure format is: Time,Value');
      }
    };

    reader.readAsText(file);
  };

  const switchToGenerated = () => {
    setDataSource('generated');
    setSignalData([]);
    setRecordedData([]);
    setUploadedData([]);
    setCurrentIndex(0);
    timeRef.current = 0;
    setIsRunning(false);
  };

  // Generate realistic EEG-like signal with multiple frequency components
  const generateEEGSample = (t) => {
    const baseValue = 250;
    // Alpha waves (8-13 Hz)
    const alpha = 30 * Math.sin(2 * Math.PI * 10 * t);
    // Beta waves (13-30 Hz)
    const beta = 15 * Math.sin(2 * Math.PI * 20 * t);
    // Theta waves (4-8 Hz)
    const theta = 20 * Math.sin(2 * Math.PI * 6 * t);
    // Add some noise
    const noise = (Math.random() - 0.5) * 10;
    
    return baseValue + amplitude * (alpha + beta + theta + noise);
  };

  // Simple FFT implementation (DFT for smaller datasets)
  const computeFFT = (data) => {
    const N = Math.min(data.length, 128); // Use last 128 samples
    const samples = data.slice(-N).map(d => d.value);
    const fftResult = [];
    
    for (let k = 0; k < N / 2; k++) {
      let real = 0;
      let imag = 0;
      
      for (let n = 0; n < N; n++) {
        const angle = (2 * Math.PI * k * n) / N;
        real += samples[n] * Math.cos(angle);
        imag -= samples[n] * Math.sin(angle);
      }
      
      const magnitude = Math.sqrt(real * real + imag * imag) / N;
      const frequency = (k * 100) / N; // Assuming 100 Hz sampling rate
      
      if (frequency <= 50) { // Show frequencies up to 50 Hz
        fftResult.push({
          frequency: frequency.toFixed(1),
          magnitude: magnitude.toFixed(2)
        });
      }
    }
    
    return fftResult;
  };

  useEffect(() => {
    if (isRunning) {
      const interval = 100 - speed; // Convert speed to interval (higher speed = lower interval)
      
      intervalRef.current = setInterval(() => {
        if (dataSource === 'generated') {
          // Generate new data
          timeRef.current += 0.01;
          const newValue = generateEEGSample(timeRef.current);
          
          setSignalData(prev => {
            const newData = [...prev, {
              time: timeRef.current.toFixed(2),
              value: newValue
            }];
            
            // Keep only last 200 points for display
            if (newData.length > 200) {
              return newData.slice(-200);
            }
            return newData;
          });
          
          // Record data
          setRecordedData(prev => [...prev, {
            time: timeRef.current.toFixed(2),
            value: newValue
          }]);
        } else if (dataSource === 'uploaded') {
          // Play uploaded data
          if (currentIndex < uploadedData.length) {
            const dataPoint = uploadedData[currentIndex];
            const adjustedValue = 
              parseFloat(dataPoint.value) * amplitude;
            
            setSignalData(prev => {
              const newData = [...prev, {
                time: dataPoint.time,
                value: adjustedValue
              }];
              
              // Keep only last 200 points for display
              if (newData.length > 200) {
                return newData.slice(-200);
              }
              return newData;
            });
            
            setRecordedData(prev => [...prev, {
              time: dataPoint.time,
              value: adjustedValue
            }]);
            
            setCurrentIndex(prev => prev + 1);
          } else {
            // End of uploaded data
            setIsRunning(false);
          }
        }
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, amplitude, dataSource, currentIndex, uploadedData]);

  // Update FFT when signal data changes
  useEffect(() => {
    if (signalData.length > 10) {
      const fft = computeFFT(signalData);
      setFftData(fft);
    }
  }, [signalData]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSignalData([]);
    setRecordedData([]);
    setFftData([]);
    if (dataSource === 'generated') {
      timeRef.current = 0;
    } else {
      setCurrentIndex(0);
    }
  };

  const handleDownload = () => {
    const csvContent = "Time (s),Signal Value\n" + 
      recordedData.map(d => `${d.time},${d.value}`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eeg_recording_${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          EEG Signal Analyzer & Visualizer
        </h1>
        <p className="text-blue-200 text-center mb-8">
          Simulated Brain Activity Monitor with Real-time Analysis
        </p>

        {/* Control Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">Control Panel</h2>
          
          {/* Data Source Selection */}
          <div className="mb-6">
            <label className="block text-white mb-3 font-medium">Data Source</label>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={switchToGenerated}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  dataSource === 'generated'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Generated Signal
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    dataSource === 'uploaded'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Upload CSV File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
            {dataSource === 'uploaded' && uploadedData.length > 0 && (
              <p className="text-green-300 mt-2 text-sm">
                ✓ Loaded {uploadedData.length} data points | Current position: {currentIndex}/{uploadedData.length}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-white mb-2 font-medium">
                Speed: {speed}%
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-2 bg-blue-400/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-white mb-2 font-medium">
                Amplitude: {amplitude.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
                className="w-full h-2 bg-blue-400/30 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-blue-200 mt-1">
                {dataSource === 'uploaded' ? 'Scales uploaded data' : 'Scales generated signal'}
              </p>
            </div>
            
            <div className="flex items-end gap-2">
              <button
                onClick={handlePlayPause}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-colors"
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-white">
            <div>
              <span className="font-semibold">Recorded Samples:</span> {recordedData.length}
            </div>
            <button
              onClick={handleDownload}
              disabled={recordedData.length === 0}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download size={20} />
              Download CSV
            </button>
          </div>
        </div>

        {/* Time Domain Signal */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">
            Time Domain - EEG Signal
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis 
                dataKey="time" 
                stroke="#fff"
                label={{ value: 'Time (s)', position: 'insideBottom', offset: -5, fill: '#fff' }}
              />
              <YAxis 
                stroke="#fff"
                label={{ value: 'Amplitude', angle: -90, position: 'insideLeft', fill: '#fff' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                name="EEG Signal"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Frequency Domain (FFT) */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">
            Frequency Domain - FFT Analysis
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fftData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              <XAxis 
                dataKey="frequency" 
                stroke="#fff"
                label={{ value: 'Frequency (Hz)', position: 'insideBottom', offset: -5, fill: '#fff' }}
              />
              <YAxis 
                stroke="#fff"
                label={{ value: 'Magnitude', angle: -90, position: 'insideLeft', fill: '#fff' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="magnitude" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                name="Frequency Magnitude"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 text-white text-sm">
            <p className="font-semibold mb-2">Brain Wave Frequency Bands:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <div className="bg-white/5 p-2 rounded">
                <span className="font-semibold">Delta:</span> 0.5-4 Hz
              </div>
              <div className="bg-white/5 p-2 rounded">
                <span className="font-semibold">Theta:</span> 4-8 Hz
              </div>
              <div className="bg-white/5 p-2 rounded">
                <span className="font-semibold">Alpha:</span> 8-13 Hz
              </div>
              <div className="bg-white/5 p-2 rounded">
                <span className="font-semibold">Beta:</span> 13-30 Hz
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EEGSignalAnalyzer;