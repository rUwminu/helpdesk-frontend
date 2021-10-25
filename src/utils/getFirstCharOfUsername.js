const getFirstCharaterOfUsername = (username) => {
  const FC = username.split(" ");

  return FC[0].slice(0, 1) + FC[1].slice(0, 1);
};

export default getFirstCharaterOfUsername;
