'use client';
import React, { useState } from 'react';
import ColorPickerComponent from './ColorPickerComponent';
import ContrastChecker from './ContrastChecker';
import LogoHolder from './LogoHolder';
import { Input } from '@/app/components/ui/input';

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
    <>
      <ContrastChecker textColor={textColor} bgColor={bgColor} />
      <LogoHolder textColor={textColor} bgColor={bgColor} svg={svg} />
      <div className="mt-4">
        <Input type="file" accept=".svg" onChange={handleFileUpload} />
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <ColorPickerComponent
          textColor={textColor}
          bgColor={bgColor}
          setBgColor={setBgColor}
          setTextColor={setTextColor}
        />
      </div>
    </>
  );
}

export default ColorHolder;
