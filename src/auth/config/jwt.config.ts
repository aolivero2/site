import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtSecretRequestType } from "@nestjs/jwt";
import { readFile } from "fs/promises";

export const jwtConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async(configService: ConfigService) => {
        let publicKey = await readFile(configService.get<string>("JWT_PUBLIC_KEY_FILE"));
        let privateKey = await readFile(configService.get<string>("JWT_PRIVATE_KEY_FILE"));
        let issuer = configService.get<string>("JWT_ISSUER");
        let audience = configService.get<string>("JWT_AUDIENCE");

        return {
            publicKey,
            privateKey,
            signOptions: {
                expiresIn: "1h",
                algorithm: "ES512",
                issuer,
                audience,
            },
            verifyOptions: {
              algorithms: ["ES512"],
              issuer,
              audience,
            }
        }
      
    },
    inject: [ConfigService]
  }