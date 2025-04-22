'use client';
import React, { useState } from 'react';
import ColorPickerComponent from './ColorPickerComponent';
import ContrastChecker from './ContrastChecker';
import LogoHolder from './LogoHolder';
import { Input } from '@/components/ui/input';

function ColorHolder() {
  const [svg, setSvg] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');

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
    <div>
      <div className="mb-4">
        <Input
          id="picture"
          type="file"
          accept=".svg"
          onChange={handleFileUpload}
        />
      </div>
      <LogoHolder textColor={textColor} bgColor={bgColor} svg={svg} />
      <ContrastChecker textColor={textColor} bgColor={bgColor} />
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
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
  );
}

export default ColorHolder;
