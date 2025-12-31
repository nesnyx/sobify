import { Injectable } from '@nestjs/common';


@Injectable()
export class NotificationService {

  emit(data: Record<string, any>) {
    return data
  }

  
}
