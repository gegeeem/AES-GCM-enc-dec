function enableUserJwkIv(checkboxQueryName, displayClassName, hideClassName) {
  const toggle = () => {
    const tog = document.querySelector(checkboxQueryName);
    const hideRandom = document.querySelector(hideClassName);

    const keyIVEnableDisable = document.querySelector(displayClassName);
    if (tog.checked) {
      keyIVEnableDisable.classList.remove("hide");
      hideRandom.classList.add("hide");
    }

    if (!tog.checked) {
      keyIVEnableDisable.classList.add("hide");
      hideRandom.classList.remove("hide");
    }
  };
  const userKeyIV = document.querySelector(checkboxQueryName);
  userKeyIV.addEventListener("click", toggle);
}
enableUserJwkIv("#userKeyIVch", ".displayKeyAndIV", ".random"); // enable user input jwk adn iv for encryption
// enableUserJwkIv("#userKeyIVDec", ".displayKeyAndIVDec"); // enable user input jwk and iv for decryption
