import { Request, Response } from 'express';

export const debug = (request: Request, response: Response) => {
    console.log("Hello World");

    response.status(200).json({
        message: "Hello World",
    });
}
