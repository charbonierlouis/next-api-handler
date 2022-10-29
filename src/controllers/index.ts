import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiHandler } from '../handlers';
import { ControllerConfig } from '../types';

export class Controller<E> {
  private request: NextApiRequest;
  private config: ControllerConfig<E>;
  private handler: ApiHandler;

  constructor(request: NextApiRequest, response: NextApiResponse, config: ControllerConfig<E>) {
    this.request = request;
    this.handler = new ApiHandler(response);
    this.config = config;
  }

  public generate = async (): Promise<void> => {
    const { method, query, body } = this.request;
    const item = this.config.actions.find((action) => action.method === method);
    const keyParamsIndex = Object.keys(query).findIndex((key) => key === this.config.key);
    if (!item) {
      return this.handler.generateMethodNotAllowedResponse();
    }
    if (this.config.cache) {
      this.handler.cacheResponse();
    }
    switch (method) {
      case 'GET': {
        if (this.config.type === 'LIST') {
          return this.handler.generateResponse(await this.config.service.findAll());
        } else if (this.config.type === 'ENTITY' && keyParamsIndex !== -1) {
          return this.handler.generateResponse(
            await this.config.service.findOne(this.request.query[keyParamsIndex] as string),
          );
        } else {
          this.handler.generateNotFoundResponse();
        }
      }
      case 'POST': {
        return this.handler.generateResponse(await this.config.service.create(body));
      }
      case 'PATCH': {
        return this.handler.generateResponse(
          await this.config.service.update(this.request.query[keyParamsIndex] as string, body),
        );
      }
      case 'DELETE': {
        return this.handler.generateResponse(
          await this.config.service.delete(this.request.query[keyParamsIndex] as string),
        );
      }
      default: {
        return this.handler.generateNotFoundResponse();
      }
    }
  };
}
