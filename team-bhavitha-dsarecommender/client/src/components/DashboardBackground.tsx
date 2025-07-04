// components/DashboardBackground.tsx
import Dashboard from "../pages/Dashboard";

const DashboardBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Dashboard asBackground />
    </div>
  );
};

export default DashboardBackground;
