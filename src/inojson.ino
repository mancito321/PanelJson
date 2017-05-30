#include <ArduinoJson.h>
#include <paneltst.h>
#include <Hall.h>
#include <Filters.h>

unsigned long time;

void setup(){
  Serial.begin(115200);
}

void loop(){
//  if(Serial.available() > 0){
//    StaticJsonBuffer<200> jsonBuffer;
//    String inp = Serial.readStringUntil('\n');
//    JsonObject& req = jsonBuffer.parseObject(inp);
//    JsonObject& res = jsonBuffer.createObject();
//    if(req.success()){
//      bool a=askPower();
//    }
//  }
  time =millis();
  while((millis()-time)<1000){};
  askPower();

}
