package io.choerodon.asgard.infra.feign.operator;

import com.alibaba.fastjson.JSONObject;
import com.google.gson.Gson;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import io.choerodon.asgard.api.vo.User;
import io.choerodon.asgard.infra.feign.IamFeignClient;
import io.choerodon.core.exception.CommonException;

/**
 * Created by Sheep on 2019/7/11.
 */

@Component
public class BaseServiceClientOperator {

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseServiceClientOperator.class);
    private static final Gson gson = new Gson();

    private static final String LOGIN_NAME = "loginName";
    private static final String REAL_NAME = "realName";


    @Autowired
    private IamFeignClient baseServiceClient;


    public List<User> getUserByIds(Long[] userIds) {
        ResponseEntity<List<User>> listUsersByIds = baseServiceClient.listUsersByIds(userIds);
        if (listUsersByIds.getStatusCode().is2xxSuccessful()) {
            List<User> users = listUsersByIds.getBody();
            if (users != null) {
                return users;
            }
            if (LOGGER.isInfoEnabled()) {
                LOGGER.info("queryUserByIds: unexpected result: {}", JSONObject.toJSONString(users));
            }
        }
        throw new CommonException("error.user.get");
    }

}
