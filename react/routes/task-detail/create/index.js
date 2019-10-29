/* eslint-disable max-classes-per-file */
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import _ from 'lodash';
import { Divider } from 'choerodon-ui';
import { Form, Select, Table, TextField, TextArea, DateTimePicker, SelectBox, NumberField, Tooltip } from 'choerodon-ui/pro';
import Store, { StoreProvider } from './stores';
import FormSelectEditor from '../../../components/formSelectEditor';
import OrgUserDataSetConfig from './stores/OrgUserDataSet';
import './index.less';

const { Option } = Select;
const { Column } = Table;
const TaskCreate = observer(() => {
  const { methodDataSet, taskCreateDataSet, paramDataSet, dsStore, prefixCls, id, intl, type, modal } = useContext(Store);
  const microservice = Array.from(new Set(methodDataSet.map((r) => r.get('service'))));
  modal.handleOk(async () => {
    const params = {};
    paramDataSet.forEach((r) => { params[r.get('name')] = r.get('defaultValue'); });
    taskCreateDataSet.current.set('params', params);
    if (await taskCreateDataSet.submit()) {
      return true;
    } else {
      return false;
    }
  });
  function getUserOption({ record, text, value }) {
    return (
      <Tooltip placement="left" title={`${record.get('email')}`}>
        <div className={`${prefixCls}-option`}>
          <div className={`${prefixCls}-option-avatar`}>
            {
              record.get('imageUrl') ? <img src={record.get('imageUrl')} alt="userAvatar" style={{ width: '100%' }} />
                : <span className={`${prefixCls}-option-avatar-noavatar`}>{record.get('realName') && record.get('realName').split('')[0]}</span>
            }
          </div>
          <span>{text}</span>
        </div>
      </Tooltip>
    );
  }

  const queryUser = _.debounce((str, optionDataSet) => {
    optionDataSet.setQueryParameter('user_name', str);
    if (str !== '') {
      optionDataSet.query();
    }
  }, 500);
  function handleFilterChange(e, optionDataSet) {
    e.persist();
    queryUser(e.target.value, optionDataSet);
  }
  return (
    <React.Fragment>
      <div className="c7n-task-create-container">
        <div className="c7n-task-create-container-small">
          <div className="title">基础信息</div>
          <Form dataSet={taskCreateDataSet}>
            <Select name="service">
              {microservice.map((v) => (
                <Option value={v} key={v}>{v}</Option>
              ))}
            </Select>
            <Select
              name="methodId"
              onChange={() => { paramDataSet.query(); }}
            >
              {
                methodDataSet
                  .filter((r) => r.get('service') === taskCreateDataSet.current
                    .get('service')).map((r) => (
                      <Option value={r.get('id')}>{r.get('description')}</Option>
                  ))    
              }
            </Select>
          </Form>
        </div>
        <div className="sub-title">参数设置</div>
        <Table dataSet={paramDataSet}>
          <Column name="name" />
          <Column editor name="defaultValue" />
          <Column name="type" />
          <Column name="description" />
        </Table>
        <div className="c7n-task-create-container-small">
          <Form dataSet={taskCreateDataSet}>
            <TextField name="name" />
            <TextArea name="description" resize="vertical" />
          </Form>
        </div>
      </div>
      <Divider />
      
      <div className="c7n-task-create-container">
        <div className="c7n-task-create-container-small">
          <div className="title">配置信息</div>
          <Form dataSet={taskCreateDataSet}>
            <DateTimePicker
              style={{
                width: '3.4rem',
              }}
              format="YYYY-MM-DD HH:mm:ss"
              name="time"
            />
          </Form>
          <div className="sub-title">触发类型</div>
          <Form dataSet={taskCreateDataSet}>
            <SelectBox
              style={{ 
                marginBottom: '-0.12rem',
                marginTop: '-0.05rem',
              }}
              name="triggerType"
            />
          </Form>
          <Form columns={5} dataSet={taskCreateDataSet}>
            {taskCreateDataSet.current.get('triggerType') === 'simple-trigger' ? [
              <NumberField colSpan={2} name="simpleRepeatInterval" />,
              <Select clearButton={false} colSpan={1} name="simpleRepeatIntervalUnit" />,
              <NumberField colSpan={2} name="simpleRepeatCount" />,
            ] : (
              <TextField colSpan={5} name="cronExpression" />
            )}
            <Select colSpan={5} name="executeStrategy" showHelp="tooltip" />
          </Form>
          <div className="sub-title">通知对象</div>
          <Form dataSet={taskCreateDataSet}>
            <SelectBox name="notifyUser" />
          </Form>
          {taskCreateDataSet.current && taskCreateDataSet.current.get('notifyUser').includes('assigner') && (
            <FormSelectEditor
              record={taskCreateDataSet.current}
              optionDataSetConfig={OrgUserDataSetConfig({ id, type })}
              name="assignUserIds"
              addButton="添加其他指定用户"
              alwaysRequired
              canDeleteAll={false}
              dsStore={dsStore}
            >
              {((itemProps) => (
                <Select
                  {...itemProps}
                  labelLayout="float"
                  style={{ width: '100%' }}
                  searchable
                  searchMatcher={() => true}
                  onInput={(e) => handleFilterChange(e, itemProps.options)}
                  optionRenderer={getUserOption}
                />
              ))}
            </FormSelectEditor>
          )}
        </div>
      </div>
    </React.Fragment>
  );
});

export default (props) => (
  <StoreProvider {...props}>
    <TaskCreate />
  </StoreProvider>
);
