package io.choerodon.asgard.domain;

import io.choerodon.mybatis.annotation.ModifyAudit;
import io.choerodon.mybatis.annotation.VersionAudit;
import io.choerodon.mybatis.domain.AuditDomain;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@ModifyAudit
@VersionAudit
@Table(name = "ASGARD_SAGA_INSTANCE")
public class SagaInstance extends AuditDomain {

    @Id
    @GeneratedValue
    private Long id;

    private String sagaCode;

    private String status;

    private Date startTime;

    private Date endTime;

    private Long inputDataId;

    private Long outputDataId;

    private String refType;

    private String refId;

    public SagaInstance() {
    }

    public SagaInstance(String sagaCode) {
        this.sagaCode = sagaCode;
    }

    public SagaInstance(String sagaCode, String refType, String refId, String status,
                        Date startTime, Date endTime) {
        this.sagaCode = sagaCode;
        this.refType = refType;
        this.refId = refId;
        this.status = status;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public SagaInstance(String sagaCode, String refType, String refId, String status, Date startTime) {
        this.sagaCode = sagaCode;
        this.refType = refType;
        this.refId = refId;
        this.status = status;
        this.startTime = startTime;
    }

    public String getRefType() {
        return refType;
    }

    public void setRefType(String refType) {
        this.refType = refType;
    }

    public String getRefId() {
        return refId;
    }

    public void setRefId(String refId) {
        this.refId = refId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSagaCode() {
        return sagaCode;
    }

    public void setSagaCode(String sagaCode) {
        this.sagaCode = sagaCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Long getInputDataId() {
        return inputDataId;
    }

    public void setInputDataId(Long inputDataId) {
        this.inputDataId = inputDataId;
    }

    public Long getOutputDataId() {
        return outputDataId;
    }

    public void setOutputDataId(Long outputDataId) {
        this.outputDataId = outputDataId;
    }

}
