import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export function microserviceOptions({
  brokerURL,
  queue,
}: {
  brokerURL: string;
  queue: string;
}): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [brokerURL],
      queue,
      queueOptions: { durable: true },
    },
  };
}
