package com.duoc.lokohlector.Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import redis.clients.jedis.Jedis;

@Service
public class RedisConfiguration {
    
    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private int port;

    @Value("${spring.redis.password}")
    private String password;

    
    public Jedis jedis() {
        Jedis jedis = new Jedis(host, port,true);
        if(password != null && !password.isEmpty()) {
            jedis.auth(password);
        }
        return jedis;
    }

}
