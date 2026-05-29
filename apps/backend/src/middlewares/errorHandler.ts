import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        message: "Validation failed",
        issues: err.issues,
      },
    });
    return;
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  const statusCode =
    typeof message === "string" && message.startsWith("Validation failed")
      ? 400
      : typeof message === "string" && message.includes("cannot find duty")
        ? 404
        : 500;

  res.status(statusCode).json({
    success: false,
    error: {
      message,
    },
  });
};
