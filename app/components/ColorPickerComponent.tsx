'use client';
import React, { useState, useEffect } from 'react';
import ColorPicker from 'react-pick-color';
import { Button } from '@/app/components/ui/button';
import { Check, Copy, Repeat2, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/components/ui/popover';
import { toast } from 'sonner';

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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
    toast.custom(
      (t) => (
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-lg">
          <div
            className="w-8 h-8 rounded border"
            style={{ backgroundColor: text }}
          />
          <div className="flex flex-col">
            <p className="font-medium">Color copied!</p>
            <p className="text-sm text-gray-500">{text}</p>
          </div>
        </div>
      ),
      {
        duration: 2000,
        position: 'bottom-right',
      }
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 bg-white shadow rounded-md p-1 sm:p-2 max-w-full">
      {/* Background Color Picker */}
      <div className="flex items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-[100px] justify-between px-2"
              style={{ backgroundColor: bgColor }}
            >
              <span
                className="truncate text-xs"
                style={{ color: isLightColor(bgColor) ? '#000' : '#fff' }}
              >
                {bgColor}
              </span>
              <ChevronDown color={textColor} className="h-3 w-3 ml-1 " />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-fit" align="start">
            <div className="w-[200px]">
              <ColorPicker
                hideAlpha
                color={bgColor}
                onChange={(c) => setBgColor(c.hex)}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(bgColor, 'bgColor')}
          className="h-8 w-8 p-0"
        >
          {copied === 'bgColor' ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>

      {/* Text Color Picker */}
      <div className="flex items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-[100px] justify-between px-2"
              style={{ backgroundColor: textColor }}
            >
              <span
                className="truncate text-xs"
                style={{ color: isLightColor(textColor) ? '#000' : '#fff' }}
              >
                {textColor}
              </span>
              <ChevronDown color={bgColor} className="h-3 w-3 ml-1" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-fit" align="start">
            <div className="w-[200px]">
              <ColorPicker
                hideAlpha
                color={textColor}
                onChange={(c) => setTextColor(c.hex)}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(textColor, 'text')}
          className="h-8 w-8 p-0"
        >
          {copied === 'text' ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}

export default ColorPickerComponent;
