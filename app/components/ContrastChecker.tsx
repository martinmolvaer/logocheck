// components/ContrastChecker.tsx

import React from 'react';

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const WCAG_LEVELS = {
  AA: { normal: 4.5, large: 3 },
  AAA: { normal: 7, large: 4.5 },
};

const validateHexColor = (hex: string) =>
  /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex) ? hex : '#000000';

export function ContrastChecker({ textColor, bgColor }: ContrastCheckerProps) {
  const contrastRatio = getContrastRatio(textColor, bgColor);
  const compliance = {
    AA: contrastRatio >= WCAG_LEVELS.AA.normal,
    AAA: contrastRatio >= WCAG_LEVELS.AAA.normal,
  };
  const fontSize = 16;
  const fontWeight = 400;

  return (
    <CardContent className="space-y-6">
      {/* Contrast Ratio */}
      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
        <div className="text-5xl font-bold mb-2">
          {contrastRatio.toFixed(2)}:1
        </div>
        <div className="flex gap-2">
          <Badge variant={compliance.AA ? 'default' : 'destructive'}>
            {compliance.AA ? 'AA Pass' : 'AA Fail'}
          </Badge>
          <Badge variant={compliance.AAA ? 'default' : 'destructive'}>
            {compliance.AAA ? 'AAA Pass' : 'AAA Fail'}
          </Badge>
        </div>
      </div>

      {/* WCAG Guidelines */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">WCAG 2.1 Guidelines</h3>
        <div className="grid gap-2">
          {[
            {
              level: 'AA',
              label: 'Normal Text (4.5:1)',
              th: WCAG_LEVELS.AA.normal,
            },
            {
              level: 'AA',
              label: 'Large Text (3:1)',
              th: WCAG_LEVELS.AA.large,
            },
            {
              level: 'AAA',
              label: 'Normal Text (7:1)',
              th: WCAG_LEVELS.AAA.normal,
            },
            {
              level: 'AAA',
              label: 'Large Text (4.5:1)',
              th: WCAG_LEVELS.AAA.large,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center p-2 border rounded"
            >
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {item.level === 'AA'
                          ? item.label.includes('Normal')
                            ? 'Normal text is smaller than 18pt (24px), or smaller than 14pt (18.66px) if bold'
                            : 'Large text is at least 18pt (24px), or at least 14pt (18.66px) if bold'
                          : item.label.includes('Normal')
                          ? 'Normal text is smaller than 18pt (24px), or smaller than 14pt (18.66px) if bold'
                          : 'Large text is at least 18pt (24px), or at least 14pt (18.66px) if bold'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span>
                  {item.level}: {item.label}
                </span>
              </div>
              {contrastRatio >= item.th ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Text Preview */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Text Preview</h3>
        <div
          className="p-6 rounded-lg border overflow-hidden"
          style={{
            backgroundColor: validateHexColor(bgColor),
            color: validateHexColor(textColor),
          }}
        >
          <p
            className={`mb-4 transition-all ${
              fontWeight >= 700 ? 'font-bold' : 'font-normal'
            }`}
            style={{ fontSize: `${fontSize}px` }}
          >
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-sm">
            This is an example of smaller body text that would appear in
            paragraphs.
          </p>
        </div>
      </div>
    </CardContent>
  );
}

export default ContrastChecker;
