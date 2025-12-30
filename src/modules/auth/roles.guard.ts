// src/auth/roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [  
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();
        const user = request.user;
        
        // Kalau user belum login atau tidak punya role
        if (!user || !user.role) {
            response
                .status(403)
                .json({
                    success: false,
                    message: 'Forbidden: User role not found or unauthorized',
                });
            return false;
        }

        // Kalau role user tidak termasuk dalam role yang diizinkan
        const hasAccess = requiredRoles.includes(user.role);
        if (!hasAccess) {
            response
                .status(403)
                .json({
                    success: false,
                    message:
                        'Forbidden: You do not have permission to access this resource',
                });
            return false;
        }

        // Kalau semua valid → lanjut ke handler
        return true;
    }
}
