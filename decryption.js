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
let fileHandle;
let newTextText;
let newJWKK;
let newIVIV;
const getTextAreaDec = document.querySelector("#textForDec");

const handleTextArea = async () => {
  //   [fileHandle] = await window.showOpenFilePicker();

  //   const file = await fileHandle.getFile();
  //   const content = await file.text();

  //   const geinput = document.querySelector("#aes-gcm-message");
  //   geinput.setAttribute("value", content);
  newTextText = content;
  getTextAreaDec.value = content;

  return content;
};
// const pickerBtn = document.querySelector(".getFileForDec");
// pickerBtn.addEventListener("click", handleTextArea);

/*/get symmetric/*/
const getsymetricKeyVal = document.querySelector(".keyTxtDec");

const handleBtnSymtricKey = async () => {
  [fileHandle] = await window.showOpenFilePicker();

  const file = await fileHandle.getFile();
  const content = await file.text();
  newJWKK = content;
  getsymetricKeyVal.value = content;

  return content;
};
// const btnSymtricKey = document.querySelector(".simetricGetKeyBtn");
// btnSymtricKey.addEventListener("click", handleBtnSymtricKey);
/*end of get symmetric key */

/*get iv */
const getivVal = document.querySelector(".ivTxtAreaDec");

const handleBtnIV = async () => {
  [fileHandle] = await window.showOpenFilePicker();

  const file = await fileHandle.getFile();
  const content = await file.text();
  newIVIV = content;
  getivVal.value = content;

  return content;
};
// const btnIV = document.querySelector(".ivBtn");
// btnIV.addEventListener("click", handleBtnIV);
/*end of get iv */

/*decryption */
const handleBtnDecrypt = async () => {
  //   console.log(str2ab(getTextArea.value));
  //   console.log(JSON.parse(getsymetricKeyVal.value));
  //   console.log(str2ab(getivVal.value));
  //   const textBinaryDerString = str2ab(window.atob(getTextArea.value));
  //   const ivBinaryDerString = new Uint8Array(str2ab(window.atob(getivVal.value)));
  //   console.log("textBinaryDerString", textBinaryDerString);
  //   console.log("ivBinaryDerString", ivBinaryDerString);
  console.log("getsymetricKeyVal.value", getsymetricKeyVal.value);
  console.log("getsymetricKeyVal.value", getsymetricKeyVal.value);

  const jwkKey = await window.crypto.subtle.importKey(
    "jwk",
    JSON.parse(getsymetricKeyVal.value),
    {
      name: "AES-GCM",
    },
    true,
    ["encrypt", "decrypt"]
  );
  console.log("JWK", jwkKey);
  const textReadyForEnc = str2ab(window.atob(getTextAreaDec.value));
  const dekripcija = await window.crypto.subtle
    .decrypt(
      {
        name: "AES-GCM",
        iv: new Uint8Array(
          getivVal.value.split(",").map((el) => parseInt(el, 10))
        ),
      },
      jwkKey,
      textReadyForEnc
    )
    .then((res) => res);

  let n = new TextDecoder();
  n.decode(dekripcija);

  const displayText = document.querySelector("#areaDisplayDecTxt");
  displayText.value = n.decode(dekripcija);
};
const btnDecrypt = document.querySelector(".startDecryption");
btnDecrypt.addEventListener("click", handleBtnDecrypt);
// export decrypted file
const exportDecFile = document.querySelector(".exportDecFile");
const handleBtnExportTextDec = () => {
  const encryptedTxt = document.querySelector("#areaDisplayDecTxt").value;
  const blob = new Blob([encryptedTxt], { type: "text/plain" });
  const fileUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "newDecryptedFile";
  link.href = fileUrl;
  link.click();
  encryptedTxt.value = "";
};
exportDecFile.addEventListener("click", handleBtnExportTextDec);
// end of export decrypted file

/*end of decription */
