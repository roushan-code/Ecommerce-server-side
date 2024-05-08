class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;  // query in the url means anything after ? for eg- "http://localhost:4000/products?keyword=Rusgulla". so query is keyword=Rusgulla
        this.queryStr = queryStr; // keyword=Rusgulla then quertStr = Rusgulla
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,  // regular expression (Mongodb features)
                $options: "i",                 // options 'i' means 'case insensitive'
            },
        } : {

        };


        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr }

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        // Filter For Price and Rating
        // console.log(queryCopy); 

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        // console.log(queryCopy); 

        return this
    }

    pagination(resultPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

};

module.exports = ApiFeatures;