import { Request, Response, NextFunction } from 'express';
import { uploadCloudinary } from '../../helper/uploadCloudinary.helper';

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body["avatar"] = await uploadCloudinary(req["file"].buffer);
  } catch (error) {
    console.log(error)
  }
  next();
}

export const uploadMultip = async (req: Request, res: Response, next: NextFunction) => {
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


