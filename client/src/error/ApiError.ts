class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
  ) {
    super(message);
    super.name = message;
  }
}

export default ApiError;
