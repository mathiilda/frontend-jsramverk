export async function getAll() {
  return await fetch("http://localhost:1337/docs")
    .then((data) => data.json())
    .then((data) => {
      return data.data;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function getSpecific(id: any) {
  return await fetch(`http://localhost:1337/docs/${id}`)
    .then((data) => data.json())
    .then((data) => {
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

export async function update(id: any, title: string, text: string) {
  let input = JSON.stringify({
    id: id,
    title: title,
    text: text,
  });

  console.log(input);

  return await fetch(`http://localhost:1337/docs/update`, {
    method: "PUT",
    body: input,
    headers: {
      "content-type": "application/json",
    },
  })
    .then((data) => data.json())
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function create() {
  let input = JSON.stringify({
    title: "New document",
    text: "",
  });

  return await fetch(`http://localhost:1337/docs/create`, {
    method: "POST",
    body: input,
    headers: {
      "content-type": "application/json",
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
