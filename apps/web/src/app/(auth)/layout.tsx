import { Shield, Sparkles, Users } from 'lucide-react';
import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#FAFAFA] font-sans select-none">
      {/* Halo Background */}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
        style={{
          top: '-85px',
          height: '550px',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%), linear-gradient(to bottom, black 40%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <div
          className="absolute h-[1400px] rounded-[50%]"
          style={{
            width: '160vw',
            left: '-30vw',
          }}
        >
          {/* Soft peach/orange fill inside the arc */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(251,178,120,0.15) 45%, rgba(242,141,54,0.35) 55%, rgba(242,141,54,0.5) 58%, transparent 60.5%)',
              filter: 'blur(8px)',
            }}
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 52%, rgba(17,24,39,0.2) 56%, rgba(17,24,39,0.8) 58.5%, rgba(17,24,39,0.5) 59.7%, transparent 59.8%)',
              filter: 'blur(3px)',
              maskImage:
                'linear-gradient(to right, transparent 10%, black 55%, black 65%, transparent 80%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 10%, black 35%, black 65%, transparent 100%)',
            }}
          />
          {/* Sharp orange outer ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 55%, rgba(242,141,54,0.2) 57%, rgba(242,141,54,0.6) 59%, rgba(242,141,54,1) 59.9%, rgba(242,141,54,1) 60.2%, transparent 60.4%)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '300px',
              height: '600px',
              top: '200px',
              left: '-50px',
              background: '#FAFAFA',
              filter: 'blur(60px)',
              zIndex: 10,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '300px',
              height: '600px',
              top: '200px',
              right: '-50px',
              background: '#FAFAFA',
              filter: 'blur(60px)',
              zIndex: 10,
            }}
          />
        </div>
      </div>
      {/* 2. Content Layer */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1280px] flex-col items-center justify-between px-8 py-20 lg:flex-row lg:px-16">
        {/* Зүүн тал: Текст болон картууд */}
        <div className="flex w-full flex-col justify-center lg:w-1/2">
          <h1 className="mb-14 text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-tight text-[#111827]">
            Welcome to your <br />
            benefits portal
          </h1>

          <div className="max-w-[540px] space-y-4">
            {/* Картууд... */}
            {[
              {
                title: 'Personalized Benefits',
                desc: 'Tailored to you with clear activation.',
                icon: <Sparkles size={24} strokeWidth={2.5} />,
              },
              {
                title: 'Secure & Private',
                desc: 'Protected with enterprise-grade security.',
                icon: <Shield size={24} strokeWidth={2.5} />,
              },
              {
                title: 'HR Support',
                desc: 'Every step of the way with easy activation.',
                icon: <Users size={24} strokeWidth={2.5} />,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 rounded-[20px] bg-[#EEF0F2] p-6 transition-all hover:bg-[#E5E7EB]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#111827] text-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#111827] leading-none mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-[#6B7280] leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-16 w-full lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
