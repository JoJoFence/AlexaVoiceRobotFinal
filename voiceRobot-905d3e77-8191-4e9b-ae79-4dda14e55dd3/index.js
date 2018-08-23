var mqtt    = require('mqtt');
var client = mqtt.createClient(19681,"m10.cloudmqtt.com",
    {
        username: "lauxrgdo",
        password: "8fe0nwAhUD9s"
    });
    
var app_id = "amzn1.ask.skill.92720ad9-280a-4b7b-a181-ab291bb7bad6" //id from your alexa skill

var ctx = null;

// Route the incoming request based on type (LaunchRequest, IntentRequest, etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);
        ctx = context;

        if (event.session.application.applicationId !== app_id) {
             ctx.fail("Invalid Application ID");
         }    
        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }
        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request, event.session);
        }  else if (event.request.type === "IntentRequest") {
            onIntent(event.request, event.session);
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            ctx.succeed();
        }
    } catch (e) {
        console.log("EXCEPTION in handler:  " + e);
        ctx.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId + ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId + ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session ) {                  //, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
    intentName = intentRequest.intent.name;

    console.log("REQUEST to string =" + JSON.stringify(intentRequest));

    var callback = null;
    
       
    
    if ("RobotIntent" === intentName) {
			
		// Determine if this is for Turn, for Direction, for Speed, or an error.
        var directionSlot = intent.slots.Direction,
			speedSlot = intent.slots.Speed,
			turnSlot = intent.slots.Turn,
			stopSlot = intent.slots.stop,
			danceSlot = intent.slots.Dance,
			turnValue,
			directionValue,
			speedValue,
			stopValue,
			danceValue;

        
		if (turnSlot && turnSlot.value) { 
			turnValue = turnSlot.value.toLowerCase();
			
		    client.publish('JonasAlbert/vbot', turnValue, function(){
			var cardTitle = "Turning";
			var repromptText = "What's next?";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Turning " + turnValue + ". " + repromptText;
			//var shouldEndSession = true;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		    //client.end();
		    });  
		   
        }else if (directionSlot && directionSlot.value) { 
			directionValue = directionSlot.value.toLowerCase();
			
            client.publish('JonasAlbert/vbot', directionValue, function(){
			var cardTitle = "Going";
			var repromptText = "What's next?";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Going " + directionValue +". " + repromptText;
			//var shouldEndSession = true;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		    //client.end();
            }); 
		    
        }else if (speedSlot && speedSlot.value) { 
			speedValue = speedSlot.value.toLowerCase();
			
		    client.publish('JonasAlbert/vbot', speedValue, function(){
			var cardTitle = "Setting Speed";
			var repromptText = "What's next?";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Set speed to" + speedValue+ "percent. " + repromptText;
			//var shouldEndSession = true;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		    });  
		   
        }else if (stopSlot && stopSlot.value) {
			stopValue = stopSlot.value.toLowerCase();
			
		    client.publish('JonasAlbert/vbot', stopValue, function(){
		    var cardTitle = "Stop";
			var repromptText = " What's next?";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "Stopped. " + repromptText;
			//var shouldEndSession = true;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		    //client.end();
		    });  
		
        }else if (danceSlot && danceSlot.value) {
			danceValue = danceSlot.value.toLowerCase();
			
		    client.publish('JonasAlbert/vbot', danceValue, function(){
		    var cardTitle = "Dance";
			var repromptText = " What's next?";
			var sessionAttributes = {};
			var shouldEndSession = false;
			var speechOutput = "You know I got the moves, baby!" + repromptText;
			//var shouldEndSession = true;
			ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
		    //client.end();
		    });  
		
        }else { //If error
            //handleNoSlotRequest(response);
        }
		
    }else if ("AMAZON.HelpIntent" === intentName) {
        getHelp(callback);
    }else if ("AMAZON.StopIntent" === intentName || "AMAZON.CancelIntent" === intentName) {
        handleSessionEndRequest(callback);
    }else {
        throw "Invalid intent";
    }
    


}





/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId + ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse() {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to the voice controlled robot. Just ask me what should I do.";

    var repromptText = "I am ready for your command. For more instructions, please say help me.";
    var shouldEndSession = false;

    ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));

}

function getHelp() {
	var sessionAttributes = {};
    var repromptSpeech = "What would you like me to do?";
    var speechOutput = "I can control a toy robot. "
        + "To change the robot's lights, say something like, change lights to blue. "
		+ "For a list of valid colors, try, what are the available colors. "
        + "To change the robot's direction, say something like, go straight. "
		+ "For a list of valid directions, try, what are the available directions. "
		+ "To turn the robot, say something like, turn the robot right. "
		+ "For a list of valid turns, try, what are the available turns. "
		+ "If you want the robot to stop, say something like, stop robot. "
        + "If you want to exit, say exit. "
        + repromptSpeech;
	var cardTitle = speechOutput;
    var shouldEndSession = false;

    ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptSpeech, shouldEndSession)));
}

function handleSessionEndRequest() {
	var sessionAttributes = {};
    var cardTitle = "Session Ended";
    var speechOutput = "Thank you for calling me, Have a nice day!";
    var shouldEndSession = true;
	var repromptText = "";
    ctx.succeed(buildResponse(sessionAttributes, buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession)));
}


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}