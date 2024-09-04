import { createClient, SetOptions } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url,
});

// published
const redisPubClient = createClient({
  url: config.redis.url,
});

// subscribe
const redisSubClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', error => console.log('Redis Error: ', error));
redisClient.on('error', error => console.log('Redis connected.'));

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

const set = async (
  key: string,
  value: string,
  optins?: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, optins);
};

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

export const RedisClient = {
  connect,
  set,
  get,
  del,
  disconnect,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisSubClient.subscribe.bind(redisSubClient),
};
