export function AnimatedChart() {
  const dLine = "M 0 150 L 50 120 L 100 80 L 150 90 L 200 70 L 250 90 L 300 50 L 330 70";
  const dArea = `${dLine} L 330 150`;
  return (
    <svg width="330" height="160" className="mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lineGradientBefore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity={1} />
          <stop offset="100%" stopColor="black" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="lineGradientAfter" x1="0" y1="0" x2="100%" y2="0">
          <stop offset="0%" stopColor="ffffff" />
          <stop offset="100%" stopColor="#4BE7AE" />
        </linearGradient>
        <linearGradient id="xaxisGradientBefore" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#262626" stopOpacity={0.2} />
          <stop offset="100%" stopColor="#262626" stopOpacity={1} />
        </linearGradient>
        <linearGradient id="yaxisGradientBefore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#262626" stopOpacity={1} />
          <stop offset="100%" stopColor="#262626" stopOpacity={0.2} />
        </linearGradient>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4BE7AE" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#4BE7AE" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* this is the gray line before hover */}
      <path
        d={dLine}
        stroke="url(#lineGradientBefore)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* this is the green line that animates on hover */}
      <path
        d={dLine}
        stroke="url(#lineGradientAfter)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />
      {/* this is the green area that animates on hover */}
      <path
        className="animated-area"
        d={dArea}
        fill="url(#areaGradient)"
        fillOpacity="0"
        strokeDasharray="1000"
        strokeDashoffset="1000"
      />

      {/* x-axis */}
      <rect x="0" y="150" width="330" height="4" fill="url(#xaxisGradientBefore)" />
      {/* y-axis */}
      <rect x="0" y="0" width="4" height="150" fill="url(#yaxisGradientBefore)" />
    </svg>
  );
}
