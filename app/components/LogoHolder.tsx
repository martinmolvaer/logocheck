import React, { useMemo } from 'react';

interface LogoHolderProps {
  textColor: string;
  bgColor: string;
  svg?: string;
}

function LogoHolder({ textColor, bgColor, svg }: LogoHolderProps) {
  // tint SVG with textColor and increase size
  const coloredSvgText = useMemo(() => {
    if (!svg) return null;
    return svg
      .replace(/(fill=")[^"]*(")/g, `$1${textColor}$2`)
      .replace(/(stroke=")[^"]*(")/g, `$1${textColor}$2`)
      .replace(/(width=")[^"]*(")/g, `$1100%$2`)
      .replace(/(height=")[^"]*(")/g, `$1100%$2`);
  }, [svg, textColor]);

  // tint SVG with bgColor and increase size
  const coloredSvgBg = useMemo(() => {
    if (!svg) return null;
    return svg
      .replace(/(fill=")[^"]*(")/g, `$1${bgColor}$2`)
      .replace(/(stroke=")[^"]*(")/g, `$1${bgColor}$2`)
      .replace(/(width=")[^"]*(")/g, `$1100%$2`)
      .replace(/(height=")[^"]*(")/g, `$1100%$2`);
  }, [svg, bgColor]);

  return (
    <div className="flex sm:flex-row flex-col items-center justify-center gap-8">
      <div
        className="shadow-xs border border-gray-300 size-72 rounded-xl flex justify-center items-center p-6"
        style={{ backgroundColor: bgColor }}
      >
        {/* uploaded SVG tinted with textColor */}
        {coloredSvgText ? (
          <div
            className="flex w-24 h-24 justify-center items-center"
            dangerouslySetInnerHTML={{ __html: coloredSvgText }}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke={textColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bird-icon lucide-bird"
          >
            <path d="M16 7h.01" />
            <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
            <path d="m20 7 2 .5-2 .5" />
            <path d="M10 18v3" />
            <path d="M14 17.75V21" />
            <path d="M7 18a6 6 0 0 0 3.84-10.61" />
          </svg>
        )}
      </div>
      <div
        className="size-72 shadow-xs border border-gray-300 rounded-xl flex justify-center items-center p-6"
        style={{ backgroundColor: textColor }}
      >
        {/* uploaded SVG tinted with bgColor */}
        {coloredSvgBg ? (
          <div
            className="flex w-24 h-24 justify-center items-center"
            dangerouslySetInnerHTML={{ __html: coloredSvgBg }}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke={bgColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bird-icon lucide-bird"
          >
            <path d="M16 7h.01" />
            <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
            <path d="m20 7 2 .5-2 .5" />
            <path d="M10 18v3" />
            <path d="M14 17.75V21" />
            <path d="M7 18a6 6 0 0 0 3.84-10.61" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default LogoHolder;
