package com.lingzhi.dewu.service;

import com.lingzhi.dewu.entity.JimengConfig;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ConfigService {
    
    private Map<String, JimengConfig> configStore = new HashMap<>();

    public JimengConfig getConfig() {
        return configStore.getOrDefault("jimeng", new JimengConfig());
    }

    public void saveConfig(JimengConfig config) {
        configStore.put("jimeng", config);
    }
}
