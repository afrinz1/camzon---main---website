import React from 'react';
import { MapPin } from 'lucide-react';

export const KaramanaMap: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[500px] rounded-2xl overflow-hidden bg-[#e8ecf0] select-none shadow-xl border border-stone-800/40">
      {/* SVG Map Canvas rendering authentic Trivandrum - Nagercoil Hwy / Karamana area */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 540 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle parcel grid pattern */}
          <pattern id="city-blocks" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect x="2" y="2" width="24" height="24" rx="2" fill="#d9e1e7" fillOpacity="0.75" />
            <rect x="30" y="2" width="26" height="14" rx="2" fill="#dfe6ec" fillOpacity="0.65" />
            <rect x="30" y="20" width="16" height="16" rx="2" fill="#d5dee5" fillOpacity="0.6" />
            <rect x="50" y="20" width="8" height="26" rx="2" fill="#dce3ea" fillOpacity="0.7" />
            <rect x="4" y="32" width="22" height="24" rx="2" fill="#dbe3ea" fillOpacity="0.65" />
            <rect x="30" y="40" width="16" height="16" rx="2" fill="#d3dce3" fillOpacity="0.6" />
          </pattern>
          <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Base Background */}
        <rect width="100%" height="100%" fill="#e8edf1" />

        {/* Building blocks / Parcel footprints */}
        <rect width="100%" height="100%" fill="url(#city-blocks)" />

        {/* Secondary residential buildings & plots for realism */}
        <g fill="#d3dde5" fillOpacity="0.8">
          <rect x="20" y="30" width="40" height="28" rx="2" />
          <rect x="70" y="25" width="35" height="35" rx="2" />
          <rect x="120" y="40" width="55" height="30" rx="2" />
          <rect x="190" y="35" width="45" height="40" rx="2" />
          <rect x="250" y="20" width="60" height="30" rx="2" />
          <rect x="330" y="30" width="50" height="45" rx="2" />
          <rect x="400" y="25" width="40" height="35" rx="2" />
          <rect x="460" y="35" width="55" height="40" rx="2" />

          <rect x="25" y="240" width="45" height="35" rx="2" />
          <rect x="80" y="250" width="60" height="40" rx="2" />
          <rect x="155" y="260" width="35" height="30" rx="2" />
          <rect x="200" y="250" width="50" height="45" rx="2" />
          <rect x="260" y="270" width="45" height="35" rx="2" />
          <rect x="320" y="260" width="40" height="40" rx="2" />
          <rect x="375" y="280" width="45" height="30" rx="2" />
          <rect x="435" y="270" width="65" height="40" rx="2" />

          <rect x="30" y="340" width="50" height="45" rx="2" />
          <rect x="95" y="350" width="40" height="35" rx="2" />
          <rect x="145" y="335" width="60" height="50" rx="2" />
          <rect x="220" y="360" width="50" height="40" rx="2" />
          <rect x="280" y="345" width="45" height="45" rx="2" />
          <rect x="340" y="365" width="55" height="35" rx="2" />
          <rect x="410" y="350" width="45" height="40" rx="2" />
          <rect x="470" y="360" width="50" height="45" rx="2" />
        </g>

        {/* --- Minor Street Grid Underlays --- */}
        <g stroke="#cbd5e1" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 40 -10 L 45 180 L 10 320 L 5 510" />
          <path d="M 120 -10 L 115 150 L 150 250 L 140 510" />
          <path d="M 230 -10 L 235 150 L 250 330 L 240 510" />
          <path d="M 370 -10 L 370 140 L 340 310 L 330 510" />
          <path d="M 450 -10 L 460 210 L 440 350 L 430 510" />
          <path d="M -10 60 L 550 50" />
          <path d="M -10 270 L 550 260" />
          <path d="M -10 370 L 550 380" />
          <path d="M -10 440 L 550 435" />
        </g>

        {/* --- White Minor Street Insets --- */}
        <g stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 40 -10 L 45 180 L 10 320 L 5 510" />
          <path d="M 120 -10 L 115 150 L 150 250 L 140 510" />
          <path d="M 230 -10 L 235 150 L 250 330 L 240 510" />
          <path d="M 370 -10 L 370 140 L 340 310 L 330 510" />
          <path d="M 450 -10 L 460 210 L 440 350 L 430 510" />
          <path d="M -10 60 L 550 50" />
          <path d="M -10 270 L 550 260" />
          <path d="M -10 370 L 550 380" />
          <path d="M -10 440 L 550 435" />
        </g>

        {/* --- Named Arterial Roads matching screenshot --- */}
        {/* Vivekananda Ln (slanting left) */}
        <path d="M 12 -10 L 95 180 L 15 360" stroke="#b0bec5" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M 12 -10 L 95 180 L 15 360" stroke="#ffffff" strokeWidth="9" fill="none" strokeLinecap="round" />

        {/* 10th Cross Rd (top right) */}
        <path d="M 430 -10 L 360 160" stroke="#b0bec5" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M 430 -10 L 360 160" stroke="#ffffff" strokeWidth="9" fill="none" strokeLinecap="round" />

        {/* Nedumcaud Rd (slanting towards bottom right) */}
        <path d="M 280 170 L 390 270 L 340 390 L 320 510" stroke="#b0bec5" strokeWidth="14" fill="none" strokeLinecap="round" />
        <path d="M 280 170 L 390 270 L 340 390 L 320 510" stroke="#ffffff" strokeWidth="10" fill="none" strokeLinecap="round" />

        {/* Pallithanam Rd (bottom horizontal connection) */}
        <path d="M 130 405 L 340 390 L 550 420" stroke="#b0bec5" strokeWidth="13" fill="none" strokeLinecap="round" />
        <path d="M 130 405 L 340 390 L 550 420" stroke="#ffffff" strokeWidth="9.5" fill="none" strokeLinecap="round" />

        {/* --- MAIN HIGHWAY: Trivandrum - Nagercoil Hwy --- */}
        {/* Highway casing */}
        <path
          d="M -20 150 C 120 135, 230 170, 560 120"
          stroke="#e0af55"
          strokeWidth="19"
          strokeLinecap="round"
          fill="none"
        />
        {/* Highway yellow fill */}
        <path
          d="M -20 150 C 120 135, 230 170, 560 120"
          stroke="#fed766"
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />

        {/* Highway directional arrows */}
        <g fill="#78716c" opacity="0.6">
          <path d="M 85 142 L 78 138 L 78 146 Z" />
          <path d="M 298 160 L 306 156 L 306 164 Z" />
          <path d="M 465 133 L 473 129 L 473 137 Z" />
        </g>

        {/* --- Street Name Labels (Slanted & Clean) --- */}
        {/* Vivekananda Ln */}
        <text
          x="18"
          y="235"
          transform="rotate(-68 18 235)"
          fill="#52525b"
          fontSize="11"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Vivekananda Ln
        </text>

        {/* 10th Cross Rd */}
        <text
          x="420"
          y="65"
          transform="rotate(65 420 65)"
          fill="#52525b"
          fontSize="10"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          10th Cross Rd
        </text>

        {/* Trivandrum - Nagercoil Hwy */}
        <text
          x="122"
          y="152"
          fill="#3f3f46"
          fontSize="11.5"
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.2px"
        >
          Trivandrum - Nagercoil Hwy
        </text>

        {/* Nedumcaud Rd */}
        <text
          x="395"
          y="320"
          transform="rotate(-70 395 320)"
          fill="#52525b"
          fontSize="10.5"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Nedumcaud Rd
        </text>
        <text
          x="320"
          y="450"
          transform="rotate(-80 320 450)"
          fill="#52525b"
          fontSize="10"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Nedumcaud Rd
        </text>

        {/* Pallithanam Rd */}
        <text
          x="238"
          y="412"
          fill="#52525b"
          fontSize="10"
          fontWeight="600"
          fontFamily="system-ui, sans-serif"
        >
          Pallithanam Rd
        </text>

        {/* --- POI: Muthoot Yamaha Service Center (Top Left) --- */}
        <g transform="translate(112, 115)">
          <circle cx="0" cy="0" r="7.5" fill="#1d4ed8" />
          <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
          <text x="12" y="-3" fill="#475569" fontSize="9.5" fontWeight="600" fontFamily="system-ui, sans-serif">
            Muthoot Yamaha
          </text>
          <text x="12" y="8" fill="#475569" fontSize="9" fontWeight="500" fontFamily="system-ui, sans-serif">
            Service Center
          </text>
          <text x="12" y="18" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">
            മുത്തൂറ്റ് യമഹ
          </text>
          <text x="12" y="27" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">
            സർവീസ് സെന്റർ
          </text>
        </g>

        {/* --- POI: QRS (Center Top) --- */}
        <g transform="translate(318, 142)">
          <circle cx="0" cy="0" r="8" fill="#0284c7" />
          {/* Shopping bag icon inside */}
          <path d="M -3 -2 L 3 -2 L 4 4 L -4 4 Z" fill="#ffffff" />
          <path d="M -2 -2 C -2 -4, 2 -4, 2 -2" stroke="#ffffff" strokeWidth="1" fill="none" />
          <text x="-24" y="0" fill="#0284c7" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">
            QRS
          </text>
        </g>

        {/* --- POI: Hospital (Far Left) --- */}
        <g transform="translate(18, 155)">
          <circle cx="0" cy="0" r="5" fill="#e11d48" />
          <path d="M -2.5 0 L 2.5 0 M 0 -2.5 L 0 2.5" stroke="#ffffff" strokeWidth="1.2" />
          <text x="-5" y="14" fill="#e11d48" fontSize="9" fontWeight="600" fontFamily="system-ui, sans-serif">
            Hospital
          </text>
          <text x="-5" y="23" fill="#be123c" fontSize="8" fontFamily="system-ui, sans-serif">
            കെ എസ്...
          </text>
        </g>

        {/* --- PRIMARY TARGET PIN: NSS Karayogam Hall, Karamana --- */}
        <g transform="translate(240, 195)" filter="url(#pin-shadow)">
          {/* Classic Google Maps Red Marker Pin */}
          <path
            d="M 0 -24 C -7 -24, -12 -19, -12 -12 C -12 -3, 0 0, 0 0 C 0 0, 12 -3, 12 -12 C 12 -19, 7 -24, 0 -24 Z"
            fill="#ea4335"
          />
          <circle cx="0" cy="-13" r="4.5" fill="#7f1d1d" />

          {/* Place Label */}
          <g transform="translate(16, -20)">
            <text x="0" y="0" fill="#b91c1c" fontSize="10.5" fontWeight="bold" fontFamily="system-ui, sans-serif">
              NSS Karayogam
            </text>
            <text x="0" y="11" fill="#b91c1c" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">
              Hall, Karamana
            </text>
            <text x="0" y="21" fill="#b91c1c" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
              എൻ എസ് എസ്
            </text>
            <text x="0" y="29" fill="#b91c1c" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
              കരയോഗം ഹാൾ...
            </text>
          </g>
        </g>
      </svg>

      {/* Floating subtle showroom indicator badge in corner */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-stone-200/80 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#ea4335] animate-ping" />
        <span className="text-[11px] font-semibold text-stone-800">CAMZON Flagship Atelier · Karamana</span>
      </div>
    </div>
  );
};
