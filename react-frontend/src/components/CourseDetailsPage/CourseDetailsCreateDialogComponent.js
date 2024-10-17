import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import _ from "lodash";
import initilization from "../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

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

const CourseDetailsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [depName, setDepName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [depName], setError);
        }
        set_entity({...init});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.courseName)) {
                error["courseName"] = `CourseName field is required`;
                ret = false;
            }
  
            if (_.isEmpty(_entity?.lecturer)) {
                error["lecturer"] = `Lecturer field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            courseName: _entity?.courseName,depName: _entity?.depName?._id,lecturer: _entity?.lecturer,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("courseDetails").create(_data);
        const eagerResult = await client
            .service("courseDetails")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "depName",
                    service : "departmentDetails",
                    select:["depName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info CourseDetails updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in CourseDetails" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount departmentDetails
                    client
                        .service("departmentDetails")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleDepartmentDetailsId } })
                        .then((res) => {
                            setDepName(res.data.map((e) => { return { name: e['depName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "DepartmentDetails", type: "error", message: error.message || "Failed get departmentDetails" });
                        });
                }, []);

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

    const depNameOptions = depName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create CourseDetails" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="courseDetails-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="courseName">CourseName:</label>
                <InputText id="courseName" className="w-full mb-3 p-inputtext-sm" value={_entity?.courseName} onChange={(e) => setValByKey("courseName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["courseName"]) ? (
              <p className="m-0" key="error-courseName">
                {error["courseName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="depName">DepName:</label>
                <Dropdown id="depName" value={_entity?.depName?._id} optionLabel="name" optionValue="value" options={depNameOptions} onChange={(e) => setValByKey("depName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["depName"]) ? (
              <p className="m-0" key="error-depName">
                {error["depName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="lecturer">Lecturer:</label>
                <InputText id="lecturer" className="w-full mb-3 p-inputtext-sm" value={_entity?.lecturer} onChange={(e) => setValByKey("lecturer", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["lecturer"]) ? (
              <p className="m-0" key="error-lecturer">
                {error["lecturer"]}
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

export default connect(mapState, mapDispatch)(CourseDetailsCreateDialogComponent);
