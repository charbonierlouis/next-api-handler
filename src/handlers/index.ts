import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';

export class ApiHandler {
  private response: NextApiResponse;

  constructor(response: NextApiResponse) {
    this.response = response;
  }

  private generateErrorResponse = (error: AxiosError) => {
    this.response.status(error.response?.status || 500).json(error.response?.data);
  };

  public cacheResponse = (): void => {
    this.response.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate');
  };

  public generateInternalServerResponse = () => {
    this.response.status(500).end('Internal Server Error');
  };

  public generateNotFoundResponse = () => {
    this.response.status(404).end('Not Found');
  };

  public generateMethodNotAllowedResponse = (): void => {
    this.response.status(405).end('Method Not Allowed');
  };

  public generateResponse = <E>(action: E | AxiosError) => {
    if (action instanceof AxiosError) {
      this.generateErrorResponse(action);
    } else {
      this.response.status(200).json(action);
    }
  };
}
