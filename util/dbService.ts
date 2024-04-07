const create = (model: { create: (arg0: any) => any; }, data: any) => model.create(data);
const dbService = {
    create
    
  };    
  
  export default dbService;