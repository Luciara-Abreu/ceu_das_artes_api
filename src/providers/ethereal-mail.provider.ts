import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface IMailProvider {
  sendMail(to: string, subject: string, variables: any, path: string): Promise<void>;
}

export class EtherealMailProvider implements IMailProvider {
  private client: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransport();
  }

  private async initializeTransport() {
    try {
      const account = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    } catch (error) {
      console.error('Erro ao criar conta de teste:', error);
    }
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    if (!this.client) {
      console.error('O transporte de email não foi configurado adequadamente.');
      return;
    }

    try {
      const templateFileContent = fs.readFileSync(path).toString('utf-8');
      const templateParse = handlebars.compile(templateFileContent);
      const templateHTML = templateParse(variables);

      const message = await this.client.sendMail({
        to,
        from: 'Céu das Artes <no-replyy@ceu-das-arte.com>',
        subject,
        html: templateHTML,
      });

      console.log('Message sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  }
}
