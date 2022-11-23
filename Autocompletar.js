function autocomplete(inp, arr) {

            var currentFocus;
            inp.addEventListener("input", function (e) {
                var a, b, i, val = this.value;
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;
                a = document.createElement("DIV");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                this.parentNode.appendChild(a);

                for (i = 0; i < arr.length; i++) {
                    var datos = arr[i];

                    if (datos.Nombre.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) >= 0)
                    {
                        b = document.createElement("DIV");
                        var datos1 = datos.Nombre.split(',')[0] + " (" + (datos.Nombre.split('(')[1]);

                        b.innerHTML = "<strong>" + datos1 + "</strong> <br>";
                        b.innerHTML += "<label class='labelautocomplete'>" + datos.Nombre.split(',')[1].split('(')[0] + "</label>";

                        b.addEventListener("click", function (e)
                        {
                            var datos = e.currentTarget.innerHTML.split(')')[0];
                            var city = datos.split('(')[0].trim();
                            city = city.substr(8, city.length);
                            var iata = datos.split('(')[1].trim();
                            inp.value = city.trim();

                            if (inp.id === "flightFrom") {
                                $("#fromShow").text(iata);
                                $("#dataFrom").val(iata);
                            }
                            else {
                                $("#toShow").text(iata);
                                $("#dataTo").val(iata);
                            }

                            i = arr.length;

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
                if (currentFocus < 0) currentFocus = (x.length - 1);
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