#include <AFMotor.h>
 
AF_DCMotor motor1(3);
AF_DCMotor motor2(4);
 
String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete
 
int car_speed = 190;
int turn_speed = 100;
int timer = 5000;
 
void setup() {
  // initialize serial:
  Serial.begin(9600);
 
  inputString.reserve(200);
 
  motor1.setSpeed(car_speed+27);
  motor2.setSpeed(car_speed);
  motor1.run(RELEASE);
  motor2.run(RELEASE);
 
}
 
void loop() {
  /*
     LIST_OF_DIRECTIONS straight | forward | backward | reverse | back  Delete  Edit
     LIST_OF_TURNS left | right  Delete  Edit
     STOP  stop | halt | wait | pause
   */
  if (stringComplete) {
    //lcd.clear();
    //lcd.print(inputString);
    if(inputString == "straight" || inputString == "forward") {
      //move_forward();
      //lcd.clear();
      //lcd.print("moving");
      motor1.run(FORWARD);
      motor2.run(FORWARD);
      delay(25);
      }
    else if(inputString == "backward" || inputString == "reverse" || inputString == "back") {
      //move_reverse();
      //lcd.clear();
      //lcd.print("running");
      motor1.run(BACKWARD);
      motor2.run(BACKWARD);
      delay(25);
      }
    else if(inputString == "left"){
      //turn_left();
      //lcd.clear();
      //lcd.print("turning");
      motor1.setSpeed(turn_speed);
      motor2.setSpeed(turn_speed);
      motor1.run(FORWARD);
      motor2.run(BACKWARD);
      delay(1500);
      motor1.run(RELEASE);
      motor2.run(RELEASE);
      delay(500);
      }
    else if(inputString == "right"){
      //turn_right();
      //lcd.clear();
      //lcd.print("turning");
      motor1.setSpeed(turn_speed);
      motor2.setSpeed(turn_speed);
      motor1.run(BACKWARD);
      motor2.run(FORWARD);
      delay(1500);
      motor1.run(RELEASE);
      motor2.run(RELEASE);
      delay(500);
     }
     else if(inputString == "dance" || inputString == "the prashant" || inputString == "the dance") {
       
       int n = 0;
       
       while (n <= 2) {
         int car_speed = 230;
         motor1.setSpeed(car_speed);
         motor2.setSpeed(car_speed-130);
         motor1.run(FORWARD);
         motor2.run(FORWARD);
         delay(800);
         motor1.run(BACKWARD);
         motor2.run(BACKWARD);
         delay(800);
         motor1.run(FORWARD);
         motor2.run(FORWARD);
         delay(800);
         motor1.run(BACKWARD);
         motor2.run(BACKWARD);
         delay(800);
         
         motor1.setSpeed(car_speed-130);
         motor2.setSpeed(car_speed);
         motor1.run(FORWARD);
         motor2.run(FORWARD);
         delay(800);
         motor1.run(BACKWARD);
         motor2.run(BACKWARD);
         delay(800);
         motor1.run(FORWARD);
         motor2.run(FORWARD);
         delay(800);
         motor1.run(BACKWARD);
         motor2.run(BACKWARD);
         delay(800);
         
         motor1.setSpeed(car_speed);
         motor2.setSpeed(car_speed);
         motor1.run(FORWARD);
         motor2.run(BACKWARD);
         delay(4000);
         motor1.run(BACKWARD);
         motor2.run(FORWARD);
         delay(4000);
         motor1.run(RELEASE);
         motor2.run(RELEASE);
         
         delay(500);
         
         n += 1;
       }
     }
     else if(inputString == "introduce" || inputString == "introduce us" || inputString == "introduce me" || inputString == "do the introduction" || inputString == "introduction") {
        
      
      delay(1000);
      
      //turn_left();
      motor1.setSpeed(turn_speed);
      motor2.setSpeed(turn_speed-30);
      motor1.run(FORWARD);
      motor2.run(BACKWARD);
      delay(1500);
      motor1.run(RELEASE);
      motor2.run(RELEASE);
      delay(4000);
      
      //turn_right();
      motor1.setSpeed(turn_speed-30);
      motor2.setSpeed(turn_speed);
      motor1.run(BACKWARD);
      motor2.run(FORWARD);
      delay(1500);
      motor1.run(RELEASE);
      motor2.run(RELEASE);
      delay(4000);
      
      
      //turn_right 180 degrees();
      motor1.setSpeed(turn_speed*1.5);
      motor2.setSpeed(turn_speed*1.5);
      motor1.run(BACKWARD);
      motor2.run(FORWARD);
      delay(750);
      motor1.run(RELEASE);
      motor2.run(RELEASE);
      delay(2000);
      
      
      //turn_right 180 degrees();
      motor1.setSpeed(turn_speed*1.5);
      motor2.setSpeed(turn_speed*1.5);
      motor1.run(FORWARD);
      motor2.run(BACKWARD);
      delay(750);
      motor1.run(RELEASE);
      motor2.run(RELEASE);
      delay(500);
      
    }
    else if(inputString == "stop" || inputString == "halt" || inputString == "wait" || inputString == "pause"){
      //car_stop();
      motor1.run(RELEASE);
      motor2.run(RELEASE);
      delay(500);
    }
    else if(inputString.endsWith("0")){
      int val = inputString.toInt();
      car_speed = map(val, 0, 100, 0, 255);
      //lcd.clear();
      //lcd.print(car_speed);
      motor1.setSpeed(car_speed+12);
      motor2.setSpeed(car_speed);
      }  
    // clear the string:
    inputString = "";
    stringComplete = false;
  }
}
 
/*
  SerialEvent occurs whenever a new data comes in the
hardware serial RX.  This routine is run between each
time loop() runs, so using delay inside loop can delay
response.  Multiple bytes of data may be available.
*/
 
void serialEvent() {
  while (Serial.available()) {   
    // get the new byte:
    char inChar = (char)Serial.read();    
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == '\n') {
      stringComplete = true;
    }
    else
    // add it to the inputString: 
      inputString += inChar;
  }
}
