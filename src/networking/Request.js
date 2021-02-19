
export default {
  
  // Run HTTP GET request to `url` via fetch API - **throws**
  // `onlyBody` - boolean for whether this method should return the full HTTP
  //              response, or just the response JSON
  async get(url, allowCache = true, onlyBody = true) {
    
    let cache = allowCache ? 'default' : 'reload';
    const options = {
      cache
    };
    
    const response = await this.goFetch(url, options);
    
    if(onlyBody) {
      return response.json();
    } else {
      return response;
    }
  },
  
  // Run HTTP POST request to `url` with `body` data via fetch API - **throws**
  // `onlyBody` - boolean for whether this method should return the full HTTP
  //              response, or just the response JSON
  async post(url, body, onlyBody = true) {
    let bodyStr = "";
    if(body) {
      bodyStr = JSON.stringify(body);
    }
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: bodyStr
    };
    
    const response = await this.goFetch(url, options);
    if(onlyBody) {
      return response.json();
    } else {
      return response;
    }
  },
  
  // Run HTTP PUT request to `url` with `body` data via fetch API - **throws**
  // `onlyBody` - boolean for whether this method should return the full HTTP
  //              response, or just the response JSON
  async put(url, body, onlyBody = true) {
    let bodyStr = "";
    if(body) {
      bodyStr = JSON.stringify(body);
    }
    
    const options = {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
      },
      body: bodyStr
    };
    
    const response = await this.goFetch(url, options);
    
    if(onlyBody) {
      return response.json();
    } else {
      return response;
    }
  },
  
  // Run HTTP DELETE request to `url` with `body` data via fetch API - **throws**
  async del(url) {
    let bodyStr = "";
    
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json",
      },
      body: bodyStr
    };
    
    const response = await this.goFetch(url, options);
    
    return response.status === 204;
  },
  
  
  async goFetch(url, options) {
    
    try {
      const response = await fetch(url, options);  
      return response;
    } catch(err) {
      console.log(`Error fetching with url ${url} and options ${options}: ${err}`)
      throw err;
    }
  },
}
