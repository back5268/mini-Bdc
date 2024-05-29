import { ArrayRedis } from "@lib/ioredis";

export const debtQueue = new ArrayRedis("debtQueue")
debtQueue.callbackCron = async (data) => {

}