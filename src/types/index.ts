import { Service } from "../services";

export interface ServiceConfig {
  path: string;
  baseUrl: string;
}

type ControllerMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type CotrollerType = 'ENTITY' | 'LIST';

interface ControllerAction {
  method: ControllerMethod;
  type: CotrollerType;
}

export interface ControllerConfig<E> {
  actions: ControllerAction[];
  service: Service<E>;
  cache?: boolean;
  key?: string;
}
