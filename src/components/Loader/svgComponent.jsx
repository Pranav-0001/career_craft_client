import React from 'react';

const MySVGComponent = () => {
  const svgStyle = {
    enableBackground: 'new 0 0 612 792'
  };

  const gradientStyles = {
    st0: {
      fill: 'url(#SVGID_1_)'
    },
    st1: {
      fill: 'url(#SVGID_2_)'
    },
    st2: {
      fill: 'url(#SVGID_3_)'
    },
    st3: {
      fill: 'url(#SVGID_4_)'
    }
  };

  return (
    <div>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 612 792" style={svgStyle} xmlSpace="preserve">
        <defs>
          {/* Gradient Definitions */}
          <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="129.5058" y1="695.7537" x2="398.8305" y2="414.5578">
            <stop offset="1.331947e-07" style={{ stopColor: '#E15C47' }} />
            <stop offset="1" style={{ stopColor: '#E9BB4D' }} />
          </linearGradient>
          {/* ... Define other gradients ... */}
        </defs>

        {/* Path Elements */}
        <g>
          <path style={gradientStyles.st0} d="M227.6,549.85..."/>
          <circle style={gradientStyles.st1} cx="307.83" cy="275.52" r="50.82"/>
          <path style={gradientStyles.st2} d="M554.47,182.1..."/>
          <path style={gradientStyles.st3} d="M495.33,201.29..."/>
        </g>
      </svg>
    </div>
  );
};

export default MySVGComponent;
