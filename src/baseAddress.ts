const offline: boolean = true;

export const baseAddress = offline
  ? "https://localhost:7297"
  : "https://peter-quiz-app.azurewebsites.net";
