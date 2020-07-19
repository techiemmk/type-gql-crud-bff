import {Controller, Get, Inject} from "@tsed/common";
import { CONFIG } from '../utils/config.provider';
import { LOGGER } from '../utils/logger';
import { config } from 'process';

@Controller("/health")
export class HealthCheckController {

  constructor(
    @Inject(LOGGER) private readonly logger,
    @Inject(CONFIG) private readonly config,
  ) {}

  @Get()
  get() {
    const serviceName = this.config.get('serviceName');
    this.logger.info('Received request for health check...');
    return "{\"application\": \""+serviceName+"\", \"status\": \"UP\", \"timstamp\": " + Date.now() + "}";
  }
}
