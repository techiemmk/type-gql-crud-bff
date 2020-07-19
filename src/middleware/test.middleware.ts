import { IMiddleware, Req, Inject, Middleware } from '@tsed/common';
import { LOGGER } from '../utils/logger';
/**
 * This is the middleware class to demonstrate basic middle ware concept in the REST API endpoints
 */
@Middleware()
export class TestMiddleware implements IMiddleware {

    constructor(@Inject(LOGGER) private readonly logger) { }
    
    public async use(
        @Req() request: Req,
    ): Promise<void> {
        this.logger.info('In the test middleware class - request URL - '+request.url);
        return;
    }
}