// 'use client';

// import { useState, useEffect } from 'react';

// export const RepeatingGradient = () => {
//   const [count, setCount] = useState(0);
//   const PILLAR_WIDTH = 76.365;

//   useEffect(() => {
//     const calculateCount = () => {
//       const itemsNeeded = Math.ceil(window.innerWidth / PILLAR_WIDTH);
//       setCount(itemsNeeded);
//     };
//     calculateCount();
//     window.addEventListener('resize', calculateCount);
//     return () => window.removeEventListener('resize', calculateCount);
//   }, []);

//   return (
//     <div className="fixed inset-0 -z-10 w-full h-screen overflow-hidden bg-white">
//       {/* <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden bg-white"> */}
//       <div className="flex w-full h-full opacity-30">
//         {[...Array(count)].map((_, i) => (
//           <div
//             key={i}
//             className="w-20 h-full flex-shrink-0 bg-gradient-to-r from-[#C8C8C8] from-10% via-[#060606C4] via-85% to-[#D9D9D900]"
//           />
//         ))}
//       </div>
//       <div
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
//         style={{
//           width: '1000px',
//           height: '1200px',
//           borderRadius: '50%',
//           background: '#FB923C',
//           filter: 'blur(120px)',
//           // 'multiply' will tint the pillars orange.
//           // 'color' or 'overlay' also works depending on the vibrance you want.
//           //   mixBlendMode: 'overlay',
//           mixBlendMode: 'color',
//         }}
//       />
//       <div
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           background:
//             'radial-gradient(ellipse at center, transparent 0%, white 75%)',
//         }}
//       />
//     </div>
//   );
// };

'use client';

import { useState, useEffect } from 'react';

export const RepeatingGradient = () => {
  const [count, setCount] = useState(0);
  const PILLAR_WIDTH = 76.365;

  useEffect(() => {
    const calculateCount = () => {
      const itemsNeeded = Math.ceil(window.innerWidth / PILLAR_WIDTH);
      setCount(itemsNeeded);
    };
    calculateCount();
    window.addEventListener('resize', calculateCount);
    return () => window.removeEventListener('resize', calculateCount);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-screen overflow-hidden bg-white">
      <div className="flex w-full h-full opacity-30">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="w-20 h-full flex-shrink-0 bg-gradient-to-r from-[#C8C8C8] from-20% via-[#060606C4] via-85% to-[#D9D9D900]"
          />
        ))}
      </div>
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          top: '500px',
          width: '2000px',
          height: '1000px',
          borderRadius: '50%',
          background: '#FB923C',
          filter: 'blur(150px)',

          mixBlendMode: 'color',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, transparent 40%, white 40.1%),
            radial-gradient(circle at center top, transparent 20%, white 85%)
          `,
        }}
      />
    </div>
  );
};
