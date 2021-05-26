package com.fresco.codelab.jms;

import org.apache.activemq.broker.BrokerService;
import org.apache.activemq.broker.jmx.ManagementContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  @Override
  public void configureMessageBroker(final MessageBrokerRegistry config) {
      config.enableStompBrokerRelay("/topic","/queue")
      .setRelayHost("localhost")
      .setRelayPort(61613);
      config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  public void registerStompEndpoints(final StompEndpointRegistry registry) {
      registry.addEndpoint("/mergeRequest").withSockJS();
  }

  @Bean(initMethod = "start", destroyMethod = "stop")
  public BrokerService broker() throws Exception {
      final BrokerService broker = new BrokerService();
      broker.addConnector("stomp://localhost:61613");
      broker.setPersistent(false);
      final ManagementContext managementContext = new ManagementContext();
      managementContext.setCreateConnector(true);
      broker.setManagementContext(managementContext);
      return broker;
  }
  
}