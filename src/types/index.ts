import { Service } from '../services';

export interface ServiceConfig {
  path: string;
  baseUrl: string;
}

export type ControllerMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type CotrollerType = 'ENTITY' | 'LIST';

export interface ControllerAction {
  method: ControllerMethod;
}

export interface ControllerConfig<E> {
  actions: ControllerAction[];
  service: Service<E>;
  type: CotrollerType;
  cache?: boolean;
  key?: string;
}
