// types.d.ts
declare namespace Express {
  export interface Request {
    context: {
      userId: string;
      userEmail: string;
    }; // Replace `any` with the type of your context
  }
}
