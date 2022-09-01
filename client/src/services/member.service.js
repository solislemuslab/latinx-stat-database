import http from "../http-common";

class MemberDataService {
  getAllVisible() {
    return http.get("/members");
  }

  get(gid) {
    return http.get(`/members/${gid}`);
  }

  create(data) {
    return http.post("/members", data);
  }

  update(gid, data) {
    return http.put(`/members/${gid}`, data);
  }

  delete(gid) {
    return http.delete(`/members/${gid}`);
  }

  findByKeyword(keyword) {
    return http.get(`/members?keywords=${keyword}`);
  }

  getNotApproved() {
    return http.get(`/members?approved=${0}`);
  }

  getApproved() {
    return http.get(`/members?approved=${1}`);
  }
}

export default new MemberDataService();
