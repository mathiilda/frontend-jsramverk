export async function create(text: string) {
  let input = JSON.stringify({
    text: text,
  });

  return await fetch(
    `https://jsramverk-mabw19.azurewebsites.net/comment/create`,
    {
      method: "POST",
      body: input,
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((data) => data.json())
    .then(function (data) {
      return data.id;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}

export async function getSpecific(id: any) {
  let input = JSON.stringify({
    id: id,
  });

  return await fetch(
    `https://jsramverk-mabw19.azurewebsites.net/comment/getSpecific`,
    {
      method: "POST",
      body: input,
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((data) => data.json())
    .then(function (data) {
      return data.data[0].text;
    })
    .catch((error) => {
      console.log(error);
      return "";
    });
}
