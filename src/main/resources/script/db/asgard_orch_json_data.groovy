package script.db

databaseChangeLog(logicalFilePath: 'asgard_orch_json_data.groovy') {
    changeSet(id: '2018-07-04-create-table-asgard_orch_json_data', author: 'jcalaz@163.com') {
        createTable(tableName: "asgard_orch_json_data") {
            column(name: 'id', type: 'BIGINT UNSIGNED', remarks: 'ID', autoIncrement: true) {
                constraints(primaryKey: true)
            }
            column(name: 'data', type: 'MEDIUMTEXT', remarks: '存储数据') {
                constraints(nullable: false)
            }

            column(name: "OBJECT_VERSION_NUMBER", type: "BIGINT", defaultValue: "1")
            column(name: "CREATED_BY", type: "BIGINT", defaultValue: "-1")
            column(name: "CREATION_DATE", type: "DATETIME", defaultValueComputed: "CURRENT_TIMESTAMP")
            column(name: "LAST_UPDATED_BY", type: "BIGINT", defaultValue: "-1")
            column(name: "LAST_UPDATE_DATE", type: "DATETIME", defaultValueComputed: "CURRENT_TIMESTAMP")
        }
    }
}
