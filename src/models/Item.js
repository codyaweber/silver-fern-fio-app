
export default class Item {
  
  constructor(obj) {
    if(!obj) {
      this.id = "";
      this.title = "";
      this.cost = (0).toFixed(2);
      return;
    }
    
    

    this.id = obj.id;
    this.title = obj.title;
    this.cost = (Math.round(obj.cost * 100) / 100).toFixed(2);
    this.niceTitle = obj.title.toLowerCase().replace(/\s/g, '');
  }
}
