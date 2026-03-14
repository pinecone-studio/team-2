import AttendanceTrendChart from './attendanceTrendChart/page';

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-3xl font-semibold tracking-tight">Dash App</h1>
      <AttendanceTrendChart />
    </main>
  );
}
