'use client'

import { useState } from 'react'
import CustomCursor from './CustomCursor'

/**
 * CustomCursorDemo - Shows different configurations of the CustomCursor component
 * 
 * This component demonstrates how flexible and reusable the CustomCursor is.
 * You can easily customize colors, sizes, glow intensity, and styles.
 */
export default function CustomCursorDemo() {
  const [currentConfig, setCurrentConfig] = useState({
    color: '#00ffff',
    size: 'md' as 'sm' | 'md' | 'lg',
    tailLength: 8,
    disabled: false
  })

  const colorOptions = [
    { name: 'Cyan', value: '#00ffff' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Green', value: '#10b981' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#ffff00' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Custom Cursor with current configuration */}
      <CustomCursor {...currentConfig} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          ☄️ Comet Cursor Demo
        </h1>

        {/* Configuration Panel */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cursor Configuration</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Comet Color</label>
              <div className="grid grid-cols-2 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setCurrentConfig(prev => ({ ...prev, color: color.value }))}
                    className={`p-2 rounded text-sm transition-all ${
                      currentConfig.color === color.value 
                        ? 'bg-gray-600 ring-2 ring-cyan-400' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    style={{ borderLeft: `4px solid ${color.value}` }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Comet Size</label>
              <div className="space-y-2">
                {(['sm', 'md', 'lg'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setCurrentConfig(prev => ({ ...prev, size }))}
                    className={`w-full p-2 rounded text-sm transition-all ${
                      currentConfig.size === size 
                        ? 'bg-cyan-600' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Tail Length */}
            <div>
              <label className="block text-sm font-medium mb-2">Tail Length</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="3"
                  max="15"
                  value={currentConfig.tailLength}
                  onChange={(e) => setCurrentConfig(prev => ({ ...prev, tailLength: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="text-center text-sm text-gray-300">
                  {currentConfig.tailLength} particles
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Cursor */}
          <div className="mt-6">
            <button
              onClick={() => setCurrentConfig(prev => ({ ...prev, disabled: !prev.disabled }))}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentConfig.disabled 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-cyan-600 hover:bg-cyan-700'
              }`}
            >
              {currentConfig.disabled ? '❌ Enable Comet' : '☄️ Disable Comet'}
            </button>
          </div>
        </div>

        {/* Usage Code Example */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Current Comet Configuration Code:</h3>
          <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-sm">
            <code className="text-cyan-400">
{`<CustomCursor 
  color="${currentConfig.color}"
  size="${currentConfig.size}"
  tailLength={${currentConfig.tailLength}}
  disabled={${currentConfig.disabled}}
/>`}
            </code>
          </pre>
        </div>

        {/* Interactive Test Area */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Test Interactive Elements:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-all">
                Hover me!
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-all">
                Click me!
              </button>
              <a href="#" className="block w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-all text-center">
                Link element
              </a>
            </div>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Type here..." 
                className="w-full bg-gray-700 px-4 py-2 rounded border border-gray-600 focus:border-blue-400 outline-none"
              />
              <textarea 
                placeholder="Textarea..." 
                rows={3}
                className="w-full bg-gray-700 px-4 py-2 rounded border border-gray-600 focus:border-blue-400 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 text-center text-gray-400">
          <p>Move your mouse around to see the comet cursor in action! ☄️</p>
          <p>Watch the beautiful trailing effect as you move the cursor around.</p>
          <p>Hover over buttons and interactive elements to see the comet glow brighter!</p>
        </div>
      </div>
    </div>
  )
}
