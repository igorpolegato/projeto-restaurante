import { Response, Request, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      success: (message: string, data?: any) => void;
      error: (message: string, data?: any) => void;
    }
  }
}

declare module "express-serve-static-core" {
  interface Response {
    success: (message: string, data?: any) => void;
    error: (message: string, data?: any) => void;
  }
}

export function responseFormatter(req: Request, res: Response, next: NextFunction) {
  res.success = (message: string, data: any = null) => {
    res.json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  };

  res.error = (message: string, data: any = null) => {
    let formattedData = data;

    if (data instanceof Error) {
      formattedData = {
        name: data.name,
        message: data.message,
        ...(data as any).errors?.[0] && {
          field: (data as any).errors[0].path,
          value: (data as any).errors[0].value,
        },
      };
    }

    res.status(400).json({
      success: false,
      message,
      data: formattedData,
      timestamp: new Date().toISOString(),
    });
  };

  next();
}
