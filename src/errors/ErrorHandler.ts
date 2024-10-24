import {ZodError} from "zod"

export default function ErrorHandler(error: unknown) {
    if(error instanceof ZodError) {
        const errFormat = error.issues[0].path[0].toString() + " " +
                          error.issues[0].message.toLowerCase();
        return Response.json({ error: errFormat }, { status: 400});
    } else if(error instanceof Error) {
        return Response.json({ error: error.message }, { status: 400});
    } else {
        return Response.json({ error: "Internal Server Error" }, { status: 500});
    }
}

export class CustomError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}