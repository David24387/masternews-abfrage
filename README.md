# Masternews-Abfrage für Masternet

## Dateien
- index.html: Popup mit fünf Fragen im EUROMASTER-Design
- Code.gs: Google-Apps-Script-Empfänger für Antworten in Google Sheets

## Einrichtung
1. Google Sheet für die Ergebnisse erstellen.
2. In Code.gs die SHEET_ID eintragen und den Code in einem neuen Apps-Script-Projekt speichern.
3. Als Web-App bereitstellen (Ausführung als Eigentümer, Zugriff passend zur internen Nutzung).
4. Die /exec-URL in index.html bei ENDPOINT eintragen.
5. index.html über GitHub Pages oder einen geeigneten Hostingdienst bereitstellen und als URL-Widget in Staffbase einbinden.

## Wichtige Hinweise
- Ohne ENDPOINT lässt sich die Umfrage ansehen, aber nicht absenden.
- Die Web-App nutzt eine Cross-Origin-POST-Anfrage mit no-cors. Das Frontend kann deshalb den Erfolg der Speicherung nicht zuverlässig bestätigen. Vor Produktivstart einen überprüfbaren Rückkanal/Proxy oder einen einheitlichen Apps-Script-Host verwenden.
- Schließen im iframe kann nicht garantieren, dass Staffbase das Widget ausblendet; dafür ist eine kompatible Staffbase-Integration erforderlich.
- Derzeit kein wirksamer Schutz gegen Mehrfachteilnahmen und keine Authentifizierung. Vor interner Freigabe Datenschutz, Zugriff und Missbrauchsschutz prüfen.
- Ein Staffbase-URL-Widget kann iframe-/CSP-Einschränkungen unterliegen.
