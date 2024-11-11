// prisma client

import { PrismaClient } from "@prisma/client";
import environment from "../constants/environment";

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (!environment.isProd) {
    global.prisma = prisma;
}

export const db = prisma;