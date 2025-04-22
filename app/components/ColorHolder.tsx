'use client';
import React, { useState } from 'react';
import ColorPickerComponent from './ColorPickerComponent';
import ContrastChecker from './ContrastChecker';
import LogoHolder from './LogoHolder';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function ColorHolder() {
  const [svg, setSvg] = useState('');
  const [bgColor, setBgColor] = useState('#fefae0');
  const [textColor, setTextColor] = useState('#283618');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSvg(reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ContrastChecker textColor={textColor} bgColor={bgColor} />
      <div>
        <LogoHolder textColor={textColor} bgColor={bgColor} svg={svg} />
        <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
          <Label htmlFor="picture">Upload your logo</Label>
          <Input
            id="picture"
            type="file"
            accept=".svg"
            onChange={handleFileUpload}
          />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
          <div className="bg-white p-2 rounded shadow-md">
            <ColorPickerComponent
              textColor={textColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              setTextColor={setTextColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorHolder;
