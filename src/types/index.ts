import { Service } from "../services";

export interface ServiceConfig {
  path: string;
  baseUrl: string;
}

type ControllerMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type CotrollerType = 'ENTITY' | 'LIST';

interface ControllerAction {
  method: ControllerMethod;
}

export interface ControllerConfig<E> {
  actions: ControllerAction[];
  service: Service<E>;
  type: CotrollerType;
  cache?: boolean;
  key?: string;
}
