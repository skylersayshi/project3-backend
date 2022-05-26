

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5001;

console.log(CONNECTION_URL)
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

  module.exports = mongoose