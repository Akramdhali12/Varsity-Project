package com.hms.HMS.jwt;

import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final Long JWT_TOKEN_VALIDITY= 5 * 60 * 60L;
    private static final String SECRET_KEY ="VGhpcyBpcyBhIHZlcnkgbG9uZyBhbmQgc2VjdXJlIHNlY3JldCBrZXkgdGhhdCBoYXMgaW5zdXJmZmllbnQgbGVuZ3RoIQ==";

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails user = (CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("name", user.getName());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        return doGenerateToken(claims, user.getUsername());

    }
    public String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY*1000)) // 10 hours
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY).compact();
    }
}
