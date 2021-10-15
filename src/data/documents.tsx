var FileSaver = require("file-saver");

export async function getAll(userId: string, token: string) {
  var query = `query Docs($userId: String) {
    docs(userId: $userId)
  }`;

  return await fetch(`https://jsramverk-mabw19.azurewebsites.net/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ query, variables: { userId } }),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.errors) {
        return undefined;
      }
      if (data.data.docs) {
        return JSON.parse(data.data.docs);
      }

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

export async function sendMail(
  mail: string,
  documentId: string,
  token: string
) {
  // let input = JSON.stringify({
  //   recipient: mail,
  //   documentId: documentId,
  // });

  return await fetch(
    `https://jsramverk-mabw19.azurewebsites.net/mail/send/${
      mail + "&" + documentId
    }`,
    {
      method: "GET",
      // body: input,
      // headers: {
      //   "content-type": "application/json",
      //   "x-access-token": token,
      // },
    }
  );
  // .then(function (data) {
  //   console.log("nu skickar jag");

  //   console.log(data);
  //   return "";
  // })
  // .catch((error) => {
  //   console.log(error);
  //   return "";
  // });
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

export async function createPDF(text: string, title: string, token: string) {
  let input = JSON.stringify({
    title: title,
    text: text,
  });

  await fetch("https://jsramverk-mabw19.azurewebsites.net/docs/createPdf", {
    method: "POST",
    body: input,
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
      "Access-Control-Allow-Origin": "https://www.student.bth.se",
    },
  }).then((res) => {
    return res
      .arrayBuffer()
      .then((res) => {
        const newBlob = new Blob([res], { type: "application/pdf" });
        FileSaver.saveAs(newBlob, title + ".pdf");
      })
      .catch((e) => alert(e));
  });
}
