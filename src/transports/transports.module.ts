import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from '../config';

const commonModules = [
    ClientsModule.register([
        {
            name: NATS_SERVICE,
            transport: Transport.NATS,
            options: {
                servers: envs.natsServers
            }
        }
    ],
    ),
]

@Module({
    imports: commonModules,
    exports: commonModules,
})
export class TransportsModule { }
