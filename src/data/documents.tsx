import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

var FileSaver = require("file-saver");
// import html2PDF from "jspdf-html2canvas";

export async function getAll(userId: string, token: string, mode: boolean) {
  var query = `query Docs($userId: String, $mode: Boolean) {
    docs(userId: $userId, mode: $mode)
  }`;

  return await fetch(`http://localhost:1337/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ query, variables: { userId, mode } }),
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

  return await fetch(`http://localhost:1337/docs/getSpecific`, {
    method: "POST",
    body: input,
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
    },
  })
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

  return await fetch(`http://localhost:1337/docs/update`, {
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

  return await fetch(`http://localhost:1337/docs/addUser`, {
    method: "PUT",
    body: input,
    headers: {
      "content-type": "application/json",
      "x-access-token": token,
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
    `http://localhost:1337/mail/send/${mail + "&" + documentId}`,
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

export async function create(userId: string, token: string, mode: boolean) {
  let input = JSON.stringify({
    title: "New document",
    text: "",
    userId: userId,
    mode: mode,
  });

  return await fetch(`http://localhost:1337/docs/create`, {
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
  const doc = new jsPDF("p", "px", [1000, 600]);
  doc.html(text, {
    callback: function () {
      doc.save(title + ".pdf");
    },
    x: 10,
    y: 10,
  });

  // const doc = new jsPDF();
  // doc.text("Hello world!", 10, 10);
  // doc.save("text.pdf");

  // var iframe = document.getElementById("textarea_ifr");
  // console.log(iframe);

  // var body = iframe?.childNodes;
  // console.log(body);

  // if (iframe !== null) {
  //   iframe.onload = function () {
  //     console.log(iframe);

  //     if (iframe !== null) {
  //       html2canvas(iframe, {
  //         useCORS: true,
  //         width: window.screen.availHeight,
  //         height: window.screen.availHeight,
  //         x: 0,
  //         y: 0,
  //       }).then(function (canvas) {
  //         console.log(canvas);
  //         const divImage = canvas.toDataURL("image/png");
  //         const pdf = new jsPDF();
  //         pdf.addImage(divImage, "PNG", 0, 0, 1000, 600);
  //         pdf.save("download.pdf");
  //       });
  //     }
  //   };
  //   // const doc = new jsPDF("p", "px", [1000, 600]);
  // }

  // var parent = document.createElement("div");
  // parent.innerHTML = text;
  // var children = parent.childNodes;
  // var child = children[0];
  // await html2PDF(child, {
  //   jsPDF: {
  //     format: "a4",
  //   },
  //   output: title + ".pdf",
  // });

  // let input = JSON.stringify({
  //   title: title,
  //   text: text,
  // });

  // let newText = JSON.stringify({
  //   text: text,
  // });

  // console.log(newText);

  // var url = encodeURIComponent(
  //   `http://localhost:1337/docs/createPdf/` + id
  // );

  // await fetch(
  //   "https://www.student.bth.se/~efostud/api-proxy/proxy.php?url=" + url,
  //   {
  //     method: "GET",
  //     // body: input,
  //     // headers: {
  //     //   "content-type": "application/json",
  //     //   "x-access-token": token,
  //     //   // "Access-Control-Allow-Origin": "https://www.student.bth.se",
  //     // },
  //   }
  // ).then((res) => {
  //   return res
  //     .arrayBuffer()
  //     .then((res) => {
  //       console.log(res);

  //       const newBlob = new Blob([res], { type: "application/pdf" });
  //       FileSaver.saveAs(newBlob, title + ".pdf");
  //     })
  //     .catch((e) => alert(e));
  // });
}

export async function executeCode(code: string) {
  let input = JSON.stringify({
    code: btoa(code),
  });

  return await fetch("https://execjs.emilfolino.se/code", {
    method: "POST",
    body: input,
    headers: {
      "content-type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      let decodedOutput = atob(result.data);
      console.log(decodedOutput);
    });
}
