
export default class Customer {
  
  constructor(obj) {
    if(obj === undefined) {
      this.id = "";
      this.firstName = "";
      this.lastName = "";
      return;
    }
    
    this.id = obj.id;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
  }
}
