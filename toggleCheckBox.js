function toggler() {
  const tog = document.querySelector("#userKeyIV");
  const keyIVEnableDisable = document.querySelector(".displayKeyAndIV");
  if (tog.checked) keyIVEnableDisable.classList.remove("hide");

  if (!tog.checked) keyIVEnableDisable.classList.add("hide");
}
const userKeyIV = document.querySelector("#userKeyIV");
userKeyIV.addEventListener("click", toggler);
