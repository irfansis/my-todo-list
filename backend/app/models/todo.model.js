module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const ToDo = mongoose.model("todo", schema);
    return ToDo;
  };
  