import { TServerError } from "@/models/ServerErrorRespond";
import { TUser } from "@/models/user";
import { http, HttpResponse } from "msw";
interface LoginRequest {
  username: string;
  password: string;
}
export const handlers = [
  http.post(`${process.env.APIURL}/api/User/login`, async ({ request }) => {
    const { username, password } = (await request.json()) as LoginRequest;

    if (username === "testuser" && password === "password123") {
      return HttpResponse.json({ userId: "1", username: "pipi" } as TUser, {
        status: 200,
      });
    }

    return HttpResponse.json(
      {
        message: "Invalid credentials",
        statusCode: 401,
        detailed: "Email or password wrong",
        type: "Not found",
      } as TServerError,
      { status: 401 }
    );
  }),
];
