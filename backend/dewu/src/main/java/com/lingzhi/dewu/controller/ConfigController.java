package com.lingzhi.dewu.controller;

import com.lingzhi.dewu.common.Result;
import com.lingzhi.dewu.entity.JimengConfig;
import com.lingzhi.dewu.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/config")
@CrossOrigin
public class ConfigController {

    @Autowired
    private ConfigService configService;

    @GetMapping
    public Result<JimengConfig> getConfig() {
        JimengConfig config = configService.getConfig();
        return Result.success(config);
    }

    @PostMapping
    public Result<Void> saveConfig(@RequestBody JimengConfig config) {
        configService.saveConfig(config);
        return Result.success("配置保存成功", null);
    }
}
