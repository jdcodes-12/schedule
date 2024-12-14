export const corsOptions = {
  origin: ['http://localhost:5173'],  // Allow foo.com and its subdomains
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],  // Accepted HTTP methods
  preflightContinue: false,  // CORS should handle the pre-flight response itself
  optionsSuccessStatus: 204,  // Successful preflight response
};