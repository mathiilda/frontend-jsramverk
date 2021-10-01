export async function getAll(userId: string, token: string) {
  return await fetch(
    `https://jsramverk-mabw19.azurewebsites.net/docs/${userId}`,
    {
      headers: {
        "x-access-token": token,
      },
    }
  )
    .then((data) => data.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function getSpecific(id: any, userId: string, token: string) {
  let input = JSON.stringify({
    id: id,
  });

  return await fetch(
    `https://jsramverk-mabw19.azurewebsites.net/docs/getSpecific`,
    {
      method: "POST",
      body: input,
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
    }
  )
    .then((data) => data.json())
    .then(function (data) {
      localStorage.setItem("id", data.data._id);
      localStorage.setItem("text", data.data.text);
      localStorage.setItem("title", data.data.title);

      return data.data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function update(
  id: any,
  title: string,
  text: string,
  userId: string,
  token: string
) {
  let input = JSON.stringify({
    id: id,
    title: title,
    text: text,
    userId: userId,
  });

  return await fetch(`https://jsramverk-mabw19.azurewebsites.net/docs/update`, {
    method: "PUT",
    body: input,
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  })
    .then((data) => data.json())
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function invite(id: any, username: string, token: string) {
  let input = JSON.stringify({
    id: id,
    username: username,
  });

  return await fetch(
    `https://jsramverk-mabw19.azurewebsites.net/docs/addUser`,
    {
      method: "PUT",
      body: input,
      headers: {
        "content-type": "application/json",
        "x-access-token": token,
      },
    }
  )
    .then((data) => data.json())
    .then(function (data) {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function create(userId: string, token: string) {
  let input = JSON.stringify({
    title: "New document",
    text: "",
    userId: userId,
  });

  return await fetch(`https://jsramverk-mabw19.azurewebsites.net/docs/create`, {
    method: "POST",
    body: input,
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  })
    .then((data) => data.json())
    .then(function (data) {
      localStorage.setItem("id", data.id);
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}
