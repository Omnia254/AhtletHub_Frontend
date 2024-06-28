export interface SendEmailCommand {
    mailTo: string;
    subject: string;
    body: string;
    attachments?: FileList;
    messageBodyType: MessageBodyType;
    link?: string;
    linkPlaceHolder?: string;
  }
  
  
export enum MessageBodyType {
    Html = 'Html',
    Text = 'Text'
  }