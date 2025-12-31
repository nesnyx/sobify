import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';


@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  async emit(@Body() data: Record<string, any>) {
    return this.notificationService.emit(data);
  }
}
