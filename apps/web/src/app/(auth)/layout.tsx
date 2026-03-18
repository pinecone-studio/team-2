

import { Shield, Sparkles, Users } from 'lucide-react';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAFAFA] font-sans select-none">

      {/* <div className="absolute inset-x-0 top-0 z-0 flex justify-center pointer-events-none overflow-hidden h-[400px]">
        <div
          className="relative w-[180%] aspect-[2/1] rounded-[100%] border-t-[5px]"
          style={{

            borderImageSource: 'linear-gradient(180deg, #FB923C 0%, #FFFFFF 50%, #FB923C 100%)',
            borderImageSlice: 1,


            boxShadow: `
        0 -20px 64px -10px rgba(253, 186, 116, 0.8),
        0 -5px 16px -2px rgba(253, 186, 116, 0.4)
      `,

            marginTop: '-25%',
          }}
        >

          <div
            className="absolute inset-0 rounded-[100%]"
            style={{
              background: 'radial-gradient(50% 50% at 50% 0%, rgba(253, 186, 116, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
            }}
          />
        </div>
      </div> */}



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
              { title: 'Personalized Benefits', desc: 'Tailored to you with clear activation.', icon: <Sparkles size={24} strokeWidth={2.5} /> },
              { title: 'Secure & Private', desc: 'Protected with enterprise-grade security.', icon: <Shield size={24} strokeWidth={2.5} /> },
              { title: 'HR Support', desc: 'Every step of the way with easy activation.', icon: <Users size={24} strokeWidth={2.5} /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 rounded-[20px] bg-[#EEF0F2] p-6 transition-all hover:bg-[#E5E7EB]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center text-[#111827] text-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-[#111827] leading-none mb-1">{item.title}</h3>
                  <p className="text-[15px] text-[#6B7280] leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-16 w-full lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}