export default {
  USER_TYPES: {
    ADMINISTRATOR: 1 << 0,
    SUPPORT_TEAM: 1 << 1,
    FACULTY_COORDINATOR: 1 << 2,
    STUDENT_COORDINATOR: 1 << 3,
  },
  ROUND_STATUS: {
    SCHEDULED: 1,
    ONGOING: 2,
    COMPLETED: 3,
  },
  fonts: {
    sansSerif: "Roboto, sans-serif",
    monospace: "Consolas, monospace",
  },
  colors: {
    accent: "#ffd100",      // Yellow-ish
    highlight: "#ff5800",   // Orange-ish
    black: "#000000",
    dark: "#111111",
    darkGrey: "#aaaaaa",
    lightGrey: "#bbbbbb",
    light: "#f5f5f5",
    white: "#ffffff",
  },
  //server:"https://staging.manipalutsav.com"
  server:"http://localhost:3003"
  //server:"http://192.168.0.220:3003"
};
