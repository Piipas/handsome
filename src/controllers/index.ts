import { NextFunction, Request, Response } from "express";

export const home = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query;
    res.render("index.twig", { name });
};
