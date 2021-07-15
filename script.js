(function () {
  const btn = document.getElementById("expAll");
  const details = Array.from(document.querySelectorAll("details"));

  btn.addEventListener(
    "click",
    function () {
      const newValue = !details[0].open;
      btn.innerHTML = newValue ? "Collapse all" : "Expand all";

      for (let obj of details) obj.open = newValue;
    },
    false
  );

  function checkIfButtonCanChangeText() {
    if (btn.innerHTML === "Collapse all") {
      let openNumber = 0;
      for (let temp of details) if (temp.open) openNumber++;
      if (openNumber <= 1) btn.innerHTML = "Expand all";
    } else {
      let closedNumber = 0;
      for (let temp of details) if (!temp.open) closedNumber++;
      if (closedNumber <= 1) btn.innerHTML = "Collapse all";
    }
  }
  for (let obj of details) obj.addEventListener("click", checkIfButtonCanChangeText);
})();
