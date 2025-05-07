package com.email.writer.app;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.ProblemDetailJacksonMixin;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    @Value("${gemini.api.url}")
    private String GeminiApiUrl;
    @Value("${gemini.api.key}")
    private String GeminiApiKey;

    public EmailGeneratorService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }
    public String generateEmailReply(EmailRequest emailRequest){
        String propmt=buildPrompt(emailRequest);

        Map<String, Object> reqBody=Map.of("contents", new Object[]{
                Map.of("parts",new Object[]{
                        Map.of("text",propmt)
                })
        });

        String response=webClient.post().uri(GeminiApiUrl+GeminiApiKey)
                .header("Content-Type","application/json").bodyValue(reqBody)
                .retrieve()
                .bodyToMono(String.class).block();
        return ExtractResponse(response);
    }

    private String ExtractResponse(String response){
        try{
            ObjectMapper obj=new ObjectMapper();
            JsonNode rootNode=obj.readTree(response);
            return rootNode.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();
        }catch (Exception e){
            return "Error processing request";
        }
    }
    private String buildPrompt(EmailRequest emailRequest){
        StringBuilder prompt=new StringBuilder();
        prompt.append("Generate a professional email reply for the following email content. Please don't add a subject line.");
        if(emailRequest.getTone()!=null && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
        }
        prompt.append("\n Original Email : \n").append(emailRequest.getEmailContent());
        System.out.println(prompt.toString());
        return prompt.toString();

    }
}
