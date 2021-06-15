const field = document.querySelector(".s");
const b1 = document.querySelector(".stats-opener");
const b2 = document.querySelector(".move-opener");

field.addEventListener("click", function () {
  let request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://pokeapi.co/api/v2/pokemon/${
      document.getElementById("name").value
    }`,
    true
  );
  request.onload = () => {
    console.log(JSON.parse(request.responseText));
    document.getElementById(
      "pim"
    ).src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      JSON.parse(request.responseText).id
    }.png`;
    document.querySelector(".pokname").textContent = JSON.parse(
      request.responseText
    ).name;
    let r2 = new XMLHttpRequest();
    r2.open("GET", JSON.parse(request.responseText).species.url, true);

    r2.onload = () => {
      let result = JSON.parse(r2.responseText).flavor_text_entries.filter(
        (obj) => {
          return obj.language.name === "en";
        }
      );

      document.querySelector(".des").textContent = (
        result[0].flavor_text + result[1].flavor_text
      ).replaceAll("", " ");
      console.log(result);
    };
    r2.send();
    let type = "";
    JSON.parse(request.responseText).types.forEach((el) => {
      type += el.type.name.toUpperCase();
      type += " ";
    });
    document.querySelector(".stattext").textContent = `Weight:${
      JSON.parse(request.responseText).weight
    }\n    
    Height:${JSON.parse(request.responseText).height}\nType:${type}`;
    let moves = "";
    JSON.parse(request.responseText).moves.forEach((e) => {
      moves += `<li class='move' h="${e.move.url}">${e.move.name.replaceAll(
        "-",
        " "
      )}</li>`;
    });
    console.log(`Pokemon Moves: ${moves}`);
    document.querySelector(".movetext").innerHTML = `<ul>${moves}</ul>`;
    b1.addEventListener("click", () => {
      if (document.querySelector(".stattext").classList.contains("hidden")) {
        document.querySelector(".stattext").classList.remove("hidden");
        document.querySelector(".stattext").classList.add("visible");
      } else {
        document.querySelector(".stattext").classList.add("hidden");
        document.querySelector(".stattext").classList.remove("visible");
      }
    });
    b2.addEventListener("click", () => {
      if (document.querySelector(".movetext").classList.contains("hidden")) {
        document.querySelector(".movetext").classList.remove("hidden");
        document.querySelector(".movetext").classList.add("visible");
      } else {
        document.querySelector(".movetext").classList.add("hidden");
        document.querySelector(".movetext").classList.remove("visible");
      }
    });
    document.querySelectorAll(".move").forEach(function (e) {
      e.addEventListener("click", function () {
        let request = new XMLHttpRequest();
        request.open("GET", this.getAttribute("h"), true);
        request.onload = () => {
          console.log(
            JSON.parse(request.responseText).flavor_text_entries.filter(
              (o) => (o.language = "en")
            )[0].flavor_text
          );
        };
        request.send();
      });
    });
  };
  request.send();
});
