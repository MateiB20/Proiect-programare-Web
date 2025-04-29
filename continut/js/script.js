function startInterval()
{
    main(); 
}
function main() 
{
    setInterval(f, 1000); 
    f1(); 
    function f() 
    {
        let d = new Date();
        if(document.getElementById("datetime"))
        {
            document.getElementById("datetime").innerHTML = d;
        }
    }
    
    async function f1() 
    {
        let urlElement = document.getElementById("url");
        urlElement.innerHTML = window.location.href;
        if (navigator.geolocation) 
        {
            navigator.geolocation.getCurrentPosition(success, error);
        } 
        else 
        {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    
        let appElement = document.getElementById("app");
        appElement.innerHTML = `Browser: ${getBrowser()} <br> OS: ${getOS()}`;
    }
    
    function success(position) 
    {
        document.getElementById("location").innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
    }
    
    function error() 
    {
        alert("Sorry, no position available.");
    }

    
    function getBrowser() 
    {
        let userAgent = navigator.userAgent;
    
        if (userAgent.indexOf("Chrome") !== -1) 
        {
            let version = userAgent.match(/Chrome\/([0-9]+)/);
            return `Google Chrome ${version ? version[1] : "Unknown"}`;
        } 
        else if (userAgent.indexOf("Safari") !== -1) 
        {
            let version = userAgent.match(/Version\/([0-9]+)/);
            return `Safari ${version ? version[1] : "Unknown"}`;
        } 
        else if (userAgent.indexOf("Firefox") !== -1) 
        {
            let version = userAgent.match(/Firefox\/([0-9]+)/);
            return `Firefox ${version ? version[1] : "Unknown"}`;
        } 
        else if (userAgent.indexOf("Edge") !== -1) 
        {
            let version = userAgent.match(/Edg\/([0-9]+)/);
            return `Microsoft Edge ${version ? version[1] : "Unknown"}`;
        } 
        else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) 
        {
            let version = userAgent.match(/(MSIE|rv:)([0-9]+)/);
            return `Internet Explorer ${version ? version[2] : "Unknown"}`;
        } 
        else 
        {
            return "Unknown Browser";
        }
    }
    
    async function getOS() 
    {
        let os = "Unknown OS";

        if (navigator.userAgentData)
        {
            const data = await navigator.userAgentData.getHighEntropyValues(["platformVersion"]);
            if (navigator.userAgentData.platform === "Windows") 
            {
                const majorVersion = parseInt(data.platformVersion.split('.')[0], 10);
                if (majorVersion >= 13) {
                    os = "Windows 11";
                } else {
                    os = "Windows 10";
                }
            }
        } 
        else 
        {
            let userAgent = navigator.userAgent;
            if (userAgent.indexOf("Windows NT 10.0") !== -1)
            {
                os = "Windows 10 or 11";
            }
            else if (userAgent.indexOf("Windows NT 6.2") !== -1) 
            {
                os = "Windows 8";
            }
            else if (userAgent.indexOf("Windows NT 6.1") !== -1)
            {
                os = "Windows 7";
            }
            else if (userAgent.indexOf("Mac OS X") !== -1) 
            {
                let version = userAgent.match(/Mac OS X ([0-9_]+)/);
                os = `Mac OS X ${version ? version[1].replace(/_/g, '.') : "Unknown"}`;
            } 
            else if (userAgent.indexOf("Android") !== -1) 
            {
                let version = userAgent.match(/Android ([0-9.]+)/);
                os = `Android ${version ? version[1] : "Unknown"}`;
            } 
            else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) 
            {
                let version = userAgent.match(/OS ([0-9_]+)/);
                os = `iOS ${version ? version[1].replace(/_/g, '.') : "Unknown"}`;
            }
        }

        return os;
    }
    



    let first = 0;
    let posX, posY;
    document.getElementById("myCanvas").addEventListener("dblclick", function(e) {
        let myCanvas = document.getElementById("myCanvas");
        let ctx = myCanvas.getContext("2d");
        let rect = myCanvas.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;    
        if (first === 0) 
        {
            posX = mouseX;
            posY = mouseY;
            first = 1;
        } 
        else 
        {
            let width = mouseX - posX;
            let height = mouseY - posY;
            console.log(posX);
            console.log(posY);
            let selectedColor = document.getElementById('favcolor').value;
            ctx.fillStyle = selectedColor;
            ctx.fillRect(posX, posY, width, height);
            first = 0;
        }
    });
    



    let table;
    let myColumns = [];
    function f4() 
    {
        let tableSection = document.getElementById('Tabel');
        table = document.createElement('table');
        let headerRow = document.createElement('tr');
        let header1 = document.createElement('th');
        header1.textContent = 'Name';
        let header2 = document.createElement('th');
        header2.textContent = 'Age';
        headerRow.appendChild(header1);
        headerRow.appendChild(header2);
        table.appendChild(headerRow);
        tableSection.appendChild(table);
        addRow('Agent 47', 57);
        addRow('Ezio Auditore da Firenze', 52);
        addRow('Master Chief', 49);
    }
    function addRow(name, age) 
    {
        if (!table) 
        {
            console.error("Table nu exista");
            return;
        }
        let row = document.createElement('tr');
        let cell1 = document.createElement('td');
        cell1.textContent = name;
        let cell2 = document.createElement('td');
        cell2.textContent = age;
        row.appendChild(cell1);
        row.appendChild(cell2);
        table.appendChild(row);
    }
    f4();
    if(document.getElementById('tab'))
    {
        document.getElementById('tab').addEventListener('submit', function (event) {
            event.preventDefault();
        
            let name = document.getElementById('name').value;
            let age = document.getElementById('age').value;
            let position = document.getElementById('pos').value;
            let color = document.getElementById('col').value;
            if (name && age && position) 
            {
                let row = table.insertRow(position);
                let cell1 = row.insertCell(0);
                cell1.textContent = name;
                let cell2 = row.insertCell(1);
                cell2.textContent = age;
                for (let i = 0; i < myColumns.length; i++) 
                {
                    let costum = document.getElementById(myColumns[i]).value;
                    let celln = row.insertCell(i + 2);
                    celln.textContent = costum;
                    document.getElementById(myColumns[i]).value = '';
                }
                row.style.backgroundColor = color;
                document.getElementById('name').value = '';
                document.getElementById('age').value = '';
                document.getElementById('pos').value = '';
            } 
            else 
            {   
                alert('introdu nume, vârstă, poziție...');
            }
        });
    }
    if(document.getElementById('tab2'))
    {
        document.getElementById('tab2').addEventListener('submit', function (event) {
            event.preventDefault();
            let position = document.getElementById('pos2').value;
            let rows = table.getElementsByTagName('tr');
            let color = document.getElementById('col2').value;
            let column = document.getElementById('colu').value;
            if ( column && position) 
            {
                let row = rows[0];
                let newCell = row.insertCell(position);
                newCell.textContent = column;
                newCell.style.backgroundColor = color;
                for (let i = 1; i < rows.length; i++) 
                {
                    row = rows[i];
                    newCell = row.insertCell(position);
                    newCell.textContent = "          ";
                    newCell.style.backgroundColor = color;
                }
                let label = document.createElement('label');
                label.setAttribute('for', `${column}`);
                label.textContent = `${column}:`;
                let input = document.createElement('input');
                input.type = 'text';
                input.id = `${column}`;
                input.name = `${column}`;
                myColumns.push(column);
                input.for
                let submit = document.getElementById('sub');
                document.getElementById('tab').insertBefore(input, submit);
                let br = document.createElement('br');
                document.getElementById('tab').insertBefore(br, submit);
                document.getElementById('tab').insertBefore(label, input);
            }
            else
            {
                alert('introdu nume, poziție');
            }
        })
    }
}




