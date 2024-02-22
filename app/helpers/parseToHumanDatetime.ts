export const parseToHumanDateTime = (date: Date | undefined) => {
  if (!date) return "Brak daty";
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")} (${date.toLocaleDateString("pl")})`;
};
