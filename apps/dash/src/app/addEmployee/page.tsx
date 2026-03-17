// 'use client';

// import { useState } from 'react';
// import { gqlRequest } from '../../graphql/helpers/graphql-client';
// import {
//   CreateEmployeeDocument,
//   type CreateEmployeeMutationVariables,
//   type GetEmployeesQuery,
//   EmploymentStatus,
// } from '../../graphql/generated/graphql';

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .ep-root {
//     min-height: 100vh;
//     background: #F9FAFB;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     color: #111827;
//     padding: 40px 24px 80px;
//   }

//   .ep-container {
//     max-width: 660px;
//     margin: 0 auto;
//   }

//   .ep-page-header {
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     margin-bottom: 28px;
//   }
//   .ep-page-title {
//     font-size: 26px;
//     font-weight: 700;
//     color: #111827;
//     letter-spacing: -0.4px;
//     line-height: 1.2;
//   }
//   .ep-page-subtitle {
//     font-size: 14px;
//     color: #6b7280;
//     margin-top: 4px;
//     font-weight: 400;
//   }
//   .ep-demo-btn {
//     flex-shrink: 0;
//     padding: 9px 18px;
//     background: #fff;
//     border: 1.5px solid #e5e7eb;
//     border-radius: 10px;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 13px;
//     font-weight: 600;
//     color: #374151;
//     cursor: pointer;
//     transition: border-color 0.15s, box-shadow 0.15s;
//   }
//   .ep-demo-btn:hover { border-color: #d1d5db; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

//   .ep-card {
//     background: #fff;
//     border: 1px solid #e5e7eb;
//     border-radius: 16px;
//     padding: 28px;
//     margin-bottom: 16px;
//   }

//   .ep-avatar-section-title { font-size: 15px; font-weight: 600; color: #111827; margin-bottom: 4px; }
//   .ep-avatar-section-sub { font-size: 13px; color: #9ca3af; margin-bottom: 20px; }
//   .ep-avatar-row { display: flex; align-items: center; gap: 16px; }
//   .ep-avatar-circle {
//     width: 64px; height: 64px; border-radius: 50%;
//     border: 2px dashed #d1d5db; background: #f9fafb;
//     display: flex; align-items: center; justify-content: center;
//     flex-shrink: 0; color: #d1d5db;
//   }
//   .ep-avatar-circle svg { width: 28px; height: 28px; }
//   .ep-upload-btn {
//     display: flex; align-items: center; gap: 7px;
//     padding: 9px 16px; background: #fff;
//     border: 1.5px solid #e5e7eb; border-radius: 10px;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 13px; font-weight: 600; color: #374151;
//     cursor: pointer; transition: border-color 0.15s;
//   }
//   .ep-upload-btn:hover { border-color: #c7d2fe; }
//   .ep-upload-btn svg { width: 15px; height: 15px; color: #6b7280; }
//   .ep-upload-hint { font-size: 12px; color: #9ca3af; margin-top: 4px; }

//   .ep-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; }
//   .ep-field-full { grid-column: 1 / -1; }
//   .ep-field { display: flex; flex-direction: column; gap: 7px; }

//   .ep-label {
//     font-size: 13.5px; font-weight: 600; color: #374151;
//     display: flex; align-items: center; gap: 3px;
//   }
//   .ep-required { color: #ef4444; }

//   .ep-input-wrap { position: relative; display: flex; align-items: center; }
//   .ep-input-icon {
//     position: absolute; left: 13px; width: 16px; height: 16px;
//     color: #9ca3af; pointer-events: none; flex-shrink: 0;
//   }
//   .ep-input {
//     width: 100%; padding: 10px 13px 10px 38px;
//     background: #f9fafb; border: 1.5px solid #e5e7eb;
//     border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 13.5px; color: #111827; outline: none;
//     transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
//   }
//   .ep-input::placeholder { color: #9ca3af; }
//   .ep-input:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }

//   .ep-select {
//     width: 100%; padding: 10px 36px 10px 38px;
//     background: #f9fafb; border: 1.5px solid #e5e7eb;
//     border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 13.5px; color: #111827; outline: none;
//     appearance: none; cursor: pointer;
//     transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
//   }
//   .ep-select:focus { border-color: #6366f1; background: #fff; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
//   .ep-chevron { position: absolute; right: 11px; width: 16px; height: 16px; color: #9ca3af; pointer-events: none; }

//   .ep-checkbox-row {
//     display: flex; align-items: center; gap: 10px;
//     cursor: pointer; padding: 4px 0; user-select: none;
//   }
//   .ep-checkbox-box {
//     width: 18px; height: 18px; border: 1.5px solid #d1d5db;
//     border-radius: 5px; background: #fff; flex-shrink: 0;
//     display: flex; align-items: center; justify-content: center;
//     cursor: pointer; appearance: none; outline: none;
//     transition: background 0.15s, border-color 0.15s;
//   }
//   .ep-checkbox-box:checked { background: #6366f1; border-color: #6366f1; }
//   .ep-checkbox-box:checked::after {
//     content: ''; display: block; width: 5px; height: 9px;
//     border: 2px solid #fff; border-top: none; border-left: none;
//     transform: rotate(45deg) translate(-1px, -1px);
//   }
//   .ep-checkbox-text { font-size: 13.5px; font-weight: 500; color: #374151; }

//   .ep-divider { height: 1px; background: #f3f4f6; margin: 24px -28px; }

//   .ep-actions { display: flex; justify-content: flex-end; align-items: center; gap: 12px; }
//   .ep-reset-btn {
//     padding: 10px 20px; background: transparent; border: none;
//     font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 14px; font-weight: 500; color: #9ca3af;
//     cursor: pointer; border-radius: 10px; transition: color 0.15s, background 0.15s;
//   }
//   .ep-reset-btn:hover { color: #6b7280; background: #f9fafb; }
//   .ep-submit-btn {
//     padding: 10px 28px; background: #4f46e5; border: none;
//     border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif;
//     font-size: 14px; font-weight: 700; color: #fff; cursor: pointer;
//     transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
//     box-shadow: 0 2px 8px rgba(79,70,229,0.3);
//     display: flex; align-items: center; gap: 7px;
//   }
//   .ep-submit-btn:hover:not(:disabled) { background: #4338ca; box-shadow: 0 4px 14px rgba(79,70,229,0.4); transform: translateY(-1px); }
//   .ep-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

//   .ep-spinner {
//     width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.35);
//     border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite;
//   }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   .ep-error {
//     margin-top: 14px; padding: 11px 16px; background: #fef2f2;
//     border: 1px solid #fecaca; border-radius: 10px;
//     color: #dc2626; font-size: 13px; font-weight: 500;
//   }

//   .ep-results-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; }
//   .ep-results-header {
//     display: flex; align-items: center; justify-content: space-between;
//     padding: 18px 24px; border-bottom: 1px solid #f3f4f6;
//   }
//   .ep-results-title { font-size: 14px; font-weight: 700; color: #111827; }
//   .ep-badge { background: #eef2ff; color: #6366f1; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }
//   .ep-pre {
//     padding: 20px 24px; font-size: 12px; line-height: 1.75;
//     color: #6b7280; overflow-x: auto; white-space: pre; background: #fafafa;
//   }

//   @media (max-width: 520px) {
//     .ep-grid { grid-template-columns: 1fr; }
//     .ep-field-full { grid-column: 1; }
//     .ep-card { padding: 20px; }
//   }
// `;

// const IconUser = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//     <circle cx="12" cy="7" r="4" />
//   </svg>
// );
// const IconMail = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="4" width="20" height="16" rx="2" />
//     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
//   </svg>
// );
// const IconBriefcase = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="7" width="20" height="14" rx="2" />
//     <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//   </svg>
// );
// const IconShield = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//   </svg>
// );
// const IconCalendar = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="4" width="18" height="18" rx="2" />
//     <path d="M16 2v4M8 2v4M3 10h18" />
//   </svg>
// );
// const IconClock = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="12" cy="12" r="10" />
//     <path d="M12 6v6l4 2" />
//   </svg>
// );
// const IconCard = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="5" width="20" height="14" rx="2" />
//     <path d="M2 10h20" />
//   </svg>
// );
// const IconBuilding = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.5"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
//     <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
//     <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
//     <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
//   </svg>
// );
// const IconUpload = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//     <polyline points="17 8 12 3 7 8" />
//     <line x1="12" y1="3" x2="12" y2="15" />
//   </svg>
// );
// const IconChevron = () => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polyline points="6 9 12 15 18 9" />
//   </svg>
// );

// const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];

// export default function Page() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [employees, setEmployees] = useState<GetEmployeesQuery['employees']>(
//     [],
//   );

//   const [form, setForm] = useState<CreateEmployeeMutationVariables['input']>({
//     email: '',
//     name: '',
//     employeeRole: '',
//     department: '',
//     responsibilityLevel: 'L1',
//     employmentStatus: EmploymentStatus.Active,
//     hireDate: '',
//     okrSubmitted: false,
//     lateArrivalCount: 0,
//     clerkUserId: '',
//     createdAt: '',
//   });

//   function update<K extends keyof typeof form>(
//     key: K,
//     value: (typeof form)[K],
//   ) {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   }

//   function resetForm() {
//     setForm({
//       email: '',
//       name: '',
//       employeeRole: '',
//       department: '',
//       responsibilityLevel: 'L1',
//       employmentStatus: EmploymentStatus.Active,
//       hireDate: '',
//       okrSubmitted: false,
//       lateArrivalCount: 0,
//       clerkUserId: '',
//       createdAt: '',
//     });
//     setError('');
//   }

//   function fillDemo() {
//     setForm({
//       email: 'jane.doe@acme.com',
//       name: 'Jane Doe',
//       employeeRole: 'Product Manager',
//       department: 'Product',
//       responsibilityLevel: 'L3',
//       employmentStatus: EmploymentStatus.Active,
//       hireDate: '2024-03-01',
//       okrSubmitted: true,
//       lateArrivalCount: 1,
//       clerkUserId: 'user_demo123456',
//       createdAt: '',
//     });
//   }

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const data = await gqlRequest(CreateEmployeeDocument, {
//         input: { ...form, createdAt: new Date().toISOString() },
//       });
//       setEmployees((prev) => [data.createEmployee, ...prev]);
//     } catch (e: any) {
//       setError(e.message ?? 'Create failed');
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <>
//       <style>{styles}</style>
//       <div className="ep-root">
//         <div className="ep-container">
//           <div className="ep-page-header">
//             <div>
//               <h1 className="ep-page-title">Add New Employee</h1>
//               <p className="ep-page-subtitle">
//                 Complete the form below to register a new staff member.
//               </p>
//             </div>
//             <button className="ep-demo-btn" type="button" onClick={fillDemo}>
//               Demo Button
//             </button>
//           </div>

//           {/* Profile photo */}
//           <div className="ep-card">
//             <div className="ep-avatar-section-title">Profile Photo</div>
//             <div className="ep-avatar-section-sub">
//               Upload a professional photo for the employee profile
//             </div>
//             <div className="ep-avatar-row">
//               <div className="ep-avatar-circle">
//                 <IconUser />
//               </div>
//               <div>
//                 <button className="ep-upload-btn" type="button">
//                   <IconUpload /> Upload Photo
//                 </button>
//                 <div className="ep-upload-hint">JPG, PNG or GIF. Max 5MB</div>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="ep-card">
//             <form onSubmit={onSubmit}>
//               <div className="ep-grid">
//                 <div className="ep-field">
//                   <label className="ep-label">
//                     Full Name <span className="ep-required">*</span>
//                   </label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconUser />
//                     </span>
//                     <input
//                       className="ep-input"
//                       placeholder="Enter legal name"
//                       value={form.name ?? ''}
//                       onChange={(e) => update('name', e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="ep-field">
//                   <label className="ep-label">
//                     Email Address <span className="ep-required">*</span>
//                   </label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconMail />
//                     </span>
//                     <input
//                       className="ep-input"
//                       type="email"
//                       placeholder="email@example.com"
//                       value={form.email ?? ''}
//                       onChange={(e) => update('email', e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="ep-field">
//                   <label className="ep-label">
//                     Employee Role <span className="ep-required">*</span>
//                   </label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconBriefcase />
//                     </span>
//                     <input
//                       className="ep-input"
//                       placeholder="e.g. Project Manager"
//                       value={form.employeeRole ?? ''}
//                       onChange={(e) => update('employeeRole', e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="ep-field">
//                   <label className="ep-label">
//                     Department <span className="ep-required">*</span>
//                   </label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconBuilding />
//                     </span>
//                     <input
//                       className="ep-input"
//                       placeholder="e.g. Marketing"
//                       value={form.department ?? ''}
//                       onChange={(e) => update('department', e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="ep-field">
//                   <label className="ep-label">
//                     Responsibility Level <span className="ep-required">*</span>
//                   </label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconShield />
//                     </span>
//                     <select
//                       className="ep-select"
//                       value={form.responsibilityLevel ?? 'L1'}
//                       onChange={(e) =>
//                         update('responsibilityLevel', e.target.value)
//                       }
//                     >
//                       <option value="">-- Select Grade --</option>
//                       {LEVELS.map((l) => (
//                         <option key={l} value={l}>
//                           {l}
//                         </option>
//                       ))}
//                     </select>
//                     <span className="ep-chevron">
//                       <IconChevron />
//                     </span>
//                   </div>
//                 </div>

//                 <div className="ep-field">
//                   <label className="ep-label">
//                     Employment Status <span className="ep-required">*</span>
//                   </label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconCard />
//                     </span>
//                     <select
//                       className="ep-select"
//                       value={form.employmentStatus ?? EmploymentStatus.Active}
//                       onChange={(e) =>
//                         update(
//                           'employmentStatus',
//                           e.target.value as EmploymentStatus,
//                         )
//                       }
//                     >
//                       {Object.values(EmploymentStatus).map((s) => (
//                         <option key={s} value={s}>
//                           {s.charAt(0) + s.slice(1).toLowerCase()}
//                         </option>
//                       ))}
//                     </select>
//                     <span className="ep-chevron">
//                       <IconChevron />
//                     </span>
//                   </div>
//                 </div>

//                 <div className="ep-field">
//                   <label className="ep-label">
//                     Hire Date <span className="ep-required">*</span>
//                   </label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconCalendar />
//                     </span>
//                     <input
//                       className="ep-input"
//                       type="date"
//                       value={form.hireDate ?? ''}
//                       onChange={(e) => update('hireDate', e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="ep-field">
//                   <label className="ep-label">
//                     Late Arrivals <span className="ep-required">*</span>
//                   </label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconClock />
//                     </span>
//                     <input
//                       className="ep-input"
//                       type="number"
//                       min={0}
//                       placeholder="0"
//                       value={form.lateArrivalCount ?? 0}
//                       onChange={(e) =>
//                         update('lateArrivalCount', Number(e.target.value))
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div className="ep-field ep-field-full">
//                   <label className="ep-label">Clerk User ID</label>
//                   <div className="ep-input-wrap">
//                     <span className="ep-input-icon">
//                       <IconCard />
//                     </span>
//                     <input
//                       className="ep-input"
//                       placeholder="user_..."
//                       value={form.clerkUserId ?? ''}
//                       onChange={(e) => update('clerkUserId', e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="ep-field ep-field-full">
//                   <label className="ep-checkbox-row">
//                     <input
//                       className="ep-checkbox-box"
//                       type="checkbox"
//                       checked={Boolean(form.okrSubmitted)}
//                       onChange={(e) => update('okrSubmitted', e.target.checked)}
//                     />
//                     <span className="ep-checkbox-text">
//                       Current quarter OKRs submitted?
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               <div className="ep-divider" />

//               <div className="ep-actions">
//                 <button
//                   className="ep-reset-btn"
//                   type="button"
//                   onClick={resetForm}
//                   disabled={loading}
//                 >
//                   Reset
//                 </button>
//                 <button
//                   className="ep-submit-btn"
//                   type="submit"
//                   disabled={loading}
//                 >
//                   {loading && <span className="ep-spinner" />}
//                   {loading ? 'Saving...' : 'Add Employee'}
//                 </button>
//               </div>
//             </form>

//             {error && <div className="ep-error">⚠ {error}</div>}
//           </div>

//           {/* {employees.length > 0 && (
//             <div className="ep-results-card">
//               <div className="ep-results-header">
//                 <span className="ep-results-title">Employee Records</span>
//                 <span className="ep-badge">{employees.length} records</span>
//               </div>
//               <pre className="ep-pre">{JSON.stringify(employees, null, 2)}</pre>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </>
//   );
// }

'use client';

import { useState } from 'react';
import { gqlRequest } from '../../graphql/helpers/graphql-client';
import {
  CreateEmployeeDocument,
  type CreateEmployeeMutationVariables,
  type GetEmployeesQuery,
  EmploymentStatus,
} from '../../graphql/generated/graphql';

/* ─── tiny focus helper (inline styles can't do :focus, so we use state) ─── */
function useFieldFocus() {
  const [focused, setFocused] = useState(false);
  return {
    focused,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
}

const focusStyle = {
  borderColor: '#6366f1',
  background: '#fff',
  boxShadow: '0 0 0 3px rgba(99,102,241,0.1)',
} as const;

const baseInputStyle = {
  width: '100%',
  padding: '10px 13px 10px 38px',
  background: '#f9fafb',
  border: '1.5px solid #e5e7eb',
  borderRadius: 10,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: 13.5,
  color: '#111827',
  outline: 'none',
  transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
} as const;

/* ─── focused input wrapper ─── */
function Field({
  label,
  required,
  icon,
  children,
  fullWidth,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        ...(fullWidth ? { gridColumn: '1 / -1' } : {}),
      }}
    >
      <label
        style={{
          fontSize: 13.5,
          fontWeight: 600,
          color: '#374151',
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        <span
          style={{
            position: 'absolute',
            left: 13,
            width: 16,
            height: 16,
            color: '#9ca3af',
            pointerEvents: 'none',
            flexShrink: 0,
          }}
        >
          {icon}
        </span>
        {children}
      </div>
    </div>
  );
}

function FocusInput({
  style,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { focused, onFocus, onBlur } = useFieldFocus();
  return (
    <input
      {...props}
      onFocus={(e) => {
        onFocus();
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        onBlur();
        props.onBlur?.(e);
      }}
      style={{ ...baseInputStyle, ...(focused ? focusStyle : {}), ...style }}
    />
  );
}

function FocusSelect({
  style,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { focused, onFocus, onBlur } = useFieldFocus();
  return (
    <>
      <select
        {...props}
        onFocus={(e) => {
          onFocus();
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          onBlur();
          props.onBlur?.(e);
        }}
        style={{
          width: '100%',
          padding: '10px 36px 10px 38px',
          background: focused ? '#fff' : '#f9fafb',
          border: `1.5px solid ${focused ? '#6366f1' : '#e5e7eb'}`,
          borderRadius: 10,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 13.5,
          color: '#111827',
          outline: 'none',
          appearance: 'none',
          cursor: 'pointer',
          boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
          ...style,
        }}
      >
        {children}
      </select>
      <span
        style={{
          position: 'absolute',
          right: 11,
          width: 16,
          height: 16,
          color: '#9ca3af',
          pointerEvents: 'none',
        }}
      >
        <IconChevron />
      </span>
    </>
  );
}

/* ─── Icons ─── */
const IconUser = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconBriefcase = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconShield = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconCalendar = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const IconClock = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);
const IconCard = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
);
const IconBuilding = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4M10 10h4M10 14h4M10 18h4" />
  </svg>
);
const IconUpload = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const IconChevron = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LEVELS = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState<GetEmployeesQuery['employees']>(
    [],
  );

  const [form, setForm] = useState<CreateEmployeeMutationVariables['input']>({
    email: '',
    name: '',
    employeeRole: '',
    department: '',
    responsibilityLevel: 'L1',
    employmentStatus: EmploymentStatus.Active,
    hireDate: '',
    okrSubmitted: false,
    lateArrivalCount: 0,
    clerkUserId: '',
    createdAt: '',
  });

  function update<K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setForm({
      email: '',
      name: '',
      employeeRole: '',
      department: '',
      responsibilityLevel: 'L1',
      employmentStatus: EmploymentStatus.Active,
      hireDate: '',
      okrSubmitted: false,
      lateArrivalCount: 0,
      clerkUserId: '',
      createdAt: '',
    });
    setError('');
  }

  function fillDemo() {
    setForm({
      email: 'jane.doe@acme.com',
      name: 'Jane Doe',
      employeeRole: 'Product Manager',
      department: 'Product',
      responsibilityLevel: 'L3',
      employmentStatus: EmploymentStatus.Active,
      hireDate: '2024-03-01',
      okrSubmitted: true,
      lateArrivalCount: 1,
      clerkUserId: 'user_demo123456',
      createdAt: '',
    });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await gqlRequest(CreateEmployeeDocument, {
        input: { ...form, createdAt: new Date().toISOString() },
      });
      setEmployees((prev) => [data.createEmployee, ...prev]);
    } catch (e: any) {
      setError(e.message ?? 'Create failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: '#F9FAFB',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#111827',
        padding: '40px 24px',
      }}
    >
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>

      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        {/* Page header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 28,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: '#111827',
                letterSpacing: '-0.4px',
                lineHeight: 1.2,
              }}
            >
              Add New Employee
            </h1>
            <p
              style={{
                fontSize: 14,
                color: '#6b7280',
                marginTop: 4,
                fontWeight: 400,
              }}
            >
              Complete the form below to register a new staff member.
            </p>
          </div>
          <button
            type="button"
            onClick={fillDemo}
            style={{
              flexShrink: 0,
              padding: '9px 18px',
              background: '#fff',
              border: '1.5px solid #e5e7eb',
              borderRadius: 10,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            Fill Demo
          </button>
        </div>

        {/* Profile photo card */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 16,
            padding: 28,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: '#111827',
              marginBottom: 4,
            }}
          >
            Profile Photo
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20 }}>
            Upload a professional photo for the employee profile
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                border: '2px dashed #d1d5db',
                background: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#d1d5db',
              }}
            >
              <div style={{ width: 28, height: 28 }}>
                <IconUser />
              </div>
            </div>
            <div>
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '9px 16px',
                  background: '#fff',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: 10,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#374151',
                  cursor: 'pointer',
                }}
              >
                <div style={{ width: 15, height: 15, color: '#6b7280' }}>
                  <IconUpload />
                </div>
                Upload Photo
              </button>
              <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                JPG, PNG or GIF. Max 5MB
              </div>
            </div>
          </div>
        </div>

        {/* Form card */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 16,
            padding: 28,
            marginBottom: 16,
          }}
        >
          <form onSubmit={onSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px 24px',
              }}
            >
              <Field label="Full Name" required icon={<IconUser />}>
                <FocusInput
                  placeholder="Enter legal name"
                  value={form.name ?? ''}
                  onChange={(e) => update('name', e.target.value)}
                  required
                />
              </Field>

              <Field label="Email Address" required icon={<IconMail />}>
                <FocusInput
                  type="email"
                  placeholder="email@example.com"
                  value={form.email ?? ''}
                  onChange={(e) => update('email', e.target.value)}
                  required
                />
              </Field>

              <Field label="Employee Role" required icon={<IconBriefcase />}>
                <FocusInput
                  placeholder="e.g. Project Manager"
                  value={form.employeeRole ?? ''}
                  onChange={(e) => update('employeeRole', e.target.value)}
                />
              </Field>

              <Field label="Department" required icon={<IconBuilding />}>
                <FocusInput
                  placeholder="e.g. Marketing"
                  value={form.department ?? ''}
                  onChange={(e) => update('department', e.target.value)}
                />
              </Field>

              <Field
                label="Responsibility Level"
                required
                icon={<IconShield />}
              >
                <FocusSelect
                  value={form.responsibilityLevel ?? 'L1'}
                  onChange={(e) =>
                    update('responsibilityLevel', e.target.value)
                  }
                >
                  <option value="">-- Select Grade --</option>
                  {LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </FocusSelect>
              </Field>

              <Field label="Employment Status" required icon={<IconCard />}>
                <FocusSelect
                  value={form.employmentStatus ?? EmploymentStatus.Active}
                  onChange={(e) =>
                    update(
                      'employmentStatus',
                      e.target.value as EmploymentStatus,
                    )
                  }
                >
                  {Object.values(EmploymentStatus).map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0) + s.slice(1).toLowerCase()}
                    </option>
                  ))}
                </FocusSelect>
              </Field>

              <Field label="Hire Date" required icon={<IconCalendar />}>
                <FocusInput
                  type="date"
                  value={form.hireDate ?? ''}
                  onChange={(e) => update('hireDate', e.target.value)}
                />
              </Field>

              <Field label="Late Arrivals" required icon={<IconClock />}>
                <FocusInput
                  type="number"
                  min={0}
                  placeholder="0"
                  value={form.lateArrivalCount ?? 0}
                  onChange={(e) =>
                    update('lateArrivalCount', Number(e.target.value))
                  }
                />
              </Field>

              <Field label="Clerk User ID" icon={<IconCard />} fullWidth>
                <FocusInput
                  placeholder="user_..."
                  value={form.clerkUserId ?? ''}
                  onChange={(e) => update('clerkUserId', e.target.value)}
                />
              </Field>

              {/* OKR checkbox */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    padding: '4px 0',
                    userSelect: 'none',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(form.okrSubmitted)}
                    onChange={(e) => update('okrSubmitted', e.target.checked)}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      cursor: 'pointer',
                      accentColor: '#6366f1',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13.5,
                      fontWeight: 500,
                      color: '#374151',
                    }}
                  >
                    Current quarter OKRs submitted?
                  </span>
                </label>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{ height: 1, background: '#f3f4f6', margin: '24px -28px' }}
            />

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  border: 'none',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#9ca3af',
                  cursor: 'pointer',
                  borderRadius: 10,
                }}
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '10px 28px',
                  background: '#4f46e5',
                  border: 'none',
                  borderRadius: 10,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.55 : 1,
                  boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                }}
              >
                {loading && (
                  <span
                    style={{
                      width: 14,
                      height: 14,
                      border: '2px solid rgba(255,255,255,0.35)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                )}
                {loading ? 'Saving...' : 'Add Employee'}
              </button>
            </div>
          </form>

          {error && (
            <div
              style={{
                marginTop: 14,
                padding: '11px 16px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 10,
                color: '#dc2626',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              ⚠ {error}
            </div>
          )}
        </div>

        {/* Results */}
        {employees.length > 0 && (
          <div
            style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                Employee Records
              </span>
              <span
                style={{
                  background: '#eef2ff',
                  color: '#6366f1',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '3px 10px',
                  borderRadius: 20,
                }}
              >
                {employees.length} records
              </span>
            </div>
            <pre
              style={{
                padding: '20px 24px',
                fontSize: 12,
                lineHeight: 1.75,
                color: '#6b7280',
                overflowX: 'auto',
                whiteSpace: 'pre',
                background: '#fafafa',
              }}
            >
              {JSON.stringify(employees, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
