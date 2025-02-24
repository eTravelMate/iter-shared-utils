import {Kafka} from "kafkajs"
export async function checkKafkaHealth(clientId:any,brokers:any) {
    const kafka = new Kafka({ clientId, brokers });

    const admin = kafka.admin();

    try {
        await admin.connect();
        console.log("Kafka connected");
        await admin.disconnect();        
        return { status:"SUCCESS",
            message:"Kafka is up and running..",
         };  
    } catch (error) { 
        return { status: "Failure",
            env:`${clientId},${brokers}`,
            message: `Kafka is down, error: ${error}`,
         };  
    }
}
