class APIService {

    async post(url,params) {
        let token = await localStorage.getItem("Token");
        const data = JSON.stringify(params);
        return fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: data,
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            return response;
          })
          .catch((err) => {
            console.log("mzk", err);
          });
      };
      async get(url) {
        let token = await localStorage.getItem("Token");
    
        return fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          }
          
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            return response;
          })
          .catch((err) => {
            console.log("mzk", err);
          });
      };
      async delete(url) {
        let token = await localStorage.getItem("Token");
    
        return fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          }
          
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            return response;
          })
          .catch((err) => {
            console.log("mzk", err);
          });
      };
      async put(url,params) {
        let token = await localStorage.getItem("Token");
        const data = JSON.stringify(params);
        return fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: data,
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            return response;
          })
          .catch((err) => {
            console.log("mzk", err);
          });
      }

}
let API = new APIService();
export { API}