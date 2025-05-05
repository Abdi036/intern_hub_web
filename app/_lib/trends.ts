import { Application } from "./api";

// Get applications submitted in the current month
export function getApplicationsThisMonth(applications: Application[]) {
  const now = new Date();
  return applications.filter((app) => {
    const date = new Date(app.appliedAt);
    return (
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  });
}

// Calculate acceptance rate
export function getAcceptanceRate(applications: Application[]) {
  const total = applications.length;
  const accepted = applications.filter(
    (app) => app.applicationStatus === "accepted"
  ).length;
  return total === 0 ? 0 : Math.round((accepted / total) * 100);
}

// Generate weekly submission trend data
export function getWeeklySubmissionData(applications: Application[]) {
  const data: { week: string; applications: number }[] = [];

  const now = new Date();

  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay() - i * 7);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const count = applications.filter((app) => {
      const appliedDate = new Date(app.appliedAt);
      return appliedDate >= weekStart && appliedDate <= weekEnd;
    }).length;

    data.push({
      week: `Week ${4 - i}`,
      applications: count,
    });
  }

  return data;
}
