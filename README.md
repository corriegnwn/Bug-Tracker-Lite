# Bug-Tracker-Lite

Dies ist eine einfache Anwendung, mit der man Bugs melden und eine Liste der bestehenden Bugs anzeigen kann.

## Installation und Start
1. Klone dieses Repository.
   ```
   git clone https://github.com/corriegnwn/Bug-Tracker-Lite.git
   ```
2. Navigiere ins Backend-Verzeichnis
    ```
   cd backend
   ```
   
   und installiere alle benötigten Abhängigkeiten:
   ```
   npm install
   ```

   Baue das Projekt:
   ```
   npm run build
   ```

   Jetzt kannst du das Backend starten:
   ```
   npm run start
   ```

   Das Backend läuft jetzt unter: http://localhost:3000



3. Navigiere nun in das Frontend-Verzeichnis,
    ```
   cd ../frontend
   ```

   installiere alle benötigten Abhängigkeiten,
   ```
   npm install
   ```

   und starte das Frontend:
   ```
   npm run start
   ```

   Das Frontend läuft jetzt unter: http://localhost:4200


## Dokumentation des Lösungswegs
Da ich mit Angular, Node und Typescript noch keine Erfahrung hatte, war der erste Schritt, mir ganz viele YouTube-Tutorials dazu anzuschauen.

### Vorgehen
1. **Backend**: Express-Servers mit Endpunkten für die Erstellung und das Abrufen von Bug-Reports
   
   Das war relativ unkompliziert; die Bugs brauchen keine Persistenz, d.h. man kann sie in einem einfachen Array speichern, der entweder komplett zurückgegeben wird (`get`) oder erweitert werden kann (`post`).
   Die Daten für einen Bug sind in einem Bug-Modell definiert, der in `shared/bug.model` liegt, da wir das Interface sowohl im Backend als auch im Frontend benötigen. Ein Bug hat die Felder `title`, `description`, `priority` und `createdAt`, wobei `priority` ein `enum` ist und `createdAt` optional (`createdAt` wird vom Frontend nicht mitübergeben, da es automatisch im Backend gesetzt wird)

2. **Frontend**: Form zur Eingabe eines neuen Bugs + Liste zur Anzeige der bestehenden Bugs

   Die Anwendung soll Bugs anzeigen und neue Bugs erstellen. Daraus ergibt sich direkt die Aufteilung in zwei Komponenten: eine Liste (`bug-list`) und ein Formular (`bug-form`). Das Formular habe ich reaktiv umgesetzt, weil man damit die Validierung besser steuern kann als mit Template-Forms. Nach dem Absenden wird die Seite per `window.location.reload()` neu geladen, um die Liste zu aktualisieren. Alternativ könnte man die Liste wahrscheinlich direkt aktualisieren, aber für diese Mini-App war jetzt das reload die einfachste Lösung.

   `bug-service` übernimmt die Kommunikation mit dem Backend, damit die Komponenten selbst keine HTTP-Logik enthalten.

### Herausforderungen
Beim Umsetzen der Anwendung gab es ein paar Punkte, an denen ich erstmal hängen geblieben bin:
- **Kommunikation zwischen Frontend und Backend (CORS)**: Als die API-Aufrufe vom Frontend nicht funktioniert haben, wusste ich zuerst gar nicht, woran es liegt und hab mich gewundert, warum nix ankommt, bis ich irgendwann darauf gekommen bin, im Browser-Debugger zu gucken und auf die CORS-Fehlermeldung gestoßen bin. Man muss eigentlich nur eine Zeile im Backend ergänzen, um den Zugriff freizugeben, aber da muss man erstmal drauf kommen.
- **Gemeinsames Datenmodell (Bug-Interface)**: Ich wollte das Modell sowohl im Backend als auch im Frontend nutzen, was grundsätzlich kein Problem war, allerdings war das Einbinden des shared-Ordners (den richtigen Pfad für den Import finden) etwas schwierig.
- **HTTP und asynchrone Daten (Observables)**: Beim Arbeiten mit dem HttpClient hat es etwas gedauert, bis ich verstanden habe, wie Observables und subscribe() funktionieren. Ich war (bin) etwas verwirrt, warum man nicht direkt auf die Antwort zugreifen kann, sondern alles über Callback-Funktionen läuft.

### Tests
Die API-Endpunkte des Backends wurden mit Insomnia getestet, um sicherzustellen, dass Daten korrekt gesendet und empfangen werden. Das Frontend wurde direkt über den Browser geprüft, ab und zu auch mit den Entwicklertools. 
