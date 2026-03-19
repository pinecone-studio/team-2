// export function SecondaryPagesGradient() {
//   return (
//     // <div className="pointer-events-none absolute inset-0 overflow-hidden">

//     //   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#FB923C_0%,_transparent_30%),radial-gradient(ellipse_at_bottom_right,_#FB923C_0%,_transparent_30%)]" />
//     // </div>
//     <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[45vh] overflow-hidden opacity-80">
//       {/* <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[38vh] overflow-hidden opacity-80"> */}

//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#FB923C_0%,_transparent_30%),radial-gradient(ellipse_at_bottom_right,_#FB923C_0%,_transparent_30%)]" />
//     </div>
//   );
// }

export function SecondaryPagesGradient() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 h-[45vh] overflow-hidden opacity-40">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 100%, #FB923C 0%, transparent 30%),
            radial-gradient(ellipse at 85% 100%, #FB923C 0%, transparent 30%)
          `,
        }}
      />
    </div>
  );
}
