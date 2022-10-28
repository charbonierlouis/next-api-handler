import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ServiceConfig } from '../types';

export abstract class Service<Type> {
  private config: ServiceConfig;

  constructor(config: ServiceConfig) {
    this.config = config;
  }

  private fetcher = <E>(options: AxiosRequestConfig): Promise<E | AxiosError> =>
    axios
      .request<E>({
        ...options,
        url: this.config.path,
      })
      .then((res: AxiosResponse<E>) => res.data)
      .catch((err: AxiosError) => err);

  public findAll = <E>(options?: AxiosRequestConfig): Promise<E | AxiosError> =>
    this.fetcher({
      method: 'GET',
      baseURL: this.config?.baseUrl || '',
      url: this.config?.path || '',
      ...(options || {}),
    });

  public findOne = <E>(params: string, options?: AxiosRequestConfig): Promise<E | AxiosError> =>
    this.fetcher({
      method: 'GET',
      baseURL: this.config?.baseUrl || '',
      url: `${this.config?.path}/${params}`,
      ...(options || {}),
    });

  public create = <E>(data: Type, options?: AxiosRequestConfig): Promise<E | AxiosError> =>
    this.fetcher({
      method: 'POST',
      baseURL: this.config?.baseUrl || '',
      url: this.config?.path || '',
      data,
      ...(options || {}),
    });

  public update = <E>(params: string, data: Type, options?: AxiosRequestConfig): Promise<E | AxiosError> =>
    this.fetcher({
      method: 'PATCH',
      baseURL: this.config?.baseUrl || '',
      url: `${this.config?.path}/${params}`,
      data,
      ...(options || {}),
    });

  public delete = <E>(params: string, options?: AxiosRequestConfig): Promise<E | AxiosError> =>
    this.fetcher({
      method: 'DELETE',
      baseURL: this.config?.baseUrl || '',
      url: `${this.config?.path}/${params}`,
      ...(options || {}),
    });
}
