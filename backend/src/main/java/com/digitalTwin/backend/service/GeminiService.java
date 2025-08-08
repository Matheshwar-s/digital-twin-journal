package com.digitalTwin.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

    public String generateReflection(String content, String mood) {
        RestTemplate restTemplate = new RestTemplate();

        String prompt = "You are the user's digital twin. Reflect kindly and wisely on this journal entry based on their mood.\n" +
                        "Mood: " + mood + "\n\n" +
                        "Journal Entry:\n" + content;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        Map<String, Object> request = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", prompt)
                ))
            )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

        try {
            String fullUrl = BASE_URL + "?key=" + apiKey;

            ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, entity, Map.class);
            System.out.println("Gemini API raw response: " + response.getBody());

            Map responseBody = response.getBody();
            if (responseBody != null && responseBody.containsKey("candidates")) {
                Map firstCandidate = ((List<Map>) responseBody.get("candidates")).get(0);
                Map contentMap = (Map) firstCandidate.get("content");
                List<Map> parts = (List<Map>) contentMap.get("parts");
                return parts.get(0).get("text").toString();
            }

        } catch (Exception e) {
            System.err.println("Gemini API error: " + e.getMessage());
            e.printStackTrace();
        }

        return "Reflection unavailable. Try again later.";
    }
    public String generateChatResponse(String fullPrompt) {
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setAccept(List.of(MediaType.APPLICATION_JSON));

    Map<String, Object> request = Map.of(
        "contents", List.of(
            Map.of("parts", List.of(
                Map.of("text", fullPrompt)
            ))
        )
    );

    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

    try {
        String fullUrl = BASE_URL + "?key=" + apiKey;

        ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, entity, Map.class);
        System.out.println("Gemini Chat API response: " + response.getBody());

        Map responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("candidates")) {
            Map firstCandidate = ((List<Map>) responseBody.get("candidates")).get(0);
            Map contentMap = (Map) firstCandidate.get("content");
            List<Map> parts = (List<Map>) contentMap.get("parts");
            return parts.get(0).get("text").toString();
        }

    } catch (Exception e) {
        System.err.println("Gemini Chat API error: " + e.getMessage());
        e.printStackTrace();
    }

    return "Your twin is silent right now. Try again later.";
}

}
