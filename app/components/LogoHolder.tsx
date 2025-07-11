import React, { useMemo } from 'react';

interface LogoHolderProps {
  textColor: string;
  bgColor: string;
  svg?: string;
}

function LogoHolder({ textColor, bgColor, svg }: LogoHolderProps) {
  // tint SVG with textColor and scale to 96x96
  const coloredSvgText = useMemo(() => {
    if (!svg) return null;

    return svg
      .replace(/(fill=")([^"]*?)(")/g, (match, prefix, fillValue, suffix) => {
        if (fillValue.includes('none')) {
          return match; // Keep original fill if it contains "none"
        }
        return `${prefix}${textColor}${suffix}`;
      })
      .replace(
        /(stroke=")([^"]*?)(")/g,
        (match, prefix, strokeValue, suffix) => {
          // Check if any fill in the SVG contains "none" to decide stroke behavior
          const hasFillNone =
            svg.includes('fill="none"') || svg.includes("fill='none'");
          if (hasFillNone) {
            return `${prefix}${textColor}${suffix}`; // Apply textColor to stroke when fill is none
          }
          return match; // Keep original stroke when fill has color
        }
      )
      .replace(/(<svg[^>]*?)width="[^"]*"/i, '$1width="96"')
      .replace(/(<svg[^>]*?)height="[^"]*"/i, '$1height="96"');
  }, [svg, textColor]);

  // tint SVG with bgColor and scale to 96x96
  const coloredSvgBg = useMemo(() => {
    if (!svg) return null;
    return svg
      .replace(/(fill=")([^"]*?)(")/g, (match, prefix, fillValue, suffix) => {
        if (fillValue.includes('none')) {
          return match; // Keep original fill if it contains "none"
        }
        return `${prefix}${bgColor}${suffix}`;
      })
      .replace(
        /(stroke=")([^"]*?)(")/g,
        (match, prefix, strokeValue, suffix) => {
          // Check if any fill in the SVG contains "none" to decide stroke behavior
          const hasFillNone =
            svg.includes('fill="none"') || svg.includes("fill='none'");
          if (hasFillNone) {
            return `${prefix}${bgColor}${suffix}`; // Apply textColor to stroke when fill is none
          }
          return match; // Keep original stroke when fill has color
        }
      )
      .replace(/(<svg[^>]*?)width="[^"]*"/i, '$1width="96"')
      .replace(/(<svg[^>]*?)height="[^"]*"/i, '$1height="96"');
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
            className="flex justify-center items-center"
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
            className="lucide lucide-smile-icon lucide-smile"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
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
            className="flex justify-center items-center"
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
            className="lucide lucide-smile-icon lucide-smile"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default LogoHolder;
