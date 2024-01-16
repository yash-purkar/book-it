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

  filter(): APIFilters {
    const queryCopy = {...this.queryStr};
    // Remove unwanted queries.
    const removeQueries = ['location','page'];
    removeQueries.forEach((value) => delete queryCopy[value]);

    // /api/rooms?guestCapacity=3&numOfBeds=2  -> it will find {guestCapacity=3&numOfBeds=2} Both should be match.
    this.query = this.query.find(queryCopy);

    return this;
  }

  pagination(resultPerPage:number): APIFilters{
    const currentPage = this.queryStr?.page || 1;

    const skipCount = resultPerPage * (currentPage - 1);
    /*
    If current page is 2 and resultPerPage is 5 Now I wanna skip first 5 so I will show from 6 to 10. 
    skipCount = 5 * (2 - 1); so it will be 5 so 5 will be skip.
    */

    this.query = this.query.limit(resultPerPage).skip(skipCount);
    return this;
  }
}

export default APIFilters;

// When we will create instance of this class using new keyword we will pass query (model) and queryStr {queryParams} to this.
// And constructor() will assign this values accordingly.
// If we are calling search() for location - It will check is location there in queryStr.
// If that is there then we are returning the object with which we are applying filter and if not the empty object.
// regex will search the query in address. - regex will help us to search in given key not actual match.
// It will find like this find({address:'givenstring'});

