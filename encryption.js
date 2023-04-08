let ciphertext;
let iv;
/*
/** */
const handleimportTxtFileForEnc = async () => {
  const geinput = document.querySelector("#textForEnc");
  geinput.value = content;

  return content;
};
/* */
/* */
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
/* */
function getMessageEncoding(classname) {
  const messageBox = document.querySelector(classname);
  let message = messageBox.value;
  let enc = new TextEncoder();
  return enc.encode(message);
}
async function enkripcija(key) {
  let encoded = getMessageEncoding("#textForEnc");
  iv = window.crypto.getRandomValues(new Uint8Array(12));
  ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoded
  );
  const exportedAsString = ab2str(ciphertext);
  const exportedAsBase64 = window.btoa(exportedAsString);

  return exportedAsBase64;
}
/*get user key  and IV*/
async function getUserInputKey() {
  const getKey = document.querySelector(".keyTxt").value;
  console.log("getKey", getKey);
  const jwk = await window.crypto.subtle.importKey(
    "jwk",
    JSON.parse(getKey),
    {
      name: "AES-GCM",
    },
    true,
    ["encrypt", "decrypt"]
  );
  console.log("jwk", jwk);
  return jwk;
}
function getUserInputIV() {
  const getIv = document.querySelector(".ivTxtArea").value;
  const ivEnc = new Uint8Array(getIv.split(",").map((el) => parseInt(el, 10)));
  return ivEnc;
}
/*end of get user key */
/*encryption for user input jwk and iv */
async function encryptionUserInput(keyUser, ivUser) {
  let encoded = getMessageEncoding("#textForEnc");

  ciphertext = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: ivUser,
    },
    keyUser,
    encoded
  );
  const exportedAsString = ab2str(ciphertext);
  const exportedAsBase64 = window.btoa(exportedAsString);

  return exportedAsBase64;
}
/*end of encryption for user input jwkand iv */

/*dodeli kriptovanu vrendost jwk i iv inputima */
const exportDataAsStrJWK = (querySelector, data) => {
  const inputData = document.querySelector(querySelector);
  inputData.value = JSON.stringify(data);

  return inputData.value;
};
const exportDataAsStrIV = (querySelector, data) => {
  const inputData = document.querySelector(querySelector);

  //   inputData.value = ab2str(new Uint8Array(data));
  inputData.value = data.toString();

  console.log(
    "inputData.value = ab2str(new Uint8Array(data));",
    inputData.value
  );
  const exportedAsString = inputData.value;
  const exportedAsBase64 = window.btoa(exportedAsString);
  return exportedAsBase64;
};
/* kraj dodeli kriptovanu vrendost jwk i iv inputima */
/*exporting file */
const btnExportTextForEnc = document.querySelector(".hajde");
const handleBtnExportTextForEnc = () => {
  const encryptedTxt = document.querySelector("#areaDisplayEncTxt").value;
  const blob = new Blob([encryptedTxt], { type: "text/plain" });
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "noviEnkriptovaniFajl";
  link.href = fileUrl;
  link.click();
  encryptedTxt.value = "";
};
/*end of exporting file */
/*exporting JWK */
const btnExportJWK = document.querySelector(".btnExportJWK");
const handleBtnExportJWK = () => {
  const encryptedTxt = document.querySelector(".exportJWK").value;
  const blob = new Blob([encryptedTxt], { type: "text/plain" });
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "noviSimetricniKljuc";
  link.href = fileUrl;
  link.click();
  encryptedTxt.value = "";
};
/*end of JWK */
/*exporting IV */
const btnExportIV = document.querySelector(".btnExportIV");
const handleBtnExportIV = () => {
  const encryptedTxt = document.querySelector(".exportIV").value;
  const blob = new Blob([encryptedTxt], { type: "text/plain" });
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "noviIV";
  link.href = fileUrl;
  link.click();
  encryptedTxt.value = "";
};
/*end of Iv */

/*importovanje fajla */
// const importTxtFileForEncBtn = document.querySelector(".importTxtFileForEnc");
// importTxtFileForEncBtn.addEventListener("click", handleimportTxtFileForEnc);
/*kraj importovanje fajla */

/*starting encryption */
const handleBtnTextForEnc = async () => {
  console.log("ekripcija pocela!!!");

  const userInputKeyIV = document.querySelector("#userKeyIVch");
  if (!userInputKeyIV.checked) {
    window.crypto.subtle
      .generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      )
      .then(async (key) => {
        console.log("key", key);

        /*pocetna vr poruke */
        const textForEnc = document.querySelector("#areaDisplayEncTxt");

        console.log("pocetna textForEnc:....", textForEnc.value);
        /*kraj dodeli input vrednost encryptovane poruke */
        /* */
        const a = await enkripcija(key).then((res) => res);
        textForEnc.value = a; // dodlei input kriptovanu vr
        console.log("enkripcija(key)", a);
        console.log("textForEnc nakon enkriptovanja:...", textForEnc.value);
        /* */
        /*export jwk */
        const jwkForExport = await window.crypto.subtle
          .exportKey("jwk", key)
          .then((res) => res);
        exportDataAsStrJWK(".exportJWK", jwkForExport);
        /*end of export jwk */
        /*export iv */
        console.log("iv", iv);
        exportDataAsStrIV(".exportIV", iv);
        /*end of export iv */
        console.log(
          "exportDataAsStrIV(.exportIV, iv)",
          exportDataAsStrIV(".exportIV", iv)
        );
        btnExportTextForEnc.addEventListener(
          "click",
          handleBtnExportTextForEnc
        ); // export encrypted file
        btnExportJWK.addEventListener("click", handleBtnExportJWK);
        btnExportIV.addEventListener("click", handleBtnExportIV);
      });
  }

  if (userInputKeyIV.checked) {
    const insertedKey = getUserInputKey();
    const insertedIV = getUserInputIV();
    console.log("insertedKey", insertedKey);
    console.log("insertedIV", insertedIV);
    const n = await getUserInputKey().then((res) =>
      encryptionUserInput(res, insertedIV).then((res) => res)
    );
    const textForEnc = document.querySelector("#areaDisplayEncTxt");
    textForEnc.value = n;
    btnExportTextForEnc.addEventListener("click", handleBtnExportTextForEnc);
  }
};

const startEncryption = document.querySelector(".startEncryption");
startEncryption.addEventListener("click", handleBtnTextForEnc);
