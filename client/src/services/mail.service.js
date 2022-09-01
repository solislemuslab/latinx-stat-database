import http from "../http-common";

class MailDataService {
  sendEmail() {
    return http.put(`/mail/sendemail`);
  }
}

export default new MailDataService();
