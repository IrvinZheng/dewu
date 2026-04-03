package com.lingzhi.dewu.controller;

import com.lingzhi.dewu.common.Result;
import com.lingzhi.dewu.entity.PublishSetting;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/publish")
@CrossOrigin
public class PublishController {

    private PublishSetting publishSetting = new PublishSetting();

    @GetMapping("/setting")
    public Result<PublishSetting> getSetting() {
        if (publishSetting.getMode() == null) {
            publishSetting.setMode("realtime");
        }
        return Result.success(publishSetting);
    }

    @PostMapping("/setting")
    public Result<Void> saveSetting(@RequestBody PublishSetting setting) {
        this.publishSetting = setting;
        return Result.success("设置保存成功", null);
    }
}
