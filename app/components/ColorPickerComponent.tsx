'use client';
import React, { useState, useRef, useEffect } from 'react';
import ColorPicker from 'react-pick-color';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, Copy, Repeat2 } from 'lucide-react';

interface ColorPickerProps {
  textColor: string;
  setTextColor: (color: string) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
}

function ColorPickerComponent({
  textColor,
  setTextColor,
  setBgColor,
  bgColor,
}: ColorPickerProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [showTextPicker, setShowTextPicker] = useState(false);
  const [showBgPicker, setShowBgPicker] = useState(false);

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const isLightColor = (color: string) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
  };

  const randomBg = getRandomColor();
  const randomText = isLightColor(randomBg) ? '#000000' : '#FFFFFF';

  useEffect(() => {
    setTextColor(randomText);
    setBgColor(randomBg);
  }, []);

  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (textRef.current && !textRef.current.contains(e.target as Node)) {
        setShowTextPicker(false);
      }
    }
    if (showTextPicker) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [showTextPicker]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (bgRef.current && !bgRef.current.contains(e.target as Node)) {
        setShowBgPicker(false);
      }
    }
    if (showBgPicker) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [showBgPicker]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // add swap handler
  const swapColors = () => {
    setTextColor(bgColor);
    setBgColor(textColor);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        {/* text swatch + floating picker */}

        {/* bg swatch + floating picker */}
        <div className="relative" ref={bgRef}>
          <div
            className="h-12 w-20 rounded-sm border border-gray-300 cursor-pointer"
            style={{ backgroundColor: bgColor }}
            onClick={() => setShowBgPicker((v) => !v)}
          />

          {showBgPicker && (
            <div className="absolute bottom-full mb-2 left-0 z-10">
              <ColorPicker
                hideAlpha
                color={bgColor}
                onChange={(c) => setBgColor(c.hex)}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          {/* <Label htmlFor="bgColor">bgColor</Label> */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(bgColor, 'bgColor')}
            className="h-8 px-2"
          >
            {copied === 'bgColor' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        {/* swap swatch */}
        <div
          className="flex items-center justify-center flex-col mr-3 hover:bg-gray-100 cursor-pointer p-1 rounded-md"
          onClick={swapColors} // ← hook up swap
        >
          <Repeat2 />
          <p className="text-xs">Swap</p>
        </div>

        <div className="relative" ref={textRef}>
          <div
            className="h-12 w-20 border border-gray-300 rounded-sm cursor-pointer"
            style={{ backgroundColor: textColor }}
            onClick={() => setShowTextPicker((v) => !v)}
          />
          {showTextPicker && (
            <div className="absolute bottom-full mb-2 left-0 z-10">
              <ColorPicker
                hideAlpha
                color={textColor}
                onChange={(c) => setTextColor(c.hex)}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
          {/* <Label htmlFor="text">Text Color</Label> */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(textColor, 'text')}
            className="h-8 px-2"
          >
            {copied === 'text' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ColorPickerComponent;
