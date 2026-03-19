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
