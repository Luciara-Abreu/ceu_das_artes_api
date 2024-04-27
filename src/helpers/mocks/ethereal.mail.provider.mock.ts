export class EtherealMailProviderMock {
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Simular o envio de e-mail, por exemplo, apenas imprimir os dados do e-mail
    console.log(`Mock Email sent to: ${to}, Subject: ${subject}, Body: ${body}`);
  }
}
