package shoesbackend.com.shoesbackend.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import shoesbackend.com.shoesbackend.service.UserService;
import shoesbackend.com.shoesbackend.service.ServiceIpml.UserServiceImpl;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {


	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserServiceImpl userServiceImpl;


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		// final String requestTokenHeader = request.getHeader("Authorization");

		// JWT Token is in the form "Bearer token". Remove Bearer word and get only the
		// Token

		try {
			// String username = null;
			String jwtToken = null;
			jwtToken = parseJwt(request);
			System.out.println(jwtToken);
			String username = jwtTokenUtil.getUsernameFromToken(jwtToken);
			System.out.println(username.toUpperCase());
			if (jwtToken != null && jwtTokenUtil.validateToken(jwtToken)) {
				System.out.println("oke");
				UserDetails userDetails = userServiceImpl.loadUserByUsername(username);
				System.out.println(userDetails.getUsername().toUpperCase());
				System.out.println(userDetails.getPassword());
				List<GrantedAuthority> authorities = (List<GrantedAuthority>) userDetails.getAuthorities();
				System.out.println(authorities.get(0));
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		} catch (IllegalArgumentException e) {
			System.out.println("Unable to get JWT Token");
		} catch (ExpiredJwtException e) {
			System.out.println("JWT Token has expired");
		}
		chain.doFilter(request, response);
	}

	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");

		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7, headerAuth.length());
		}

		return null;
	}
}
