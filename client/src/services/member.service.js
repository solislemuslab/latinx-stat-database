import http from "../http-common";

class MemberDataService {
  getAll() {
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

  deleteAll() {
    return http.delete(`/members`);
  }

  findByKeyword(keyword) {
    return http.get(`/members?keywords=${keyword}`);
  }
}

export default new MemberDataService();
