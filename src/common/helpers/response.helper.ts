import { HttpStatus } from '@nestjs/common';

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    statusCode?: number;
    error?: any;
}

export class ResponseHelper {
    static success<T>(
        data: T,
        message = 'Request successful',
        statusCode = HttpStatus.OK,
    ): ApiResponse<T> {
        return {
            success: true,
            message,
            data,
            statusCode,
        };
    }

    static created<T>(
        data: T,
        message = 'Resource created successfully',
    ): ApiResponse<T> {
        return {
            success: true,
            message,
            data,
            statusCode: HttpStatus.CREATED,
        };
    }

    static error(
        message = 'Something went wrong',
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
        error?: any,
    ): ApiResponse {
        return {
            success: false,
            message,
            statusCode,
            error,
        };
    }

    static notFound(message = 'Resource not found'): ApiResponse {
        return {
            success: false,
            message,
            statusCode: HttpStatus.NOT_FOUND,
        };
    }

    static unauthorized(message = 'Unauthorized'): ApiResponse {
        return {
            success: false,
            message,
            statusCode: HttpStatus.UNAUTHORIZED,
        };
    }

    static badRequest(message = 'Bad request', error?: any): ApiResponse {
        return {
            success: false,
            message,
            statusCode: HttpStatus.BAD_REQUEST,
            error,
        };
    }
}
