// components/ContrastChecker.tsx

import React from 'react';

import { CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { AlertCircle, Check, Info } from 'lucide-react';

type ContrastCheckerProps = {
  textColor: string;
  bgColor: string;
};

const hexToLuminance = (hex: string): number => {
  const rgb = hex
    .replace('#', '')
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16) / 255);

  if (!rgb || rgb.length !== 3) return 0;

  const [r, g, b] = rgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const getContrastRatio = (hex1: string, hex2: string): number => {
  const lum1 = hexToLuminance(hex1);
  const lum2 = hexToLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return +((lighter + 0.05) / (darker + 0.05)).toFixed(2);
};

export function ContrastChecker({ textColor, bgColor }: ContrastCheckerProps) {
  const contrastRatio = getContrastRatio(textColor, bgColor);
  const passes = contrastRatio > 3;
  const neutral = contrastRatio === 3;

  return (
    <CardContent className="flex flex-col items-center space-y-4 p-4 border border-gray-300 shadow-xs mt-4 rounded-lg">
      <div className="text-5xl font-semibold">{contrastRatio.toFixed(2)}:1</div>
      <Badge
        variant={passes ? 'default' : neutral ? 'secondary' : 'destructive'}
        className={`inline-flex items-center gap-1 ${
          passes ? 'bg-green-400' : neutral ? 'bg-yellow-400' : 'bg-red-400'
        }`}
      >
        {passes ? (
          <Check className="h-4 w-4" />
        ) : neutral ? (
          <Info className="h-4 w-4" />
        ) : (
          <AlertCircle className="h-4 w-4" />
        )}
        {passes ? 'Logo Contrast Pass' : 'Logo Contrast Fail'}
      </Badge>
    </CardContent>
  );
}

export default ContrastChecker;
