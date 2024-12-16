import { RequestHandler } from "express";
import { ZodIssue, ZodSchema } from "zod";
import { other } from "../api-response/response-handler";

type RequestValidation<TParams, TQuery, TBody, TFiles, TFile> = {
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
  body?: ZodSchema<any>;
  files?: ZodSchema<TFiles>;
  file?: ZodSchema<TFile>;
};

export const validate: <
  TParams = any,
  TQuery = any,
  TBody = any,
  TFiles = any,
  TFile = any,
>(
  _schemas: RequestValidation<TParams, TQuery, TBody, TFiles, TFile>
) => RequestHandler<TParams, any, TBody, TQuery, TFiles> =
  ({ params, query, body, files, file }) =>
  (req, res, next) => {
    const errors: any = [];
    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success) {
        errors.push({ type: "Params", errors: flattenError(parsed.error) });
      }
    }
    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success) {
        errors.push({ type: "Query", errors: flattenError(parsed.error) });
      }
    }
    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success) {
        errors.push({
          type: "Body",
          errors: flattenError(parsed.error),
        });
      }
    }
    // if (files) {
    //   const parsed = files.safeParse(req.files);
    //   if (!parsed.success) {
    //     errors.push({ type: 'Files', errors: parsed.error });
    //   }
    // }

    // if (file) {
    //   const parsed = file.safeParse(req.file);
    //   if (!parsed.success) {
    //     errors.push({ type: 'Files', errors: parsed.error });
    //   }
    // }
    if (errors.length > 0) {
      return other(res, errors);
    }
    return next();
  };

function flattenError(error) {
  return error.flatten((issue: ZodIssue) => ({
    message: issue.message,
    errorCode: issue.code,
  }));
}

// import { Request, Response, NextFunction } from 'express';
// import { ZodSchema, ZodError } from 'zod';

// // Define a custom type for the extended request
// interface ValidatedRequest<T extends ZodSchema> extends Request {
//   validatedBody?: T['_output'];
//   validatedParams?: T['_output'];
//   validatedQuery?: T['_output'];
// }

// // Validation middleware function
// export function validateRequest<T extends ZodSchema>(schema: {
//   body?: T;
//   params?: T;
//   query?: T;
// }) {
//   return (req: ValidatedRequest<T>, res: Response, next: NextFunction) => {
//     try {
//       // Validate body if schema is provided
//       if (schema.body) {
//         req.validatedBody = schema.body.parse(req.body);
//       }

//       // Validate params if schema is provided
//       if (schema.params) {
//         req.validatedParams = schema.params.parse(req.params);
//       }

//       // Validate query if schema is provided
//       if (schema.query) {
//         req.validatedQuery = schema.query.parse(req.query);
//       }

//       next();
//     } catch (error) {
//       // Handle Zod validation errors
//       if (error instanceof ZodError) {
//         return res.status(400).json({
//           error: 'Validation Failed',
//           details: error.errors.map(err => ({
//             path: err.path.join('.'),
//             message: err.message
//           }))
//         });
//       }

//       // Handle other unexpected errors
//       next(error);
//     }
//   };
// }
