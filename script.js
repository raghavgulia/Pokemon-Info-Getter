const field = document.querySelector(".p");
const b1 = document.querySelector(".stats-opener");
const b2 = document.querySelector(".move-opener");
const b3 = document.querySelector(".images-opener");

let m1,
  m2,
  m3 = false;

function l(url) {
  let request = new XMLHttpRequest();
  request.open("GET", url, true);

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
    console.log(moves);
    document.querySelector(".movetext").innerHTML = `<ul>${moves}</ul>`;
    document.querySelector(".images").innerHTML = `<img src="${
      JSON.parse(request.responseText).sprites.front_default
    }" alt="" class="img "/>
    <img src="${
      JSON.parse(request.responseText).sprites.back_default
    }" alt="" class="img"/>
    <img src="${
      JSON.parse(request.responseText).sprites.front_shiny
    }" alt="" class="img "/>
    <img src="${
      JSON.parse(request.responseText).sprites.back_shiny
    }" alt="" class="img"/>`;
    console.log(`<img src="${
      JSON.parse(request.responseText).sprites.front_default
    }" alt="" class="img "/>
  <img src="${
    JSON.parse(request.responseText).sprites.back_default
  }" alt="" class="img"/>
  <img src="${
    JSON.parse(request.responseText).sprites.front_shiny
  }" alt="" class="img "/>
  <img src="${
    JSON.parse(request.responseText).sprites.back_shiny
  }" alt="" class="img"/>`);

    document.querySelectorAll(".move").forEach(function (e) {
      e.addEventListener("click", function () {
        document.querySelector(".overlay").classList.remove("hidden2");
        console.log("s");
        let request = new XMLHttpRequest();
        request.open("GET", this.getAttribute("h"), true);
        request.onload = () => {
          document.querySelector(".pop").classList.remove("hidden2");
          document.querySelector(".textpop").textContent = JSON.parse(
            request.responseText
          ).flavor_text_entries.filter(
            (o) => (o.language = "en")
          )[0].flavor_text;
        };
        request.send();
      });
    });
  };
  request.send();
}

l(`https://pokeapi.co/api/v2/pokemon/${Math.trunc(Math.random() * 898) + 1}`);

let poknames = [];
for (let index = 1; index < 898; index++) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${index}`).then(function (response) {
    response.text().then(function (text) {
      storedText = text;
      let myobj = JSON.parse(storedText);
      poknames.push(myobj.name);
    });
  });
}

field.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    l(
      `https://pokeapi.co/api/v2/pokemon/${
        document.getElementById("name").value
      }`
    );
  }
});

document.querySelector(".overlay").addEventListener("click", function () {
  this.classList.add("hidden2");
  document.querySelector(".pop").classList.add("hidden2");
});

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

b1.addEventListener("click", () => {
  document.querySelector(".stattext").classList.toggle("hidden");
  m1 = m1 ? false : true;
  document.querySelector(".ud1").src = `images/expand_${
    m1 ? "less" : "more"
  }_black_24dp.svg`;
});

b2.addEventListener("click", function () {
  document.querySelector(".movetext").classList.toggle("hidden");
  m2 = m2 ? false : true;
  document.querySelector(".ud2").src = `images/expand_${
    m2 ? "less" : "more"
  }_black_24dp.svg`;
});

b3.addEventListener("click", () => {
  document.querySelector(".images").classList.toggle("hidden");
  m3 = m3 ? false : true;
  document.querySelector(".ud3").src = `images/expand_${
    m3 ? "less" : "more"
  }_black_24dp.svg`;
});

autocomplete(document.getElementById("name"), poknames);

document.querySelectorAll(".move").forEach(function (e) {
  e.addEventListener("click", function () {
    document.querySelector(".overlay").classList.remove("hidden2");
    console.log("s");
    let request = new XMLHttpRequest();
    request.open("GET", this.getAttribute("h"), true);
    request.onload = () => {
      document.querySelector(".pop").classList.remove("hidden2");
      document.querySelector(".textpop").textContent = JSON.parse(
        request.responseText
      ).flavor_text_entries.filter((o) => (o.language = "en"))[0].flavor_text;
    };
    request.send();
  });
});

document.querySelector(".random").addEventListener("click", function () {
  l(`https://pokeapi.co/api/v2/pokemon/${Math.trunc(Math.random() * 898) + 1}`);
});
