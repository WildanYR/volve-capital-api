import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { ConnectBotDto } from './dto/connect-bot.dto';
import { LogBotDto } from './dto/log-bot.dto';
import { UpdateStatusBotDto } from './dto/update-status-bot.dto';
import { BotTransactionDto } from './dto/bot-transaction.dto';

@Controller('auto/:botId')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Post('connect')
  connect(@Param('botId') botId: string, @Body() connectBotDto: ConnectBotDto) {
    return this.automationService.connect(botId, connectBotDto);
  }

  @Post('disconnect')
  disconnect(@Param('botId') botId: string) {
    return this.automationService.disconnect(botId);
  }

  @Post('health-check')
  healthCheck(@Param('botId') botId: string) {
    return this.automationService.healthCheck(botId);
  }

  @Post('log')
  log(@Param('botId') botId: string, @Body() logBotDto: LogBotDto) {
    return this.automationService.log(botId, logBotDto);
  }

  @Post('create-account')
  createAccount(
    @Param('botId') botId: string,
    @Body() botTransactionDto: BotTransactionDto,
  ) {
    return this.automationService.createAccount(botId, botTransactionDto);
  }

  @Patch('/status')
  updateStatus(
    @Param('botId') botId: string,
    @Body() updateStatusBotDto: UpdateStatusBotDto,
  ) {
    return this.automationService.updateStatus(
      botId,
      updateStatusBotDto.status,
    );
  }
}
