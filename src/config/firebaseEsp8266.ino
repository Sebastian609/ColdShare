#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <DHT.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>


#define WIFI_SSID ""
#define WIFI_PASSWORD ""
#define API_KEY ""
#define DATABASE_URL ""
#define USER_EMAIL ""
#define USER_PASSWORD ""



FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
unsigned long count = 0;

#define DPIN D2
#define DTYPE DHT11
DHT dht(DPIN, DTYPE);

#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
WiFiMulti multi;
#endif

void connectToWiFi() {
#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
  multi.addAP(WIFI_SSID, WIFI_PASSWORD);
  multi.run();
#else
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
#endif

  Serial.print("Connecting to Wi-Fi");
  unsigned long ms = millis();
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
    if (millis() - ms > 10000)
      break;
#endif
  }
  Serial.println();
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();
  } else {
    Serial.println("Failed to connect to Wi-Fi. Please check your credentials.");
  }
}

void setup() {
  Serial.begin(9600);
  connectToWiFi();
  delay(1000);
  dht.begin();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;
  config.token_status_callback = tokenStatusCallback;

  Firebase.reconnectNetwork(true);

  fbdo.setBSSLBufferSize(4096, 1024);

#if defined(ARDUINO_RASPBERRY_PI_PICO_W)
  config.wifi.clearAP();
  config.wifi.addAP(WIFI_SSID, WIFI_PASSWORD);
#endif

  Firebase.begin(&config, &auth);

  Firebase.setDoubleDigits(5);
}

void sendDataToFirebase(float temperature, float humidity) {

  if (!isnan(temperature) && !isnan(humidity)) {
    
    Serial.print("Humidity: ");
    Serial.print(humidity);
    String fireHumid = String(humidity, 2);
    Serial.print("%  Temperature: ");
    Serial.print(temperature);
    Serial.println("°C");
    String fireTemp = String(temperature, 2);

    if (Firebase.setString(fbdo, "/DHT11/Humidity", fireHumid) && Firebase.setString(fbdo, "/DHT11/Temperature", fireTemp)) {
      sendDataPrevMillis = millis();
    } else {
      Serial.println("Failed to send data to Firebase.");
    }
  }
  Serial.println("datos nulos ");
}

void loop() {
  
  if (WiFi.status() != WL_CONNECTED) {
    // Reconnect to WiFi if disconnected
    connectToWiFi();
  }

    delay(3000);
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  sendDataToFirebase(temperature,humidity);

  unsigned long currentMillis = millis();

  if (currentMillis - sendDataPrevMillis > 5000) {
    // Realizar operaciones adicionales si es necesario cada 5 segundos
    sendDataPrevMillis = currentMillis;
  }

  count++;

}
