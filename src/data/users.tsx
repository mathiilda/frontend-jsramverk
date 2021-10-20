export async function create(username: string, password: string) {
  let input = JSON.stringify({
    username: username,
    password: password,
  });

  return await fetch(`http://localhost:1337/users/create`, {
    method: "POST",
    body: input,
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then(function (data) {
      localStorage.setItem("userId", data.id);
      return data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function getSpecific(username: string) {
  let input = JSON.stringify({
    username: username,
  });

  return await fetch(`http://localhost:1337/users/getSpecific`, {
    method: "POST",
    body: input,
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then(function (data) {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function login(username: string, password: string) {
  let input = JSON.stringify({
    username: username,
    password: password,
  });

  return await fetch(`http://localhost:1337/users/login`, {
    method: "POST",
    body: input,
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .then(function (data) {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}
