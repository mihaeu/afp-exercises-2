# AFP Exercise Day 2

## 1. Dining Philosophers – ein Klassiker der Nebenläufigen Programmierung
(https://de.wikipedia.org/wiki/Philosophenproblem)
Implementieren Sie die fünf
dinierenden Philosophen als nebenläufiges Programm in einem Prozess. Erweitern Sie
dann das Programm so dass jeder Philosoph durch einen eigenen Prozess
implementiert wird, und sich dann die fünf Prozesse direkt miteinander verständigen,
ohne zentrale Instanz. Verwenden Sie die in „Ihre Sprache“ eingebaute Inter-Prozess-
Kommunikation.

## 2. Sockets und HTTP – Implementieren Sie einfache Server:
 - a. Echo-Server: der eingegebene String soll als Echo zurückgegeben werden. Implementieren Sie zunächst einen
einfachen Socket-Server. Wenn Sie sich per Telnet Client mit dem Socket verbinden, soll jeder eingegebene
String als Echo zurückgegeben werden.
 - b. HTTP-Echo-Server: Implementieren Sie nun einen entsprechenden HTTP-Service. Hier dürfen Sie natürlich ggf.
vorhandene Bibliotheken verwenden. Beispiel: http://localhost:12345/Hallo soll die Zeichenkette „Hallo“
liefern.
 - c. File-Server: Aufbauend auf a., implementieren Sie nun einen „File-Server“. Der eingegebene String soll nun
als Name bzw. Pfad einer lokalen Datei interpretiert werden, deren Inhalt als Text zurückgegeben werden soll.
 - d. HTTP-File-Server: Nun entsprechend einen einfachen HTTP basierten File-Server.
Hans Schlenker: Anwendungen der Funktionalen Programmierung
118Programmier-Aufgaben

## 3. Verteilte Fraktal-Berechnungen: Mandelbrot-Menge
Wir wollen hier verteilt vorhandene
Rechenkapazität nutzen, um aufwändige Berechnungen (nach Möglichkeit) zu zerlegen,
zu verteilen und zu beschleunigen. Verwenden Sie als Grundlage folgenden Algorithmus:
https://rosettacode.org/wiki/Mandelbrot_set#Java (vgl. auch mit Alg. auf nächster Folie)
 - a. GUI, lokale Berechnung: Implementieren Sie zunächst ein grafische Oberfläche die obiges Fraktal darstellt. Die
Berechnung soll zunächst lokal in einem Thread ablaufen. Die GUI soll dem Anwender erlauben, einen
Bildschirmausschnitt mit der Maus zu selektieren und ihm dann diesen Ausschnitt neu berechnen und darstellen.
Alternativ können Sie aus der Community Java Code für die GUI herunterladen!
 - b. Implementieren Sie nun einen „Worker“, der folgende Eingabe verarbeitet: „w,h;x,y;zoom;maxIter“
W,h ist die Größe des Ausschnitts in Pixeln; x,y die linke obere Ecke des Ausschnitts im komplexen Zahlenbereich;
zoom der Zoomfaktor, und maxIter die maximale Iterationstiefe. Die Größe des Ausschnitts sei folgendermaßen
definiert: siehe die Grafik oben rechts. Der Worker soll dann für alle Pixel den iter Wert (gem. obigem Alg.)
berechnen. Der Worker soll einen HTTP Server implementieren der für etwa folgende URL alle berechneten Werte
als Text ausgibt: http://localhost:12345/2,2;0.0,0.0;1.0;1000
Das Ergebnis für diese Anfrage ist (zwei Zeilen je zwei Werte):
0 998
0 998
 - c. Erweitern Sie Ihre GUI so, dass sie Berechnungen an mehrere Worker delegiert, die dann parallel Ausschnitte des
Gesamtbilds berechnen. Die GUI soll dann die Ergebnisse sammeln und wieder grafisch darstellen.
 - d. Schließen Sie sich mit anderen Teams kurz und verwenden Sie deren Worker mit.

```java
public class MandelbrotServer {
	public static void main(String[] args) {
		compute(2,2,0,0,1.0,1000);
		// 0 998
		// 0 998
	}


	static void compute(int w, int h, double x, double y, double zoom, int maxIter) {
		for (int j = 0; j < h; j++) {
			for (int i = 0; i < w; i++) {
				double tmp;
				double zx = 0;
				double zy = 0;
				double cx = x + i / zoom;
				double cy = y + j / zoom;
				int iter = maxIter;
				while (zx * zx + zy * zy < 4 && iter > 0) {
					tmp = zx * zx - zy * zy + cx;
					zy = 2.0 * zx * zy + cy;
					zx = tmp;
					iter--;
				}
				System.out.print(iter+" ");
			}
			System.out.println();
		}
	}
}
```
