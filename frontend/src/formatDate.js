const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-GB', options); // dd-mm-yy format
};

module.exports = formatDate;
