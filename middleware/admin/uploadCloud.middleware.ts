import { Request, Response, NextFunction } from 'express';
import { uploadCloudinary } from '../../helper/uploadCloudinary.helper';

export const uploadSingle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req["file"]) {
      const link = await uploadCloudinary(req["file"].buffer);
      req.body[req["file"].fieldname] = link;
    }
  } catch (error) {
    console.log(error)
  }
  next();
}

export const uploadMultip = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  for (let key in req["files"]) {
    const links = [];
    for (let item of req["files"][key]) {
      try {
        const link = await uploadCloudinary(item.buffer);
        links.push(link);
      } catch (error) {
        console.log(error);
      }
    }
    req.body[key] = links;
  }
  next();
}


