function incarcaPersoane() 
{
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let xmlDoc = this.responseXML; 
            let tableHTML = "<table border='0.06em solid black'>";
            tableHTML += "<thead><tr><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Adresa</th><th>Strada</th><th>Numar</th><th>Email</th><th>Data Nastere</th><th>Gen</th><th>Nationalitate</th><th>Calificare</th><th>Localitate</th><th>Judet</th><th>Tara</th></tr></thead><tbody>";
            let persoane = xmlDoc.getElementsByTagName("persoana");
            for (let i = 0; i < persoane.length; i++) 
            {
                let nume = persoane[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue;
                let prenume = persoane[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue;
                let varsta = persoane[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue;
                let adresa = persoane[i].getElementsByTagName("adresa")[0].childNodes[0].nodeValue;
                let strada = persoane[i].getElementsByTagName("strada")[0].childNodes[0].nodeValue;
                let numar = persoane[i].getElementsByTagName("numar")[0].childNodes[0].nodeValue;
                let email = persoane[i].getElementsByTagName("email")[0].childNodes[0].nodeValue;
                let data_nastere = persoane[i].getElementsByTagName("data_nastere")[0].childNodes[0].nodeValue;
                let gen = persoane[i].getElementsByTagName("gen")[0].childNodes[0].nodeValue;
                let nationalitate = persoane[i].getElementsByTagName("nationalitate")[0].childNodes[0].nodeValue;
                let calificare = persoane[i].getElementsByTagName("calificare")[0].childNodes[0].nodeValue;
                let localitate = persoane[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue;
                let judet = persoane[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue;
                let tara = persoane[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue;
                tableHTML += "<tr>" +
                    "<td>" + nume + "</td>" +
                    "<td>" + prenume + "</td>" +
                    "<td>" + varsta + "</td>" +
                    "<td>" + adresa + "</td>" +
                    "<td>" + strada + "</td>" +
                    "<td>" + numar + "</td>" +
                    "<td>" + email + "</td>" +
                    "<td>" + data_nastere + "</td>" +
                    "<td>" + gen + "</td>" +
                    "<td>" + nationalitate + "</td>" +
                    "<td>" + calificare + "</td>" +
                    "<td>" + localitate + "</td>" +
                    "<td>" + judet + "</td>" +
                    "<td>" + tara + "</td>" +
                    "</tr>";
            }
            tableHTML += "</tbody></table>";
            document.getElementById("xmltab").innerHTML = tableHTML;
        }
    };
    xhttp.open("GET", "resurse/persoane.xml", true);
    xhttp.send();
}
