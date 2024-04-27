import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtSecretRequestType } from "@nestjs/jwt";
import { readFile } from "fs/promises";

export const jwtConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async(configService: ConfigService) => {
        let publicKey = await readFile(configService.get<string>("JWT_PUBLIC_KEY_FILE"))
        let privateKey = await readFile(configService.get<string>("JWT_PRIVATE_KEY_FILE"))

        return {
            secretOrKeyProvider: (requestType) => {
                switch (requestType) {
                  case JwtSecretRequestType.SIGN:
                    return privateKey;
                
                  case JwtSecretRequestType.VERIFY:
                    return publicKey;

                  default:
                    break;
                }
            },
            signOptions: {
                expiresIn: "1h",
                algorithm: "ES512",
                issuer: configService.get<string>("JWT_ISSUER"),
                audience: configService.get<string>("JWT_AUDIENCE"),
            }
        }
      
    },
    inject: [ConfigService]
  }