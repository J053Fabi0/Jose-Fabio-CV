(function () {
  const btn = document.getElementById("expAll");
  const details = Array.from(document.querySelectorAll("details"));

  // This has to be done because of the translations
  const collapseAllTxt =
    btn.innerHTML === "Expand all"
      ? "Collapse all"
      : btn.innerHTML === "Expandir todo"
      ? "Colapsar todo"
      : "Maletendiĝi ĉion";
  const expandAllTxt =
    btn.innerHTML === "Expand all"
      ? "Expand all"
      : btn.innerHTML === "Expandir todo"
      ? "Expandir todo"
      : "Etendiĝi ĉion";

  btn.addEventListener(
    "click",
    function () {
      const expanding = btn.innerHTML === expandAllTxt;
      btn.innerHTML = expanding ? collapseAllTxt : expandAllTxt;

      for (let obj of details) obj.open = expanding;
    },
    false
  );

  function checkIfButtonCanChangeText() {
    if (btn.innerHTML === collapseAllTxt) {
      let openNumber = 0;
      for (let temp of details) if (temp.open) openNumber++;
      if (openNumber <= 1) btn.innerHTML = expandAllTxt;
    } else {
      let closedNumber = 0;
      for (let temp of details) if (!temp.open) closedNumber++;
      if (closedNumber <= 1) btn.innerHTML = collapseAllTxt;
    }
  }
  for (let obj of details) obj.addEventListener("click", checkIfButtonCanChangeText);
})();
