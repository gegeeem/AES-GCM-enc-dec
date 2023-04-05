function enableUserJwkIv(checkboxQueryName, displayClassName) {
  const toggle = () => {
    const tog = document.querySelector(checkboxQueryName);

    const keyIVEnableDisable = document.querySelector(displayClassName);
    if (tog.checked) keyIVEnableDisable.classList.remove("hide");

    if (!tog.checked) keyIVEnableDisable.classList.add("hide");
  };
  const userKeyIV = document.querySelector(checkboxQueryName);
  userKeyIV.addEventListener("click", toggle);
}
enableUserJwkIv("#userKeyIV", ".displayKeyAndIV"); // enable user input jwk adn iv for encryption
// enableUserJwkIv("#userKeyIVDec", ".displayKeyAndIVDec"); // enable user input jwk and iv for decryption
