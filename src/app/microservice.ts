export class MicroserviceConfig {
  constructor(
    public serviceKey: string,
    public serviceId: string,
    public basePath: string,
    public hostProvider: string,
    public host: string,
    public port: number,
    public scheme: string,
    public metadata: any,
    public runtime: string,
    public args: string,
    public environment: string,
    public file: FileList,
  ) { }
}
