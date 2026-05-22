import React from 'react';
import Svg, {Circle, Rect, Path, G, Line} from 'react-native-svg';
import {moderateScale} from 'utils/Dimensions';

const LoginIllustration = () => {
  const w = moderateScale(200);
  const h = w * (200 / 240);

  return (
    <Svg viewBox="0 0 240 200" width={w} height={h}>
      {/* Backdrop circles */}
      <Circle cx="120" cy="100" r="82" fill="#EEF4FF" />
      <Circle cx="120" cy="100" r="60" fill="#E0EDFF" />

      {/* Phone body */}
      <Rect x="87" y="38" width="66" height="112" rx="14" fill="white" stroke="#C7DCFF" strokeWidth="2" />
      {/* Notch */}
      <Rect x="108" y="40" width="24" height="7" rx="3.5" fill="#EEF4FF" />
      {/* Screen area */}
      <Rect x="93" y="52" width="54" height="82" rx="6" fill="#F5F9FF" />

      {/* Signal bars */}
      <Rect x="97" y="58" width="3" height="5" rx="1" fill="#1A2D45" opacity="0.35" />
      <Rect x="101.5" y="55" width="3" height="8" rx="1" fill="#1A2D45" opacity="0.6" />
      <Rect x="106" y="52" width="3" height="11" rx="1" fill="#1A2D45" />

      {/* BPM pulse indicators (top-right of screen) */}
      <Circle cx="133" cy="61" r="4" fill="#FF6B9D" opacity="0.8" />
      <Circle cx="141" cy="61" r="3" fill="#FF6B9D" opacity="0.5" />
      <Circle cx="148" cy="61" r="2" fill="#FF6B9D" opacity="0.3" />

      {/* Divider */}
      <Line x1="93" y1="77" x2="147" y2="77" stroke="#E2E8F0" strokeWidth="1" />

      {/* ECG / heartbeat line */}
      <Path
        d="M95,100 L103,100 L107,86 L111,116 L115,86 L119,116 L123,100 L146,100"
        fill="none"
        stroke="#1A2D45"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Glowing dot on ECG peak */}
      <Circle cx="119" cy="116" r="3" fill="#1A2D45" opacity="0.45" />

      {/* Screen bottom divider */}
      <Rect x="93" y="128" width="54" height="1" fill="#E2E8F0" />

      {/* Home indicator bar */}
      <Rect x="110" y="143" width="20" height="3" rx="1.5" fill="#CBD5E1" />

      {/* Floating pill — top right */}
      <G transform="translate(170, 46) rotate(-28)">
        <Rect x="-10" y="-5.5" width="20" height="11" rx="5.5" fill="#E0EDFF" stroke="#1A2D45" strokeWidth="1.5" />
        <Line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#1A2D45" strokeWidth="1.5" />
      </G>

      {/* Floating heart — top left */}
      <Path
        d="M64,50 C64,46.5 67.5,44 70,47 C72.5,44 76,46.5 76,50 C76,53.5 70,58.5 70,58.5 C70,58.5 64,53.5 64,50 Z"
        fill="#FF6B9D"
        opacity="0.8"
      />

      {/* Medical cross — bottom right */}
      <G transform="translate(176, 140)">
        <Rect x="-3" y="-9" width="6" height="18" rx="2.5" fill="#1A2D45" opacity="0.7" />
        <Rect x="-9" y="-3" width="18" height="6" rx="2.5" fill="#1A2D45" opacity="0.7" />
      </G>

      {/* Wifi signal — bottom left */}
      <G transform="translate(60, 138)" opacity="0.65">
        <Path d="M-9,4 Q0,-6 9,4" fill="none" stroke="#4A6FA5" strokeWidth="1.8" strokeLinecap="round" />
        <Path d="M-5.5,1.5 Q0,-4 5.5,1.5" fill="none" stroke="#4A6FA5" strokeWidth="1.8" strokeLinecap="round" />
        <Circle cx="0" cy="4.5" r="2" fill="#4A6FA5" />
      </G>

      {/* Decorative dots */}
      <Circle cx="48" cy="74" r="3" fill="#4A6FA5" opacity="0.45" />
      <Circle cx="193" cy="84" r="2.5" fill="#1A2D45" opacity="0.4" />
      <Circle cx="52" cy="150" r="2" fill="#4A6FA5" opacity="0.35" />
      <Circle cx="185" cy="52" r="2" fill="#0D1825" opacity="0.25" />
      <Circle cx="44" cy="112" r="1.5" fill="#1A2D45" opacity="0.3" />
      <Circle cx="200" cy="120" r="3" fill="#4A6FA5" opacity="0.3" />

      {/* Sparkles */}
      <G transform="translate(90, 25)" opacity="0.5">
        <Line x1="0" y1="-5" x2="0" y2="5" stroke="#1A2D45" strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="-5" y1="0" x2="5" y2="0" stroke="#1A2D45" strokeWidth="1.5" strokeLinecap="round" />
      </G>
      <G transform="translate(155, 18)" opacity="0.4">
        <Line x1="0" y1="-4" x2="0" y2="4" stroke="#4A6FA5" strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="-4" y1="0" x2="4" y2="0" stroke="#4A6FA5" strokeWidth="1.5" strokeLinecap="round" />
      </G>
      <G transform="translate(198, 162)" opacity="0.35">
        <Line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="#1A2D45" strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#1A2D45" strokeWidth="1.5" strokeLinecap="round" />
      </G>
    </Svg>
  );
};

export default LoginIllustration;
