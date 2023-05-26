package shoesbackend.com.shoesbackend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.annotation.Resource;


@Configuration
@EnableWebSecurity
@CrossOrigin
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    // @Autowired
    // private JwtRequestFilter jwtRequestFilter;
    @Bean
    public JwtRequestFilter authenticationJwtTokenFilter() {
        return new JwtRequestFilter();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // @Bean
    // public SecurityFilterChain securityFilterChain2(HttpSecurity http) throws Exception {
    //     http.cors().and().csrf().disable()
    //             .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
    //             .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
    //             .authorizeHttpRequests.requestMatchers("/api/auth/login").permitAll()
    //             .antMatchers("/api/user/create/**").permitAll()
    //             .anyRequest().authenticated();


    //     http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

    //     return http.build();
    // }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors().and()
                .csrf().disable()
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers("/token/**").permitAll()
                        .requestMatchers("/add/**").permitAll()
                        .requestMatchers("/test/**").permitAll()
                        .requestMatchers("/delete/**").permitAll()
                        .requestMatchers("/list/**").permitAll()
                        .requestMatchers("/id/product/**").permitAll()
                        .requestMatchers("/infor/product/**").permitAll()
                        .requestMatchers("/update/order-detail-status/**").permitAll()
                        .requestMatchers("/update-user/**").permitAll()

                        .anyRequest().authenticated()
                )
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic().and()
                .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
                //.addFilterAfter(authenticationJwtTokenFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    private Customizer<HttpBasicConfigurer<HttpSecurity>> withDefaults() {
        return null;
    }

    // @Bean
    // public SecurityFilterChain securityFilterChain2(HttpSecurity http) throws Exception {
    //     return http
    //             .authorizeHttpRequests(auth -> {
    //                 auth.requestMatchers("/*").permitAll();
    //                 auth.anyRequest().authenticated();
    //             })
    //             .csrf(AbstractHttpConfigurer::disable)
    //             .httpBasic(Customizer.withDefaults())
    //             .build();

            
    // }

    // @Bean
    // public SecurityFilterChain securityFilterChain2(HttpSecurity http) throws Exception {
    //     http.csrf().disable()
	// 			// dont authenticate this particular request
	// 			.authorizeRequests().antMatchers("/authenticate").permitAll().
	// 			// all other requests need to be authenticated
	// 			anyRequest().authenticated().and().
	// 			// make sure we use stateless session; session won't be used to
	// 			// store user's state.
	// 			exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()

	// 	// Add a filter to validate the tokens with every request
	// 	http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    // }

    
}
