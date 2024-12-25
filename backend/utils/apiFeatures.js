class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.search) {
      const searchQuery = this.queryString.search;
      this.query = this.query.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },  // Search by name
          { city: { $regex: searchQuery, $options: 'i' } },  // Search by city
          { state: { $regex: searchQuery, $options: 'i' } }, // Search by state
        ],
      });
    }
    return this;
  }

  filter() {
    // Add filtering functionality (e.g., by state, regular capacity, etc.)
    if (this.queryString.state) {
      this.query = this.query.find({ state: this.queryString.state });
    }

    if (this.queryString.city) {
      this.query = this.query.find({ city: this.queryString.city });
    }

    if (this.queryString.regular) {
      this.query = this.query.find({ regular: { $gte: this.queryString.regular } });
    }

    if (this.queryString.friday) {
      this.query = this.query.find({ friday: { $gte: this.queryString.friday } });
    }

    return this;
  }

  paginate(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.skip(skip).limit(resultPerPage);

    return this;
  }
}

export default ApiFeatures;
