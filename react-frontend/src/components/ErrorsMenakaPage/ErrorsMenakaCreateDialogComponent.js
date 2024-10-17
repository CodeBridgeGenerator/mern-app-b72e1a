import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ErrorsMenakaCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.serviceName)) {
                error["serviceName"] = `ServiceName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.error)) {
                error["error"] = `Error field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.stack)) {
                error["stack"] = `Stack field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.details)) {
                error["details"] = `Details field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.createdBy)) {
                error["createdBy"] = `CreatedBy field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.updatedBy)) {
                error["updatedBy"] = `UpdatedBy field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            serviceName: _entity?.serviceName,error: _entity?.error,stack: _entity?.stack,details: _entity?.details,createdBy: _entity?.createdBy,updatedBy: _entity?.updatedBy,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("errorsMenaka").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info ErrorsMenaka created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in ErrorsMenaka" });
        }
        setLoading(false);
    };

    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    

    return (
        <Dialog header="Create ErrorsMenaka" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="errorsMenaka-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="serviceName">ServiceName:</label>
                <InputText id="serviceName" className="w-full mb-3 p-inputtext-sm" value={_entity?.serviceName} onChange={(e) => setValByKey("serviceName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceName"]) ? (
              <p className="m-0" key="error-serviceName">
                {error["serviceName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="error">Error:</label>
                <InputText id="error" className="w-full mb-3 p-inputtext-sm" value={_entity?.error} onChange={(e) => setValByKey("error", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["error"]) ? (
              <p className="m-0" key="error-error">
                {error["error"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="stack">Stack:</label>
                <InputText id="stack" className="w-full mb-3 p-inputtext-sm" value={_entity?.stack} onChange={(e) => setValByKey("stack", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stack"]) ? (
              <p className="m-0" key="error-stack">
                {error["stack"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="details">Details:</label>
                <InputText id="details" className="w-full mb-3 p-inputtext-sm" value={_entity?.details} onChange={(e) => setValByKey("details", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["details"]) ? (
              <p className="m-0" key="error-details">
                {error["details"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="createdBy">CreatedBy:</label>
                <InputText id="createdBy" className="w-full mb-3 p-inputtext-sm" value={_entity?.createdBy} onChange={(e) => setValByKey("createdBy", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["createdBy"]) ? (
              <p className="m-0" key="error-createdBy">
                {error["createdBy"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="updatedBy">UpdatedBy:</label>
                <InputText id="updatedBy" className="w-full mb-3 p-inputtext-sm" value={_entity?.updatedBy} onChange={(e) => setValByKey("updatedBy", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["updatedBy"]) ? (
              <p className="m-0" key="error-updatedBy">
                {error["updatedBy"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ErrorsMenakaCreateDialogComponent);
