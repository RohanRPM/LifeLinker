#include "Wire.h"       
#include "I2Cdev.h"     
#include "MPU6050.h"    

MPU6050 mpu;
int16_t ax, ay, az;
int16_t gx, gy, gz;


struct MyData {
  byte X;
  byte Y;
  byte Z;
};

MyData data;
  int a= data.Y;
int upperBound = a + 90;
int lowerBound = a - 90;
void setup()
{
  Serial.begin(9600);
  Wire.begin();
  mpu.initialize();
  if(upperBound >= 360)
    upperBound = upperBound % 360;
  if(lowerBound <= 0)
    lowerBound = 360 - lowerBound;
  if( lowerBound > upperBound){
    int temp = lowerBound;
    lowerBound = upperBound;
    upperBound = temp;
  }
  //pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  data.Y = map(ay, -17000, 17000, 0, 255);  // Y axis data
  delay(500);

  Serial.print("  ");
  Serial.print("Axis Y = ");
  Serial.println(data.Y);
  
 if(data.Y >= 210 || data.Y <= lowerBound){
    Serial.println("Accident is detected!");
 }
//  if (a+150 || a-150) { //gesture : little bit down
//     }

  

}
