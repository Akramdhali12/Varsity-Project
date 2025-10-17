package com.hms.gateway.filter;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;


import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {
    private static final Long JWT_TOKEN_VALIDITY= 5 * 60 * 60L;
    private static final String SECRET_KEY ="VGhpcyBpcyBhIHZlcnkgbG9uZyBhbmQgc2VjdXJlIHNlY3JldCBrZXkgdGhhdCBoYXMgaW5zdXJmZmllbnQgbGVuZ3RoIQ==";
    
    public TokenFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String path = exchange.getRequest().getPath().toString();
            if(path.equals("/user/login")||path.equals("/user/register")){

                return chain.filter(exchange.mutate().request(r->r.header("X-Secret-Key",
                "SECRET")).build());
            }
            HttpHeaders headers = exchange.getRequest().getHeaders();
            if(!headers.containsKey(HttpHeaders.AUTHORIZATION)){
                throw new RuntimeException("Missing authorization header");
            }
            String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);
            if(authHeader == null || !authHeader.startsWith("Bearer ")){
                throw new RuntimeException("Missing or invalid authorization header");
            }
            String token = authHeader.substring(7);
            try{
                Claims claims = Jwts.parser()
                        .setSigningKey(SECRET_KEY)
                        .parseClaimsJws(token)
                        .getBody();
                exchange = exchange.mutate().request(r->r.header("X-Secret-Key",
                "SECRET")).build();
            }catch(Exception e){
                throw new RuntimeException("Invalid token");
            }
            return chain.filter(exchange);
        };
    }

    public static class Config {
        // Put the configuration properties
    }
}
