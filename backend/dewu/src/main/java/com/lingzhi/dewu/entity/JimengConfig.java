package com.lingzhi.dewu.entity;

import lombok.Data;
import java.io.Serializable;

@Data
public class JimengConfig implements Serializable {
    private String configType;
    private String sessionId;
    private String apiKey;
}
