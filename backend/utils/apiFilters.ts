/**
 * @returns - We are returning 'this' from the methods which returns the instance of a class. like when we create using new.
 */

class APIFilters {
  // Room Model
  query: any;
  // Searched querys in an obj
  queryStr: any;

  constructor(query: any, queryStr: any) {
    // Setting the values.
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): APIFilters {
    const location = this.queryStr.location
      ? {
        // If we have location then we will find in db in address field.
          address: {
            $regex: this.queryStr.location,
            $options: "i", // Case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...location });
    return this;
  }
}

export default APIFilters;

// When we will create instance of this class using new keyword we will pass query (model) and queryStr {queryParams} to this.
// And constructor() will assign this values accordingly.
// If we are calling search() for location - It will check is location there in queryStr.
// If that is there then we are returning the object with which we are applying filter and if not the empty object.
// regex will search the query in address.