if(document.getElementById("tabverifica"))
{
    document.getElementById("tabverifica").addEventListener("submit",  function (event) {
        event.preventDefault();
        func();
    })
    function func()
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var jsonResponse = JSON.parse(this.responseText); 
                var utilizator = document.getElementById("utilizatorverifica");
                var parola = document.getElementById("parolaverifica");
                var ok = false;
                for (var i = 0; i < jsonResponse.length; i++) 
                {
                    if (jsonResponse[i].utilizator === utilizator.value && jsonResponse[i].parola === parola.value) 
                    {
                        ok = true;
                        alert("Succes");                    
                        break;
                    }
                }
                if (!ok) 
                {
                    alert("Username gresit sau parola gresita");
                }
            } 
        }
        xhttp.open("GET", "resurse/utilizatori.json", true);
        xhttp.send();
    }
}

if(document.getElementById('inregistreaza'))
{
    document.getElementById('inregistreaza').addEventListener('submit', async function (event) {
        event.preventDefault()
        let uname = document.getElementById('uname').value;
        let passwd = document.getElementById('passwd').value;
        let passwd2 = document.getElementById('passwd2').value;
        let checkbox = document.getElementById('checkbox');
        if(passwd!=passwd2)
        {
            alert("Parolele nu se potrivesc.")
            return;
        }
        else if(!checkbox.checked)
        {
            alert("Trebuie sa dai check.")  
            return;
        }
        else
        {
            let data = {
            utilizator: uname,
            parola: passwd
            };
            await fetch("/api/utilizatori",{method:"POST", headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)})
        }
    });
}   