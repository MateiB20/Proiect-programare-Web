Acest proiect presupune crearea unei aplicații web simple care include două funcționalități principale:
- Simularea unui sistem de logare pentru utilizatori.
- Simularea unui coș de cumpărături.

Tehnologii folosite:
- HTML: pentru crearea structurii paginilor web.
- CSS: pentru stilizarea și aspectul vizual al paginii.
- JavaScript: pentru interactivitate, validarea formularelor și gestionarea logicii coșului de cumpărături.
- Python: pentru serverul care gestionează cererile HTTP, autentificarea utilizatorilor și procesarea coșului de cumpărături.
  - Socket: pentru a implementa serverul de comunicație, Serverul Python folosește socket-uri pentru a asculta cererile HTTP și a trimite răspunsuri către front-end.

Componentele tehnice:
- Front-end:
Pagina de logare și înregistrare va fi construită cu HTML și CSS pentru design, iar interactivitatea (adăugarea de produse în coș) va fi realizată cu JavaScript.
Coșul de cumpărături va fi gestionat folosind LocalStorage sau IndexedDB pe client (browser).
- Back-end:
Datele utilizatorilor și produsele vor fi stocate într-un fișier JSON. Serverul Python va trimite și va primi date în format JSON.

Funcționalități principale:
- Simulare logare:
Utilizatorii își pot crea un cont (printr-un formular de înregistrare) sau se pot loga la un cont existent.
Datele utilizatorilor sunt validate pentru a preveni introducerea incorectă de informații (spre exemplu: verificarea corectitudinii adresei de email).
- Coș de cumpărături:
Utilizatorii pot introduce produsele și cantitatea și le pot adăuga în coș.
Fiecare produs va avea o opțiune de adăugare, iar coșul va afișa produsele adăugate împreună cu cantitatea introdusă.

Concluzie:
Acest proiect oferă o simulare de funcționalități de bază pentru o aplicație de comerț online, fiind un bun punct de plecare pentru proiecte mai complexe. 
