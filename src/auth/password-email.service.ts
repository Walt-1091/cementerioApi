import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PasswordEmailService {

    private readonly apiKey = process.env.RESEND_API_KEY; 
    private readonly fromEmail = process.env.EMAIL_FROM;
    private readonly fromName = process.env.EMAIL_FROM_NAME;

    constructor(private readonly authService: AuthService, private readonly userService: UsersService) { }

    async sendStaticPassword(toEmail: string): Promise<{ ok: true }> {

        const staticPassword = process.env.STATIC_PASSWORD;
        if (!staticPassword)
            throw new BadRequestException('STATIC_PASSWORD is not configured');

        const user = await this.userService.findByUserByEmail(toEmail);
        if (!user)
            throw new BadRequestException('User not found');

        await this.authService.updatePassword(user.id, staticPassword);

        const payload = {
            from: `${this.fromName} <${this.fromEmail}>`,
            to: [toEmail],
            subject: 'Contraseña de acceso',
            text: `Tu contraseña es: ${staticPassword}\n\nPor seguridad, cámbiala al iniciar sesión.`,
            html: `
                <p>Tu contraseña es:</p>
                <p><b>${staticPassword}</b></p>
                <p>Por seguridad, cámbiala al iniciar sesión.</p>
            `,
        };

        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return { ok: true };
    }
}